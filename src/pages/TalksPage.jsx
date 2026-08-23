import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import InActionGallery from '@/components/InActionGallery';
import PageHero from '@/components/PageHero';
import PageSeo from '@/components/PageSeo';
import { talkTopics } from '@/data/commercialHub';
import { ROUTE_METADATA } from '@/data/siteMetadata';
import { trackEvent } from '@/lib/analytics';

const formats = ['Keynote', 'Palestra executiva', 'Workshop', 'Conversa para liderança'];

const TalksPage = () => (
  <main>
    <PageSeo metadata={ROUTE_METADATA['/palestras/']} />
    <PageHero
      eyebrow="Palestras e workshops"
      title="Complexidade traduzida em"
      highlight="clareza para agir."
      description="Conteúdo autoral sobre IA, negócios, tecnologia, liderança, carreira e desenvolvimento humano, adaptado ao contexto de cada audiência."
    >
      <Link to="/contato?intent=palestra" onClick={() => trackEvent('offer_view', { offer: 'palestra', source: 'talks_hero' })} className="group inline-flex min-h-14 items-center justify-center gap-3 bg-[#d8ff57] px-7 font-black text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">
        Solicitar briefing <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </PageHero>
    <section className="bg-[#eef0e9] py-20 text-black md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {talkTopics.map((topic, index) => (
            <article key={topic.title} className="border border-black/10 bg-white p-7 md:p-9">
              <span className="text-xs font-black text-black/35">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="mt-5 text-3xl font-black">{topic.title}</h2>
              <p className="mt-4 leading-relaxed text-black/65">{topic.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 border-t border-black/15 pt-10">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">Formatos</p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {formats.map((format) => <li key={format} className="inline-flex items-center gap-2 border border-black/15 bg-white px-4 py-3 font-bold"><CheckCircle2 className="h-4 w-4" aria-hidden="true" />{format}</li>)}
          </ul>
        </div>
      </div>
    </section>
    <InActionGallery />
  </main>
);

export default TalksPage;

