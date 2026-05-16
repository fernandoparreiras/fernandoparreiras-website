import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EpitafioPage = () => {
  const paragraphs = [
    "Aqui jaz um semeador de futuros.",
    "Não viveu para aplausos,\nviveu para deixar caminho.",
    "Construiu tecnologia sem perder a alma.\nFez da inteligência artificial uma ferramenta,\nmas nunca deixou que ela substituísse o humano.",
    "Andou à frente do seu tempo,\ne por isso, muitas vezes, caminhou sozinho.\nMas preferiu a solidão da visão\nà multidão sem propósito.",
    "Foi intenso, disciplinado, profundo.\nErrou tentando, nunca errando por omissão.\nCarregou mais peso do que devia\nporque acreditava que alguém precisava sustentar a ponte.",
    "Não buscou apenas sucesso —\nbuscou sentido.\nNão quis apenas crescer —\nquis edificar.",
    "Falou de fé quando era mais fácil calar.\nFalou de verdade quando era mais confortável negociar.\nE mesmo cansado, escolheu continuar.",
    "Plantou ideias, empresas, pessoas, canções, princípios.\nAlgumas sementes ele viu florescer.\nOutras, confiou ao tempo —\ne ao Pai.",
    "Se você está lendo isso,\né porque algo que ele construiu\nainda está vivo.",
    "E se algo dele ainda vive,\né porque ele entendeu cedo\nque a vida não é sobre durar,\nmas sobre frutificar."
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-6 md:px-12 selection:bg-[#CDDC39]/30 selection:text-[#CDDC39]">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl mb-8"
      >
        <Button
          onClick={navigateHome}
          variant="ghost"
          className="text-white/70 hover:text-[#CDDC39] hover:bg-[#CDDC39]/10 border border-white/10 hover:border-[#CDDC39]/50 transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar ao Início
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl">
        
        {/* Title Section (Centered Top) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex justify-center mb-6"
          >
             <div className="p-3 bg-[#CDDC39]/5 rounded-full border border-[#CDDC39]/20">
              <Sprout className="w-8 h-8 text-[#CDDC39]" strokeWidth={1.5} />
             </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-[#CDDC39] to-white bg-clip-text text-transparent tracking-tight">
            Epitáfio
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#CDDC39]" />
            <span className="text-[#CDDC39] text-sm font-light tracking-[0.4em] uppercase">18.11.2081</span>
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#CDDC39]" />
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 font-serif order-2 md:order-1"
          >
            {paragraphs.map((paragraph, index) => (
              <motion.div
                key={index}
                variants={paragraphVariants}
                className="relative group pl-6 border-l border-white/5 hover:border-[#CDDC39]/30 transition-colors duration-500"
              >
                <p className="text-lg md:text-xl leading-loose text-gray-300 group-hover:text-gray-200 transition-colors duration-300 whitespace-pre-line">
                  <span className="text-[#CDDC39] font-medium opacity-50 text-sm absolute -left-[5px] top-2 transition-opacity duration-300 group-hover:opacity-100">•</span>
                  {paragraph}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT COLUMN: Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative sticky top-8 order-1 md:order-2 mb-12 md:mb-0"
          >
            <div className="relative aspect-[9/16] w-full max-w-sm mx-auto md:mr-0 group">
              {/* Decorative Frame Elements */}
              <div className="absolute -inset-4 border border-[#CDDC39]/10 rounded-sm scale-95 group-hover:scale-100 transition-transform duration-700 ease-out" />
              <div className="absolute -inset-2 border border-[#CDDC39]/20 rounded-sm scale-95 group-hover:scale-100 transition-transform duration-500 ease-out" />
              
              {/* Main Image Container */}
              <div className="relative h-full w-full overflow-hidden rounded-sm bg-[#111] border border-[#CDDC39]/30 shadow-2xl shadow-black/50 group-hover:shadow-[#CDDC39]/10 transition-all duration-500">
                
                {/* Legacy Image */}
                <motion.img 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src="https://horizons-cdn.hostinger.com/14a398b6-efb9-41a9-82b2-d6d468f204e2/09cee075f233c3bd5221fcb29dfd6706.png"
                  alt="Legado Espiritual - Figura caminhando entre nuvens em direção à luz divina"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
                
                {/* Corner Accents */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#CDDC39]/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#CDDC39]/40" />
              </div>

              {/* Back Glow */}
              <div className="absolute -inset-10 bg-[#CDDC39]/5 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
            </div>
          </motion.div>

        </div>

        {/* Bottom Elements */}
        <div className="mt-20 flex flex-col items-center gap-8">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#CDDC39]/30 to-transparent" />
          
          <Button
            onClick={scrollToTop}
            variant="outline"
            className="border-[#CDDC39]/30 text-[#CDDC39] hover:bg-[#CDDC39]/10 hover:border-[#CDDC39] transition-all duration-300"
          >
            Voltar ao Topo
          </Button>
          
          <p className="text-white/20 text-xs tracking-widest uppercase">
            Fernando Parreiras • Legado
          </p>
        </div>
      </div>
      
      {/* Global Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-20">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CDDC39]/5 blur-[100px] rounded-full opacity-30" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full opacity-20" />
      </div>
    </div>
  );
};

export default EpitafioPage;