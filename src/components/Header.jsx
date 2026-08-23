import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { hasPublishedForgeArticles } from '@/data/forgeArticles';
import { trackEvent } from '@/lib/analytics';

const baseItems = [
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Negócios', href: '/negocios' },
  { label: 'Cases', href: '/cases' },
  { label: 'Conteúdo', href: '/conteudos' },
  { label: 'Sobre', href: '/sobre' }
];

const Header = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const firstMobileLinkRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navItems = hasPublishedForgeArticles
    ? [...baseItems.slice(0, 4), { label: 'Artigos', href: '/artigos' }, ...baseItems.slice(4)]
    : baseItems;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    document.body.style.overflow = 'hidden';
    firstMobileLinkRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navClass = ({ isActive }) => `relative py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57] ${isActive ? 'text-[#d8ff57]' : 'text-white/72 hover:text-white'}`;

  return (
    <>
      <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
      <motion.header
        initial={reduceMotion ? false : { y: -100 }}
        animate={reduceMotion ? undefined : { y: 0 }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${isScrolled || isMobileMenuOpen ? 'border-white/10 bg-black/95 backdrop-blur-md' : 'border-transparent bg-gradient-to-b from-black/70 to-transparent'}`}
      >
        <nav className="container mx-auto flex min-h-20 items-center justify-between px-6" aria-label="Navegação principal">
          <Link to="/" className="flex items-center gap-2 text-lg font-black tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]" aria-label="Fernando Parreiras — início">
            <img src="/images/brand/fernando-parreiras-monogram-256.webp" alt="" width="40" height="40" className="h-10 w-10" decoding="async" />
            <span className="text-white">Fernando</span><span className="text-[#d8ff57]">Parreiras</span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => <NavLink key={item.href} to={item.href} className={navClass}>{item.label}</NavLink>)}
            <Link
              to="/contato"
              onClick={() => trackEvent('hero_cta_click', { cta: 'header', destination: 'contato' })}
              className="inline-flex min-h-11 items-center gap-2 bg-[#d8ff57] px-5 text-sm font-black text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57]"
            >
              Falar sobre um desafio <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="relative z-50 inline-flex h-11 w-11 items-center justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff57] lg:hidden"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-40 flex bg-black px-6 pb-10 pt-28 lg:hidden"
          >
            <nav className="flex w-full flex-col" aria-label="Navegação móvel">
              {navItems.map((item, index) => (
                <NavLink
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => `border-b border-white/10 py-5 text-3xl font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#d8ff57] ${isActive ? 'text-[#d8ff57]' : 'text-white'}`}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/contato" className="mt-auto inline-flex min-h-14 items-center justify-between bg-[#d8ff57] px-6 font-black text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Falar sobre um desafio <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
