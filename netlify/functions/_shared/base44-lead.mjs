import { createHmac } from 'node:crypto';

const REQUEST_SCHEMA = 'lead-ingest.v1';
const RESPONSE_SCHEMA = 'lead-ingest-result.v1';
const DEFAULT_ENDPOINT = 'https://tech-human-crm.base44.app/functions/ingestLead';
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SAFE_ID = /^[A-Za-z0-9_-]{1,128}$/;

const readEnv = (name) => globalThis.Netlify?.env?.get(name) ?? process.env[name];

const sourceDescriptor = ({ formType, sourcePath, interest }) => {
  if (formType === 'contact' && (sourcePath === '/' || sourcePath === '/contato')) {
    return {
      route: sourcePath,
      routeType: sourcePath === '/' ? 'home' : 'service',
      formType: 'fernando-contact',
      formVariant: 'full',
      formVersion: 'fernando-contact.v1',
      formName: sourcePath === '/' ? 'Contato — Home' : 'Contato — Página dedicada',
      offerKey: 'fernando:contact',
      offerLabel: interest,
      consentScope: 'commercial_contact',
      consentVersion: 'fernando-contact-2026-09-09',
    };
  }

  if (
    formType === 'newsletter' &&
    (sourcePath === '/artigos' || /^\/artigos\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sourcePath))
  ) {
    return {
      route: sourcePath,
      routeType: 'content',
      formType: 'fernando-newsletter',
      formVariant: 'minimal',
      formVersion: 'fernando-newsletter.v1',
      formName: 'Carta do Fernando — Inscrição',
      offerKey: 'fernando:newsletter',
      offerLabel: 'Carta do Fernando',
      consentScope: 'newsletter_subscription',
      consentVersion: 'fernando-newsletter-2026-09-09',
    };
  }

  throw new Error('invalid_base44_crm_form_route');
};

const cleanTouch = (attribution) => {
  if (!attribution || typeof attribution !== 'object' || Array.isArray(attribution)) return undefined;
  const read = (key) => {
    const value = attribution[key];
    return typeof value === 'string' && /^[A-Za-z0-9._+\-]+$/.test(value)
      ? value.slice(0, 120)
      : undefined;
  };
  const touch = {
    source: read('utm_source'),
    medium: read('utm_medium'),
    campaign: read('utm_campaign'),
    term: read('utm_term'),
    content: read('utm_content'),
  };
  return Object.values(touch).some(Boolean) ? touch : undefined;
};

export const buildFernandoCrmPayload = (input) => {
  if (!UUID_V4.test(input.submissionId) || new Date(input.submittedAt).toISOString() !== input.submittedAt) {
    throw new Error('invalid_base44_crm_lead');
  }

  const source = sourceDescriptor(input);
  const fullName = input.name.trim() || 'Assinante da Carta do Fernando';
  const email = input.email.trim().toLowerCase();
  const company = input.company?.trim();
  const phone = input.phone?.trim();
  const message = input.message?.trim();
  const attribution = cleanTouch(input.attribution);

  if (!email || !source.offerLabel) throw new Error('invalid_base44_crm_lead');

  return {
    schema_version: REQUEST_SCHEMA,
    submission_id: input.submissionId,
    public_reference: `FP-${input.submissionId.replaceAll('-', '').slice(0, 8).toUpperCase()}`,
    submitted_at: input.submittedAt,
    source: {
      site: 'fernandoparreiras.com.br',
      route: source.route,
      route_type: source.routeType,
      form_type: source.formType,
      form_variant: source.formVariant,
      form_version: source.formVersion,
      form_name: source.formName,
      locale: 'pt-BR',
      offer_key: source.offerKey,
      offer_label: source.offerLabel,
    },
    contact: {
      full_name: fullName,
      email,
      ...(phone ? { phone } : {}),
      ...(company ? { company_name: company } : {}),
    },
    inquiry: {
      subject: source.offerLabel,
      interest: source.offerLabel,
      ...(message ? { message } : {}),
    },
    consent: {
      accepted: true,
      scope: source.consentScope,
      version: source.consentVersion,
      accepted_at: input.submittedAt,
    },
    ...(attribution ? { attribution: { last_touch: attribution } } : {}),
  };
};

const endpoint = () => {
  const url = new URL(readEnv('FERNANDO_BASE44_CRM_INGEST_URL')?.trim() || DEFAULT_ENDPOINT);
  if (
    url.protocol !== 'https:' ||
    url.hostname !== 'tech-human-crm.base44.app' ||
    url.pathname !== '/functions/ingestLead' ||
    url.username ||
    url.password ||
    url.port ||
    url.search ||
    url.hash
  ) throw new Error('invalid_base44_crm_ingest_url');
  return url.toString();
};

const signingSecret = () => {
  const secret = readEnv('FERNANDO_BASE44_CRM_SIGNING_SECRET');
  if (!secret || secret.trim() !== secret || Buffer.byteLength(secret, 'utf8') < 32) {
    throw new Error('invalid_base44_crm_signing_secret');
  }
  return secret;
};

export const syncFernandoLeadToBase44 = async (input) => {
  if (readEnv('FERNANDO_BASE44_CRM_ENABLED') !== 'true') return { status: 'skipped' };

  const body = JSON.stringify(buildFernandoCrmPayload(input));
  const timestamp = Math.floor(Date.now() / 1_000).toString();
  const signature = createHmac('sha256', signingSecret())
    .update(`${REQUEST_SCHEMA}\n${timestamp}\n${input.submissionId}\n${body}`, 'utf8')
    .digest('hex');
  const configuredTimeout = Number.parseInt(readEnv('FERNANDO_BASE44_CRM_TIMEOUT_MS') ?? '', 10);
  const timeout = Number.isFinite(configuredTimeout) && configuredTimeout > 0
    ? Math.min(configuredTimeout, 8_000)
    : 4_000;
  const response = await fetch(endpoint(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Idempotency-Key': input.submissionId,
      'X-TechHuman-Timestamp': timestamp,
      'X-TechHuman-Signature': `v1=${signature}`,
    },
    body,
    redirect: 'error',
    signal: AbortSignal.timeout(timeout),
  });

  if (!response.ok) throw new Error(`base44_crm_failed:${response.status}`);
  const result = await response.json();
  const outcome = result && typeof result === 'object' ? result.outcome : undefined;
  if (
    !result ||
    typeof result !== 'object' ||
    result.ok !== true ||
    result.schema_version !== RESPONSE_SCHEMA ||
    result.submission_id !== input.submissionId ||
    typeof result.lead_id !== 'string' ||
    !SAFE_ID.test(result.lead_id) ||
    typeof result.submission_record_id !== 'string' ||
    !SAFE_ID.test(result.submission_record_id) ||
    !['created', 'matched', 'duplicate'].includes(outcome)
  ) throw new Error('invalid_base44_crm_response');

  return { status: 'sent', outcome, leadId: result.lead_id };
};

export const safeCrmFailureReason = (error) => {
  if (!(error instanceof Error)) return 'unknown_error';
  if (error.name === 'TimeoutError' || error.name === 'AbortError') return 'timeout';
  if (error instanceof TypeError) return 'network_error';
  if (error.message.startsWith('base44_crm_failed:')) return 'provider_error';
  return new Set([
    'invalid_base44_crm_form_route',
    'invalid_base44_crm_ingest_url',
    'invalid_base44_crm_signing_secret',
    'invalid_base44_crm_lead',
    'invalid_base44_crm_response',
  ]).has(error.message) ? error.message : 'unknown_error';
};
