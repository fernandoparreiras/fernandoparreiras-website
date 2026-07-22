import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Businesses from '@/components/Businesses';
import Books from '@/components/Books';
import Mentorship from '@/components/Mentorship';
import Manifesto from '@/components/Manifesto';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import EpitafioPage from '@/components/EpitafioPage';
import ScrollToTop from '@/components/ScrollToTop';
import DocksPage from '@/pages/DocksPage';
import { Toaster } from '@/components/ui/toaster';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Fernando Parreiras</title>
        <meta name="description" content="Fernando Parreiras - Construindo negócios, líderes e decisões com visão e propósito. Empreendedor, Advisor, Autor e Mentor Estratégico." />
      </Helmet>
      <main>
        <Hero />
        <About />
        <Businesses />
        <Books />
        <Mentorship />
        <Manifesto />
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docks" element={
            <>
              <Helmet>
                <title>Docks - Apresentações | Fernando Parreiras</title>
                <meta name="description" content="Docks de apresentações de Fernando Parreiras: palestras, keynotes e workshops sobre inteligência artificial, negócios, liderança e futuro do trabalho." />
              </Helmet>
              <DocksPage />
            </>
          } />
          <Route path="/dock" element={<Navigate to="/docks" replace />} />
          <Route path="/epitafio" element={
            <>
              <Helmet>
                <title>Epitáfio - Fernando Parreiras</title>
                <meta name="description" content="Uma reflexão sobre legado, propósito e a jornada de uma vida dedicada a transformar pessoas e organizações." />
              </Helmet>
              <EpitafioPage />
            </>
          } />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
