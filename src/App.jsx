import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import About from '@/components/About';
import Books from '@/components/Books';
import Businesses from '@/components/Businesses';
import CaseStudies from '@/components/CaseStudies';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InActionGallery from '@/components/InActionGallery';
import IntentRouter from '@/components/IntentRouter';
import Manifesto from '@/components/Manifesto';
import Mentorship from '@/components/Mentorship';
import MobileCommercialCTA from '@/components/MobileCommercialCTA';
import PageSeo from '@/components/PageSeo';
import ProofStrip from '@/components/ProofStrip';
import ScrollToTop from '@/components/ScrollToTop';
import EpitafioPage from '@/components/EpitafioPage';
import AcademyLandingPage from '@/pages/AcademyLandingPage';
import AboutPage from '@/pages/AboutPage';
import ArticlesHubPage from '@/pages/ArticlesHubPage';
import BusinessHubPage from '@/pages/BusinessHubPage';
import CasesPage from '@/pages/CasesPage';
import ContactPage from '@/pages/ContactPage';
import ContentHubPage from '@/pages/ContentHubPage';
import DocksPage from '@/pages/DocksPage';
import PrivacyPage from '@/pages/PrivacyPage';
import SolutionDetailPage from '@/pages/SolutionDetailPage';
import SolutionsPage from '@/pages/SolutionsPage';
import TalksPage from '@/pages/TalksPage';
import { hasPublishedForgeArticles } from '@/data/forgeArticles';
import { ROUTE_METADATA } from '@/data/siteMetadata';
import { Toaster } from '@/components/ui/toaster';

function HomePage() {
  return (
    <>
      <PageSeo metadata={ROUTE_METADATA['/']} />
      <main>
        <Hero />
        <IntentRouter />
        <ProofStrip />
        <About />
        <Mentorship />
        <Businesses preview />
        <CaseStudies limit={4} />
        <InActionGallery />
        <Books />
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
      <div id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solucoes" element={<SolutionsPage />} />
          <Route path="/solucoes/advisory-executivo" element={<SolutionDetailPage slug="advisory-executivo" />} />
          <Route path="/solucoes/conselho" element={<SolutionDetailPage slug="conselho" />} />
          <Route path="/solucoes/transformacao-tecnologia-ia" element={<SolutionDetailPage slug="transformacao-tecnologia-ia" />} />
          <Route path="/palestras" element={<TalksPage />} />
          <Route path="/negocios" element={<BusinessHubPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/conteudos" element={<ContentHubPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/academy/ia-sem-confusao" element={<AcademyLandingPage />} />
          <Route path="/privacidade" element={(
            <>
              <PageSeo metadata={ROUTE_METADATA['/privacidade/']} />
              <PrivacyPage />
            </>
          )} />
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
          {hasPublishedForgeArticles && <Route path="/artigos" element={<ArticlesHubPage />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!isAcademyLanding && <Footer />}
      {!isAcademyLanding && <MobileCommercialCTA />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <SiteRoutes />
    </Router>
  );
}

export default App;
