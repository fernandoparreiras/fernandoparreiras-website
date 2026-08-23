import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import { trackEvent } from '@/lib/analytics';

const photos = [
  {
    id: 'principal',
    src: '/images/em-cena/fernando-parreiras-palestra-principal-1122.webp',
    srcSet: '/images/em-cena/fernando-parreiras-palestra-principal-720.webp 720w, /images/em-cena/fernando-parreiras-palestra-principal-1122.webp 1122w',
    sizes: '(min-width: 1024px) 42vw, 100vw',
    alt: 'Fernando Parreiras em uma palestra, usando microfone de cabeça e gesticulando no palco.',
    className: 'col-span-2 row-span-2 lg:col-span-5 lg:row-span-2',
    objectPosition: 'object-center',
    number: '01'
  },
  {
    id: 'microfone',
    src: '/images/em-cena/fernando-parreiras-palestra-microfone-1600.webp',
    srcSet: '/images/em-cena/fernando-parreiras-palestra-microfone-720.webp 720w, /images/em-cena/fernando-parreiras-palestra-microfone-1600.webp 1600w',
    sizes: '(min-width: 1024px) 58vw, 100vw',
    alt: 'Fernando Parreiras sorrindo durante uma apresentação com microfones em primeiro plano.',
    className: 'col-span-2 lg:col-span-7',
    objectPosition: 'object-[68%_18%]',
    number: '02'
  },
  {
    id: 'palco',
    src: '/images/em-cena/fernando-parreiras-palco-1600.webp',
    srcSet: '/images/em-cena/fernando-parreiras-palco-720.webp 720w, /images/em-cena/fernando-parreiras-palco-1600.webp 1600w',
    sizes: '(min-width: 1024px) 33vw, 50vw',
    alt: 'Fernando Parreiras apresentando no palco diante de uma tela iluminada.',
    className: 'col-span-1 lg:col-span-4',
    objectPosition: 'object-[50%_20%]',
    number: '03',
    compactCaption: true
  },
  {
    id: 'techhuman',
    src: '/images/em-cena/fernando-parreiras-palestra-techhuman-1600.webp',
    srcSet: '/images/em-cena/fernando-parreiras-palestra-techhuman-720.webp 720w, /images/em-cena/fernando-parreiras-palestra-techhuman-1600.webp 1600w',
    sizes: '(min-width: 1024px) 25vw, 50vw',
    alt: 'Fernando Parreiras falando ao público durante uma palestra da Tech Human.',
    className: 'col-span-1 lg:col-span-3',
    objectPosition: 'object-[50%_36%]',
    number: '04',
    compactCaption: true
  }
];

const InActionGallery = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="em-cena" aria-labelledby="em-cena-title" className="relative overflow-hidden border-t border-white/10 bg-[#101112] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_8%,rgba(216,255,87,0.08),transparent_30%)]" />
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-8">
            <SectionIntro id="em-cena-title" eyebrow="Fernando em cena" title="Ideias que saem do slide e" highlight="ganham o palco." />
          </div>
          <div className="lg:col-span-4">
            <p className="text-base font-light leading-relaxed text-white/65 md:text-lg">
              Palestras e conversas sobre tecnologia, negócios e desenvolvimento humano — transformando complexidade em clareza para agir.
            </p>
            <Link
              to="/palestras"
              onClick={() => trackEvent('content_cta_click', { content: 'em_cena', destination: 'palestras' })}
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]"
            >
              Ver temas e formatos <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[260px] md:gap-4 lg:auto-rows-[300px] lg:grid-cols-12">
          {photos.map((photo, index) => (
            <motion.figure
              key={photo.id}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.08 }}
              className={`group relative min-h-0 overflow-hidden bg-black ${photo.className}`}
            >
              <img
                src={photo.src}
                srcSet={photo.srcSet}
                sizes={photo.sizes}
                alt={photo.alt}
                width="1600"
                height="2000"
                loading="lazy"
                decoding="async"
                className={`h-full w-full object-cover transition duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.025] motion-reduce:group-hover:scale-100 ${photo.objectPosition}`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <figcaption className="absolute bottom-4 left-4 flex items-center gap-3 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 sm:text-xs sm:tracking-[0.2em] md:bottom-5 md:left-5">
                <span className="text-[#d8ff57]">{photo.number}</span>
                <span className={photo.compactCaption ? 'hidden sm:inline' : undefined}>Fernando Parreiras</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InActionGallery;

