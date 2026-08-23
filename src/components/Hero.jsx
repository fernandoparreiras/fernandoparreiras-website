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
    <section id="hero" className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#080909] pt-28 lg:min-h-[92svh] lg:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_24%,rgba(216,255,87,0.13),transparent_25%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_45%)]" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.035, x: 24 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-20 h-[38svh] overflow-hidden sm:h-[42svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[49%]"
        aria-hidden="true"
      >
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/images/em-cena/fernando-parreiras-palestra-principal-720.webp"
          />
          <img
            src="/images/em-cena/fernando-parreiras-palestra-principal-1122.webp"
            alt=""
            width="1122"
            height="1402"
            loading="eager"
            className="h-full w-full object-cover object-[50%_24%] opacity-90 saturate-[0.92] lg:object-[50%_42%] lg:opacity-85"
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-b from-[#080909]/5 via-transparent to-[#080909] lg:bg-gradient-to-r lg:from-[#080909] lg:via-[#080909]/35 lg:to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_28%,transparent_0%,rgba(8,9,9,0.03)_42%,rgba(8,9,9,0.74)_100%)]" />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-[39svh] h-40 bg-gradient-to-b from-transparent to-[#080909] sm:top-[43svh] lg:hidden" />
      <div className="pointer-events-none absolute right-[6%] top-[17%] hidden h-[54vh] w-px bg-gradient-to-b from-transparent via-[#d8ff57]/45 to-transparent lg:block" />

      <div className="container relative z-10 mx-auto px-6 pb-16 pt-[35svh] sm:pt-[39svh] md:pb-24 lg:pb-24 lg:pt-0">
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
          <h1 className="max-w-6xl text-[2.65rem] font-black leading-[0.94] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:max-w-[54rem] lg:text-[5rem] xl:max-w-[64rem] xl:text-[5.75rem] 2xl:max-w-6xl 2xl:text-[6.4rem]">
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
