import React from 'react';
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
import ArticlesHubPage from '@/pages/ArticlesHubPage';
import PageSeo from '@/components/PageSeo';
import { hasPublishedForgeArticles } from '@/data/forgeArticles';
import { ROUTE_METADATA } from '@/data/siteMetadata';
import { Toaster } from '@/components/ui/toaster';

function HomePage() {
  return (
    <>
      <PageSeo metadata={ROUTE_METADATA['/']} />
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
              <PageSeo metadata={ROUTE_METADATA['/docks/']} />
              <DocksPage />
            </>
          } />
          <Route path="/dock" element={<Navigate to="/docks" replace />} />
          <Route path="/epitafio" element={
            <>
              <PageSeo metadata={ROUTE_METADATA['/epitafio/']} />
              <EpitafioPage />
            </>
          } />
          {hasPublishedForgeArticles && (
            <Route path="/artigos" element={<ArticlesHubPage />} />
          )}
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
