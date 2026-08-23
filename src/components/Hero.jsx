import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';

const Hero = () => {
  const reduceMotion = useReducedMotion();

  const scrollToIntentions = () => {
    trackEvent('hero_cta_click', { cta: 'primary', destination: 'intentions' });
    document.getElementById('intentions')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section id="hero" className="relative flex min-h-[92svh] items-end overflow-hidden bg-[#080909] pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_26%,rgba(216,255,87,0.12),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_45%)]" />
      <div className="pointer-events-none absolute right-[8%] top-[18%] hidden h-[46vh] w-px bg-gradient-to-b from-transparent via-[#d8ff57]/35 to-transparent lg:block" />
      <div className="container relative z-10 mx-auto px-6 pb-20 md:pb-28 lg:pb-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="max-w-6xl"
        >
          <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/55">
            <span className="h-px w-10 bg-[#d8ff57]" aria-hidden="true" />
            <span>Empresário</span>
            <span aria-hidden="true">•</span>
            <span>Advisor</span>
            <span aria-hidden="true">•</span>
            <span>Construtor de negócios</span>
          </div>
          <h1 className="max-w-6xl text-5xl font-black leading-[0.94] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[6.4rem]">
            Estratégia, tecnologia e IA para transformar decisões em{' '}
            <span className="text-[#d8ff57]">negócios que permanecem.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
            Fernando Parreiras conecta experiência executiva, construção de produtos, liderança e um ecossistema de negócios para ajudar empresas e líderes a avançarem com clareza e responsabilidade.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={scrollToIntentions}
              className="group inline-flex min-h-14 items-center justify-center gap-3 bg-[#d8ff57] px-7 font-black text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]"
            >
              Quero mover um desafio
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
            </button>
            <Link
              to="/negocios"
              onClick={() => trackEvent('hero_cta_click', { cta: 'secondary', destination: 'negocios' })}
              className="group inline-flex min-h-14 items-center justify-center gap-3 border border-white/25 px-7 font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explorar o ecossistema
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              to="/palestras"
              onClick={() => trackEvent('hero_cta_click', { cta: 'tertiary', destination: 'palestras' })}
              className="inline-flex min-h-12 items-center justify-center gap-2 px-3 text-sm font-bold text-white/70 transition-colors hover:text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]"
            >
              <Briefcase className="h-4 w-4" aria-hidden="true" />
              Contratar palestra
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
