import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
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
import PageSeo from '@/components/PageSeo';
import DocksPage from '@/pages/DocksPage';
import AcademyLandingPage from '@/pages/AcademyLandingPage';
import ArticlesHubPage from '@/pages/ArticlesHubPage';
import PrivacyPage from '@/pages/PrivacyPage';
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

function SiteRoutes() {
  const location = useLocation();
  const isAcademyLanding = location.pathname.startsWith('/academy/');

  return (
    <div className={isAcademyLanding ? 'min-h-screen' : 'min-h-screen bg-black text-white'}>
      {!isAcademyLanding && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/academy/ia-sem-confusao" element={<AcademyLandingPage />} />
        <Route path="/privacidade" element={<PrivacyPage />} />
        <Route path="/docks" element={(
          <>
            <PageSeo metadata={ROUTE_METADATA['/docks/']} />
            <DocksPage />
          </>
        )} />
        <Route path="/dock" element={<Navigate to="/docks" replace />} />
        <Route path="/epitafio" element={(
          <>
            <PageSeo metadata={ROUTE_METADATA['/epitafio/']} />
            <EpitafioPage />
          </>
        )} />
        {hasPublishedForgeArticles && (
          <Route path="/artigos" element={<ArticlesHubPage />} />
        )}
      </Routes>
      {!isAcademyLanding && <Footer />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SiteRoutes />
    </Router>
  );
}

export default App;
