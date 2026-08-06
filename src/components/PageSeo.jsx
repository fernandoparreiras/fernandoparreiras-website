import React from 'react';
import { Helmet } from 'react-helmet';
import { absoluteUrl, createStructuredData } from '@/data/siteMetadata';

const PageSeo = ({ metadata, articles = [] }) => {
  const canonical = absoluteUrl(metadata.path);
  const structuredData = createStructuredData(metadata, articles);

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content={metadata.type} />
      <meta property="og:site_name" content="Fernando Parreiras" />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default PageSeo;
