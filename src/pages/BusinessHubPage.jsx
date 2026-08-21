import React from 'react';
import Businesses from '@/components/Businesses';
import PageHero from '@/components/PageHero';
import PageSeo from '@/components/PageSeo';
import { ROUTE_METADATA } from '@/data/siteMetadata';

const BusinessHubPage = () => (
  <main>
    <PageSeo metadata={ROUTE_METADATA['/negocios/']} />
    <PageHero
      eyebrow="Negócios"
      title="Um ecossistema."
      highlight="Papéis diferentes."
      description="Operação comercial, produtos, ventures, formação, mídia e propósito apresentados com contexto e maturidade — sem transformar todos os nomes na mesma promessa."
    />
    <Businesses />
  </main>
);

export default BusinessHubPage;

