import React from 'react';
import CaseStudies from '@/components/CaseStudies';
import PageHero from '@/components/PageHero';
import PageSeo from '@/components/PageSeo';
import { ROUTE_METADATA } from '@/data/siteMetadata';

const CasesPage = () => (
  <main>
    <PageSeo metadata={ROUTE_METADATA['/cases/']} />
    <PageHero
      eyebrow="Cases"
      title="Contexto antes de"
      highlight="promessa."
      description="Uma seleção inicial de atuações publicamente documentadas. O objetivo é mostrar problema, papel e trabalho realizado sem criar resultado que a fonte não sustenta."
    />
    <CaseStudies />
  </main>
);

export default CasesPage;

