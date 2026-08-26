import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  GraduationCap,
  ListFilter,
  Search,
  Signpost,
  X,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ArticleTags from '@/components/knowledge/ArticleTags';
import KnowledgeMeta from '@/components/knowledge/KnowledgeMeta';
import NewsletterForm from '@/components/knowledge/NewsletterForm';
import { articles, getSearchableArticleText, getTrack, knowledgeTracks } from '@/data/articles';
import { trackKnowledgeEvent } from '@/lib/knowledge-analytics';

const trackIcons = {
  'lideranca-negocios': Briefcase,
  'carreira-ia': BrainCircuit,
  'jovens-futuro': GraduationCap,
  'mudanca-carreira': Signpost,
};

const KnowledgePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';
  const activeTrack = searchParams.get('trilha') || 'todas';
  const activeTag = searchParams.get('tag') || '';
  const [query, setQuery] = useState(queryFromUrl);

  useEffect(() => setQuery(queryFromUrl), [queryFromUrl]);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = queryFromUrl.trim().toLocaleLowerCase('pt-BR');

    return articles.filter((article) => {
      const matchesTrack = activeTrack === 'todas' || article.track === activeTrack;
      const matchesTag = !activeTag || article.tags.some((tag) => tag.toLocaleLowerCase('pt-BR') === activeTag.toLocaleLowerCase('pt-BR'));
      const matchesQuery = !normalizedQuery || getSearchableArticleText(article).includes(normalizedQuery);
      return matchesTrack && matchesTag && matchesQuery;
    });
  }, [activeTag, activeTrack, queryFromUrl]);

  const featured = articles.find((article) => article.featured);
  const isFiltering = Boolean(queryFromUrl || activeTag || activeTrack !== 'todas');
  const displayedArticles = isFiltering
    ? filteredArticles
    : filteredArticles.filter((article) => !article.featured);

  const updateParam = (key, value, defaultValue = '') => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    updateParam('q', query.trim());
    trackKnowledgeEvent('knowledge_search', { query: query.trim() || 'empty' });
  };

  const selectTrack = (trackId) => {
    updateParam('trilha', trackId, 'todas');
    trackKnowledgeEvent('knowledge_filter', { type: 'track', value: trackId });
  };

  const clearFilters = () => {
    setQuery('');
    setSearchParams({}, { replace: true });
    trackKnowledgeEvent('knowledge_filters_clear');
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Conhecimento — Fernando Parreiras',
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://fernandoparreiras.com.br/artigos/${article.slug}/`,
      name: article.title,
    })),
  };

  return (
    <main className="bg-black pt-20 font-academy text-white">
      <Helmet>
        <html lang="pt-BR" />
        <title>Conhecimento | Fernando Parreiras</title>
        <meta name="description" content="Artigos e trilhas sobre liderança, negócios, carreira com IA, jovens e mudança profissional." />
        <link rel="canonical" href="https://fernandoparreiras.com.br/artigos/" />
        <link rel="alternate" type="application/rss+xml" title="Conhecimento — Fernando Parreiras" href="https://fernandoparreiras.com.br/artigos/rss.xml" />
        <meta property="og:title" content="Conhecimento | Fernando Parreiras" />
        <meta property="og:description" content="O futuro do trabalho é uma decisão do presente." />
        <meta property="og:url" content="https://fernandoparreiras.com.br/artigos/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <section className="border-y border-white/10 bg-[#0c0d0d]">
        <div className="container mx-auto grid px-0 lg:min-h-[440px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-14 sm:px-8 lg:px-10 lg:py-16 xl:px-14">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8ff57]">Caderno de ideias</span>
            <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl xl:text-[3.55rem]">
              O futuro do trabalho é uma decisão do presente.
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/62 md:text-lg">
              Aqui eu compartilho o que aprendo no campo real: decisões, erros, frameworks e conversas que ajudam líderes, founders e profissionais a transformar intenção em resultado.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-10 bg-[#d8ff57]" aria-hidden="true" />
              <div>
                <span className="block font-serif text-lg italic text-white/90">Fernando Parreiras</span>
                <span className="mt-1 block text-xs font-semibold text-[#d8ff57]">Ideias vividas, não apenas observadas.</span>
              </div>
            </div>
          </div>

          <figure className="relative min-h-[330px] overflow-hidden border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0">
            <img
              src="/images/em-cena/fernando-parreiras-palestra-principal-1122.webp"
              alt="Fernando Parreiras durante uma palestra sobre tecnologia, negócios e desenvolvimento humano."
              width="1122"
              height="1403"
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
            />
          </figure>
        </div>
      </section>

      <section aria-label="Busca e filtros do acervo" className="border-b border-white/10 bg-[#0d0e0f] py-4">
        <div className="container mx-auto px-6">
          <div className="grid gap-3 xl:grid-cols-[minmax(280px,1.15fr)_2fr]">
            <form onSubmit={handleSearch} role="search" className="flex min-w-0">
              <label htmlFor="knowledge-search" className="sr-only">Buscar artigos</label>
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                <input
                  id="knowledge-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar ideias, temas ou decisões"
                  className="min-h-12 w-full border border-white/15 bg-black pl-11 pr-4 text-xs text-white outline-none placeholder:text-white/40 focus:border-[#d8ff57] focus:ring-1 focus:ring-[#d8ff57]"
                />
              </div>
              <button type="submit" className="min-h-12 border border-l-0 border-white/15 px-4 text-xs font-bold text-[#d8ff57] transition-colors hover:bg-[#d8ff57] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]">
                Buscar
              </button>
            </form>

            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5" aria-label="Filtrar por trilha">
              <button
                type="button"
                aria-pressed={activeTrack === 'todas'}
                onClick={() => selectTrack('todas')}
                className={`inline-flex min-h-12 items-center justify-center gap-2 border px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57] ${activeTrack === 'todas' ? 'border-[#d8ff57] text-[#d8ff57]' : 'border-white/15 text-white/55 hover:border-white/40 hover:text-white'}`}
              >
                <ListFilter className="h-4 w-4" aria-hidden="true" /> Todos os temas
              </button>
              {knowledgeTracks.map((track) => {
                const Icon = trackIcons[track.id];
                return (
                  <button
                    key={track.id}
                    type="button"
                    aria-pressed={activeTrack === track.id}
                    onClick={() => selectTrack(track.id)}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57] ${activeTrack === track.id ? 'border-[#d8ff57] text-[#d8ff57]' : 'border-white/15 text-white/55 hover:border-white/40 hover:text-white'}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" /> {track.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {activeTag && (
            <div className="mt-3 flex items-center gap-3 text-xs text-white/60">
              <span>Tag ativa:</span>
              <button type="button" onClick={() => updateParam('tag', '')} className="inline-flex items-center gap-2 border border-[#d8ff57]/50 px-3 py-1.5 text-[#d8ff57] hover:bg-[#d8ff57]/10">
                #{activeTag.replaceAll(' ', '-')} <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="acervo" aria-labelledby="acervo-title" className="border-b border-white/10 py-10 md:py-14">
        <div className="container mx-auto px-6">
          {!isFiltering && featured && (
            <article className="border-b border-white/15 pb-10">
              <div className="flex items-center gap-4">
                <span className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-[#d8ff57]">Ensaio em destaque</span>
                <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
              </div>
              <div className="mt-7 grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-end lg:gap-16">
                <div>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/35">{featured.format}</span>
                  <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-[1.04] tracking-[-0.025em] md:text-5xl">
                    <Link to={`/artigos/${featured.slug}/`} className="transition-colors hover:text-[#d8ff57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]">
                      {featured.title}
                    </Link>
                  </h2>
                </div>
                <div>
                  <p className="max-w-2xl text-base font-light leading-relaxed text-white/62">{featured.excerpt}</p>
                  <div className="mt-5"><KnowledgeMeta article={featured} compact /></div>
                  <Link to={`/artigos/${featured.slug}/`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d8ff57] transition-colors hover:text-white">
                    Ler ensaio completo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          )}

          <div className={`${!isFiltering ? 'mt-10' : ''} flex flex-col gap-3 border-b border-white/15 pb-4 sm:flex-row sm:items-end sm:justify-between`}>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8ff57]">{isFiltering ? 'Busca no caderno' : 'Artigos mais recentes'}</span>
              <h2 id="acervo-title" className="sr-only">{isFiltering ? 'Resultados encontrados' : 'Artigos mais recentes'}</h2>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span>{displayedArticles.length} {displayedArticles.length === 1 ? 'artigo' : 'artigos'}</span>
              {isFiltering && (
                <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1.5 font-semibold text-[#d8ff57] hover:text-white">
                  <X className="h-4 w-4" aria-hidden="true" /> Limpar busca e filtros
                </button>
              )}
            </div>
          </div>

          {displayedArticles.length > 0 ? (
            <div className="divide-y divide-white/10">
              {displayedArticles.map((article, index) => {
                const track = getTrack(article.track);
                return (
                  <article key={article.slug} className="group grid gap-4 py-6 lg:grid-cols-[3rem_10rem_minmax(0,1fr)_9rem_18rem] lg:items-center lg:gap-5">
                    <span className="text-sm font-semibold text-white/70">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#d8ff57]">{track?.shortLabel}</span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold leading-tight tracking-[-0.01em] md:text-xl">
                        <Link to={`/artigos/${article.slug}/`} className="transition-colors group-hover:text-[#d8ff57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm font-light leading-relaxed text-white/48">{article.excerpt}</p>
                    </div>
                    <KnowledgeMeta article={article} compact />
                    <ArticleTags tags={article.tags} />
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="border-b border-white/10 px-6 py-16 text-center">
              <h3 className="text-2xl font-bold">Nenhum artigo encontrado.</h3>
              <p className="mx-auto mt-3 max-w-lg text-white/60">Tente outra palavra ou remova um dos filtros para ampliar os resultados.</p>
              <button type="button" onClick={clearFilters} className="mt-6 bg-[#d8ff57] px-6 py-3 text-sm font-bold text-black hover:bg-[#c8ee4f]">Ver todo o acervo</button>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="trilhas-title" className="border-b border-white/10 bg-[#0d0e0f] py-10 md:py-14">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4">
            <h2 id="trilhas-title" className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-[#d8ff57]">Comece por uma trilha</h2>
            <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
          </div>
          <div className="mt-7 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {knowledgeTracks.map((track) => {
              const Icon = trackIcons[track.id];
              return (
                <Link
                  key={track.id}
                  to={`/artigos/?trilha=${track.id}`}
                  className="group border-b border-white/10 py-7 sm:px-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <Icon className="h-7 w-7 text-white/75 transition-colors group-hover:text-[#d8ff57]" strokeWidth={1.5} aria-hidden="true" />
                  <strong className="mt-5 block text-xs font-bold uppercase tracking-[0.16em] text-[#d8ff57]">{track.label}</strong>
                  <span className="mt-3 block min-h-16 text-sm font-light leading-relaxed text-white/50">{track.description}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#d8ff57]">Explorar trilha <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="carta-title" className="py-10 md:py-14">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 border-y border-white/15 py-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8ff57]">Carta do Fernando</span>
              <h2 id="carta-title" className="mt-3 text-3xl font-bold tracking-[-0.02em]">Ideias semanais para decisões melhores.</h2>
              <p className="mt-3 max-w-lg text-sm font-light leading-relaxed text-white/55">Uma seleção curta, direta e autoral com o que estou pensando, lendo e aplicando no campo real.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default KnowledgePage;
