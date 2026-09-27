import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import InitiativeLogo from '@/components/InitiativeLogo';
import SectionIntro from '@/components/SectionIntro';
import { servingInitiatives } from '@/data/initiatives';
import { trackEvent } from '@/lib/analytics';

const ServingInitiatives = () => (
  <section id="servir" aria-labelledby="servir-title" className="scroll-mt-20 border-y border-[#d8ff57]/15 bg-[#0b0e08] py-24 md:py-32">
    <div className="container mx-auto px-6">
      <SectionIntro
        id="servir-title"
        eyebrow="Projetos e iniciativas em servir"
        title="SER, FAZER e"
        highlight="DOAR."
        description="Cultivar quem somos, colocar o propósito em prática e compartilhar tempo, conhecimento e cuidado. Três iniciativas que nascem dessa vontade de servir."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {servingInitiatives.map((item) => (
          <article key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('initiative_click', { initiative: item.id, location: 'home' })}
              className="group flex h-full flex-col border border-white/15 bg-[#11150e] p-6 transition-colors hover:border-[#d8ff57]/60 hover:bg-[#171d12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57] md:p-8"
            >
              <InitiativeLogo item={item} />
              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.18em] text-[#d8ff57]">{item.tag}</p>
              <h3 className="mt-3 text-2xl font-black text-white">{item.name}</h3>
              <p className="mt-4 flex-1 leading-relaxed text-white/70">{item.description}</p>
              <span className="mt-8 inline-flex min-h-11 items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm font-bold text-[#d8ff57]">
                {item.cta}
                <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </span>
              <span className="sr-only">Abre em uma nova aba.</span>
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ServingInitiatives;
