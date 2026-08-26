import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Linkedin, Mail, MessageCircle, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { trackKnowledgeEvent } from '@/lib/knowledge-analytics';

const utilityButtonClass = 'inline-flex min-h-11 items-center justify-center gap-2 border border-white/15 px-3.5 text-sm text-white/70 transition-colors hover:border-[#d8ff57]/60 hover:text-[#d8ff57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]';

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
  const canonicalUrl = `https://fernandoparreiras.com.br/artigos/${article.slug}/`;
  const [status, setStatus] = useState('');
  const [helpful, setHelpful] = useState(null);
  const [reason, setReason] = useState('');
  const storageKey = `knowledge:helpful:${article.slug}`;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'yes' || saved === 'no') setHelpful(saved);
  }, [storageKey]);

  const shareText = useMemo(() => `${article.title} — uma leitura de Fernando Parreiras`, [article.title]);
  const instagramCaption = useMemo(() => `${article.title}\n\n${article.excerpt}\n\nLeia em ${canonicalUrl}\n\n${article.tags.map((tag) => `#${tag.replaceAll(' ', '')}`).join(' ')}`, [article, canonicalUrl]);

  const notify = (message) => {
    setStatus(message);
    window.setTimeout(() => setStatus(''), 3200);
  };

  const recordShare = (channel) => trackKnowledgeEvent('article_share_click', { slug: article.slug, channel });

  const nativeShare = async () => {
    if (!navigator.share) {
      await copyText(canonicalUrl);
      notify('Link copiado.');
      recordShare('copy_fallback');
      return;
    }

    try {
      await navigator.share({ title: article.title, text: shareText, url: canonicalUrl });
      recordShare('native');
    } catch (error) {
      if (error?.name !== 'AbortError') notify('Não foi possível compartilhar agora.');
    }
  };

  const copy = async (kind, text) => {
    try {
      await copyText(text);
      notify(kind === 'instagram' ? 'Legenda para Instagram copiada.' : 'Link copiado.');
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
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={nativeShare} className={utilityButtonClass} aria-label="Abrir opções de compartilhamento">
            <Share2 className="h-4 w-4" aria-hidden="true" /> Compartilhar
          </button>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`} target="_blank" rel="noreferrer" onClick={() => recordShare('linkedin')} className={utilityButtonClass}>
            <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
          </a>
          <a href={`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${canonicalUrl}`)}`} target="_blank" rel="noreferrer" onClick={() => recordShare('whatsapp')} className={utilityButtonClass}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
          </a>
          <a href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${article.excerpt}\n\n${canonicalUrl}`)}`} onClick={() => recordShare('email')} className={utilityButtonClass}>
            <Mail className="h-4 w-4" aria-hidden="true" /> E-mail
          </a>
          <button type="button" onClick={() => copy('copy_link', canonicalUrl)} className={utilityButtonClass}>
            <Copy className="h-4 w-4" aria-hidden="true" /> Copiar link
          </button>
          <button type="button" onClick={() => copy('instagram', instagramCaption)} className={utilityButtonClass}>
            <Copy className="h-4 w-4" aria-hidden="true" /> Legenda para Instagram
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
