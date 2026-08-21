import React from 'react';
import { Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const links = [
    { label: 'Soluções', href: '/solucoes' },
    { label: 'Negócios', href: '/negocios' },
    { label: 'Cases', href: '/cases' },
    { label: 'Conteúdo', href: '/conteudos' },
    { label: 'Contato', href: '/contato' },
    { label: 'Privacidade', href: '/privacidade' }
  ];

  return (
    <footer className="border-t border-white/10 bg-black pb-24 pt-12 lg:pb-12">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="text-xl font-black"><span className="text-white">Fernando</span> <span className="text-[#d8ff57]">Parreiras</span></Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/45">Estratégia, tecnologia e IA para transformar decisões em negócios que permanecem.</p>
          </div>
          <nav aria-label="Navegação do rodapé" className="grid grid-cols-2 gap-4 text-sm lg:col-span-4">
            {links.map((item) => <Link key={item.href} to={item.href} className="min-h-10 font-bold text-white/55 hover:text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">{item.label}</Link>)}
          </nav>
          <div className="lg:col-span-3 lg:text-right">
            <Link to="/epitafio" className="inline-flex min-h-11 items-center gap-2 text-xs font-bold text-white/40 hover:text-[#d8ff57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]">
              <Sprout className="h-4 w-4" aria-hidden="true" /> Epitáfio 18.11.2081
            </Link>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/35">© {currentYear} Fernando Parreiras. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
};

export default Footer;
