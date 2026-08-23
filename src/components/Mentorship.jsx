import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Compass, Landmark, Mic2, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionIntro from '@/components/SectionIntro';
import { offerCatalog } from '@/data/commercialHub';
import { trackEvent } from '@/lib/analytics';

const cards = [
  { ...offerCatalog['advisory-executivo'], icon: Compass, href: '/solucoes/advisory-executivo' },
  { ...offerCatalog.conselho, icon: Landmark, href: '/solucoes/conselho' },
  { ...offerCatalog['transformacao-tecnologia-ia'], icon: Workflow, href: '/solucoes/transformacao-tecnologia-ia' },
  {
    title: 'Palestras e Workshops',
    eyebrow: 'Eventos e times',
    summary: 'Keynotes e conversas executivas sobre IA, negócios, tecnologia, liderança e desenvolvimento humano.',
    deliverables: ['Briefing com o contexto do evento', 'Tema e formato adequados à audiência'],
    icon: Mic2,
    href: '/palestras',
    cta: 'Ver palestras'
  }
];

const Mentorship = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="border-t border-white/10 bg-[#080909] py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            id="solutions-title"
            eyebrow="Soluções"
            title="A experiência entra onde a"
            highlight="decisão precisa melhorar."
            description="Ofertas com comprador, situação, resultado e próximo passo claros — sem confundir aconselhamento com execução."
          />
          <Link to="/solucoes" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-bold text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">
            Comparar soluções <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.05 }}
                className="group flex h-full flex-col border border-white/10 bg-[#111211] p-7 transition-colors hover:border-[#d8ff57]/45 md:p-9"
              >
                <div className="flex items-center justify-between gap-5">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#d8ff57]">{card.eyebrow}</span>
                  <Icon className="h-6 w-6 text-white/45" aria-hidden="true" />
                </div>
                <h3 className="mt-7 text-3xl font-black text-white">{card.title}</h3>
                <p className="mt-4 leading-relaxed text-white/60">{card.summary}</p>
                <ul className="mt-7 space-y-3 text-sm text-white/62">
                  {card.deliverables.slice(0, 2).map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d8ff57]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={card.href}
                  onClick={() => trackEvent('offer_view', { offer: card.title, source: 'home' })}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 self-start font-bold text-white transition-colors group-hover:text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]"
                >
                  {card.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mentorship;
