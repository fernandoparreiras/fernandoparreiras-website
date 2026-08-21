import React from 'react';
import { Linkedin, Youtube } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import SectionIntro from '@/components/SectionIntro';

const Contact = ({ full = false, defaultIntent = '', headingLevel = 'h2' }) => (
  <section id="contact" aria-labelledby="contact-title" className={`relative overflow-hidden bg-black ${full ? 'pb-24 pt-36 md:pb-32 md:pt-44' : 'border-t border-white/10 py-24 md:py-32'}`}>
    <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#d8ff57]/10 blur-[120px]" />
    <div className="container relative z-10 mx-auto px-6">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionIntro
            id="contact-title"
            eyebrow="Próximo passo"
            title="Conte o desafio."
            highlight="A rota vem depois."
            description="Você não precisa escolher a empresa ou o formato correto antes de conversar. O contexto permite encaminhar a demanda com responsabilidade."
            headingLevel={headingLevel}
          />
          <div className="mt-10 border-l border-[#d8ff57]/40 pl-6 text-sm leading-relaxed text-white/55">
            <p>Fernando responde pessoalmente às conversas relevantes e, quando necessário, conecta a demanda à Tech Human, Trustyu/FORGE, Needyu ou outra frente do ecossistema.</p>
          </div>
          <div className="mt-8 flex gap-4">
            <a href="https://www.linkedin.com/in/fernandoparreiras/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/60 hover:text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">
              <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
            </a>
            <a href="https://www.youtube.com/@sertalks" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/60 hover:text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">
              <Youtube className="h-4 w-4" aria-hidden="true" /> YouTube
            </a>
          </div>
        </div>
        <div className="lg:col-span-7">
          <LeadForm defaultIntent={defaultIntent} compact={!full} />
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
