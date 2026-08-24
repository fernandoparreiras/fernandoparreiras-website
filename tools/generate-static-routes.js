#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FORGE_ARTICLES } from '../src/data/forgeArticles.js';
import {
  AUTHOR,
  PUBLIC_BASE_ROUTES,
  ROUTE_METADATA,
  SOCIAL_IMAGE,
  SITE_ORIGIN,
  absoluteUrl,
  createStructuredData
} from '../src/data/siteMetadata.js';

const SEO_BLOCK = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/;
const ROOT_ELEMENT = /<div id="root">[\s\S]*?<\/div>/;
const MODULE_SCRIPT = /<script\b(?=[^>]*\btype=["']module["'])[^>]*>[\s\S]*?<\/script>/gi;
const ARTICLE_ID = /^article-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SHA256 = /^sha256:[a-f0-9]{64}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function validateArticles(articles) {
  if (!Array.isArray(articles)) {
    throw new Error('O catálogo da Forge precisa ser uma lista.');
  }

  const identifiers = new Set();
  const canonicals = new Set();

  for (const [index, article] of articles.entries()) {
    const location = `FORGE_ARTICLES[${index}]`;
    const expectedKeys = [
      'approvalDigest',
      'canonicalUrl',
      'description',
      'id',
      'publishedAt',
      'title'
    ];

    if (!article || typeof article !== 'object' || Array.isArray(article)) {
      throw new Error(`${location} precisa ser um objeto.`);
    }

    const keys = Object.keys(article).sort();
    if (keys.join('|') !== expectedKeys.join('|')) {
      throw new Error(`${location} possui campos ausentes ou não permitidos.`);
    }
    if (!ARTICLE_ID.test(article.id)) {
      throw new Error(`${location}.id não segue o contrato editorial.`);
    }
    if (identifiers.has(article.id)) {
      throw new Error(`${location}.id está duplicado.`);
    }
    identifiers.add(article.id);

    if (typeof article.title !== 'string' || article.title.length < 8 || article.title.length > 110) {
      throw new Error(`${location}.title precisa ter entre 8 e 110 caracteres.`);
    }
    if (
      typeof article.description !== 'string' ||
      article.description.length < 20 ||
      article.description.length > 180
    ) {
      throw new Error(`${location}.description precisa ter entre 20 e 180 caracteres.`);
    }

    let canonical;
    try {
      canonical = new URL(article.canonicalUrl);
    } catch {
      throw new Error(`${location}.canonicalUrl é inválida.`);
    }
    if (
      canonical.protocol !== 'https:' ||
      canonical.origin !== 'https://forge.trustyu.ai' ||
      !/^\/artigos\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(canonical.pathname) ||
      canonical.search ||
      canonical.hash
    ) {
      throw new Error(`${location}.canonicalUrl precisa apontar para a publicação canônica na Forge.`);
    }
    if (canonicals.has(article.canonicalUrl)) {
      throw new Error(`${location}.canonicalUrl está duplicada.`);
    }
    canonicals.add(article.canonicalUrl);

    const publishedDate = new Date(article.publishedAt);
    const normalizedPublishedAt = Number.isNaN(publishedDate.getTime())
      ? null
      : publishedDate.toISOString().replace('.000Z', 'Z');
    if (
      !ISO_DATE.test(article.publishedAt) ||
      Number.isNaN(publishedDate.getTime()) ||
      normalizedPublishedAt !== article.publishedAt
    ) {
      throw new Error(`${location}.publishedAt precisa usar UTC no formato ISO 8601.`);
    }
    if (!SHA256.test(article.approvalDigest)) {
      throw new Error(`${location}.approvalDigest não é um SHA-256 aprovado.`);
    }
  }

  return articles;
}

export function renderSeoBlock(metadata, articles = []) {
  const canonical = absoluteUrl(metadata.path);
  const socialImage = absoluteUrl(SOCIAL_IMAGE.path);
  const structuredData = createStructuredData(metadata, articles);

  return `<!-- SEO:START -->
\t\t<title data-react-helmet="true">${escapeHtml(metadata.title)}</title>
\t\t<meta data-react-helmet="true" name="description" content="${escapeHtml(metadata.description)}" />
\t\t<meta data-react-helmet="true" name="robots" content="index, follow" />
\t\t<link data-react-helmet="true" rel="canonical" href="${escapeHtml(canonical)}" />
\t\t<meta data-react-helmet="true" property="og:locale" content="pt_BR" />
\t\t<meta data-react-helmet="true" property="og:type" content="${escapeHtml(metadata.type)}" />
\t\t<meta data-react-helmet="true" property="og:site_name" content="Fernando Parreiras" />
\t\t<meta data-react-helmet="true" property="og:title" content="${escapeHtml(metadata.title)}" />
\t\t<meta data-react-helmet="true" property="og:description" content="${escapeHtml(metadata.description)}" />
\t\t<meta data-react-helmet="true" property="og:url" content="${escapeHtml(canonical)}" />
\t\t<meta data-react-helmet="true" property="og:image" content="${escapeHtml(socialImage)}" />
\t\t<meta data-react-helmet="true" property="og:image:width" content="${SOCIAL_IMAGE.width}" />
\t\t<meta data-react-helmet="true" property="og:image:height" content="${SOCIAL_IMAGE.height}" />
\t\t<meta data-react-helmet="true" property="og:image:alt" content="${escapeHtml(SOCIAL_IMAGE.alt)}" />
\t\t<meta data-react-helmet="true" name="twitter:card" content="summary_large_image" />
\t\t<meta data-react-helmet="true" name="twitter:title" content="${escapeHtml(metadata.title)}" />
\t\t<meta data-react-helmet="true" name="twitter:description" content="${escapeHtml(metadata.description)}" />
\t\t<meta data-react-helmet="true" name="twitter:image" content="${escapeHtml(socialImage)}" />
\t\t<meta data-react-helmet="true" name="twitter:image:alt" content="${escapeHtml(SOCIAL_IMAGE.alt)}" />
\t\t<script data-react-helmet="true" type="application/ld+json">${safeJson(structuredData)}</script>
\t\t<!-- SEO:END -->`;
}

export function renderSitemap(articles) {
  const routes = [
    ...PUBLIC_BASE_ROUTES,
    ...(articles.length > 0 ? [ROUTE_METADATA['/artigos/']] : [])
  ];
  const urls = routes
    .map((metadata) => `  <url><loc>${escapeHtml(absoluteUrl(metadata.path))}</loc></url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function renderRedirects(articles) {
  const routeRedirects = PUBLIC_BASE_ROUTES
    .filter(({ path: routePath }) => routePath !== '/')
    .map(({ path: routePath }) => `${routePath.replace(/\/$/, '')}  ${routePath}  301`)
    .join('\n');
  const articleGate = articles.length === 0
    ? '/artigos      /404.html  404\n/artigos/*    /404.html  404\n'
    : '/artigos      /artigos/   301\n';
  const academyDestination = 'https://www.techhuman.com.br/academy/ia-sem-confusao';

  return `/academy/ia-sem-confusao   ${academyDestination}   301!\n/academy/ia-sem-confusao/  ${academyDestination}   301!\n/dock  /docks/  301\n${routeRedirects}\n${articleGate}`;
}

function renderNotFoundHtml(sourceHtml) {
  const seo = `<!-- SEO:START -->
\t\t<title>Página não encontrada | Fernando Parreiras</title>
\t\t<meta name="description" content="A página solicitada não está disponível." />
\t\t<meta name="robots" content="noindex, nofollow" />
\t\t<!-- SEO:END -->`;
  const root = `<div id="root">
    <main class="flex min-h-screen items-center justify-center bg-[#080a06] px-6 text-center text-white">
      <div class="max-w-xl">
        <p class="text-xs font-bold uppercase tracking-[0.28em] text-[#d8ff57]">Erro 404</p>
        <h1 class="mt-5 text-5xl font-black">Página não encontrada.</h1>
        <p class="mt-5 leading-relaxed text-white/60">O endereço pode ter mudado ou ainda não estar publicado.</p>
        <a href="/" class="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#d8ff57] px-6 py-2 font-bold text-black">Voltar ao início</a>
      </div>
    </main>
  </div>`;

  return sourceHtml
    .replace(SEO_BLOCK, seo)
    .replace(ROOT_ELEMENT, root)
    .replace(MODULE_SCRIPT, '');
}

function renderArticleCards(articles) {
  return articles.map((article) => `
          <article class="flex h-full flex-col rounded-2xl border border-white/10 bg-[#11130f] p-7 md:p-9">
            <p class="text-[11px] font-bold uppercase tracking-wider text-[#d8ff57]">Publicação verificada</p>
            <h2 class="mt-6 text-3xl font-bold leading-tight text-white">${escapeHtml(article.title)}</h2>
            <p class="mt-4 flex-1 leading-relaxed text-white/55">${escapeHtml(article.description)}</p>
            <div class="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <time class="text-sm text-white/40" datetime="${escapeHtml(article.publishedAt)}">${escapeHtml(
                new Intl.DateTimeFormat('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  timeZone: 'UTC'
                }).format(new Date(article.publishedAt))
              )}</time>
              <a href="${escapeHtml(article.canonicalUrl)}" class="inline-flex min-h-11 items-center justify-center rounded-full bg-[#d8ff57] px-5 py-2 text-sm font-bold text-black">Ler na Trustyu Forge ↗</a>
            </div>
          </article>`).join('');
}

export function renderStaticArticlesRoot(articles) {
  return `<div id="root">
    <div class="min-h-screen bg-black text-white">
      <header class="border-b border-white/10 bg-black">
        <nav class="container mx-auto flex min-h-20 items-center justify-between px-6" aria-label="Navegação principal">
          <a href="/" class="text-xl font-bold"><span class="text-white">Fernando</span> <span class="text-[#d8ff57]">Parreiras</span></a>
          <div class="flex items-center gap-5 text-sm">
            <a href="/" class="text-white/70 hover:text-[#d8ff57]">Início</a>
            <a href="/docks/" class="text-white/70 hover:text-[#d8ff57]">Docks</a>
            <span aria-current="page" class="text-[#d8ff57]">Artigos</span>
          </div>
        </nav>
      </header>
      <main class="relative min-h-screen overflow-hidden bg-[#080a06] pb-24 pt-20">
        <div class="container relative z-10 mx-auto px-6">
          <header class="max-w-4xl">
            <p class="text-xs font-bold uppercase tracking-[0.28em] text-[#d8ff57]">Autor / Trustyu Forge</p>
            <h1 class="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">Conhecimento com <span class="text-[#d8ff57]">evidência rastreável.</span></h1>
            <p class="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">Artigos publicados originalmente na Trustyu Forge, com autoria, fontes e histórico editorial conectados à publicação canônica.</p>
          </header>
          <section class="mt-16 grid gap-6 lg:grid-cols-2" aria-label="Artigos publicados">${renderArticleCards(articles)}
          </section>
        </div>
      </main>
      <footer class="border-t border-white/10 bg-black px-6 py-10 text-center text-sm text-white/50">
        <p>© Fernando Parreiras · <a class="hover:text-[#d8ff57]" href="${escapeHtml(AUTHOR.sameAs[0])}">LinkedIn</a> · <a class="hover:text-[#d8ff57]" href="${escapeHtml(AUTHOR.sameAs[1])}">GitHub</a></p>
      </footer>
    </div>
  </div>`;
}

function routeOutputDirectory(outputDirectory, routePath) {
  return path.join(outputDirectory, routePath.replace(/^\/+|\/+$/g, ''));
}

function writeRoute(outputDirectory, metadata, html) {
  const routeDirectory = routeOutputDirectory(outputDirectory, metadata.path);
  fs.mkdirSync(routeDirectory, { recursive: true });
  fs.writeFileSync(path.join(routeDirectory, 'index.html'), html, 'utf8');
}

export function generateStaticRoutes({ sourceHtml, outputDirectory, articles = FORGE_ARTICLES }) {
  validateArticles(articles);
  if (!SEO_BLOCK.test(sourceHtml)) {
    throw new Error('O bloco SEO versionado não foi encontrado no HTML de produção.');
  }

  const rootHtml = sourceHtml.replace(SEO_BLOCK, renderSeoBlock(ROUTE_METADATA['/']));
  fs.writeFileSync(path.join(outputDirectory, 'index.html'), rootHtml, 'utf8');

  for (const metadata of PUBLIC_BASE_ROUTES.filter(({ path: routePath }) => routePath !== '/')) {
    writeRoute(
      outputDirectory,
      metadata,
      rootHtml.replace(SEO_BLOCK, renderSeoBlock(metadata))
    );
  }

  const articlesDirectory = routeOutputDirectory(outputDirectory, '/artigos/');
  if (articles.length === 0) {
    if (fs.existsSync(articlesDirectory)) {
      fs.rmSync(articlesDirectory, { recursive: true, force: true });
    }
  } else {
    const metadata = ROUTE_METADATA['/artigos/'];
    const articleHtml = rootHtml
      .replace(SEO_BLOCK, renderSeoBlock(metadata, articles))
      .replace(ROOT_ELEMENT, renderStaticArticlesRoot(articles))
      .replace(MODULE_SCRIPT, '');
    writeRoute(outputDirectory, metadata, articleHtml);
  }

  const legacyHostConfig = path.join(outputDirectory, '.htaccess');
  if (fs.existsSync(legacyHostConfig)) {
    fs.rmSync(legacyHostConfig, { force: true });
  }

  fs.writeFileSync(path.join(outputDirectory, '404.html'), renderNotFoundHtml(rootHtml), 'utf8');
  fs.writeFileSync(path.join(outputDirectory, '_redirects'), renderRedirects(articles), 'utf8');
  fs.writeFileSync(path.join(outputDirectory, 'sitemap.xml'), renderSitemap(articles), 'utf8');
}

export function main() {
  const outputDirectory = path.resolve('dist');
  const indexPath = path.join(outputDirectory, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('Execute o Vite antes de gerar as rotas estáticas.');
  }

  generateStaticRoutes({
    sourceHtml: fs.readFileSync(indexPath, 'utf8'),
    outputDirectory,
    articles: FORGE_ARTICLES
  });
  process.stdout.write(
    `Rotas estáticas validadas: ${PUBLIC_BASE_ROUTES.length + (FORGE_ARTICLES.length ? 1 : 0)}; artigos: ${FORGE_ARTICLES.length}.\n`
  );
}

const isMainModule = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMainModule) {
  main();
}

export { SITE_ORIGIN };
