import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  ExternalLink,
  FolderOpen,
  Layers3,
  Presentation,
  Search
} from 'lucide-react';
import presentations from '@/data/presentations';

const DocksPage = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [query, setQuery] = useState('');

  const categories = useMemo(
    () => ['Todos', ...new Set(presentations.map((item) => item.category).filter(Boolean))],
    []
  );

  const filteredPresentations = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');

    return presentations.filter((item) => {
      const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
      const searchableContent = [
        item.title,
        item.description,
        item.category,
        item.event,
        ...(item.topics || [])
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('pt-BR');

      return matchesCategory && (!normalizedQuery || searchableContent.includes(normalizedQuery));
    });
  }, [activeCategory, query]);

  const presentationCount = String(presentations.length).padStart(2, '0');

  return (
    <main
      id="docks"
      className="relative min-h-screen overflow-hidden bg-[#080a06] pb-24 pt-36"
    >
      <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#d8ff57]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#d8ff57]/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d8ff57]" />
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8ff57]">
                Docks / Apresentações
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
              Ideias que saem do palco e <span className="text-[#d8ff57]">continuam em movimento.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">
              Um acervo aberto de palestras, keynotes e workshops para consultar, compartilhar e levar a conversa adiante.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative min-h-[250px]"
            aria-hidden="true"
          >
            <div className="absolute inset-x-8 top-0 h-44 rotate-3 rounded-2xl border border-white/5 bg-white/[0.03]" />
            <div className="absolute inset-x-4 top-4 h-44 -rotate-2 rounded-2xl border border-white/10 bg-[#11130f]" />
            <div className="absolute inset-x-0 top-8 flex h-44 items-end justify-between overflow-hidden rounded-2xl border border-[#d8ff57]/30 bg-[#161a10] p-7 shadow-[0_24px_80px_-35px_rgba(216,255,87,0.5)]">
              <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[28px] border-[#d8ff57]/10" />
              <div>
                <Layers3 className="mb-6 h-8 w-8 text-[#d8ff57]" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/40">Coleção</p>
                <p className="mt-1 text-xl font-bold text-white">Fernando Parreiras</p>
              </div>
              <span className="font-mono text-6xl font-black leading-none text-[#d8ff57]">
                {presentationCount}
              </span>
            </div>
          </motion.div>
        </div>

        {presentations.length > 0 ? (
          <div className="mt-20">
            <div className="mb-10 flex flex-col gap-5 border-y border-white/10 py-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2" aria-label="Filtrar apresentações por categoria">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      activeCategory === category
                        ? 'border-[#d8ff57] bg-[#d8ff57] text-black'
                        : 'border-white/10 bg-white/5 text-white/60 hover:border-[#d8ff57]/50 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <label className="flex min-w-0 items-center gap-3 border-b border-white/20 pb-2 focus-within:border-[#d8ff57] lg:w-80">
                <Search className="h-4 w-4 shrink-0 text-white/40" />
                <span className="sr-only">Buscar no Dock</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar no Dock"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
              </label>
            </div>

            {filteredPresentations.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredPresentations.map((item, index) => (
                  <motion.article
                    key={`${item.title}-${item.year || index}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#11130f] transition-all duration-300 hover:-translate-y-1 hover:border-[#d8ff57]/50"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#171b11]">
                      {item.cover ? (
                        <img
                          src={item.cover}
                          alt={`Capa da apresentação ${item.title}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(216,255,87,0.2),transparent_38%)]" />
                          <Presentation className="h-16 w-16 text-[#d8ff57]/70" />
                        </div>
                      )}
                      <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm">
                        {item.category || 'Apresentação'}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-wider text-white/40">
                        {item.year && <span>{item.year}</span>}
                        {item.event && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-[#d8ff57]" />
                            <span>{item.event}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold leading-tight text-white transition-colors group-hover:text-[#d8ff57]">
                        {item.title}
                      </h3>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">{item.description}</p>

                      {item.topics?.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.topics.map((topic) => (
                            <span key={topic} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-6 flex items-center gap-5 border-t border-white/10 pt-5">
                        {item.presentationUrl && (
                          <a
                            href={item.presentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#d8ff57] transition-opacity hover:opacity-70"
                          >
                            Ver apresentação <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {item.downloadUrl && (
                          <a
                            href={item.downloadUrl}
                            download
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-white"
                          >
                            Baixar <Download className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center">
                <Search className="mx-auto h-8 w-8 text-[#d8ff57]" />
                <h3 className="mt-5 text-xl font-bold text-white">Nenhuma apresentação encontrada</h3>
                <p className="mt-2 text-sm text-white/50">Tente outro termo ou escolha uma categoria diferente.</p>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-20 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="p-8 md:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d8ff57] text-black">
                <FolderOpen className="h-6 w-6" />
              </div>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.26em] text-[#d8ff57]">Em preparação</p>
              <h3 className="mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">As primeiras apresentações estão chegando ao Dock.</h3>
              <p className="mt-5 max-w-xl leading-relaxed text-white/55">
                Este espaço já está pronto para organizar os materiais por tema, evento e ano, com acesso para leitura e download.
              </p>
            </div>

            <div className="border-t border-white/10 bg-black/20 p-8 md:p-12 lg:border-l lg:border-t-0">
              <p className="mb-8 text-xs font-bold uppercase tracking-[0.24em] text-white/35">Como o acervo será organizado</p>
              {[
                ['01', 'Palestras e keynotes'],
                ['02', 'Workshops e conteúdos práticos'],
                ['03', 'Leitura online e download']
              ].map(([number, label]) => (
                <div key={number} className="flex items-center gap-5 border-t border-white/10 py-5 first:border-t-0 first:pt-0">
                  <span className="font-mono text-sm text-[#d8ff57]">{number}</span>
                  <span className="text-sm font-medium text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default DocksPage;
