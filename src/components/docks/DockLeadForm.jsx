import React, { useRef, useState } from 'react';
import { DOCKS_INTERESTS, DOCKS_ROLES, DOCKS_URGENCIES, dockPath } from '@/data/docks';
import { getAttribution } from '@/lib/analytics';
import { trackDockEvent } from '@/lib/docks-analytics';

const fieldClass = 'mt-2 min-h-12 w-full rounded-lg border border-white/25 bg-[#11130f] px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]';
export default function DockLeadForm({ presentation }) {
  const [commercial, setCommercial] = useState(() => new URLSearchParams(window.location.search).get('conversa') === '1');
  const [status, setStatus] = useState('idle');
  const [reference, setReference] = useState('');
  const submission = useRef(null);
  const previousBody = useRef('');
  const started = useRef(false);
  const eventProps = { presentation_slug: presentation.slug, event_id: presentation.eventId };
  const start = () => {
    if (!started.current) { started.current = true; trackDockEvent('docks_lead_start', presentation); }
  };
  const submit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const body = { formType: 'docks', name: data.name, email: data.email, interest: data.interest,
      consent: data.consent === 'on', followupConsent: data.followupConsent === 'on', newsletterConsent: data.newsletterConsent === 'on',
      commercialConsent: commercial, role: data.role, company: data.company, phone: data.phone, urgency: data.urgency, message: data.message,
      presentationSlug: presentation.slug, sourcePath: dockPath(presentation), attribution: getAttribution(), website: data.website };
    const serialized = JSON.stringify(body);
    if (serialized !== previousBody.current) { submission.current = crypto.randomUUID(); previousBody.current = serialized; }
    setStatus('submitting');
    try {
      const response = await fetch('/api/docks', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...body, submissionId: submission.current }) });
      const payload = await response.json();
      setReference(payload.reference || '');
      if (!response.ok || payload.ok !== true) throw new Error('delivery_failed');
      setStatus('success');
      trackDockEvent('docks_lead_complete', presentation, { interest: data.interest, commercial_requested: commercial });
    } catch { setStatus('error'); trackDockEvent('docks_lead_error', presentation); }
  };
  if (status === 'success') return <div role="status" className="rounded-xl border border-[#d8ff57]/40 bg-[#d8ff57]/5 p-7"><h2 className="text-2xl font-bold">Seu pedido foi registrado.</h2><p className="mt-3 text-white/80">Enviamos a apresentação e o roteiro para seu e-mail. {commercial ? 'Seu pedido de conversa também chegou com o contexto informado.' : 'Você já pode usar o roteiro disponível nesta página.'}</p><p className="mt-4 text-sm text-white/60">Referência: {reference}</p></div>;
  return <form onSubmit={submit} onFocus={start} className="space-y-5" aria-label="Receber material da apresentação">
    <input type="text" name="website" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
    <fieldset disabled={status === 'submitting'} className="space-y-5">
      <legend className="text-2xl font-bold">Leve esta conversa para a prática.</legend>
      <p className="mt-3 text-white/75">Receba a apresentação e um roteiro para aplicar as ideias na sua equipe ou no seu próximo projeto.</p>
      <label className="block text-sm font-semibold">Nome<input name="name" autoComplete="name" required maxLength={120} className={fieldClass} /></label>
      <label className="block text-sm font-semibold">E-mail<input name="email" type="email" autoComplete="email" required maxLength={180} className={fieldClass} /></label>
      <label className="block text-sm font-semibold">Principal interesse<select name="interest" required defaultValue="" className={fieldClass}><option value="" disabled>Escolha seu próximo passo</option>{DOCKS_INTERESTS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
      <label className="flex gap-3 text-sm leading-relaxed"><input type="checkbox" name="consent" required className="mt-1 accent-[#d8ff57]" /><span>Quero receber este material por e-mail e autorizo o uso dos dados para atender meu pedido, conforme a <a href="/privacidade/#docks" className="underline underline-offset-4">Política de Privacidade</a>.</span></label>
      <label className="flex gap-3 text-sm leading-relaxed"><input type="checkbox" name="followupConsent" className="mt-1 accent-[#d8ff57]" /><span>Quero receber também dois complementos desta palestra: uma aplicação prática após dois dias e uma reflexão após sete dias. Posso cancelar pelo link dos e-mails.</span></label>
      <label className="flex gap-3 text-sm leading-relaxed"><input type="checkbox" name="newsletterConsent" className="mt-1 accent-[#d8ff57]" /><span>Quero assinar a Carta do Fernando e receber conteúdos recorrentes. Posso cancelar pelo contato informado na política.</span></label>
      <label className="flex gap-3 text-sm font-semibold leading-relaxed"><input type="checkbox" name="commercialConsent" checked={commercial} onChange={(event) => setCommercial(event.target.checked)} className="mt-1 accent-[#d8ff57]" /><span>Quero conversar sobre meu desafio e autorizo um retorno pelo contato informado.</span></label>
      {commercial && <fieldset className="space-y-4 rounded-xl border border-white/20 p-5"><legend className="px-2 text-sm font-bold">Contexto para a conversa</legend>
        <label className="block text-sm">Empresa ou organização (opcional)<input name="company" autoComplete="organization" maxLength={160} className={fieldClass} /></label>
        <label className="block text-sm">Sua atuação<select name="role" required defaultValue="" className={fieldClass}><option value="" disabled>Selecione</option>{DOCKS_ROLES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label className="block text-sm">Quando pretende avançar?<select name="urgency" required defaultValue="" className={fieldClass}><option value="" disabled>Selecione</option>{DOCKS_URGENCIES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label className="block text-sm">Qual desafio quer resolver?<textarea name="message" required minLength={20} maxLength={1600} rows={4} className={fieldClass} /></label>
        <label className="block text-sm">WhatsApp (opcional)<input name="phone" type="tel" autoComplete="tel" maxLength={40} className={fieldClass} /></label>
      </fieldset>}
      <button type="submit" className="min-h-12 w-full rounded-lg bg-[#d8ff57] px-6 py-3 font-bold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60">{status === 'submitting' ? 'Enviando…' : commercial ? 'Receber material e pedir uma conversa' : 'Receber material e roteiro'}</button>
    </fieldset>
    {status === 'error' && <p role="alert" className="text-sm text-red-300">Não foi possível confirmar a entrega completa. Tente novamente com os mesmos dados. {reference && `Referência: ${reference}.`} Você também pode escrever para fernando@fernandoparreiras.com.br.</p>}
  </form>;
}
