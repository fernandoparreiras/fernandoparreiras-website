import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionIntro from '@/components/SectionIntro';
import { caseStudies } from '@/data/commercialHub';
import { trackEvent } from '@/lib/analytics';

const CaseStudies = ({ limit }) => {
  const reduceMotion = useReducedMotion();
  const cases = limit ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <section id="cases" aria-labelledby="cases-title" className="bg-[#eef0e9] py-24 text-black md:py-32">
      <div className="container mx-auto px-6">
        <div className="[&_h2]:!text-black [&_p]:!text-black/65 [&_span]:!text-black">
          <SectionIntro
            id="cases-title"
            eyebrow="Evidência de atuação"
            title="Menos adjetivo."
            highlight="Mais contexto."
            description="Casos apresentados a partir de material público da Tech Human, sem acrescentar métricas ou resultados não autorizados."
          />
        </div>
        <div className="mt-14 grid gap-px bg-black/15 lg:grid-cols-2">
          {cases.map((item, index) => (
            <motion.article
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.05 }}
              className="flex h-full flex-col bg-white p-7 md:p-9"
              onViewportEnter={() => trackEvent('case_view', { case_id: item.id })}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-black/50">{item.category}</p>
                  <h3 className="mt-3 text-3xl font-black text-black">{item.client}</h3>
                </div>
                <CheckCircle2 className="h-6 w-6 shrink-0 text-black/50" aria-hidden="true" />
              </div>
              <p className="mt-7 text-base leading-relaxed text-black/68"><strong className="text-black">Desafio:</strong> {item.challenge}</p>
              <p className="mt-4 text-base leading-relaxed text-black/68"><strong className="text-black">Papel:</strong> {item.role}</p>
              <p className="mt-4 flex-1 text-base leading-relaxed text-black/68"><strong className="text-black">Atuação:</strong> {item.work}</p>
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-2 border-t border-black/10 pt-5 text-sm font-black text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                Ver fonte pública <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>
        {limit && (
          <Link to="/cases" className="mt-10 inline-flex min-h-11 items-center gap-2 font-black text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
            Ver todos os casos <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;

