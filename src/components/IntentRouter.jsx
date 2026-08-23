import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Building2, Compass, Landmark, Mic2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionIntro from '@/components/SectionIntro';
import { intentPaths } from '@/data/commercialHub';
import { trackEvent } from '@/lib/analytics';

const iconMap = {
  building: Building2,
  compass: Compass,
  landmark: Landmark,
  mic: Mic2,
  sparkles: Sparkles
};

const IntentCard = ({ item, index }) => {
  const reduceMotion = useReducedMotion();
  const Icon = iconMap[item.icon] || Compass;
  const className = 'group flex h-full flex-col border border-black/10 bg-white p-7 text-black transition duration-300 hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_24px_70px_-32px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:p-8';
  const content = (
    <>
      <div className="flex items-start justify-between gap-6">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-black/55">{item.eyebrow}</span>
        <Icon className="h-6 w-6 text-black/65 transition-transform group-hover:scale-110" aria-hidden="true" />
      </div>
      <h3 className="mt-10 text-2xl font-black leading-tight md:text-3xl">{item.title}</h3>
      <p className="mt-4 flex-1 leading-relaxed text-black/65">{item.description}</p>
      <span className="mt-8 inline-flex items-center gap-2 text-sm font-black">
        {item.cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </>
  );
  const onClick = () => trackEvent('intent_select', { intent: item.id, destination: item.href });

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.06 }}
    >
      {item.external ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
          {content}
        </a>
      ) : (
        <Link to={item.href} className={className} onClick={onClick}>
          {content}
        </Link>
      )}
    </motion.article>
  );
};

const IntentRouter = () => (
  <section id="intentions" aria-labelledby="intentions-title" className="bg-[#eef0e9] py-24 text-black md:py-32">
    <div className="container mx-auto px-6">
      <div className="[&_h2]:!text-black [&_p]:!text-black/65 [&_span]:!text-black">
        <SectionIntro
          id="intentions-title"
          eyebrow="Escolha o ponto de partida"
          title="O que você precisa"
          highlight="mover agora?"
          description="Você não precisa conhecer todo o ecossistema. Comece pelo desafio; o site indica a rota mais coerente."
        />
      </div>
      <div className="mt-14 grid gap-px bg-black/10 md:grid-cols-2 xl:grid-cols-3">
        {intentPaths.map((item, index) => <IntentCard key={item.id} item={item} index={index} />)}
      </div>
    </div>
  </section>
);

export default IntentRouter;

