import React from 'react';
import { Sprout } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigateToEpitafio = () => {
    window.location.hash = '#/epitafio';
  };

  return (
    <footer className="bg-black border-t border-[#d8ff57]/20 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/50 text-sm">
            © {currentYear} Fernando Parreiras. Todos os direitos reservados.
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs">Construído com propósito</span>
            
            <button
              onClick={navigateToEpitafio}
              className="flex items-center gap-2 text-white/40 hover:text-[#CDDC39] transition-colors duration-300 group"
            >
              <Sprout className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Epitáfio 18.11.2081</span>
            </button>
            
            <div className="w-2 h-2 bg-[#d8ff57] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;