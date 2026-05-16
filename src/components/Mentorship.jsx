import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Briefcase, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Mentorship = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Target,
      title: 'Mentoria Executiva',
      description: 'Desenvolvimento personalizado para CEOs e líderes C-level que buscam acelerar resultados.'
    },
    {
      icon: Compass,
      title: 'Advisory Estratégico',
      description: 'Suporte contínuo para decisões críticas de negócio e planejamento de longo prazo.'
    },
    {
      icon: Briefcase,
      title: 'Conselho Consultivo',
      description: 'Participação ativa em boards e comitês estratégicos de empresas em crescimento.'
    },
    {
      icon: Users,
      title: 'Programas In-Company',
      description: 'Desenvolvimento de lideranças e times de alta performance dentro das organizações.'
    }
  ];

  return (
    <section id="mentorship" className="py-24 bg-black border-t border-[#d8ff57]/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mentoria, Advisory & <span className="text-[#d8ff57]">Conselho</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Acompanhamento estratégico para líderes e organizações que buscam transformação sustentável.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#2a2b2d] border border-white/10 p-8 h-full hover:border-[#d8ff57]/50 transition-all duration-300 flex items-start gap-6">
                <service.icon className="w-10 h-10 text-[#d8ff57] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/70 leading-relaxed">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#d8ff57] text-black p-12 rounded-sm text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Pronto para transformar sua liderança?</h3>
          <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
            Agende uma conversa estratégica para entender como podemos acelerar seus resultados.
          </p>
          <Button
            onClick={scrollToContact}
            className="bg-black text-white hover:bg-black/90 font-semibold px-8 py-6 rounded-none text-base transition-all duration-300"
          >
            Iniciar conversa
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Mentorship;