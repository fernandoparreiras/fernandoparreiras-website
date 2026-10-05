import assert from 'node:assert/strict';
import test from 'node:test';
import { createHmac } from 'node:crypto';
import { parseDockLead } from '../netlify/functions/_shared/docks-lead.mjs';
import { buildFernandoCrmPayload, syncFernandoLeadToBase44 } from '../netlify/functions/_shared/base44-lead.mjs';
import { buildDockEmail } from '../netlify/functions/_shared/lead-emails.mjs';
import { enqueueDock, processDock, cancelToken, verifyCancelToken, recipientKey, DAY, safeDockDeliveryFailure } from '../netlify/functions/_shared/docks-queue.mjs';
import { createDocksHandler } from '../netlify/functions/docks.mjs';
import { createCancelHandler } from '../netlify/functions/docks-cancel.mjs';
import { summarizeDocks } from '../netlify/functions/_shared/docks-report.mjs';

export const ID = '123e4567-e89b-42d3-a456-426614174000';
const NOW = Date.parse('2026-10-02T12:00:00.000Z');
export const material = { formType: 'docks', name: 'Pessoa Teste', email: 'pessoa@example.com', interest: 'ia-empresas', presentationSlug: 'democratizacao-ia', sourcePath: '/docks/democratizacao-ia/', consent: true };
export function memoryStore() {
  const records = new Map(); let version = 0;
  return { records,
    async setJSON(key, data, options = {}) {
      const old = records.get(key);
      if ((options.onlyIfNew && old) || (options.onlyIfMatch && old?.etag !== options.onlyIfMatch)) return { modified: false };
      const etag = String(++version); records.set(key, { data: structuredClone(data), etag }); return { modified: true, etag };
    },
    async get(key) { return structuredClone(records.get(key)?.data || null); },
    async getWithMetadata(key) { return structuredClone(records.get(key) || null); },
    async delete(key) { records.delete(key); },
  };
}
function configure(t) {
  const before = { ...process.env };
  Object.assign(process.env, { FERNANDO_DOCKS_CRM_SIGNING_SECRET: 'synthetic-signing-secret-longer-than-32-bytes', FERNANDO_CONTACT_EMAIL_FROM: 'Test <test@example.com>', FERNANDO_CONTACT_EMAIL_TO: 'owner@example.com', RESEND_API_KEY: 'test-resend' });
  t.after(() => { process.env = before; });
}
const sync = async () => ({ status: 'sent', outcome: 'created', leadId: 'synthetic-lead' });

test('material alone stays low priority and ignores forged score or behavioral input', () => {
  const lead = parseDockLead({ ...material, score: 100, stars: 5, downloads: 300, commercialConsent: false, company: 'Ignore', role: 'decisor', message: 'Ignore' });
  assert.equal(lead.qualification.score, 10); assert.equal(lead.qualification.stars, 1);
  assert.equal(lead.company, ''); assert.equal(lead.message, '');
  assert.deepEqual(lead.qualification.missing, ['company', 'role', 'message', 'urgency']);
});
test('explicit near-term compatible request reaches five stars; exploration cannot', () => {
  const input = { ...material, commercialConsent: true, company: 'Example', role: 'decisor', urgency: '30-60', message: 'Preciso escolher uma aplicação de IA para o time.' };
  assert.equal(parseDockLead(input).qualification.stars, 5);
  assert.equal(parseDockLead({ ...input, urgency: 'exploracao' }).qualification.stars, 4);
  assert.throws(() => parseDockLead({ ...input, role: '' }), /invalid_payload/);
});
test('server rejects unknown decks, mismatched origins and invalid consent', () => {
  for (const change of [{ presentationSlug: 'inventado' }, { sourcePath: '/docks/ia-para-negocios' }, { consent: false }, { followupConsent: 'true' }, { interest: 'inventado' }]) assert.throws(() => parseDockLead({ ...material, ...change }), /invalid_payload/);
});
test('signed CRM payload preserves presentation, event, scopes and missing values', () => {
  const lead = parseDockLead({ ...material, followupConsent: true, newsletterConsent: true });
  const payload = buildFernandoCrmPayload({ ...lead, submissionId: ID, submittedAt: new Date(NOW).toISOString() });
  assert.equal(payload.source.route, '/docks/democratizacao-ia');
  assert.equal(payload.source.offer_key, 'fernando:docks-democratizacao-ia');
  assert.equal(payload.docks.event_id, 'ai-summit-csc-2026');
  assert.equal(payload.consent.scope, 'material_delivery');
  assert.equal(payload.docks.commercial_consent, false);
  assert.equal(payload.docks.newsletter_consent, true);
  assert.equal(payload.qualification.score, 10);
});
test('email contains actual material and guide, with no leaked internal score', () => {
  const lead = parseDockLead(material), email = buildDockEmail(lead);
  assert.match(email.text, /presentations\/democratizacao-ia.html/);
  assert.match(email.text, /docks\/democratizacao-ia\/roteiro.txt/);
  assert.match(email.text, /Quem é o dono/);
  assert.doesNotMatch(email.text + email.html, /estrelas|docks-score/);
});
test('queue resumes partial failure with the same provider keys and CRM receipt', async (t) => {
  configure(t); const store = memoryStore(); const lead = parseDockLead(material);
  await enqueueDock(store, { submissionId: ID, lead, now: NOW });
  let crmCalls = 0, first = true; const sends = [];
  const options = { now: NOW, sync: async () => { crmCalls++; return sync(); }, send: async (input) => { sends.push(input.idempotencyKey); if (input.idempotencyKey.endsWith('-material') && first) { first = false; throw new Error('timeout'); } return { id: 'test-email' }; } };
  assert.equal((await processDock(store, `jobs/${ID}`, options)).state, 'pending');
  assert.equal((await processDock(store, `jobs/${ID}`, options)).state, 'complete');
  assert.equal(crmCalls, 1); assert.equal(sends.filter((key) => key.endsWith('-internal')).length, 1);
  assert.deepEqual(sends.filter((key) => key.endsWith('-material')), [`docks-${ID}-material`, `docks-${ID}-material`]);
  await enqueueDock(store, { submissionId: ID, lead, now: NOW + 1000 });
  await assert.rejects(enqueueDock(store, { submissionId: ID, lead: { ...lead, name: 'changed' }, now: NOW }), /submission_conflict/);
});
test('concurrent same submission is claimed once', async (t) => {
  configure(t); const store = memoryStore(); await enqueueDock(store, { submissionId: ID, lead: parseDockLead(material), now: NOW });
  let release; const blocker = new Promise((resolve) => { release = resolve; }); let started; const entered = new Promise((resolve) => { started = resolve; }); let count = 0;
  const options = { now: NOW, sync: async () => { count++; started(); await blocker; return sync(); }, send: async () => ({ id: 'email' }) };
  const first = processDock(store, `jobs/${ID}`, options); await entered;
  assert.equal((await processDock(store, `jobs/${ID}`, options)).state, 'busy'); release(); await first; assert.equal(count, 1);
});
test('followups honor two/seven days and cancellation across earlier requests', async (t) => {
  configure(t); const store = memoryStore(), lead = parseDockLead({ ...material, followupConsent: true });
  await enqueueDock(store, { submissionId: ID, lead, now: NOW }); const sends = [];
  const opts = { sync, send: async (input) => { sends.push(input.idempotencyKey); return { id: 'email' }; } };
  await processDock(store, `jobs/${ID}`, { ...opts, now: NOW });
  await processDock(store, `jobs/${ID}`, { ...opts, now: NOW + DAY }); assert.equal(sends.length, 2);
  await processDock(store, `jobs/${ID}`, { ...opts, now: NOW + 2 * DAY }); assert.equal(sends.length, 3);
  await store.setJSON(`cancelled/${recipientKey(lead.email)}`, { cancelledAt: new Date(NOW + 3 * DAY).toISOString() });
  const result = await processDock(store, `jobs/${ID}`, { ...opts, now: NOW + 7 * DAY });
  assert.equal(sends.length, 3); assert.equal(result.receipts.reflection.status, 'cancelled'); assert.equal(result.state, 'complete');
});
test('stale ambiguous delivery requires review instead of duplicate mail', async (t) => {
  configure(t); const store = memoryStore(); await enqueueDock(store, { submissionId: ID, lead: parseDockLead(material), now: NOW });
  await processDock(store, `jobs/${ID}`, { now: NOW, sync, send: async () => { throw new Error('ambiguous'); } });
  let sends = 0; const result = await processDock(store, `jobs/${ID}`, { now: NOW + DAY, sync, send: async () => { sends++; return { id: 'duplicate' }; } });
  assert.equal(result.state, 'review'); assert.equal(sends, 0);
});
test('cancel requires signed link and POST; scanners cannot unsubscribe through GET', async (t) => {
  configure(t); const token = cancelToken(ID); assert.equal(verifyCancelToken(token), ID); assert.equal(verifyCancelToken(token + '.extra'), null); assert.equal(verifyCancelToken(token.replace(/.$/, 'x')), null);
  const store = memoryStore(); await enqueueDock(store, { submissionId: ID, lead: parseDockLead({ ...material, followupConsent: true }), now: NOW });
  const handler = createCancelHandler({ storeFor: () => store }); const url = `https://example.com/api/docks-cancel?token=${token}`;
  assert.equal((await handler(new Request(url))).status, 200); assert.equal(await store.get(`cancelled/${recipientKey(material.email)}`), null);
  assert.equal((await handler(new Request(url, { method: 'POST' }))).status, 200); assert.ok(await store.get(`cancelled/${recipientKey(material.email)}`));
});
test('handler fails closed unless all mandatory receipts exist; invalid payload sends nothing', async (t) => {
  configure(t); const store = memoryStore(); let count = 0;
  const handler = createDocksHandler({ storeFor: () => store, configured: () => {}, process: async () => { count++; return { receipts: { material: { id: 'email' } } }; } });
  const req = (value) => new Request('https://example.com/api/docks', { method: 'POST', body: JSON.stringify(value) });
  assert.equal((await handler(req({ ...material, submissionId: ID, consent: false }))).status, 400); assert.equal(count, 0);
  assert.equal((await handler(req({ ...material, submissionId: ID }))).status, 502); assert.equal(count, 1);
});
test('retention expires PII records and report aggregates without PII', async (t) => {
  configure(t); const store = memoryStore(); await enqueueDock(store, { submissionId: ID, lead: parseDockLead(material), now: NOW });
  const job = await store.get(`jobs/${ID}`);
  const report = summarizeDocks([job], [{ event: 'docks_presentation_view', eventId: job.lead.eventId }]);
  assert.equal(report[0].submissions, 1); assert.equal(report[0].submissionPerViewRate, 1); assert.doesNotMatch(JSON.stringify(report), /pessoa|example.com/);
  assert.equal((await processDock(store, `jobs/${ID}`, { now: NOW + 30 * DAY })).state, 'expired'); assert.equal(await store.get(`jobs/${ID}`), null);
});

test('different submissions from the same recipient serialize CRM matching', async (t) => {
  configure(t); const store = memoryStore(), lead = parseDockLead(material), secondId = '11111111-1111-4111-8111-111111111111';
  await enqueueDock(store, { submissionId: ID, lead, now: NOW }); await enqueueDock(store, { submissionId: secondId, lead, now: NOW });
  let release, entered; const gate = new Promise((resolve) => { release = resolve; }), started = new Promise((resolve) => { entered = resolve; }); let calls = 0;
  const options = { now: NOW, sync: async () => { calls++; entered(); await gate; return sync(); }, send: async () => ({ id: 'email' }) };
  const first = processDock(store, `jobs/${ID}`, options); await started;
  assert.equal((await processDock(store, `jobs/${secondId}`, options)).state, 'busy'); release(); await first;
  await processDock(store, `jobs/${secondId}`, options); assert.equal(calls, 2);
});
test('API completes the actual queue flow using synthetic providers and durable receipts', async (t) => {
  configure(t); const store = memoryStore(), sent = [];
  const handler = createDocksHandler({ storeFor: () => store, configured: () => {}, process: (current, key) => processDock(current, key, { sync, send: async (input) => { sent.push(input); return { id: 'synthetic-email' }; } }) });
  const response = await handler(new Request('https://example.com/api/docks', { method: 'POST', body: JSON.stringify({ ...material, submissionId: ID }) }));
  assert.equal(response.status, 200); assert.equal((await response.json()).ok, true); assert.equal(sent.length, 2);
  assert.ok((await store.get(`jobs/${ID}`)).receipts.crm);
});

test('Docks uses its own HMAC key and refuses the legacy key as fallback', async (t) => {
  configure(t);
  process.env.FERNANDO_BASE44_CRM_ENABLED = 'true';
  process.env.FERNANDO_BASE44_CRM_SIGNING_SECRET = 'legacy-short';
  process.env.FERNANDO_BASE44_CRM_TIMEOUT_MS = '4000';
  delete process.env.FERNANDO_DOCKS_CRM_TIMEOUT_MS;
  const previousTimeout = AbortSignal.timeout;
  const budgets = [];
  AbortSignal.timeout = (ms) => { budgets.push(ms); return previousTimeout(ms); };
  t.after(() => { AbortSignal.timeout = previousTimeout; });
  const previousFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = previousFetch; });
  let calls = 0;
  globalThis.fetch = async (_url, init) => {
    calls++;
    const headers = new Headers(init.headers);
    const expected = createHmac('sha256', process.env.FERNANDO_DOCKS_CRM_SIGNING_SECRET)
      .update(`lead-ingest.v1\n${headers.get('X-TechHuman-Timestamp')}\n${ID}\n${init.body}`).digest('hex');
    assert.equal(headers.get('X-TechHuman-Signature'), `v1=${expected}`);
    return Response.json({ ok: true, schema_version: 'lead-ingest-result.v1', submission_id: ID,
      lead_id: 'test-lead', submission_record_id: 'test-submission', outcome: 'created' });
  };
  const input = { ...parseDockLead(material), submissionId: ID, submittedAt: new Date(NOW).toISOString() };
  assert.equal((await syncFernandoLeadToBase44(input)).status, 'sent');
  assert.deepEqual(budgets, [20000]);
  process.env.FERNANDO_DOCKS_CRM_TIMEOUT_MS = '50000';
  assert.equal((await syncFernandoLeadToBase44(input)).status, 'sent');
  assert.deepEqual(budgets, [20000, 20000]);
  delete process.env.FERNANDO_DOCKS_CRM_SIGNING_SECRET;
  process.env.FERNANDO_BASE44_CRM_SIGNING_SECRET = 'legacy-signing-secret-longer-than-32-bytes';
  await assert.rejects(syncFernandoLeadToBase44(input), /invalid_base44_crm_signing_secret/);
  assert.equal(calls, 2);
});

test('delivery diagnostics retain provider status without leaking arbitrary error text', () => {
  assert.equal(safeDockDeliveryFailure(new Error('resend_failed:401')), 'resend_failed:401');
  assert.equal(safeDockDeliveryFailure(new Error('base44_crm_failed:503')), 'base44_crm_failed:503');
  assert.equal(safeDockDeliveryFailure(new DOMException('private diagnostic text', 'TimeoutError')), 'timeout');
  for (const message of ['secret-value', 'resend_failed:401 email=pessoa@example.com', 'Authorization: key']) {
    assert.equal(safeDockDeliveryFailure(new Error(message)), 'unknown_error');
  }
});
