export const readEnv = (key) => globalThis.Netlify?.env?.get(key) ?? process.env[key];
export function emailConfig() {
  const apiKey = readEnv('RESEND_API_KEY')?.trim();
  const from = readEnv('FERNANDO_CONTACT_EMAIL_FROM')?.trim();
  const replyTo = readEnv('FERNANDO_CONTACT_REPLY_TO')?.trim() || 'fernando@fernandoparreiras.com.br';
  const internal = (readEnv('FERNANDO_CONTACT_EMAIL_TO') || '').split(',').map((item) => item.trim()).filter(Boolean);
  if (!apiKey || !from || !internal.length) throw new Error('invalid_email_configuration');
  return { apiKey, from, replyTo, internal };
}
export async function deliverEmail({ email, to, idempotencyKey, replyTo }) {
  const cfg = emailConfig();
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${cfg.apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify({ from: cfg.from, to, reply_to: replyTo || cfg.replyTo, subject: email.subject, html: email.html, text: email.text }),
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`resend_failed:${response.status}`);
  const result = await response.json();
  if (typeof result.id !== 'string' || !result.id) throw new Error('invalid_email_receipt');
  return { id: result.id };
}
