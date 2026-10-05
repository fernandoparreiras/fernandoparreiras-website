import { DOCKS_INTERESTS, DOCKS_ROLES, DOCKS_URGENCIES, getDock, dockPath } from '../../../src/data/docks.js';

const clean = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : '';
export function qualifyDock(lead) {
  const reasons = [];
  const rolePoints = { decisor: 20, lider: 15, especialista: 10, estudante: 5 }[lead.role] || 0;
  const profile = rolePoints + (lead.company ? 10 : 0);
  if (lead.role) reasons.push(`Atuação declarada: ${lead.role} (+${rolePoints})`);
  if (lead.company) reasons.push('Organização informada (+10)');
  const intent = lead.commercialConsent ? 20 + (lead.message ? 15 : 0) + ({ agora: 15, '30-60': 15, trimestre: 10, exploracao: 0 }[lead.urgency] || 0) : 0;
  if (lead.commercialConsent) reasons.push(`Conversa solicitada, desafio e prazo declarados (+${intent})`);
  const engagement = 10; // Uma solicitação explícita de material, sem inferir navegação ou abertura de email.
  reasons.push('Material solicitado (+10)');
  const score = profile + intent + engagement;
  const fit = lead.interest === 'carreira' || Boolean(lead.company && lead.role);
  const ready = lead.commercialConsent && fit && lead.message && ['agora', '30-60'].includes(lead.urgency);
  const stars = ready && score >= 75 ? 5 : score >= 60 ? 4 : score >= 40 ? 3 : score >= 15 ? 2 : 1;
  return { version: 'docks-score.v1', score, stars, profile, intent, engagement, reasons,
    missing: ['company', 'role', 'message', 'urgency'].filter((field) => !lead[field]),
    temperature: stars >= 4 ? 'quente' : stars === 3 ? 'morno' : 'frio',
    priority: stars >= 4 ? 'high' : stars === 3 ? 'medium' : 'low' };
}
export function parseDockLead(value) {
  const presentation = getDock(clean(value.presentationSlug, 100));
  const interest = DOCKS_INTERESTS.find((item) => item.value === value.interest);
  if (!presentation || !interest || value.sourcePath?.replace(/\/+$/, '') !== dockPath(presentation).replace(/\/+$/, '') || value.consent !== true) throw new Error('invalid_payload');
  const name = clean(value.name, 120);
  const email = clean(value.email, 180).toLowerCase();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('invalid_payload');
  for (const field of ['followupConsent', 'newsletterConsent', 'commercialConsent']) {
    if (value[field] !== undefined && typeof value[field] !== 'boolean') throw new Error('invalid_payload');
  }
  const commercialConsent = value.commercialConsent === true;
  const role = commercialConsent ? clean(value.role, 40) : '';
  const urgency = commercialConsent ? clean(value.urgency, 40) : '';
  const message = commercialConsent ? clean(value.message, 1600) : '';
  if (commercialConsent && (!DOCKS_ROLES.some((item) => item.value === role) || !DOCKS_URGENCIES.some((item) => item.value === urgency) || message.length < 20)) throw new Error('invalid_payload');
  const lead = { formType: 'docks', name, email, interest: interest.value,
    company: commercialConsent ? clean(value.company, 160) : '', role,
    phone: commercialConsent ? clean(value.phone, 40) : '', message, urgency,
    sourcePath: dockPath(presentation).replace(/\/+$/, ''), presentationSlug: presentation.slug,
    eventId: presentation.eventId, presentationTitle: presentation.title,
    followupConsent: value.followupConsent === true, newsletterConsent: value.newsletterConsent === true, commercialConsent };
  return { ...lead, qualification: qualifyDock(lead) };
}
