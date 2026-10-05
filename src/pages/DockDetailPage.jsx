import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageSeo from '@/components/PageSeo';
import DockLeadForm from '@/components/docks/DockLeadForm';
import { DOCKS_GUIDE, dockMetadata, getDock } from '@/data/docks';
import { trackDockEvent } from '@/lib/docks-analytics';

export default function DockDetailPage() {
  const { slug } = useParams();
  const presentation = getDock(slug);
  useEffect(() => {
    if (presentation) trackDockEvent('docks_presentation_view', presentation);
  }, [presentation]);
  if (!presentation) return <main className="min-h-screen px-6 pb-24 pt-36"><h1 className="text-3xl font-bold">Apresentação não encontrada</h1><Link to="/docks/" className="mt-6 inline-block text-[#d8ff57] underline">Voltar ao acervo</Link></main>;
  const track = (name) => trackDockEvent(name, presentation);
  return <>
    <PageSeo metadata={dockMetadata(presentation)} />
    <main className="bg-[#080a06] px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <Link to="/docks/" className="text-sm text-[#d8ff57] underline underline-offset-4">← Todas as apresentações</Link>
        <div className="mt-9 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#d8ff57]">{presentation.event || 'Acervo Fernando Parreiras'} · {presentation.year}</p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">{presentation.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{presentation.description}</p>
            <img src={presentation.cover} alt={`Capa: ${presentation.title}`} className="mt-8 w-full rounded-xl border border-white/15" />
            <div className="mt-6 flex flex-wrap gap-4">
              <a href={presentation.presentationUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('docks_presentation_open')} className="rounded-lg bg-[#d8ff57] px-5 py-3 font-bold text-black">Ver apresentação ↗</a>
              <a href={presentation.downloadUrl} download onClick={() => track('docks_presentation_download')} className="rounded-lg border border-white/30 px-5 py-3 font-semibold">Baixar apresentação</a>
            </div>
            <p className="mt-4 text-sm text-white/60">Leitura e download livres. Cadastro opcional para receber o material por e-mail.</p>
          </div>
          <section id="receber" className="scroll-mt-28 self-start rounded-2xl border border-[#d8ff57]/30 bg-[#11130f] p-6 sm:p-8" aria-label="Material e próximos passos"><DockLeadForm key={slug} presentation={presentation} /></section>
        </div>
        <section className="mt-16 border-t border-white/15 pt-10" aria-labelledby="roteiro-title">
          <h2 id="roteiro-title" className="text-3xl font-bold">Um roteiro para começar</h2>
          <p className="mt-4 text-white/75">Reserve 20 minutos. Escolha uma aplicação e responda às perguntas com sua equipe.</p>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2">{DOCKS_GUIDE.map(([title, description], index) => <li key={title} className="rounded-xl border border-white/15 p-6"><span className="text-sm font-bold text-[#d8ff57]">0{index + 1}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-white/75">{description}</p></li>)}</ol>
          <a href={`/docks/${slug}/qr.png`} download className="mr-4 mt-7 inline-block rounded-lg border border-white/30 px-5 py-3 font-semibold">Baixar QR code para compartilhar</a>
          <a href={`/docks/${slug}/roteiro.txt`} download onClick={() => track('docks_guide_download')} className="mt-7 inline-block rounded-lg border border-white/30 px-5 py-3 font-semibold">Baixar roteiro prático</a>
        </section>
      </div>
    </main>
  </>;
}
