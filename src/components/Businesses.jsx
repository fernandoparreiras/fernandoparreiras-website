import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionIntro from '@/components/SectionIntro';
import { ecosystemGroups } from '@/data/commercialHub';
import { trackEvent } from '@/lib/analytics';

const BusinessCard = ({ item, group, index }) => {
  const reduceMotion = useReducedMotion();
  const external = item.href.startsWith('http');
  const className = 'group flex h-full flex-col border border-white/10 bg-[#111211] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d8ff57]/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57] md:p-7';
  const content = (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d8ff57]">{item.tag}</span>
        {item.status && <span className="border border-white/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white/55">{item.status}</span>}
      </div>
      <h4 className="mt-6 text-2xl font-black text-white transition-colors group-hover:text-[#d8ff57]">{item.name}</h4>
      <p className="mt-4 flex-1 leading-relaxed text-white/60">{item.description}</p>
      <p className="mt-6 border-t border-white/10 pt-5 text-xs font-semibold uppercase tracking-[0.12em] text-white/38">{item.audience}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
        {item.cta}
        {external ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </span>
    </>
  );
  const onClick = () => trackEvent('business_click', { business: item.name, group: group.id });

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.04 }}
    >
      {external ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{content}</a>
      ) : (
        <Link to={item.href} className={className} onClick={onClick}>{content}</Link>
      )}
    </motion.article>
  );
};

const Businesses = ({ preview = false }) => {
  const groups = preview
    ? ecosystemGroups.map((group) => ({ ...group, items: group.items.slice(0, group.id === 'purpose' ? 3 : 2) }))
    : ecosystemGroups;

  return (
    <section id="businesses" aria-labelledby="businesses-title" className="border-t border-white/10 bg-black py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            id="businesses-title"
            eyebrow="Negócios e ecossistema"
            title="Cada frente tem um papel."
            highlight="Cada desafio, uma porta."
            description="Operação comercial, produtos, ventures, formação, mídia e propósito organizados sem misturar maturidade ou intenção."
          />
          {preview && (
            <Link to="/negocios" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-bold text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">
              Ver mapa completo <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className="mt-16 space-y-16">
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={`group-${group.id}`}>
              <div className="mb-7 grid gap-3 md:grid-cols-12 md:items-end">
                <h3 id={`group-${group.id}`} className="text-xl font-black text-white md:col-span-4">{group.label}</h3>
                <p className="max-w-2xl text-sm leading-relaxed text-white/50 md:col-span-8">{group.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item, index) => (
                  <BusinessCard key={item.name} item={item} group={group} index={index} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Businesses;
