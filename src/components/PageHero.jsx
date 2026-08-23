import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PageHero = ({ eyebrow, title, highlight, description, children }) => {
  const reduceMotion = useReducedMotion();

  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-[#080909] pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="pointer-events-none absolute -right-20 top-12 h-96 w-96 rounded-full bg-[#d8ff57]/10 blur-[130px]" />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 26 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="container relative z-10 mx-auto px-6"
      >
        <div className="max-w-5xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d8ff57]" aria-hidden="true" />
            <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d8ff57]">{eyebrow}</span>
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-7xl lg:text-8xl">
            {title} {highlight && <span className="text-[#d8ff57]">{highlight}</span>}
          </h1>
          {description && <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">{description}</p>}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </motion.div>
    </header>
  );
};

export default PageHero;

