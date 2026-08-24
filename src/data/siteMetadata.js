export const SITE_ORIGIN = 'https://fernandoparreiras.com.br';

export const SOCIAL_IMAGE = Object.freeze({
  path: '/images/em-cena/fernando-parreiras-palestra-principal-1122.webp',
  width: 1122,
  height: 1402,
  alt: 'Fernando Parreiras em palestra sobre tecnologia, inteligência artificial e negócios'
});

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
    title: 'Fernando Parreiras | Estratégia, tecnologia e IA',
    description: 'Estratégia, tecnologia e IA para transformar decisões em negócios que permanecem. Conheça as soluções, negócios e conteúdos de Fernando Parreiras.',
    type: 'profile',
    schemaType: 'ProfilePage'
  }),
  '/solucoes/': Object.freeze({
    path: '/solucoes/',
    title: 'Soluções executivas | Fernando Parreiras',
    description: 'Advisory executivo, conselho, transformação em tecnologia e IA, palestras e workshops com Fernando Parreiras e seu ecossistema.',
    type: 'website',
    schemaType: 'CollectionPage'
  }),
  '/solucoes/advisory-executivo/': Object.freeze({
    path: '/solucoes/advisory-executivo/',
    title: 'Advisory executivo | Fernando Parreiras',
    description: 'Acompanhamento sênior para founders, CEOs e executivos em decisões de tecnologia, produto, IA, estrutura e crescimento.',
    type: 'website',
    schemaType: 'WebPage',
    serviceName: 'Advisory executivo',
    serviceType: 'Business advisory'
  }),
  '/solucoes/conselho/': Object.freeze({
    path: '/solucoes/conselho/',
    title: 'Conselho consultivo | Fernando Parreiras',
    description: 'Perspectiva independente para qualificar governança e decisões de tecnologia, produto, IA, pessoas e crescimento.',
    type: 'website',
    schemaType: 'WebPage',
    serviceName: 'Conselho consultivo',
    serviceType: 'Advisory board service'
  }),
  '/solucoes/transformacao-tecnologia-ia/': Object.freeze({
    path: '/solucoes/transformacao-tecnologia-ia/',
    title: 'Transformação em tecnologia e IA | Fernando Parreiras',
    description: 'Estratégia e execução para conectar tecnologia, produtos, dados, IA, liderança e resultado de negócio com a Tech Human.',
    type: 'website',
    schemaType: 'WebPage',
    serviceName: 'Transformação em tecnologia e IA',
    serviceType: 'Technology and AI consulting'
  }),
  '/palestras/': Object.freeze({
    path: '/palestras/',
    title: 'Palestras e workshops | Fernando Parreiras',
    description: 'Palestras sobre inteligência artificial, negócios, tecnologia, liderança, carreira e desenvolvimento humano.',
    type: 'website',
    schemaType: 'CollectionPage'
  }),
  '/negocios/': Object.freeze({
    path: '/negocios/',
    title: 'Negócios e ecossistema | Fernando Parreiras',
    description: 'Conheça Tech Human, Needyu, Trustyu/FORGE e as iniciativas de formação, mídia e propósito conectadas a Fernando Parreiras.',
    type: 'website',
    schemaType: 'CollectionPage'
  }),
  '/cases/': Object.freeze({
    path: '/cases/',
    title: 'Cases e atuações | Fernando Parreiras',
    description: 'Contexto, papel e trabalho realizado em atuações de tecnologia, produto, conselho, inovação e transformação.',
    type: 'website',
    schemaType: 'CollectionPage'
  }),
  '/conteudos/': Object.freeze({
    path: '/conteudos/',
    title: 'Conteúdos, livros e apresentações | Fernando Parreiras',
    description: 'Livros, TED, apresentações, artigos, áudio e iniciativas de mídia de Fernando Parreiras.',
    type: 'website',
    schemaType: 'CollectionPage'
  }),
  '/sobre/': Object.freeze({
    path: '/sobre/',
    title: 'Sobre Fernando Parreiras',
    description: 'Trajetória de Fernando Parreiras em tecnologia, produto, liderança, empresas, formação, inovação e propósito.',
    type: 'profile',
    schemaType: 'ProfilePage'
  }),
  '/contato/': Object.freeze({
    path: '/contato/',
    title: 'Contato e diagnóstico | Fernando Parreiras',
    description: 'Compartilhe seu desafio de negócio, advisory, conselho, palestra, formação, produto ou venture com Fernando Parreiras.',
    type: 'website',
    schemaType: 'ContactPage'
  }),
  '/docks/': Object.freeze({
    path: '/docks/',
    title: 'Docks - Apresentações | Fernando Parreiras',
    description: 'Apresentações de Fernando Parreiras sobre inteligência artificial, negócios, liderança e futuro do trabalho.',
    type: 'website',
    schemaType: 'CollectionPage'
  }),
  '/epitafio/': Object.freeze({
    path: '/epitafio/',
    title: 'Epitáfio | Fernando Parreiras',
    description: 'Uma reflexão sobre legado, propósito e a jornada de uma vida dedicada a transformar pessoas e organizações.',
    type: 'article',
    schemaType: 'WebPage'
  }),
  '/privacidade/': Object.freeze({
    path: '/privacidade/',
    title: 'Política de privacidade | Fernando Parreiras',
    description: 'Como o site de Fernando Parreiras trata informações enviadas em solicitações de contato.',
    type: 'website',
    schemaType: 'WebPage'
  }),
  '/artigos/': Object.freeze({
    path: '/artigos/',
    title: 'Artigos publicados na Trustyu Forge | Fernando Parreiras',
    description: 'Artigos de Fernando Parreiras publicados na Trustyu Forge, com fontes, revisão factual e histórico editorial verificável.',
    type: 'website',
    schemaType: 'CollectionPage'
  })
});

export const PUBLIC_BASE_ROUTES = Object.freeze([
  ROUTE_METADATA['/'],
  ROUTE_METADATA['/solucoes/'],
  ROUTE_METADATA['/solucoes/advisory-executivo/'],
  ROUTE_METADATA['/solucoes/conselho/'],
  ROUTE_METADATA['/solucoes/transformacao-tecnologia-ia/'],
  ROUTE_METADATA['/palestras/'],
  ROUTE_METADATA['/negocios/'],
  ROUTE_METADATA['/cases/'],
  ROUTE_METADATA['/conteudos/'],
  ROUTE_METADATA['/sobre/'],
  ROUTE_METADATA['/contato/'],
  ROUTE_METADATA['/docks/'],
  ROUTE_METADATA['/epitafio/'],
  ROUTE_METADATA['/privacidade/']
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

  if (metadata.path === '/' || metadata.path === '/sobre/') {
    graph[2].mainEntity = { '@id': AUTHOR.id };
  }

  if (metadata.serviceName) {
    const serviceId = `${canonical}#service`;
    graph.push({
      '@type': 'Service',
      '@id': serviceId,
      name: metadata.serviceName,
      serviceType: metadata.serviceType,
      provider: { '@id': AUTHOR.id },
      areaServed: 'BR'
    });
    graph[2].mainEntity = { '@id': serviceId };
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

  return { '@context': 'https://schema.org', '@graph': graph };
}
