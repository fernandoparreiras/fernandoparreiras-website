import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';

const About = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-[#050505] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(216,255,87,0.05),transparent_36%)]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -40 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="relative lg:col-span-5"
          >
            <div className="relative z-10 overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <img
                src="https://horizons-cdn.hostinger.com/14a398b6-efb9-41a9-82b2-d6d468f204e2/e1036369bc8b7069aa3fd4b83fb7ec32.png"
                alt="Retrato executivo de Fernando Parreiras"
                width="1024"
                height="1280"
                className="h-auto w-full object-cover"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 h-full w-full border border-[#d8ff57]/25" aria-hidden="true" />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.1 }}
            className="lg:col-span-7"
          >
            <SectionIntro
              id="about-title"
              eyebrow="Quem é Fernando Parreiras"
              title="Experiência técnica, decisão executiva e"
              highlight="cuidado com pessoas."
            />
            <div className="mt-8 space-y-5 text-lg font-light leading-relaxed text-white/68">
              <p>
                A trajetória começou na programação e atravessou produto, liderança, startups e empresas em diferentes fases — de estagiário a CTO, conselheiro, mentor e fundador.
              </p>
              <p>
                Hoje, Fernando atua onde estratégia, tecnologia, IA e desenvolvimento humano precisam deixar de ser discursos separados e se tornar decisões coerentes de negócio.
              </p>
              <p>
                O ecossistema reúne operação empresarial, produtos, construção de ventures, formação, mídia e iniciativas de propósito. Cada frente possui um papel diferente; este site ajuda a encontrar a porta certa.
              </p>
            </div>
            <a
              href="https://www.techhuman.com.br/sobre-nos-tecnologia/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex min-h-11 items-center gap-2 border-b border-[#d8ff57]/50 pb-1 font-bold text-[#d8ff57] transition-colors hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]"
            >
              Ver trajetória e evidências
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
