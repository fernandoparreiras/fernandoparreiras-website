import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft, ArrowRight, BookOpen, UserCheck } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ArticleCard from '@/components/knowledge/ArticleCard';
import ArticleTags from '@/components/knowledge/ArticleTags';
import ArticleUtilities from '@/components/knowledge/ArticleUtilities';
import KnowledgeMeta from '@/components/knowledge/KnowledgeMeta';
import NewsletterForm from '@/components/knowledge/NewsletterForm';
import { articles, getArticleBySlug, getTrack } from '@/data/articles';
import { trackKnowledgeEvent } from '@/lib/knowledge-analytics';

const ArticlePage = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  useEffect(() => {
    if (!article) return undefined;
    trackKnowledgeEvent('article_view', { slug: article.slug, track: article.track });

    const milestones = new Set();
    const startedAt = Date.now();
    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.round((window.scrollY / maxScroll) * 100);
      [25, 50, 75, 100].forEach((milestone) => {
        if (progress >= milestone && !milestones.has(milestone)) {
          milestones.add(milestone);
          trackKnowledgeEvent('article_scroll', { slug: article.slug, milestone });
        }
      });
    };

    const engagementTimer = window.setTimeout(() => {
      trackKnowledgeEvent('article_engaged_30s', { slug: article.slug, elapsed: Math.round((Date.now() - startedAt) / 1000) });
    }, 30000);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(engagementTimer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [article]);

  const related = useMemo(() => {
    if (!article) return [];
    return articles.filter((candidate) => candidate.slug !== article.slug && (candidate.track === article.track || candidate.tags.some((tag) => article.tags.includes(tag)))).slice(0, 3);
  }, [article]);

  if (!article) return <Navigate to="/artigos/" replace />;

  const track = getTrack(article.track);
  const canonicalUrl = `https://fernandoparreiras.com.br/artigos/${article.slug}/`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: `https://fernandoparreiras.com.br${article.image}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: canonicalUrl,
    keywords: article.tags.join(', '),
    author: {
      '@type': 'Person',
      name: 'Fernando Parreiras',
      url: 'https://fernandoparreiras.com.br/',
    },
    publisher: {
      '@type': 'Person',
      name: 'Fernando Parreiras',
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fernandoparreiras.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Conhecimento', item: 'https://fernandoparreiras.com.br/artigos/' },
      { '@type': 'ListItem', position: 3, name: article.title, item: canonicalUrl },
    ],
  };

  return (
    <main className="bg-black pt-24 text-white">
      <Helmet>
        <html lang="pt-BR" />
        <title>{article.title} | Fernando Parreiras</title>
        <meta name="description" content={article.excerpt} />
        <meta name="author" content="Fernando Parreiras" />
        <meta name="keywords" content={article.tags.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`https://fernandoparreiras.com.br${article.image}`} />
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:modified_time" content={article.updatedAt} />
        {article.tags.map((tag) => <meta property="article:tag" content={tag} key={tag} />)}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={`https://fernandoparreiras.com.br${article.image}`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <article>
        <header className="border-b border-white/10 bg-[#0d0e0f]">
          <div className="container mx-auto px-6 py-12 md:py-20">
            <Link to="/artigos/" className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-[#d8ff57]">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar ao acervo
            </Link>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d8ff57]">{track?.label}</span>
                <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl">{article.title}</h1>
                <p className="mt-6 max-w-3xl text-xl font-light leading-relaxed text-white/65">{article.excerpt}</p>
                <div className="mt-7"><KnowledgeMeta article={article} /></div>
                <ArticleTags tags={article.tags} className="mt-6" />
              </div>
              <figure className="overflow-hidden border border-white/10">
                <img src={article.image} alt={article.imageAlt} width="1122" height="1403" className="aspect-[4/3] h-full w-full object-cover object-[50%_18%]" />
              </figure>
            </div>
          </div>
        </header>

        <div className="container mx-auto grid gap-12 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_21rem] lg:py-20">
          <div className="mx-auto w-full max-w-3xl lg:mx-0">
            <div className="mb-12 grid gap-4 border-y border-white/10 py-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d8ff57]" aria-hidden="true" />
                <div><span className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Autor e revisão</span><strong className="mt-1 block text-sm">Fernando Parreiras</strong></div>
              </div>
              <div className="flex gap-3">
                <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-[#d8ff57]" aria-hidden="true" />
                <div><span className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Natureza da análise</span><strong className="mt-1 block text-sm leading-relaxed">{article.nature}</strong></div>
              </div>
            </div>

            <div className="space-y-12">
              {article.content.map((section) => (
                <section key={section.heading} aria-labelledby={`${article.slug}-${section.heading.replaceAll(' ', '-').toLowerCase()}`}>
                  <h2 id={`${article.slug}-${section.heading.replaceAll(' ', '-').toLowerCase()}`} className="text-3xl font-bold leading-tight md:text-4xl">{section.heading}</h2>
                  <div className="mt-5 space-y-5 text-lg font-light leading-[1.85] text-white/72">
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 space-y-3 border-l-2 border-[#d8ff57] pl-6 text-lg font-light leading-relaxed text-white/72">
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  )}
                  {section.quote && (
                    <blockquote className="mt-8 border-y border-white/10 py-7 text-2xl font-semibold leading-relaxed text-white md:text-3xl">
                      “{section.quote}”
                    </blockquote>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-14"><ArticleUtilities article={article} /></div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-[#d8ff57]/30 bg-[#111214] p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d8ff57]">Próximo passo</span>
              <h2 className="mt-3 text-2xl font-bold">Leve a ideia para a prática.</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">Se este tema se conecta a uma decisão profissional ou organizacional, podemos conversar.</p>
              <a href={article.cta.href} target={article.cta.href.startsWith('http') ? '_blank' : undefined} rel={article.cta.href.startsWith('http') ? 'noreferrer' : undefined} onClick={() => trackKnowledgeEvent('article_contextual_cta', { slug: article.slug, label: article.cta.label })} className="mt-6 inline-flex items-center gap-2 bg-[#d8ff57] px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[#c8ee4f]">
                {article.cta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="border border-white/10 bg-[#111214] p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d8ff57]">Carta do Fernando</span>
              <h2 className="mt-3 text-xl font-bold">Continue a conversa.</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">Receba ideias novas no tema que mais importa para você.</p>
              <div className="mt-5"><NewsletterForm compact source={`article_${article.slug}`} /></div>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-white/10 bg-[#0d0e0f] py-16 md:py-24">
          <div className="container mx-auto px-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8ff57]">Continue a leitura</span>
            <h2 id="related-title" className="mt-3 text-3xl font-bold md:text-4xl">Artigos relacionados</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((candidate) => <ArticleCard key={candidate.slug} article={candidate} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ArticlePage;
