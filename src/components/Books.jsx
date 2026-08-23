import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, FileText, ExternalLink, GraduationCap, FileCode, ArrowRight, Plus, Minus, Play, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Books = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainBooks = [
    {
      title: 'LIVRO SER',
      tag: 'Livro',
      tagType: 'book',
      image: '/images/content/books/livro-ser.webp',
      width: 764,
      height: 1024,
      description: 'Quem é o seu SER? Uma reflexão profunda sobre identidade, propósito e como curtir a jornada da vida além de profissões e negócios.',
      link: 'https://a.co/d/26dOrHC'
    },
    {
      title: 'JORNADA CTO',
      tag: 'Ebook',
      tagType: 'ebook',
      image: '/images/content/books/jornada-cto.webp',
      width: 298,
      height: 466,
      description: 'Seu guia essencial para dominar o papel de Chief Technology Officer. Insights valiosos e estratégias práticas.',
      link: 'https://a.co/d/0lUTGDJ'
    },
    {
      title: 'PRINCÍPIOS',
      subtitle: 'PARA EMPRESAS E ORGANIZAÇÕES',
      tag: 'Ebook',
      tagType: 'ebook',
      image: '/images/content/books/principios-empresas-organizacoes.webp',
      width: 326,
      height: 522,
      description: 'Defina visão, missão e princípios inegociáveis. Construa empresas que prosperam sem abrir mão da ética.',
      link: 'https://a.co/d/1hu3LQY'
    }
  ];

  const businessBooks = [
    {
      title: 'GESTÃO ESTRATÉGICA DE PESSOAS',
      tag: 'Ebook',
      link: 'https://a.co/d/5dmIvSO',
      image: '/images/content/books/gestao-estrategica-pessoas.webp',
      width: 1024,
      height: 1600
    },
    {
      title: 'ANÁLISE DE MERCADO',
      tag: 'Ebook',
      link: 'https://a.co/d/aLfsdMP',
      image: '/images/content/books/analise-de-mercado.webp',
      width: 1024,
      height: 1600
    },
    {
      title: 'GESTÃO OPERACIONAL',
      tag: 'Ebook',
      link: 'https://a.co/d/2kcr2nE',
      image: '/images/content/books/gestao-operacional.webp',
      width: 1024,
      height: 1600
    },
    {
      title: 'GESTÃO DE MUDANÇAS',
      tag: 'Ebook',
      link: 'https://a.co/d/e2MJlOV',
      image: '/images/content/books/gestao-de-mudancas.webp',
      width: 1024,
      height: 1600
    }
  ];

  const personalBooks = [
    {
      title: 'REFLEXÕES - CARTAS PARA O SER',
      tag: 'Ebook',
      link: 'https://chk.eduzz.com/1924106',
      image: '/images/content/books/reflexoes-cartas-para-o-ser.webp',
      width: 1410,
      height: 2250
    },
    {
      title: 'CRIE SEU PLANO DE PROPÓSITO',
      tag: 'Ebook',
      link: 'https://chk.eduzz.com/1887737',
      image: '/images/content/books/plano-de-proposito.webp',
      width: 512,
      height: 800
    },
    {
      title: 'LIDERANÇA HUMANIZADA',
      tag: 'Ebook',
      link: 'https://chk.eduzz.com/1887768',
      image: '/images/content/books/lideranca-humanizada.webp',
      width: 512,
      height: 800
    },
    {
      title: 'AUTOCONHECIMENTO ATRAVÉS DAS ARTES MARCIAIS',
      tag: 'Ebook',
      link: 'https://chk.eduzz.com/1887789',
      image: '/images/content/books/autoconhecimento-artes-marciais.webp',
      width: 1080,
      height: 1920
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'book': return <Book className="w-4 h-4" />;
      case 'ebook': return <FileCode className="w-4 h-4" />;
      case 'course': return <GraduationCap className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      default: return <Book className="w-4 h-4" />;
    }
  };

  const getTagColor = (type) => {
    switch (type) {
      case 'book': return 'bg-[#d8ff57]/20 text-[#d8ff57] border-[#d8ff57]/50';
      case 'ebook': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-white/10 text-white/70 border-white/20';
    }
  };

  const renderBookGrid = (books, sectionTitle) => (
    <div className="mb-12 last:mb-0">
      <div className="flex items-center gap-4 mb-6">
         <div className="h-[1px] bg-[#d8ff57] w-8"></div>
         <h3 className="text-lg font-semibold text-white/90 uppercase tracking-widest">{sectionTitle}</h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.map((book, idx) => (
          <a 
            key={idx} 
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-black/40 hover:bg-black border border-white/5 hover:border-[#d8ff57]/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
          >
            <div className="aspect-[3/4] w-full bg-[#1a1a1a] rounded overflow-hidden relative">
               {book.image ? (
                  <img 
                    src={book.image}
                    alt={`Capa do livro ${book.title}`} 
                    width={book.width}
                    height={book.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                  />
               ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(216,255,87,0.16),transparent_55%)] text-[#d8ff57]" aria-hidden="true">
                    <Book className="h-10 w-10" />
                  </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[10px] font-bold text-[#d8ff57] uppercase tracking-wider">{book.tag}</span>
               </div>
            </div>
            
            <div className="flex items-start justify-between gap-2">
               <h4 className="text-sm font-medium text-white group-hover:text-[#d8ff57] transition-colors leading-tight line-clamp-2">
                 {book.title}
               </h4>
               <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#d8ff57] group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <section id="books" className="py-24 bg-[#2a2b2d] border-t border-[#d8ff57]/20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Acervo & <span className="text-[#d8ff57]">Conteúdo</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Compartilhando insights e frameworks desenvolvidos ao longo de décadas de experiência.
          </p>
        </motion.div>

        {/* Main Books Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {mainBooks.map((book, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col h-full"
            >
              <div className="bg-black border border-white/10 rounded-lg overflow-hidden h-full hover:border-[#d8ff57]/50 transition-all duration-300 flex flex-col shadow-lg hover:shadow-[#d8ff57]/10">
                
                {/* Compact Image Area */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    width={book.width}
                    height={book.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {/* Tag Overlay */}
                  <div className="absolute top-3 left-3">
                     <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-md ${getTagColor(book.tagType)}`}>
                        {getIcon(book.tagType)}
                        {book.tag}
                     </span>
                  </div>
                </div>

                {/* Compact Content Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-0.5 group-hover:text-[#d8ff57] transition-colors">
                      {book.title}
                    </h3>
                    {book.subtitle && (
                      <p className="text-[10px] text-white/50 uppercase tracking-wider font-medium">
                        {book.subtitle}
                      </p>
                    )}
                  </div>
                  
                  <p className="text-white/60 leading-relaxed text-sm mb-5 flex-grow line-clamp-3">
                    {book.description}
                  </p>
                  
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between border border-white/10 hover:border-[#d8ff57]/50 hover:bg-[#d8ff57]/10 text-white hover:text-[#d8ff57] group/btn mt-auto"
                  >
                    <a href={book.link} target="_blank" rel="noopener noreferrer">
                      Adquirir
                      <ExternalLink className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Media & Creations Section */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
               <div className="h-[1px] bg-[#d8ff57] w-12"></div>
               <h3 className="text-lg font-bold text-white uppercase tracking-widest">Mídia & Criações</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* TED Card */}
            <motion.a
              href="https://www.ted.com/talks/fernando_parreiras_ser"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-lg bg-black border border-white/10 hover:border-[#d8ff57] transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                 <img alt="Fernando Parreiras no palco do TEDx Ibituruna durante a palestra SER" width="1600" height="900" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" src="/images/content/media/tedx-ser.webp" />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#d8ff57] text-black flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(216,255,87,0.4)]">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                 </div>
              </div>
              <div className="p-6 flex flex-col flex-grow bg-[#161616]">
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-white font-bold text-[10px] tracking-widest uppercase bg-[#e62b1e] px-2 py-1 rounded">TED Talks</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#d8ff57] transition-colors">SER - TED TALKS</h3>
                <p className="text-white/60 text-sm mb-6 flex-grow leading-relaxed">
                  Uma reflexão profunda sobre identidade e propósito. Descubra como o autoconhecimento pode transformar sua trajetória pessoal e profissional nesta palestra oficial.
                </p>
                <span className="text-[#d8ff57] text-sm font-bold flex items-center gap-2 mt-auto uppercase tracking-wide">
                   Assistir no TED <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>

            {/* Spotify Card */}
            <motion.a
              href="https://open.spotify.com/artist/200NAUuo4aOwr7OOX7cVCd?si=HpQ01YWOT3WLHyHUOjw8Ng"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-lg bg-black border border-white/10 hover:border-[#1DB954] transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                 <img alt="Capa do projeto POR Music de Fernando Parreiras no Spotify" width="1600" height="900" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" src="/images/content/media/por-music.webp" />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#1DB954] text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(29,185,84,0.4)]">
                      <Headphones className="w-8 h-8" />
                    </div>
                 </div>
              </div>
              <div className="p-6 flex flex-col flex-grow bg-[#161616]">
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-white font-bold text-[10px] tracking-widest uppercase bg-[#1DB954] px-2 py-1 rounded">Spotify</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#1DB954] transition-colors">Ouça Minhas Criações</h3>
                <p className="text-white/60 text-sm mb-6 flex-grow leading-relaxed">
                  Músicas e áudios para inspirar, relaxar e conectar. Uma jornada sonora imersiva através de composições originais.
                </p>
                <span className="text-[#1DB954] text-sm font-bold flex items-center gap-2 mt-auto uppercase tracking-wide">
                   Ouça no Spotify <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          </div>
        </div>

        {/* Toggle Button Area */}
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group relative flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-white/5 hover:bg-[#d8ff57]/10 border border-white/10 hover:border-[#d8ff57] transition-all duration-300 cursor-pointer"
            >
                <span className="text-sm font-semibold tracking-wide text-white group-hover:text-[#d8ff57]">
                    {isExpanded ? 'VER MENOS' : 'BIBLIOTECA COMPLETA'}
                </span>
                <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-[#d8ff57] text-black transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
            </button>
            {!isExpanded && (
                <p className="text-xs text-white/60 animate-pulse">
                    Clique para ver mais publicações
                </p>
            )}
        </div>

        {/* Expandable Library Section */}
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                >
                    <div className="border-t border-white/5 pt-12 max-w-6xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                           <h3 className="text-2xl font-bold text-white mb-0">Biblioteca Completa</h3>
                        </div>
                        
                        {renderBookGrid(businessBooks, "Negócios")}
                        {renderBookGrid(personalBooks, "Pessoal")}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Books;
