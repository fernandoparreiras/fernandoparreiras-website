import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = ['about', 'businesses', 'books', 'mentorship', 'manifesto', 'contact'];
      let current = '';

      if (location.pathname === '/') {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is near the middle of the viewport or top
            if (rect.top <= 150 && rect.bottom >= 150) {
              current = section;
              break;
            }
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const targetSection = location.state?.scrollTo;
    if (location.pathname !== '/' || !targetSection) return undefined;

    const timer = window.setTimeout(() => {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
      navigate('/', { replace: true, state: null });
    }, 100);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.state, navigate]);

  // Lock body scroll when menu is open to prevent background content from moving
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navItems = [
    { label: 'Sobre', id: 'about', type: 'scroll' },
    { label: 'Ecossistema', id: 'businesses', type: 'scroll' },
    { label: 'Acervo', id: 'books', type: 'scroll' },
    { label: 'Docks', id: 'docks', type: 'route', path: '/docks' },
    { label: 'Mentoria', id: 'mentorship', type: 'scroll' },
    { label: 'Princípios', id: 'manifesto', type: 'scroll' },
    { label: 'Contato', id: 'contact', type: 'scroll' }
  ];

  const handleNavClick = (item) => {
    if (item.type === 'route') {
      navigate(item.path);
      setIsMobileMenuOpen(false);
    } else {
      scrollToSection(item.id);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled && !isMobileMenuOpen ? 'bg-black/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                scrollToSection('hero');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xl font-bold tracking-tight hover:text-[#d8ff57] transition-colors relative z-50 group"
            >
              <img 
                src="https://horizons-cdn.hostinger.com/14a398b6-efb9-41a9-82b2-d6d468f204e2/c7ce7ff499a602167ff2cb419d0318db.png" 
                alt="Brain Lightbulb Logo" 
                className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" 
              />
              <span className="text-white">Fernando</span>
              <span className="text-[#d8ff57]">Parreiras</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5">
              {navItems.map((item) => {
                const isActive = item.type === 'route'
                  ? location.pathname === item.path
                  : activeSection === item.id;
                return (
                  <button
                    key={item.path || item.id}
                    onClick={() => handleNavClick(item)}
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group py-2 ${
                      isActive ? 'text-[#d8ff57]' : 'text-white/80 hover:text-[#d8ff57]'
                    }`}
                  >
                    {item.label}
                    
                    {/* Active Indicator (Persistent Underline) */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d8ff57]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover Underline (Animated) */}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#d8ff57] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isActive ? 'hidden' : ''}`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-[#d8ff57] transition-colors relative z-50 p-2 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-xl lg:hidden flex items-center justify-center pt-20"
          >
             {/* Decorative Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d8ff57]/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex flex-col items-center gap-6 w-full px-6 max-h-[85vh] overflow-y-auto no-scrollbar">
              {navItems.map((item, idx) => {
                const isActive = item.type === 'route'
                  ? location.pathname === item.path
                  : activeSection === item.id;
                return (
                  <motion.button
                    key={item.path || item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4, ease: "easeOut" }}
                    onClick={() => handleNavClick(item)}
                    className={`text-3xl font-bold transition-all duration-300 w-full text-center py-3 border-b border-white/5 last:border-0 active:scale-95 ${
                      isActive ? 'text-[#d8ff57]' : 'text-white hover:text-[#d8ff57]'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 w-full text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-white/30 text-xs uppercase tracking-widest mb-2">Contato</span>
                  <a href="mailto:contato@fernandoparreiras.com.br" className="text-white/60 hover:text-[#d8ff57] transition-colors">
                    contato@fernandoparreiras.com.br
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
