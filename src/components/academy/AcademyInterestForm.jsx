import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONTACT_EMAIL = 'fernando@fernandoparreiras.com.br';
const WHATSAPP_URL = 'https://wa.me/5531992789574?text=Ol%C3%A1%2C%20quero%20receber%20informa%C3%A7%C3%B5es%20sobre%20a%20forma%C3%A7%C3%A3o%20IA%20sem%20Confus%C3%A3o.';
const CONSENT_VERSION = 'academy-interest-2026-08-18';

const buildMailto = ({ name, email, city, question }) => {
  const subject = 'Lista de interesse — IA sem Confusão';
  const body = [
    'Olá, quero entrar na lista de interesse da formação IA sem Confusão.',
    '',
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Cidade: ${city || 'Não informada'}`,
    `Principal dúvida: ${question || 'Não informada'}`,
    '',
    `Consentimento: ${CONSENT_VERSION}`,
    'Concordo em receber por e-mail as informações da primeira turma. Sei que posso cancelar a qualquer momento.'
  ].join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const AcademyInterestForm = () => {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get('company_website')) return;

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      city: String(formData.get('city') || '').trim(),
      question: String(formData.get('question') || '').trim(),
      consent: formData.get('consent') === 'on',
      consentVersion: CONSENT_VERSION,
      source: 'academy-ia-sem-confusao',
      submittedAt: new Date().toISOString()
    };

    const endpoint = import.meta.env.VITE_ACADEMY_INTEREST_ENDPOINT;

    if (!endpoint) {
      window.location.href = buildMailto(payload);
      setStatus('manual');
      setMessage('Abrimos uma mensagem pronta no seu aplicativo de e-mail. Revise e envie para concluir seu interesse.');
      return;
    }

    setStatus('submitting');
    setMessage('Enviando seu interesse…');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('submission_failed');

      form.reset();
      setStatus('success');
      setMessage('Interesse registrado. Você receberá data, local, investimento e condições quando estiverem confirmados.');
    } catch {
      setStatus('error');
      setMessage('Não foi possível registrar agora. Você pode concluir por e-mail ou WhatsApp usando os atalhos abaixo.');
    }
  };

  const fieldClass = 'mt-2 w-full rounded-xl border border-[#080809]/15 bg-white px-4 py-3 text-base text-[#080809] outline-none transition placeholder:text-[#4e555e]/55 focus:border-[#080809] focus:ring-2 focus:ring-[#d8ff57]';

  return (
    <div className="rounded-3xl bg-white p-6 text-[#080809] shadow-[0_28px_80px_-44px_rgba(0,0,0,0.7)] sm:p-8">
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4e555e]">Lista de interesse</p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight">Receba as informações da primeira turma</h2>
        <p className="mt-3 leading-relaxed text-[#4e555e]">
          Sem compromisso de compra. Enviaremos data, local, investimento e condições somente quando estiverem confirmados.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate={false}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold">
            Nome <span aria-hidden="true">*</span>
            <input className={fieldClass} type="text" name="name" autoComplete="name" required maxLength={100} />
          </label>

          <label className="text-sm font-bold">
            E-mail <span aria-hidden="true">*</span>
            <input className={fieldClass} type="email" name="email" autoComplete="email" required maxLength={160} />
          </label>

          <label className="text-sm font-bold sm:col-span-2">
            Cidade <span className="font-normal text-[#4e555e]">(opcional)</span>
            <input className={fieldClass} type="text" name="city" autoComplete="address-level2" maxLength={100} />
          </label>

          <label className="text-sm font-bold sm:col-span-2">
            Qual é sua principal dúvida sobre IA? <span className="font-normal text-[#4e555e]">(opcional)</span>
            <textarea className={`${fieldClass} min-h-28 resize-y`} name="question" maxLength={600} />
          </label>

          <label className="sr-only" aria-hidden="true">
            Não preencha este campo
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl bg-[#f7f7f2] p-4 text-sm leading-relaxed text-[#2a2b2d]">
          <input
            className="mt-1 h-4 w-4 shrink-0 accent-[#080809] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]"
            type="checkbox"
            name="consent"
            required
          />
          <span>
            Concordo em receber por e-mail informações sobre a primeira turma da IA sem Confusão. Posso cancelar a qualquer momento.{' '}
            <Link className="font-bold underline underline-offset-2" to="/privacidade#academy-lista-interesse">
              Entenda o uso dos seus dados.
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#080809] px-6 py-4 text-base font-bold text-[#f4f5f7] transition hover:bg-[#2a2b2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#080809] focus-visible:ring-offset-4 disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'submitting' ? 'Registrando…' : 'Quero receber as informações'}
          {status !== 'submitting' && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
        </button>

        <p className="mt-4 text-center text-xs leading-relaxed text-[#4e555e]">
          Não enviamos promessa de resultado, urgência artificial ou mensagens sobre outros assuntos sem novo consentimento.
        </p>
      </form>

      {message && (
        <div
          className={`mt-6 rounded-xl border p-4 text-sm leading-relaxed ${
            status === 'success'
              ? 'border-emerald-600/25 bg-emerald-50 text-emerald-950'
              : status === 'error'
                ? 'border-red-600/25 bg-red-50 text-red-950'
                : 'border-[#080809]/15 bg-[#f7f7f2] text-[#2a2b2d]'
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            {status === 'success' ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /> : <Mail className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />}
            <p>{message}</p>
          </div>
          {(status === 'error' || status === 'manual') && (
            <div className="mt-4 flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-2 font-bold underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
                <Mail className="h-4 w-4" aria-hidden="true" /> E-mail
              </a>
              <a className="inline-flex items-center gap-2 font-bold underline underline-offset-4" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AcademyInterestForm;
