import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '@/components/PageHero';
import PageSeo from '@/components/PageSeo';
import { offerCatalog } from '@/data/commercialHub';
import { ROUTE_METADATA } from '@/data/siteMetadata';
import { trackEvent } from '@/lib/analytics';

const SolutionDetailPage = ({ slug }) => {
  const offer = offerCatalog[slug];
  const metadata = ROUTE_METADATA[`/solucoes/${slug}/`];

  return (
    <main>
      <PageSeo metadata={metadata} />
      <PageHero eyebrow={offer.eyebrow} title={offer.title} description={offer.summary}>
        <Link
          to={`/contato?intent=${encodeURIComponent(offer.intent)}`}
          onClick={() => trackEvent('offer_view', { offer: slug, source: 'detail_cta' })}
          className="group inline-flex min-h-14 items-center justify-center gap-3 bg-[#d8ff57] px-7 font-black text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]"
        >
          {offer.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </PageHero>
      <section className="bg-[#eef0e9] py-20 text-black md:py-28">
        <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-black/50">Para quem</p>
            <h2 className="mt-4 text-4xl font-black leading-tight">{offer.buyer}</h2>
            <p className="mt-8 border-l border-black/25 pl-5 leading-relaxed text-black/65"><strong className="text-black">Formato:</strong> {offer.format}</p>
          </div>
          <div className="grid gap-10 lg:col-span-7 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black">Quando faz sentido</h2>
              <ul className="mt-6 space-y-4 text-black/68">
                {offer.situations.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black">O que entra no trabalho</h2>
              <ul className="mt-6 space-y-4 text-black/68">
                {offer.deliverables.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black py-20 md:py-24">
        <div className="container mx-auto flex flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d8ff57]">Próximo passo</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black">O primeiro encontro serve para compreender o desafio e verificar aderência.</h2>
          </div>
          <Link to={`/contato?intent=${encodeURIComponent(offer.intent)}`} className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 bg-[#d8ff57] px-7 font-black text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">
            {offer.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SolutionDetailPage;

