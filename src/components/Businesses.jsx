import React from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Users, Lightbulb } from 'lucide-react';

const Businesses = () => {
  const businesses = [
    {
      icon: Building2,
      title: 'Fundador & CEO',
      description: 'Liderança de empresas inovadoras com foco em crescimento sustentável e impacto de longo prazo.'
    },
    {
      icon: TrendingUp,
      title: 'Investidor Estratégico',
      description: 'Participação ativa em startups e scale-ups com potencial de transformação de mercado.'
    },
    {
      icon: Users,
      title: 'Board Member',
      description: 'Conselheiro em empresas nacionais e internacionais, contribuindo para decisões estratégicas.'
    },
    {
      icon: Lightbulb,
      title: 'Ecossistema de Inovação',
      description: 'Construção de redes colaborativas que conectam empreendedores, investidores e mentores.'
    }
  ];

  const carouselItems = [
    { name: "TECH HUMAN", url: "https://www.techhuman.com.br" },
    { name: "needyu.ai", url: "https://needyu.ai" },
    { name: "Trustyu.ai", url: "https://trustyu.com.br" },
    { name: "POR.life", url: "https://por.life" },
    { name: "JORNADA CAST", url: "https://www.jornadacast.com.br" },
    { name: "SER TALKS", url: "https://sertalks.life" },
    { name: "Zoe Seekers", url: "https://www.youtube.com/@zoeseekers" },
    { name: "ESSENDI PROGRAM", url: "https://www.essendiprogram.com.br" }
  ];

  const CarouselItem = ({ item }) => {
    const className = "text-xl md:text-2xl font-bold text-white/40 hover:text-[#d8ff57] transition-colors duration-300 px-8 whitespace-nowrap block";
    
    if (item.url) {
      return (
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${className} cursor-pointer hover:scale-105 transition-transform`}
        >
          {item.name}
        </a>
      );
    }
    
    return (
      <span className={`${className} cursor-default`}>
        {item.name}
      </span>
    );
  };

  return (
    <section id="businesses" className="py-24 bg-black border-t border-[#d8ff57]/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Negócios & <span className="text-[#d8ff57]">Ecossistema</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Uma rede integrada de empresas, investimentos e iniciativas que criam valor e transformam mercados.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {businesses.map((business, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#2a2b2d] border border-white/10 p-8 h-full hover:border-[#d8ff57]/50 transition-all duration-300">
                <business.icon className="w-12 h-12 text-[#d8ff57] mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-3">{business.title}</h3>
                <p className="text-white/60 leading-relaxed">{business.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Section */}
        <div className="pt-8 pb-4">
          <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center text-sm font-semibold tracking-wider text-white/50 uppercase mb-16"
          >
            INICIATIVAS E NEGÓCIOS DE TECNOLOGIA E HUMANIZAÇÃO
          </motion.h3>
          
          <div className="relative w-full overflow-hidden pause-on-hover group">
            <div className="flex w-fit animate-carousel">
              {/* First set of items */}
              <div className="flex gap-16 md:gap-24 items-center shrink-0 px-8">
                {carouselItems.map((item, index) => (
                  <CarouselItem key={`item-1-${index}`} item={item} />
                ))}
              </div>
              {/* Second set of items for seamless loop */}
              <div className="flex gap-16 md:gap-24 items-center shrink-0 px-8">
                {carouselItems.map((item, index) => (
                  <CarouselItem key={`item-2-${index}`} item={item} />
                ))}
              </div>
            </div>
            
            {/* Gradient masks for smooth fade effect at edges */}
            <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Businesses;