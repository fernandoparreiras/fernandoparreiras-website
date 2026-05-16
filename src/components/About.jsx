import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(216,255,87,0.03),transparent_40%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative z-10 rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10" />
              <img 
                src="https://horizons-cdn.hostinger.com/14a398b6-efb9-41a9-82b2-d6d468f204e2/e1036369bc8b7069aa3fd4b83fb7ec32.png" 
                alt="Fernando Parreiras - Executive Portrait" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            
            {/* Decorative Elements behind image */}
            <div className="absolute -top-6 -left-6 w-full h-full border border-[#d8ff57]/20 rounded-lg -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d8ff57]/5 blur-3xl rounded-full -z-10" />
          </motion.div>

          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-12 h-[1px] bg-[#d8ff57]"></span>
                <span className="text-[#d8ff57] font-semibold tracking-widest text-sm uppercase">Quem é Fernando Parreiras</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Construindo Legados através da <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8ff57] to-white">Liderança e Inovação</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed">
              <p>
                Empresário, investidor e conselheiro com uma trajetória marcada pela construção de negócios sólidos e pela formação de líderes estratégicos. Fernando Parreiras atua na interseção entre tecnologia, gestão e desenvolvimento humano, liderando iniciativas que transformam mercados e impulsionam o crescimento sustentável.
              </p>
              
              <p>
                Como fundador e CEO de múltiplas empresas, sua expertise vai além da teoria: ele vive o dia a dia da tomada de decisão, da gestão de riscos e da inovação prática. Sua atuação como advisor e mentor é fundamentada em princípios éticos inegociáveis e em uma visão de longo prazo que prioriza a perenidade dos negócios.
              </p>

              <p>
                Criador de metodologias proprietárias de gestão e autor de obras sobre liderança, Fernando dedica-se a equipar a próxima geração de executivos e empreendedores com as ferramentas necessárias para navegar em cenários complexos com clareza, propósito e excelência.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-8 md:gap-16">
              <div>
                <span className="block text-3xl font-bold text-white mb-1">20+</span>
                <span className="text-sm text-white/50 uppercase tracking-wider">Anos de Experiência</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white mb-1">Multi</span>
                <span className="text-sm text-white/50 uppercase tracking-wider">Setores de Atuação</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white mb-1">Global</span>
                <span className="text-sm text-white/50 uppercase tracking-wider">Mindset & Alcance</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;