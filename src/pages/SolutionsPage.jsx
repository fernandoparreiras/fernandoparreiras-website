import React from 'react';
import { ArrowRight, Check, Mic2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '@/components/PageHero';
import PageSeo from '@/components/PageSeo';
import { offerCatalog } from '@/data/commercialHub';
import { ROUTE_METADATA } from '@/data/siteMetadata';
import { trackEvent } from '@/lib/analytics';

const offers = [
  { ...offerCatalog['advisory-executivo'], href: '/solucoes/advisory-executivo' },
  { ...offerCatalog.conselho, href: '/solucoes/conselho' },
  { ...offerCatalog['transformacao-tecnologia-ia'], href: '/solucoes/transformacao-tecnologia-ia' }
];

const SolutionsPage = () => (
  <main>
    <PageSeo metadata={ROUTE_METADATA['/solucoes/']} />
    <PageHero
      eyebrow="Soluções"
      title="Experiência aplicada à"
      highlight="decisão certa."
      description="Escolha pelo contexto. Advisory e conselho qualificam decisões; a Tech Human estrutura e executa transformação; palestras mobilizam times e eventos."
    />
    <section className="bg-black py-20 md:py-28">
      <div className="container mx-auto grid gap-5 px-6 lg:grid-cols-3">
        {offers.map((offer) => (
          <article key={offer.slug} className="flex h-full flex-col border border-white/10 bg-[#111211] p-7 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d8ff57]">{offer.eyebrow}</p>
            <h2 className="mt-6 text-3xl font-black">{offer.title}</h2>
            <p className="mt-4 leading-relaxed text-white/60">{offer.summary}</p>
            <ul className="mt-7 flex-1 space-y-3 text-sm text-white/60">
              {offer.deliverables.slice(0, 3).map((item) => <li key={item} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d8ff57]" aria-hidden="true" />{item}</li>)}
            </ul>
            <Link to={offer.href} onClick={() => trackEvent('offer_view', { offer: offer.slug, source: 'solutions' })} className="mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-white hover:text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">
              Ver detalhes <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
        <article className="flex h-full flex-col border border-[#d8ff57]/35 bg-[#d8ff57] p-7 text-black md:p-8 lg:col-span-3 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-2"><Mic2 className="h-10 w-10" aria-hidden="true" /></div>
          <div className="mt-6 lg:col-span-7 lg:mt-0">
            <h2 className="text-3xl font-black">Palestras e workshops</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-black/68">IA, negócios, tecnologia, liderança e desenvolvimento humano traduzidos para a realidade da audiência.</p>
          </div>
          <Link to="/palestras" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 border border-black px-5 font-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black lg:col-span-3 lg:mt-0">
            Ver palestras <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </article>
      </div>
    </section>
  </main>
);

export default SolutionsPage;

