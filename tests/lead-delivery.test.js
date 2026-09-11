import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';

import contactHandler, { parseLeadRequest } from '../netlify/functions/contact.mjs';
import { buildFernandoCrmPayload } from '../netlify/functions/_shared/base44-lead.mjs';
import { buildInternalEmail, buildRespondentEmail } from '../netlify/functions/_shared/lead-emails.mjs';

const submissionId = '123e4567-e89b-42d3-a456-426614174000';
const submittedAt = '2026-09-09T12:00:00.000Z';

test('maps commercial and newsletter origins to the Base44 contract', () => {
  const contact = buildFernandoCrmPayload({
    submissionId,
    submittedAt,
    formType: 'contact',
    name: 'Ana Example',
    email: 'ANA@example.com',
    company: 'Example Inc.',
    role: 'Chief Technology Officer',
    phone: '+55 31 99999-9999',
    interest: 'advisory',
    message: 'A commercial request.',
    sourcePath: '/contato',
  });
  const newsletter = buildFernandoCrmPayload({
    submissionId,
    submittedAt,
    formType: 'newsletter',
    name: '',
    email: 'reader@example.com',
    interest: 'carreira-ia',
    message: 'Inscrição na Carta do Fernando',
    sourcePath: '/artigos/uma-leitura-exemplo',
  });

  assert.equal(contact.public_reference, 'FP-123E4567');
  assert.equal(contact.source.site, 'fernandoparreiras.com.br');
  assert.equal(contact.source.form_type, 'fernando-contact');
  assert.equal(contact.source.route, '/contato');
  assert.equal(contact.contact.email, 'ana@example.com');
  assert.equal(contact.contact.company_name, 'Example Inc.');
  assert.equal(contact.contact.role_title, 'Chief Technology Officer');
  assert.equal(newsletter.source.form_type, 'fernando-newsletter');
  assert.equal(newsletter.source.route_type, 'content');
  assert.equal(newsletter.consent.scope, 'newsletter_subscription');
});

test('validates explicit consent and the route/form matrix', () => {
  assert.throws(() => parseLeadRequest({ formType: 'contact' }), /invalid_payload/);
  assert.throws(() => parseLeadRequest({
    formType: 'newsletter',
    email: 'reader@example.com',
    interest: 'carreira-ia',
    sourcePath: '/contato',
    consent: true,
  }), /invalid_payload/);

  const contact = parseLeadRequest({
    formType: 'contact',
    name: 'Ana Example',
    email: 'ana@example.com',
    phone: '+55 31 99999-9999',
    company: 'Example Inc.',
    role: 'Chief Technology Officer',
    interest: 'mentoria',
    urgency: '30-60',
    message: 'Quero estruturar os próximos passos da minha transição profissional.',
    sourcePath: '/contato',
    consent: true,
  });
  assert.equal(contact.role, 'Chief Technology Officer');
  assert.equal(
    contact.message,
    'Momento: 30-60\nQuero estruturar os próximos passos da minha transição profissional.',
  );
});

test('sends internal email, respondent confirmation and signed Base44 lead', async (t) => {
  const signingSecret = 'fernando-test-secret-with-at-least-32-bytes';
  const previousFetch = globalThis.fetch;
  const previousEnv = { ...process.env };
  const calls = [];
  process.env.RESEND_API_KEY = 'resend-test-key';
  process.env.FERNANDO_CONTACT_EMAIL_FROM = 'Fernando <contato@fernandoparreiras.com.br>';
  process.env.FERNANDO_CONTACT_EMAIL_TO = 'fernando@fernandoparreiras.com.br';
  process.env.FERNANDO_CONTACT_REPLY_TO = 'fernando@fernandoparreiras.com.br';
  process.env.FERNANDO_BASE44_CRM_ENABLED = 'true';
  process.env.FERNANDO_BASE44_CRM_SIGNING_SECRET = signingSecret;

  t.after(() => {
    globalThis.fetch = previousFetch;
    process.env = previousEnv;
  });

  globalThis.fetch = async (url, init) => {
    calls.push([String(url), init]);
    if (String(url).includes('/functions/ingestLead')) {
      const body = String(init.body);
      const payload = JSON.parse(body);
      assert.equal(payload.contact.company_name, 'Example Inc.');
      assert.equal(payload.contact.role_title, 'Chief Technology Officer');
      const headers = new Headers(init.headers);
      const timestamp = headers.get('X-TechHuman-Timestamp');
      const expected = createHmac('sha256', signingSecret)
        .update(`lead-ingest.v1\n${timestamp}\n${payload.submission_id}\n${body}`, 'utf8')
        .digest('hex');
      assert.equal(headers.get('X-TechHuman-Signature'), `v1=${expected}`);
      return Response.json({
        ok: true,
        schema_version: 'lead-ingest-result.v1',
        submission_id: payload.submission_id,
        lead_id: 'lead_123',
        submission_record_id: 'submission_123',
        outcome: 'created',
      }, { status: 201 });
    }
    return Response.json({ id: 'email_123' });
  };

  const response = await contactHandler(new Request('https://fernandoparreiras.com.br/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formType: 'contact',
      name: 'Ana Example',
      email: 'ana@example.com',
      phone: '+55 31 99999-9999',
      company: 'Example Inc.',
      role: 'Chief Technology Officer',
      interest: 'advisory',
      urgency: '30-60',
      message: 'Precisamos organizar a estratégia de tecnologia e inteligência artificial.',
      sourcePath: '/contato',
      consent: true,
    }),
  }));
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.ok, true);
  assert.match(payload.reference, /^FP-[A-F0-9]{8}$/);
  assert.equal(calls.filter(([url]) => url.includes('api.resend.com')).length, 2);
  assert.equal(calls.filter(([url]) => url.includes('/functions/ingestLead')).length, 1);
  const internalEmailBody = JSON.parse(calls.find(([url]) => url.includes('api.resend.com'))[1].body);
  assert.match(internalEmailBody.text, /Cargo ou atuação: Chief Technology Officer/);
});

test('provides branded, distinct respondent copies with useful links', () => {
  const contact = buildRespondentEmail({ formType: 'contact', name: '<Ana>', interest: 'palestra' });
  const newsletter = buildRespondentEmail({ formType: 'newsletter', name: '' });

  assert.equal(contact.subject, 'Ana, uma conversa capaz de mover pessoas');
  assert.match(contact.html, /Fernando <span style="color:#D8FF57">Parreiras<\/span>/);
  assert.match(contact.html, /&lt;Ana&gt;/);
  assert.match(contact.html, /Uma boa conversa pode mover uma sala inteira/);
  assert.match(contact.html, /fernandoparreiras\.com\.br\/palestras/);
  assert.doesNotMatch(contact.html, /Se fizer sentido envolver Tech Human/);
  assert.doesNotMatch(contact.html, /página de contato/);
  assert.match(contact.html, /background:#F3F3EF/);
  assert.match(contact.html, /background:#111211/);
  for (const url of [
    'https://fernandoparreiras.com.br/',
    'https://www.linkedin.com/in/fernandoparreiras/',
    'https://www.instagram.com/parreiras.fernando',
    'https://techhuman.com.br/',
    'https://trustyu.ai/',
    'https://needyu.ai/',
    'https://jornadacast.com.br/',
    'https://por.life/',
  ]) assert.match(contact.html, new RegExp(url.replace(/[./]/g, '\\$&')));
  assert.match(newsletter.subject, /Carta do Fernando/);
  assert.match(newsletter.html, /fernandoparreiras\.com\.br\/artigos/);
});

test('tailors contact subject, promise and call to action to every form intent', () => {
  const cases = [
    ['tech-human', 'seu desafio merece uma rota clara', '/solucoes/transformacao-tecnologia-ia'],
    ['advisory', 'clareza para a próxima decisão', '/solucoes/advisory-executivo'],
    ['conselho', 'perspectiva para decisões que permanecem', '/solucoes/conselho'],
    ['palestra', 'uma conversa capaz de mover pessoas', '/palestras'],
    ['venture', 'uma boa ideia merece direção para ganhar forma', '/negocios'],
    ['formacao', 'conhecimento que vira capacidade real', '/conteudos'],
    ['mentoria', 'vamos dar forma ao seu próximo movimento', '/sobre'],
    ['parceria', 'toda boa parceria começa por uma conversa bem feita', '/negocios'],
  ];

  for (const [interest, subject, path] of cases) {
    const email = buildRespondentEmail({ formType: 'contact', name: 'Sabrina Oliveira', interest });
    assert.equal(email.subject, `Sabrina, ${subject}`);
    assert.match(email.html, new RegExp(path));
    assert.match(email.text, /Eu mesmo vou ler o que você enviou/);
  }
});

test('makes the internal notification easier to triage without changing CRM codes', () => {
  const email = buildInternalEmail({
    reference: 'FP-123E4567',
    formType: 'contact',
    email: 'sabrina@example.com',
    name: 'Sabrina Oliveira',
    interest: 'formacao',
    company: 'Example',
    role: 'CTO',
    phone: '+55 31 99999-9999',
    message: 'Momento: agora\nPrecisamos desenvolver a liderança do time.',
    sourcePath: '/contato',
  });

  assert.equal(email.subject, '[FP-123E4567] Formação ou programa para times — Sabrina Oliveira');
  assert.match(email.html, /Responder ao contato/);
  assert.match(email.html, /Interesse<\/td><td[^>]*>Formação ou programa para times/);
  assert.match(email.html, /background:#F3F3EF/);
});
