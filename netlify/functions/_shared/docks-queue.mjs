import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { buildDockEmail, buildInternalEmail } from './lead-emails.mjs';
import { syncFernandoLeadToBase44 } from './base44-lead.mjs';
import { deliverEmail, emailConfig, readEnv } from './email-delivery.mjs';

export const DAY = 86400000;
export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const secret = () => {
  const value = readEnv('FERNANDO_BASE44_CRM_SIGNING_SECRET');
  if (!value || Buffer.byteLength(value) < 32) throw new Error('invalid_signing_configuration');
  return value;
};
export const recipientKey = (email) => createHmac('sha256', secret()).update(`docks-recipient.v1:${email}`).digest('hex');
export function cancelToken(id) {
  return `${id}.${createHmac('sha256', secret()).update(`docks-cancel.v1:${id}`).digest('hex')}`;
}
export function verifyCancelToken(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 2) return null;
  const [id, signature] = parts;
  if (!UUID.test(id || '') || !/^[a-f0-9]{64}$/.test(signature || '')) return null;
  const expected = cancelToken(id).split('.')[1];
  return timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex')) ? id : null;
}
export function docksStore(context) {
  const production = context?.deploy?.context === 'production';
  const name = production ? 'docks-delivery-v1' : `docks-preview-${context?.deploy?.id || 'local'}`;
  return getStore({ name, consistency: 'strong' });
}
export function assertDocksConfiguration() {
  emailConfig(); secret();
  if (readEnv('FERNANDO_BASE44_CRM_ENABLED') !== 'true') throw new Error('crm_required');
}
export async function enqueueDock(store, { submissionId, lead, now = Date.now() }) {
  const key = `jobs/${submissionId}`;
  const hash = createHash('sha256').update(JSON.stringify(lead)).digest('hex');
  const data = { submissionId, hash, submittedAt: new Date(now).toISOString(), lead,
    recipientKey: recipientKey(lead.email), state: 'pending', receipts: {}, attempts: {}, busyUntil: 0 };
  const created = await store.setJSON(key, data, { onlyIfNew: true });
  const record = created.modified ? data : await store.get(key, { type: 'json' });
  if (!record || record.hash !== hash) throw new Error('submission_conflict');
  for (const delay of [0, ...(lead.followupConsent ? [2, 7] : []), 30]) {
    const due = Date.parse(record.submittedAt) + delay * DAY;
    await store.setJSON(`due/${String(due).padStart(13, '0')}/${submissionId}`, { jobKey: key, delay }, { onlyIfNew: true });
  }
  return record;
}
export const referenceFor = (id) => `FP-${id.replaceAll('-', '').slice(0, 8).toUpperCase()}`;

// Claim with ETag prevents concurrent delivery. Replays reuse each provider key.
// Ambiguous sends older than the provider's 24h dedupe window require human review.
export async function processDock(store, key, { now = Date.now(), send = deliverEmail, sync = syncFernandoLeadToBase44 } = {}) {
  const snapshot = await store.getWithMetadata(key, { type: 'json' });
  if (!snapshot) return { state: 'missing' };
  let job = snapshot.data;
  if (now - Date.parse(job.submittedAt) >= 30 * DAY) { await store.delete(key); return { state: 'expired' }; }
  if (job.state === 'complete' || job.state === 'review') return job;
  if (job.busyUntil > now) return { ...job, state: 'busy' };
  job = { ...job, busyUntil: now + 60000 };
  const claim = await store.setJSON(key, job, { onlyIfMatch: snapshot.etag });
  if (!claim.modified) return { ...job, state: 'busy' };
  const recipientLockKey = `locks/${job.recipientKey}`;
  const recipientSnapshot = await store.getWithMetadata(recipientLockKey, { type: 'json' });
  if (recipientSnapshot?.data.busyUntil > now) {
    job.busyUntil = 0; await store.setJSON(key, job); return { ...job, state: 'busy' };
  }
  const recipientClaim = await store.setJSON(recipientLockKey, { busyUntil: now + 60000, submissionId: job.submissionId }, recipientSnapshot ? { onlyIfMatch: recipientSnapshot.etag } : { onlyIfNew: true });
  if (!recipientClaim.modified) {
    job.busyUntil = 0; await store.setJSON(key, job); return { ...job, state: 'busy' };
  }
  const save = async () => store.setJSON(key, job);
  const delivery = async (step, action) => {
    if (job.receipts[step]) return;
    if (job.attempts[step] && now - Date.parse(job.attempts[step]) > 20 * 3600000) {
      job.state = 'review'; await save(); throw new Error('ambiguous_delivery_review');
    }
    job.attempts[step] ||= new Date(now).toISOString();
    await save();
    job.receipts[step] = await action();
    await save();
  };
  try {
    const lead = job.lead;
    const reference = referenceFor(job.submissionId);
    const cfg = emailConfig();
    const cancelUrl = `https://fernandoparreiras.com.br/api/docks-cancel?token=${cancelToken(job.submissionId)}`;
    await delivery('crm', async () => {
      const result = await sync({ ...lead, submissionId: job.submissionId, submittedAt: job.submittedAt });
      if (result.status !== 'sent') throw new Error('crm_not_recorded');
      return result;
    });
    await delivery('internal', () => send({ to: cfg.internal, replyTo: lead.email, email: buildInternalEmail({ reference, ...lead }), idempotencyKey: `docks-${job.submissionId}-internal` }));
    await delivery('material', () => send({ to: [lead.email], email: buildDockEmail(lead, 'material', lead.followupConsent ? cancelUrl : ''), idempotencyKey: `docks-${job.submissionId}-material` }));
    if (lead.followupConsent) {
      const suppression = await store.get(`cancelled/${job.recipientKey}`, { type: 'json' });
      if (suppression && Date.parse(suppression.cancelledAt) >= Date.parse(job.submittedAt)) {
        job.receipts.practice = { status: 'cancelled' }; job.receipts.reflection = { status: 'cancelled' };
      } else {
        for (const [step, delay] of [['practice', 2], ['reflection', 7]]) {
          if (now - Date.parse(job.submittedAt) >= delay * DAY) {
            // Check immediately before every optional message, including after retries.
            const cancelled = await store.get(`cancelled/${job.recipientKey}`, { type: 'json' });
            if (cancelled && Date.parse(cancelled.cancelledAt) >= Date.parse(job.submittedAt)) { job.receipts[step] = { status: 'cancelled' }; continue; }
            await delivery(step, () => send({ to: [lead.email], email: buildDockEmail(lead, step, cancelUrl), idempotencyKey: `docks-${job.submissionId}-${step}` }));
          }
        }
      }
    }
    job.state = !lead.followupConsent || (job.receipts.practice && job.receipts.reflection) ? 'complete' : 'waiting';
  } catch (error) {
    if (job.state !== 'review') job.state = 'pending';
    // Provider error codes only; no payload, PII or secret in logs.
    console.error('docks_delivery_pending', { submissionId: job.submissionId, state: job.state });
  } finally {
    job.busyUntil = 0;
    await save();
    await store.setJSON(recipientLockKey, { busyUntil: 0, submissionId: job.submissionId }, { onlyIfMatch: recipientClaim.etag });
  }
  return job;
}
