import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { AR, BR, CA, DE, ES, FR, GB, JP, MX, PT, US } from 'country-flag-icons/react/3x2';
import { getAttribution, trackEvent } from '@/lib/analytics';

const intentOptions = [
  { value: 'tech-human', label: 'Transformação em tecnologia e IA' },
  { value: 'advisory', label: 'Advisory executivo' },
  { value: 'conselho', label: 'Conselho consultivo' },
  { value: 'palestra', label: 'Palestra ou workshop' },
  { value: 'venture', label: 'Produto ou venture de IA' },
  { value: 'formacao', label: 'Formação ou programa para times' },
  { value: 'mentoria', label: 'Mentoria' },
  { value: 'parceria', label: 'Parceria ou outra conversa' }
];

const urgencyOptions = [
  { value: 'agora', label: 'Agora — existe uma decisão ou projeto em andamento' },
  { value: '30-60', label: 'Próximos 30–60 dias' },
  { value: 'trimestre', label: 'Neste trimestre' },
  { value: 'exploracao', label: 'Ainda estou explorando possibilidades' }
];

const fieldClassName = 'min-h-12 w-full border border-white/15 bg-black/30 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/55 focus:border-[#d8ff57] focus:ring-1 focus:ring-[#d8ff57]';

const phoneCountries = [
  { code: 'BR', label: 'Brasil', dialCode: '+55', placeholder: '(31) 99999-9999', Flag: BR },
  { code: 'US', label: 'Estados Unidos', dialCode: '+1', placeholder: '(212) 555-0123', Flag: US },
  { code: 'PT', label: 'Portugal', dialCode: '+351', placeholder: '912 345 678', Flag: PT },
  { code: 'ES', label: 'Espanha', dialCode: '+34', placeholder: '612 345 678', Flag: ES },
  { code: 'AR', label: 'Argentina', dialCode: '+54', placeholder: '9 11 1234-5678', Flag: AR },
  { code: 'MX', label: 'México', dialCode: '+52', placeholder: '55 1234 5678', Flag: MX },
  { code: 'CA', label: 'Canadá', dialCode: '+1', placeholder: '(416) 555-0123', Flag: CA },
  { code: 'GB', label: 'Reino Unido', dialCode: '+44', placeholder: '7911 123456', Flag: GB },
  { code: 'DE', label: 'Alemanha', dialCode: '+49', placeholder: '1512 3456789', Flag: DE },
  { code: 'FR', label: 'França', dialCode: '+33', placeholder: '6 12 34 56 78', Flag: FR },
  { code: 'JP', label: 'Japão', dialCode: '+81', placeholder: '90-1234-5678', Flag: JP },
];

const LeadForm = ({ defaultIntent = '', compact = false }) => {
  const [status, setStatus] = useState('idle');
  const [reference, setReference] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('BR');
  const startedRef = useRef(false);
  const attribution = useMemo(() => getAttribution(), []);
  const selectedCountry = phoneCountries.find((country) => country.code === phoneCountry) || phoneCountries[0];

  const handleStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('lead_start', { source: compact ? 'home' : 'contact_page' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    const intentLabel = intentOptions.find((option) => option.value === values.intent)?.label || values.intent;
    const urgencyLabel = urgencyOptions.find((option) => option.value === values.urgency)?.label || values.urgency;
    const formattedPhone = values.phone ? `${selectedCountry.dialCode} ${values.phone.trim()}` : '';
    const attributionText = Object.entries(attribution).length
      ? `\nOrigem: ${Object.entries(attribution).map(([key, value]) => `${key.replace('utm_', '')}=${value}`).join(' | ')}`
      : '';
    const message = [
      'Olá, Fernando. Vim pelo fernandoparreiras.com.br e gostaria de conversar.',
      '',
      `Interesse: ${intentLabel}`,
      `Nome: ${values.name}`,
      values.company ? `Empresa: ${values.company}` : null,
      values.role ? `Cargo ou atuação: ${values.role}` : null,
      `Urgência: ${urgencyLabel}`,
      `E-mail para retorno: ${values.email}`,
      formattedPhone ? `WhatsApp: ${formattedPhone}` : null,
      '',
      'Contexto:',
      values.challenge,
      attributionText
    ].filter(Boolean).join('\n');

    setWhatsappUrl(`https://wa.me/5531992789574?text=${encodeURIComponent(message)}`);
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          name: values.name,
          email: values.email,
          phone: formattedPhone,
          company: values.company,
          role: values.role,
          interest: values.intent,
          urgency: values.urgency,
          message: values.challenge,
          sourcePath: window.location.pathname || '/',
          consent: values.consent === 'on',
          website: values.website,
          attribution,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.ok !== true) throw new Error('lead_delivery_failed');

      trackEvent('lead_submit', {
        intent: values.intent,
        urgency: values.urgency,
        has_company: Boolean(values.company),
        has_role: Boolean(values.role),
        source: compact ? 'home' : 'contact_page',
        utm_source: attribution.utm_source || 'direct'
      });
      setReference(payload.reference || '');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      trackEvent('lead_submit_error', { source: compact ? 'home' : 'contact_page' });
    }
  };

  return (
    <div className="border border-white/10 bg-[#111211] p-6 md:p-8 lg:p-10">
      {status === 'success' && (
        <div role="status" className="mb-7 flex gap-3 border border-[#d8ff57]/35 bg-[#d8ff57]/5 p-4 text-sm leading-relaxed text-white/75">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d8ff57]" aria-hidden="true" />
          <p>
            Mensagem recebida com sucesso. Enviei uma confirmação para o seu e-mail e vou ler o contexto antes de responder.
            {reference && <span className="mt-1 block text-xs text-white/50">Referência: {reference}</span>}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="mb-7 border border-red-400/30 bg-red-400/5 p-4 text-sm leading-relaxed text-red-100">
          Não consegui confirmar o envio agora. Tente novamente ou conclua a conversa pelo WhatsApp/e-mail abaixo.
        </div>
      )}

      <form onSubmit={handleSubmit} onFocus={handleStart} className="space-y-5">
        <input type="text" name="website" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
        <div>
          <label htmlFor={`intent-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">Como posso ajudar?</label>
          <select id={`intent-${compact ? 'compact' : 'full'}`} name="intent" defaultValue={defaultIntent} required className={fieldClassName}>
            <option value="" disabled>Selecione uma intenção</option>
            {intentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor={`name-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">Nome e sobrenome</label>
            <input id={`name-${compact ? 'compact' : 'full'}`} name="name" autoComplete="name" required maxLength="120" placeholder="Como podemos chamar você?" className={fieldClassName} />
          </div>
          <div>
            <label htmlFor={`email-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">E-mail</label>
            <input id={`email-${compact ? 'compact' : 'full'}`} name="email" type="email" autoComplete="email" required maxLength="180" placeholder="voce@empresa.com" className={fieldClassName} />
          </div>
        </div>

        <div>
          <label htmlFor={`phone-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">WhatsApp <span className="font-normal text-white/60">(opcional)</span></label>
          <div className="grid gap-3 sm:grid-cols-[minmax(13rem,0.75fr)_minmax(0,1.25fr)]">
            <div className="relative">
              {phoneCountries.map(({ code, Flag }) => code === phoneCountry && <Flag key={code} title="" aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-6 -translate-y-1/2 rounded-[1px] object-cover" />)}
              <select
                aria-label="País do WhatsApp"
                value={phoneCountry}
                onChange={(event) => setPhoneCountry(event.target.value)}
                className={`${fieldClassName} appearance-none pl-14 pr-8`}
              >
                {phoneCountries.map(({ code, label, dialCode }) => <option key={code} value={code}>{label} ({dialCode})</option>)}
              </select>
            </div>
            <input
              id={`phone-${compact ? 'compact' : 'full'}`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              maxLength="40"
              placeholder={selectedCountry.placeholder}
              className={fieldClassName}
            />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/50">O código do país é incluído automaticamente.</p>
        </div>

        <fieldset className="border-t border-white/10 pt-5">
          <legend className="pr-2 text-sm font-bold text-white">Sobre seu trabalho <span className="font-normal text-white/60">(opcional)</span></legend>
          <p className="mt-1 text-xs leading-relaxed text-white/50">Preencha apenas se isso ajudar a dar contexto. Conversas pessoais também são bem-vindas.</p>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor={`company-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">Empresa</label>
              <input id={`company-${compact ? 'compact' : 'full'}`} name="company" autoComplete="organization" maxLength="120" placeholder="Onde você trabalha" className={fieldClassName} />
            </div>
            <div>
              <label htmlFor={`role-${compact ? 'compact' : 'full'}`} className="mb-2 block text-sm font-bold text-white">Cargo ou atuação</label>
              <input id={`role-${compact ? 'compact' : 'full'}`} name="role" autoComplete="organization-title" maxLength="120" placeholder="Ex.: fundadora, líder ou autônoma" className={fieldClassName} />
            </div>
          </div>
        </fieldset>

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

        <button type="submit" disabled={status === 'submitting'} className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[#d8ff57] px-7 font-black text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57] disabled:cursor-wait disabled:opacity-70 sm:w-auto">
          {status === 'submitting' ? 'Enviando…' : 'Enviar mensagem'}
          {status !== 'submitting' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
      </form>

      <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>Você recebe confirmação por e-mail. Os dados são usados somente para responder à solicitação.</p>
        <div className="flex flex-wrap gap-4">
          {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-bold text-white hover:text-[#d8ff57]"><MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp</a>}
          <a href="mailto:fernando@fernandoparreiras.com.br" className="inline-flex min-h-11 items-center gap-2 font-bold text-white hover:text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">
            <Mail className="h-4 w-4" aria-hidden="true" /> E-mail
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
