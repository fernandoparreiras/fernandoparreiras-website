import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackKnowledgeEvent } from '@/lib/knowledge-analytics';
import { getAttribution } from '@/lib/analytics';

const interests = [
  { value: 'lideranca-negocios', label: 'Negócios e liderança' },
  { value: 'carreira-ia', label: 'Carreira com IA' },
  { value: 'jovens-futuro', label: 'Jovens e futuro' },
  { value: 'mudanca-carreira', label: 'Mudança de carreira' },
];

const NewsletterForm = ({ compact = false, source = 'knowledge_landing' }) => {
  const [status, setStatus] = useState('idle');
  const [reference, setReference] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    setStatus('submitting');
    trackKnowledgeEvent('newsletter_submit_start', { source, interest: formData.interest });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          formType: 'newsletter',
          email: formData.email,
          interest: formData.interest,
          sourcePath: window.location.pathname,
          source,
          consent: formData.consent === 'on',
          website: formData.website,
          attribution: getAttribution(),
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.ok !== true) throw new Error('Falha no envio');
      form.reset();
      setReference(payload.reference || '');
      setStatus('success');
      trackKnowledgeEvent('newsletter_submit_success', { source, interest: formData.interest });
    } catch {
      setStatus('error');
      trackKnowledgeEvent('newsletter_submit_error', { source });
    }
  };

  if (status === 'success') {
    return (
      <div className="flex min-h-32 items-center gap-3 border border-[#d8ff57]/35 bg-[#d8ff57]/5 p-6 text-white" role="status">
        <CheckCircle2 className="h-6 w-6 shrink-0 text-[#d8ff57]" aria-hidden="true" />
        <div>
          <p className="font-semibold">Inscrição recebida.</p>
          <p className="mt-1 text-sm text-white/60">A próxima Carta do Fernando chegará no seu e-mail. Também enviamos uma confirmação agora.</p>
          {reference && <p className="mt-1 text-xs text-white/40">Referência: {reference}</p>}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? 'space-y-3' : 'grid gap-3 lg:grid-cols-[1fr_0.8fr_auto]'}
    >
      <input type="text" name="website" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="sr-only" htmlFor={`newsletter-email-${source}`}>Seu melhor e-mail</label>
      <input
        id={`newsletter-email-${source}`}
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Seu melhor e-mail"
        className="min-h-12 w-full border border-white/15 bg-black px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#d8ff57] focus:ring-1 focus:ring-[#d8ff57]"
      />
      <label className="sr-only" htmlFor={`newsletter-interest-${source}`}>Principal interesse</label>
      <select
        id={`newsletter-interest-${source}`}
        name="interest"
        required
        defaultValue=""
        className="min-h-12 w-full border border-white/15 bg-black px-4 text-sm text-white outline-none transition-colors focus:border-[#d8ff57] focus:ring-1 focus:ring-[#d8ff57]"
      >
        <option value="" disabled>Qual tema mais interessa?</option>
        {interests.map((interest) => (
          <option key={interest.value} value={interest.value}>{interest.label}</option>
        ))}
      </select>
      <label className="flex items-start gap-2 text-xs leading-relaxed text-white/50 lg:col-span-full">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#d8ff57]" />
        <span>Quero receber a Carta do Fernando por e-mail. Posso cancelar a qualquer momento, conforme a <a href="/privacidade" className="font-semibold underline underline-offset-2">Política de Privacidade</a>.</span>
      </label>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#d8ff57] px-6 text-sm font-bold text-black transition-colors hover:bg-[#c8ee4f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-70"
      >
        {status === 'submitting' ? 'Enviando…' : 'Quero receber'}
        {status !== 'submitting' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-300 lg:col-span-full" role="alert">
          Não foi possível concluir agora. Tente novamente ou escreva para fernando@fernandoparreiras.com.br.
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
