import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { getAttribution, trackEvent } from '@/lib/analytics';

const intentOptions = [
  { value: 'tech-human', label: 'Transformação em tecnologia e IA' },
  { value: 'advisory', label: 'Advisory executivo' },
  { value: 'conselho', label: 'Conselho consultivo' },
  { value: 'palestra', label: 'Palestra ou workshop' },
  { value: 'venture', label: 'Produto ou venture de IA' },
  { value: 'formacao', label: 'Formação ou programa para times' },
  { value: 'parceria', label: 'Parceria ou outra conversa' }
];

const urgencyOptions = [
  { value: 'agora', label: 'Agora — existe uma decisão ou projeto em andamento' },
  { value: '30-60', label: 'Próximos 30–60 dias' },
  { value: 'trimestre', label: 'Neste trimestre' },
  { value: 'exploracao', label: 'Ainda estou explorando possibilidades' }
];

const fieldClassName = 'min-h-12 w-full border border-white/15 bg-black/30 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/55 focus:border-[#d8ff57] focus:ring-1 focus:ring-[#d8ff57]';

const LeadForm = ({ defaultIntent = '', compact = false }) => {
  const [submitted, setSubmitted] = useState(false);
  const startedRef = useRef(false);
  const attribution = useMemo(() => getAttribution(), []);

  const handleStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('lead_start', { source: compact ? 'home' : 'contact_page' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());
    const intentLabel = intentOptions.find((option) => option.value === values.intent)?.label || values.intent;
    const urgencyLabel = urgencyOptions.find((option) => option.value === values.urgency)?.label || values.urgency;
    const attributionText = Object.entries(attribution).length
      ? `\nOrigem: ${Object.entries(attribution).map(([key, value]) => `${key.replace('utm_', '')}=${value}`).join(' | ')}`
      : '';
    const message = [
      'Olá, Fernando. Vim pelo fernandoparreiras.com.br e gostaria de conversar.',
      '',
      `Interesse: ${intentLabel}`,
      `Nome: ${values.name}`,
      values.company ? `Empresa / cargo: ${values.company}` : null,
      `Urgência: ${urgencyLabel}`,
      `Contato para retorno: ${values.contact}`,
      '',
      'Contexto:',
      values.challenge,
      attributionText
    ].filter(Boolean).join('\n');

    trackEvent('lead_submit', {
      intent: values.intent,
      urgency: values.urgency,
      has_company: Boolean(values.company),
      source: compact ? 'home' : 'contact_page',
      utm_source: attribution.utm_source || 'direct'
    });
    setSubmitted(true);
    window.open(`https://wa.me/5531992789574?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="border border-white/10 bg-[#111211] p-6 md:p-8 lg:p-10">
      {submitted && (
        <div role="status" className="mb-7 flex gap-3 border border-[#d8ff57]/35 bg-[#d8ff57]/5 p-4 text-sm leading-relaxed text-white/75">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d8ff57]" aria-hidden="true" />
          <p>Preparamos sua mensagem e abrimos o WhatsApp. Se a nova aba foi bloqueada, envie por email usando o atalho abaixo.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} onFocus={handleStart} className="space-y-5">
        <div>
          <label htmlFor={`intent-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">Como posso ajudar?</label>
          <select id={`intent-${compact ? 'compact' : 'full'}`} name="intent" defaultValue={defaultIntent} required className={fieldClassName}>
            <option value="" disabled>Selecione uma intenção</option>
            {intentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor={`name-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">Nome</label>
            <input id={`name-${compact ? 'compact' : 'full'}`} name="name" autoComplete="name" required maxLength="100" placeholder="Como devo chamar você?" className={fieldClassName} />
          </div>
          <div>
            <label htmlFor={`contact-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">Email ou WhatsApp</label>
            <input id={`contact-${compact ? 'compact' : 'full'}`} name="contact" autoComplete="email" required maxLength="140" placeholder="Seu melhor contato" className={fieldClassName} />
          </div>
        </div>

        <div>
          <label htmlFor={`company-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">Empresa e cargo <span className="font-normal text-white/60">(quando aplicável)</span></label>
          <input id={`company-${compact ? 'compact' : 'full'}`} name="company" autoComplete="organization" maxLength="160" placeholder="Empresa, estágio ou responsabilidade" className={fieldClassName} />
        </div>

        <div>
          <label htmlFor={`urgency-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">Quando isso precisa avançar?</label>
          <select id={`urgency-${compact ? 'compact' : 'full'}`} name="urgency" defaultValue="" required className={fieldClassName}>
            <option value="" disabled>Selecione o momento</option>
            {urgencyOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor={`challenge-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">Qual desafio ou objetivo devemos compreender?</label>
          <textarea id={`challenge-${compact ? 'compact' : 'full'}`} name="challenge" required minLength="20" maxLength="1200" rows={compact ? 4 : 6} placeholder="Contexto, decisão, resultado esperado e o que já foi tentado." className={fieldClassName} />
        </div>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-white/55">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]" />
          <span>Autorizo o uso dessas informações exclusivamente para responder a esta solicitação, conforme a <a href="/privacidade" className="underline decoration-white/30 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">política de privacidade</a>.</span>
        </label>

        <button type="submit" className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[#d8ff57] px-7 font-black text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57] sm:w-auto">
          Preparar conversa no WhatsApp
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>Nenhum dado é armazenado silenciosamente por este formulário.</p>
        <a href="mailto:fernando@fernandoparreiras.com.br" className="inline-flex min-h-11 items-center gap-2 font-bold text-white hover:text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">
          <Mail className="h-4 w-4" aria-hidden="true" /> Enviar email
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default LeadForm;
