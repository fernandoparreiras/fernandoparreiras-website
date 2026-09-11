import { randomUUID } from 'node:crypto';

import { safeCrmFailureReason, syncFernandoLeadToBase44 } from './_shared/base44-lead.mjs';
import { buildInternalEmail, buildRespondentEmail } from './_shared/lead-emails.mjs';

const MAX_BODY_BYTES = 64 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_ROUTES = new Set(['/', '/contato']);
const INTENTS = new Set(['tech-human', 'advisory', 'conselho', 'palestra', 'venture', 'formacao', 'mentoria', 'parceria']);
const URGENCIES = new Set(['agora', '30-60', 'trimestre', 'exploracao']);
const NEWSLETTER_INTERESTS = new Set(['lideranca-negocios', 'carreira-ia', 'jovens-futuro', 'mudanca-carreira']);

const readEnv = (name) => globalThis.Netlify?.env?.get(name) ?? process.env[name];
const clean = (value, maxLength) => typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});
const parseRecipients = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);

const normalizePath = (value) => {
  const path = clean(value, 240);
  if (!path || !path.startsWith('/') || path.includes('?') || path.includes('#') || path.includes('..')) return '';
  return path === '/' ? path : path.replace(/\/+$/, '');
};

const normalizeAttribution = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const attribution = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const item = clean(value[key], 120);
    if (item) attribution[key] = item;
  }
  return Object.keys(attribution).length ? attribution : undefined;
};

export const parseLeadRequest = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value) || value.consent !== true) {
    throw new Error('invalid_payload');
  }

  const formType = clean(value.formType, 40);
  const email = clean(value.email, 180).toLowerCase();
  const sourcePath = normalizePath(value.sourcePath);
  if (!EMAIL_PATTERN.test(email) || !sourcePath) throw new Error('invalid_payload');

  if (formType === 'contact') {
    const name = clean(value.name, 120);
    const interest = clean(value.interest, 80);
    const urgency = clean(value.urgency, 40);
    const role = clean(value.role, 120);
    const message = clean(value.message, 1_600);
    if (!name || !INTENTS.has(interest) || !URGENCIES.has(urgency) || message.length < 20 || !CONTACT_ROUTES.has(sourcePath)) {
      throw new Error('invalid_payload');
    }
    return {
      formType,
      name,
      email,
      phone: clean(value.phone, 40),
      company: clean(value.company, 160),
      role,
      interest,
      urgency,
      message: [`Momento: ${urgency}`, role ? `Cargo ou atuação: ${role}` : '', message].filter(Boolean).join('\n'),
      sourcePath,
      attribution: normalizeAttribution(value.attribution),
    };
  }

  if (formType === 'newsletter') {
    const interest = clean(value.interest, 80);
    if (
      !NEWSLETTER_INTERESTS.has(interest) ||
      (sourcePath !== '/artigos' && !/^\/artigos\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sourcePath))
    ) throw new Error('invalid_payload');
    return {
      formType,
      name: '',
      email,
      phone: '',
      company: '',
      role: '',
      interest,
      urgency: '',
      message: 'Inscrição na Carta do Fernando',
      sourcePath,
      attribution: normalizeAttribution(value.attribution),
    };
  }

  throw new Error('invalid_payload');
};

const sendViaResend = async ({ apiKey, from, to, replyTo, email, idempotencyKey }) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });
  if (!response.ok) throw new Error(`resend_failed:${response.status}`);
  return response.json();
};

export default async (request) => {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method_not_allowed' });
  const contentLength = Number.parseInt(request.headers.get('content-length') ?? '0', 10);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json(413, { ok: false, error: 'invalid_payload' });
  }

  let rawBody;
  try {
    rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) throw new Error('too_large');
  } catch {
    return json(400, { ok: false, error: 'invalid_payload' });
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json(400, { ok: false, error: 'invalid_payload' });
  }

  if (clean(body?.website, 120)) return json(200, { ok: true });

  let lead;
  try {
    lead = parseLeadRequest(body);
  } catch {
    return json(400, { ok: false, error: 'invalid_payload' });
  }

  const apiKey = readEnv('RESEND_API_KEY')?.trim();
  const from = readEnv('FERNANDO_CONTACT_EMAIL_FROM')?.trim();
  const replyAddress = readEnv('FERNANDO_CONTACT_REPLY_TO')?.trim() || 'fernando@fernandoparreiras.com.br';
  const internalRecipients = parseRecipients(readEnv('FERNANDO_CONTACT_EMAIL_TO')?.trim() || '');
  if (!apiKey || !from || !replyAddress || internalRecipients.length === 0) {
    console.error('fernando_lead_delivery_failed', { reason: 'invalid_email_configuration' });
    return json(503, { ok: false, error: 'service_unavailable' });
  }

  const submissionId = randomUUID();
  const submittedAt = new Date().toISOString();
  const reference = `FP-${submissionId.replaceAll('-', '').slice(0, 8).toUpperCase()}`;
  const internalEmail = buildInternalEmail({ reference, ...lead });
  const respondentEmail = buildRespondentEmail(lead);
  const internalSend = sendViaResend({
    apiKey,
    from,
    to: internalRecipients,
    replyTo: lead.email,
    email: internalEmail,
    idempotencyKey: `fernando-${submissionId}-internal`,
  });
  const respondentSend = sendViaResend({
    apiKey,
    from,
    to: [lead.email],
    replyTo: replyAddress,
    email: respondentEmail,
    idempotencyKey: `fernando-${submissionId}-respondent`,
  });
  const crmSend = syncFernandoLeadToBase44({ submissionId, submittedAt, ...lead });
  const [internalResult, respondentResult, crmResult] = await Promise.allSettled([
    internalSend,
    respondentSend,
    crmSend,
  ]);

  if (crmResult.status === 'rejected') {
    console.error('fernando_lead_crm_failed', { submissionId, reason: safeCrmFailureReason(crmResult.reason) });
  }
  if (
    internalResult.status === 'rejected' ||
    respondentResult.status === 'rejected' ||
    crmResult.status === 'rejected'
  ) {
    console.error('fernando_lead_delivery_failed', {
      submissionId,
      internal: internalResult.status,
      respondent: respondentResult.status,
      crm: crmResult.status,
    });
    return json(502, { ok: false, error: 'delivery_failed', reference });
  }

  console.info('fernando_lead_delivered', { submissionId, reference, crm: crmResult.value.status });
  return json(200, { ok: true, reference });
};

export const config = { path: '/api/contact' };
