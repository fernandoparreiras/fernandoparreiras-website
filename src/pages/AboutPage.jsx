import React from 'react';
import About from '@/components/About';
import InActionGallery from '@/components/InActionGallery';
import Manifesto from '@/components/Manifesto';
import PageHero from '@/components/PageHero';
import PageSeo from '@/components/PageSeo';
import { ROUTE_METADATA } from '@/data/siteMetadata';

const AboutPage = () => (
  <main>
    <PageSeo metadata={ROUTE_METADATA['/sobre/']} />
    <PageHero
      eyebrow="Sobre Fernando"
      title="Da programação à"
      highlight="construção de legados."
      description="Tecnologia, produto, liderança, empresas, formação e propósito conectados por uma mesma responsabilidade: transformar conhecimento em serviço."
    />
    <About />
    <InActionGallery />
    <Manifesto />
  </main>
);

export default AboutPage;

