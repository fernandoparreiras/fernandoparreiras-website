import React from 'react';
import { Helmet } from 'react-helmet';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
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