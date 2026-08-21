import React from 'react';
import Books from '@/components/Books';
import PageHero from '@/components/PageHero';
import PageSeo from '@/components/PageSeo';
import { ROUTE_METADATA } from '@/data/siteMetadata';

const ContentHubPage = () => (
  <main>
    <PageSeo metadata={ROUTE_METADATA['/conteudos/']} />
    <PageHero
      eyebrow="Conteúdo"
      title="Conhecimento para"
      highlight="continuar a jornada."
      description="Livros, apresentações, artigos, TED, áudio e iniciativas de mídia organizados como repertório — e conectados aos desafios que ajudam a compreender."
    />
    <Books />
  </main>
);

export default ContentHubPage;

