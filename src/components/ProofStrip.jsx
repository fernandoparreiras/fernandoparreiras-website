import React from 'react';
import { proofPoints } from '@/data/commercialHub';

const ProofStrip = () => (
  <section aria-label="Evidências da trajetória" className="border-y border-white/10 bg-[#0a0b0b]">
    <div className="container mx-auto grid px-6 sm:grid-cols-2 xl:grid-cols-4">
      {proofPoints.map((item) => (
        <a
          key={item.value}
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group border-b border-white/10 py-9 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#d8ff57] sm:px-7 sm:odd:border-r xl:border-b-0 xl:border-r xl:first:pl-0 xl:last:border-r-0"
          aria-label={`${item.value}: ${item.label}. Fonte: ${item.source}`}
        >
          <strong className="block text-3xl font-black text-white transition-colors group-hover:text-[#d8ff57]">{item.value}</strong>
          <span className="mt-2 block text-sm leading-relaxed text-white/55">{item.label}</span>
          <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">Fonte: {item.source}</span>
        </a>
      ))}
    </div>
  </section>
);

export default ProofStrip;
