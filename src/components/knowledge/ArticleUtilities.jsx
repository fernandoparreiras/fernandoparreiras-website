import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Instagram, Linkedin, Mail, MessageCircle, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { buildArticleShareKit } from '@/lib/article-share-copy';
import { trackKnowledgeEvent } from '@/lib/knowledge-analytics';

const utilityButtonClass = 'inline-flex min-h-11 items-center justify-center gap-2 border border-white/15 px-3.5 text-sm text-white/70 transition-colors hover:border-[#d8ff57]/60 hover:text-[#d8ff57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]';
const shareIconButtonClass = 'group relative inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-[#d8ff57]/60 hover:bg-[#d8ff57]/5 hover:text-[#d8ff57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]';
const primaryShareIconButtonClass = `${shareIconButtonClass} border-[#d8ff57]/70 bg-[#d8ff57]/10 text-[#d8ff57]`;
const shareTooltipClass = 'pointer-events-none absolute bottom-[calc(100%+0.55rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-white/10 bg-[#111] px-2.5 py-1.5 text-xs font-medium normal-case tracking-normal text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100';

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

const ArticleUtilities = ({ article }) => {
  const [status, setStatus] = useState('');
  const [helpful, setHelpful] = useState(null);
  const [reason, setReason] = useState('');
  const storageKey = `knowledge:helpful:${article.slug}`;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'yes' || saved === 'no') setHelpful(saved);
  }, [storageKey]);

  const shareKit = useMemo(() => buildArticleShareKit(article), [article]);

  const notify = (message) => {
    setStatus(message);
    window.setTimeout(() => setStatus(''), 3200);
  };

  const recordShare = (channel) => trackKnowledgeEvent('article_share_click', {
    slug: article.slug,
    channel,
    has_commercial_cta: true,
  });

  const nativeShare = async () => {
    if (!navigator.share) {
      await copyText(shareKit.copy.text);
      notify('Texto e links copiados.');
      recordShare('copy_fallback');
      return;
    }

    try {
      await navigator.share(shareKit.native);
      recordShare('native');
    } catch (error) {
      if (error?.name !== 'AbortError') notify('Não foi possível compartilhar agora.');
    }
  };

  const copy = async (kind, text) => {
    try {
      await copyText(text);
      const messages = {
        linkedin: 'Copy do LinkedIn copiada. Cole no post que será aberto.',
        instagram: 'Legenda para Instagram copiada.',
        copy_text: 'Texto e links copiados.',
      };
      notify(messages[kind] || 'Copy copiada.');
      recordShare(kind);
    } catch {
      notify('Não foi possível copiar.');
    }
  };

  const vote = (value) => {
    setHelpful(value);
    window.localStorage.setItem(storageKey, value);
    trackKnowledgeEvent('article_helpful', { slug: article.slug, value });
    notify(value === 'yes' ? 'Obrigado pelo retorno.' : 'Obrigado. Seu retorno ajuda a melhorar o acervo.');
  };

  const recordReason = (value) => {
    setReason(value);
    trackKnowledgeEvent('article_helpful_reason', { slug: article.slug, reason: value });
  };

  return (
    <section aria-labelledby="article-utilities-title" className="border-y border-white/10 py-8">
      <h2 id="article-utilities-title" className="text-xl font-bold">Este artigo foi útil?</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/55">Uma resposta rápida ajuda a orientar os próximos conteúdos.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" aria-pressed={helpful === 'yes'} onClick={() => vote('yes')} className={`${utilityButtonClass} ${helpful === 'yes' ? 'border-[#d8ff57] bg-[#d8ff57] text-black hover:text-black' : ''}`}>
          <ThumbsUp className="h-4 w-4" aria-hidden="true" /> Sim
        </button>
        <button type="button" aria-pressed={helpful === 'no'} onClick={() => vote('no')} className={`${utilityButtonClass} ${helpful === 'no' ? 'border-[#d8ff57] bg-[#d8ff57] text-black hover:text-black' : ''}`}>
          <ThumbsDown className="h-4 w-4" aria-hidden="true" /> Não encontrei o que precisava
        </button>
      </div>

      {helpful === 'no' && (
        <div className="mt-4">
          <label htmlFor="helpful-reason" className="mb-2 block text-sm text-white/60">O que faltou? <span className="text-white/35">Opcional</span></label>
          <select id="helpful-reason" value={reason} onChange={(event) => recordReason(event.target.value)} className="min-h-11 w-full max-w-md border border-white/15 bg-black px-3 text-sm text-white outline-none focus:border-[#d8ff57]">
            <option value="">Selecione uma opção</option>
            <option value="superficial">Queria mais profundidade</option>
            <option value="complexo">O conteúdo ficou complexo</option>
            <option value="nao-respondeu">Não respondeu à minha pergunta</option>
            <option value="exemplos">Faltaram exemplos práticos</option>
          </select>
        </div>
      )}

      <div className="mt-9">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8ff57]">Compartilhar</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">Cada canal recebe uma copy pronta, com uma pergunta para discussão e um próximo passo. No LinkedIn, a copy será copiada antes de abrir a publicação.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={shareKit.linkedin.shareUrl} target="_blank" rel="noreferrer" onClick={() => copy('linkedin', shareKit.linkedin.text)} className={primaryShareIconButtonClass} aria-label="Copiar copy e compartilhar no LinkedIn">
            <Linkedin className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Copiar copy e compartilhar no LinkedIn</span>
            <span aria-hidden="true" className={`${shareTooltipClass} !left-0 !translate-x-0`}>LinkedIn · copy pronta</span>
          </a>
          <button type="button" onClick={nativeShare} className={shareIconButtonClass} aria-label="Compartilhar artigo">
            <Share2 className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Compartilhar artigo</span>
            <span aria-hidden="true" className={shareTooltipClass}>Compartilhar</span>
          </button>
          <a href={shareKit.whatsapp.shareUrl} target="_blank" rel="noreferrer" onClick={() => recordShare('whatsapp')} className={shareIconButtonClass} aria-label="Compartilhar no WhatsApp com copy pronta">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Compartilhar no WhatsApp com copy pronta</span>
            <span aria-hidden="true" className={shareTooltipClass}>WhatsApp · copy pronta</span>
          </a>
          <a href={shareKit.email.shareUrl} onClick={() => recordShare('email')} className={shareIconButtonClass} aria-label="Compartilhar por e-mail com copy pronta">
            <Mail className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Compartilhar por e-mail com copy pronta</span>
            <span aria-hidden="true" className={shareTooltipClass}>E-mail · copy pronta</span>
          </a>
          <button type="button" onClick={() => copy('copy_text', shareKit.copy.text)} className={shareIconButtonClass} aria-label="Copiar texto e links do artigo">
            <Copy className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Copiar texto e links do artigo</span>
            <span aria-hidden="true" className={shareTooltipClass}>Copiar texto e links</span>
          </button>
          <button type="button" onClick={() => copy('instagram', shareKit.instagram.text)} className={shareIconButtonClass} aria-label="Copiar legenda para Instagram">
            <Instagram className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Copiar legenda para Instagram</span>
            <span aria-hidden="true" className={`${shareTooltipClass} !left-auto right-0 !translate-x-0`}>Legenda para Instagram</span>
          </button>
        </div>
      </div>

      <div aria-live="polite" className="mt-4 min-h-6 text-sm text-[#d8ff57]">
        {status && <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" aria-hidden="true" /> {status}</span>}
      </div>
    </section>
  );
};

export default ArticleUtilities;
