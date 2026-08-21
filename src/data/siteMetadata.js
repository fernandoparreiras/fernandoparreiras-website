export const SITE_ORIGIN = 'https://fernandoparreiras.com.br';

export const AUTHOR = Object.freeze({
  id: `${SITE_ORIGIN}/#fernando-parreiras`,
  name: 'Fernando Parreiras',
  url: `${SITE_ORIGIN}/`,
  sameAs: Object.freeze([
    'https://www.linkedin.com/in/fernandoparreiras/',
    'https://github.com/fernandoparreiras',
    'https://www.instagram.com/parreiras.fernando/'
  ])
});

export const ROUTE_METADATA = Object.freeze({
  '/': Object.freeze({
    path: '/',
    title: 'Fernando Parreiras',
    description:
      'Fernando Parreiras - Construindo negócios, líderes e decisões com visão e propósito. Empreendedor, Advisor, Autor e Mentor Estratégico.',
    type: 'profile',
    schemaType: 'ProfilePage'
  }),
  '/docks/': Object.freeze({
    path: '/docks/',
    title: 'Docks - Apresentações | Fernando Parreiras',
    description:
      'Docks de apresentações de Fernando Parreiras: palestras, keynotes e workshops sobre inteligência artificial, negócios, liderança e futuro do trabalho.',
    type: 'website',
    schemaType: 'CollectionPage'
  }),
  '/epitafio/': Object.freeze({
    path: '/epitafio/',
    title: 'Epitáfio | Fernando Parreiras',
    description:
      'Uma reflexão sobre legado, propósito e a jornada de uma vida dedicada a transformar pessoas e organizações.',
    type: 'article',
    schemaType: 'WebPage'
  }),
  '/artigos/': Object.freeze({
    path: '/artigos/',
    title: 'Artigos publicados na Trustyu Forge | Fernando Parreiras',
    description:
      'Artigos de Fernando Parreiras publicados na Trustyu Forge, com fontes, revisão factual e histórico editorial verificável.',
    type: 'website',
    schemaType: 'CollectionPage'
  })
});

export const PUBLIC_BASE_ROUTES = Object.freeze([
  ROUTE_METADATA['/'],
  ROUTE_METADATA['/docks/'],
  ROUTE_METADATA['/epitafio/']
]);

export function absoluteUrl(path) {
  return new URL(path, `${SITE_ORIGIN}/`).href;
}

export function createStructuredData(metadata, articles = []) {
  const canonical = absoluteUrl(metadata.path);
  const webpageId = `${canonical}#webpage`;
  const websiteId = `${SITE_ORIGIN}/#website`;
  const graph = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_ORIGIN}/`,
      name: AUTHOR.name,
      inLanguage: 'pt-BR'
    },
    {
      '@type': 'Person',
      '@id': AUTHOR.id,
      name: AUTHOR.name,
      url: AUTHOR.url,
      sameAs: [...AUTHOR.sameAs]
    },
    {
      '@type': metadata.schemaType,
      '@id': webpageId,
      url: canonical,
      name: metadata.title,
      description: metadata.description,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': websiteId },
      author: { '@id': AUTHOR.id }
    }
  ];

  if (metadata.path === '/') {
    graph[2].mainEntity = { '@id': AUTHOR.id };
  }

  if (metadata.path === '/artigos/' && articles.length > 0) {
    graph[2].mainEntity = {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: article.canonicalUrl,
        name: article.title
      }))
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}
