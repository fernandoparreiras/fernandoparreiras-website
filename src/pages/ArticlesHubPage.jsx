import React from 'react';
import { ArrowUpRight, BookOpen, CheckCircle2 } from 'lucide-react';
import PageSeo from '@/components/PageSeo';
import { FORGE_ARTICLES } from '@/data/forgeArticles';
import { ROUTE_METADATA } from '@/data/siteMetadata';

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
});

const ArticlesHubPage = () => (
  <main className="relative min-h-screen overflow-hidden bg-[#080a06] pb-24 pt-36">
    <PageSeo metadata={ROUTE_METADATA['/artigos/']} articles={FORGE_ARTICLES} />

    <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#d8ff57]/10 blur-[120px]" />
    <div className="container relative z-10 mx-auto px-6">
      <header className="max-w-4xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-[#d8ff57]" />
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8ff57]">
            Autor / Trustyu Forge
          </span>
        </div>
        <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
          Conhecimento com <span className="text-[#d8ff57]">evidência rastreável.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">
          Artigos publicados originalmente na Trustyu Forge, com autoria, fontes e histórico editorial conectados à publicação canônica.
        </p>
      </header>

      <section className="mt-16 grid gap-6 lg:grid-cols-2" aria-label="Artigos publicados">
        {FORGE_ARTICLES.map((article) => (
          <article
            key={article.id}
            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#11130f] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d8ff57]/50 md:p-9"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d8ff57]/20 bg-[#d8ff57]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#d8ff57]">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Publicação verificada
              </span>
              <BookOpen className="h-6 w-6 shrink-0 text-white/25" aria-hidden="true" />
            </div>
            <h2 className="mt-8 text-3xl font-bold leading-tight text-white transition-colors group-hover:text-[#d8ff57]">
              {article.title}
            </h2>
            <p className="mt-4 flex-1 leading-relaxed text-white/55">{article.description}</p>
            <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <time className="text-sm text-white/60" dateTime={article.publishedAt}>
                {dateFormatter.format(new Date(article.publishedAt))}
              </time>
              <a
                href={article.canonicalUrl}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#d8ff57] px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]"
              >
                Ler na Trustyu Forge
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  </main>
);

export default ArticlesHubPage;
