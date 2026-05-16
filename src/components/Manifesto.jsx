import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2 } from 'lucide-react';

const Manifesto = () => {
  const principles = [
    {
      title: "Permanecer",
      description: "A resiliência não é apenas resistir, é florescer. Manter-se firme na visão e nos valores, independentemente das tempestades.",
      reference: "João 15:7"
    },
    {
      title: "Excelência",
      description: "Entregar o extraordinário em cada detalhe. A qualidade do que construímos é o reflexo direto de quem somos.",
      reference: "Colossenses 3:23"
    },
    {
      title: "Semeadura",
      description: "Compreender que o sucesso de amanhã é resultado direto do que investimos hoje em pessoas, projetos e propósitos.",
      reference: "Gálatas 6:7"
    },
    {
      title: "Serviço",
      description: "A verdadeira liderança é medida pela capacidade de servir e elevar os outros ao seu potencial máximo.",
      reference: "Mateus 20:26"
    },
    {
      title: "Propósito",
      description: "Clareza de direção é poder. Quando o 'porquê' é forte, encontramos força para superar qualquer 'como'.",
      reference: "Provérbios 19:21"
    },
    {
      title: "Disciplina",
      description: "O fundamento da liberdade. É a capacidade de fazer o que precisa ser feito, criando hábitos que geram resultados.",
      reference: "2 Timóteo 1:7"
    },
    {
      title: "Luz",
      description: "Influenciar com integridade. Ser uma referência que ilumina caminhos, inspira confiança e dissipa a escuridão.",
      reference: "Mateus 5:16"
    }
  ];

  return (
    <section id="manifesto" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#d8ff57]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#d8ff57]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
             <span className="h-[1px] w-8 bg-[#d8ff57]/50"></span>
             <span className="text-[#d8ff57] text-sm font-bold uppercase tracking-widest">Nossa Base</span>
             <span className="h-[1px] w-8 bg-[#d8ff57]/50"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Princípios <span className="text-[#d8ff57]">Inegociáveis</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Valores fundamentais que orientam cada decisão, parceria e construção de futuro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {principles.slice(0, 4).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-[#161616] border border-white/5 p-8 rounded-xl hover:border-[#d8ff57]/40 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(216,255,87,0.1)] flex flex-col group-hover:-translate-y-1">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl font-black text-white/5 group-hover:text-[#d8ff57]/20 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <BookOpen className="w-5 h-5 text-[#d8ff57]/40 group-hover:text-[#d8ff57] transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#d8ff57] transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff57]"></span>
                  <span className="text-xs font-medium text-white/40 uppercase tracking-wider font-mono">
                    {item.reference}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row of principles - centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto">
          {principles.slice(4).map((item, index) => (
            <motion.div
              key={index + 4} // Use a unique key
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
              className="group"
            >
              <div className="h-full bg-[#161616] border border-white/5 p-8 rounded-xl hover:border-[#d8ff57]/40 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(216,255,87,0.1)] flex flex-col group-hover:-translate-y-1">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl font-black text-white/5 group-hover:text-[#d8ff57]/20 transition-colors duration-500">
                    {String(index + 5).padStart(2, '0')}
                  </span>
                  <BookOpen className="w-5 h-5 text-[#d8ff57]/40 group-hover:text-[#d8ff57] transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#d8ff57] transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff57]"></span>
                  <span className="text-xs font-medium text-white/40 uppercase tracking-wider font-mono">
                    {item.reference}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center border-t border-white/5 pt-16"
        >
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
            <span className="bg-[#d8ff57] text-black p-2 rounded-full mr-4">
              <CheckCircle2 size={20} />
            </span>
            <span className="pr-6 text-white/90 font-medium italic">
              "No final, a ética sempre confirma que o caminho escolhido valeu a pena."
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;