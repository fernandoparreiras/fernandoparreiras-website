#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env.KNOWLEDGE_BUILD_AT) {
  globalThis.__KNOWLEDGE_BUILD_AT__ = process.env.KNOWLEDGE_BUILD_AT;
}

const { articles, getTrack, knowledgeTracks } = await import('../src/data/articles.js');

const root = process.cwd();
const distDir = path.join(root, 'dist');
const indexPath = path.join(distDir, 'index.html');
const siteUrl = 'https://fernandoparreiras.com.br';
const SEO_BLOCK = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/;
const ROOT_ELEMENT = /<div id="root">[\s\S]*?<\/div>/;

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const absoluteUrl = (value) => value.startsWith('http') ? value : `${siteUrl}${value}`;

function articleBodyHtml(article) {
  return article.content.map((section) => `
    <section>
      <h2>${escapeHtml(section.heading)}</h2>
      ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      ${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}
      ${section.quote ? `<blockquote>“${escapeHtml(section.quote)}”</blockquote>` : ''}
    </section>`).join('');
}

function renderStaticArticle(article) {
  const track = getTrack(article.track);
  return `<div class="static-knowledge">
    <main>
      <nav><a href="/artigos/">← Voltar ao acervo</a></nav>
      <header>
        <span class="eyebrow">${escapeHtml(track?.label)}</span>
        <h1>${escapeHtml(article.title)}</h1>
        <p class="lede">${escapeHtml(article.excerpt)}</p>
        <div class="meta">Por Fernando Parreiras · ${article.readingMinutes} min de leitura · Publicado em ${escapeHtml(article.publishedAt)}</div>
        <div class="tags">${article.tags.map((tag) => `<span>#${escapeHtml(tag.replaceAll(' ', '-'))}</span>`).join('')}</div>
        <img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.imageAlt)}" width="1122" height="1403" />
      </header>
      ${articleBodyHtml(article)}
    </main>
  </div>`;
}

function renderStaticLanding() {
  return `<div class="static-knowledge">
    <main>
      <header>
        <span class="eyebrow">Conhecimento</span>
        <h1>O futuro do trabalho é uma decisão do presente.</h1>
        <p class="lede">Artigos profissionais sobre liderança, negócios, carreira e desenvolvimento humano na era da inteligência artificial.</p>
        <div class="tags">${knowledgeTracks.map((track) => `<span>${escapeHtml(track.label)}</span>`).join('')}</div>
      </header>
      <div class="article-list">
        ${articles.map((article) => `<article><span class="eyebrow">${escapeHtml(getTrack(article.track)?.label)}</span><h2><a href="/artigos/${article.slug}/">${escapeHtml(article.title)}</a></h2><p>${escapeHtml(article.excerpt)}</p></article>`).join('')}
      </div>
    </main>
  </div>`;
}

function buildPage(baseHtml, { title, description, canonical, image, type = 'website', publishedAt, modifiedAt, tags = [], schema, body }) {
  const cleanTitle = escapeHtml(title);
  const cleanDescription = escapeHtml(description);
  const cleanCanonical = escapeHtml(canonical);
  const socialImage = escapeHtml(absoluteUrl(image || '/images/em-cena/fernando-parreiras-palestra-principal-1122.webp'));
  const seoBlock = `<!-- SEO:START -->
    <title data-react-helmet="true">${cleanTitle}</title>
    <meta data-react-helmet="true" name="description" content="${cleanDescription}" />
    <meta data-react-helmet="true" name="robots" content="index, follow" />
    <meta data-react-helmet="true" name="author" content="Fernando Parreiras" />
    <link data-react-helmet="true" rel="canonical" href="${cleanCanonical}" />
    <meta data-react-helmet="true" property="og:locale" content="pt_BR" />
    <meta data-react-helmet="true" property="og:site_name" content="Fernando Parreiras" />
    <meta data-react-helmet="true" property="og:type" content="${type}" />
    <meta data-react-helmet="true" property="og:title" content="${cleanTitle}" />
    <meta data-react-helmet="true" property="og:description" content="${cleanDescription}" />
    <meta data-react-helmet="true" property="og:url" content="${cleanCanonical}" />
    <meta data-react-helmet="true" property="og:image" content="${socialImage}" />
    <meta data-react-helmet="true" name="twitter:card" content="summary_large_image" />
    <meta data-react-helmet="true" name="twitter:title" content="${cleanTitle}" />
    <meta data-react-helmet="true" name="twitter:description" content="${cleanDescription}" />
    <meta data-react-helmet="true" name="twitter:image" content="${socialImage}" />
    ${publishedAt ? `<meta data-react-helmet="true" property="article:published_time" content="${publishedAt}" />` : ''}
    ${modifiedAt ? `<meta data-react-helmet="true" property="article:modified_time" content="${modifiedAt}" />` : ''}
    ${tags.map((tag) => `<meta data-react-helmet="true" property="article:tag" content="${escapeHtml(tag)}" />`).join('\n')}
    ${schema ? `<script data-react-helmet="true" type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>` : ''}
    <!-- SEO:END -->`;

  return baseHtml
    .replace(/<html\s+lang="[^"]*"/, '<html lang="pt-BR"')
    .replace(SEO_BLOCK, seoBlock)
    .replace('</head>', '    <link rel="stylesheet" href="/knowledge-static.css" data-knowledge-static="true" />\n</head>')
    .replace(ROOT_ELEMENT, `<div id="root">${body}</div>`);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writePage(relativePath, html) {
  const outputDir = path.join(distDir, relativePath);
  ensureDir(outputDir);
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
}

function generateFeed() {
  const items = articles.map((article) => `
    <item>
      <title>${escapeHtml(article.title)}</title>
      <link>${siteUrl}/artigos/${article.slug}/</link>
      <guid>${siteUrl}/artigos/${article.slug}/</guid>
      <pubDate>${new Date(`${article.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeHtml(article.excerpt)}</description>
      ${article.tags.map((tag) => `<category>${escapeHtml(tag)}</category>`).join('')}
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0"><channel><title>Conhecimento — Fernando Parreiras</title><link>${siteUrl}/artigos/</link><description>Ideias sobre liderança, negócios, carreira e IA.</description><language>pt-BR</language>${items}</channel></rss>`;
}

function mergeSitemap() {
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  const current = fs.existsSync(sitemapPath)
    ? fs.readFileSync(sitemapPath, 'utf8')
    : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n';
  const knowledgeUrls = [
    { loc: `${siteUrl}/artigos/`, lastmod: '2026-08-25' },
    ...articles.map((article) => ({ loc: `${siteUrl}/artigos/${article.slug}/`, lastmod: article.updatedAt })),
  ];
  const additions = knowledgeUrls
    .filter((item) => !current.includes(`<loc>${item.loc}</loc>`))
    .map((item) => `  <url><loc>${item.loc}</loc><lastmod>${item.lastmod}</lastmod></url>`)
    .join('\n');
  const merged = additions ? current.replace('</urlset>', `${additions}\n</urlset>`) : current;
  fs.writeFileSync(sitemapPath, merged, 'utf8');
}

function openKnowledgeRedirects() {
  const redirectsPath = path.join(distDir, '_redirects');
  const current = fs.existsSync(redirectsPath) ? fs.readFileSync(redirectsPath, 'utf8') : '';
  const withoutClosedGate = current
    .split('\n')
    .filter((line) => !/^\/artigos(?:\/\*)?\s+/.test(line.trim()))
    .join('\n')
    .trimEnd();
  fs.writeFileSync(redirectsPath, `${withoutClosedGate}\n/artigos  /artigos/  301\n`, 'utf8');
}

function appendLlms() {
  const llmsPath = path.join(distDir, 'llms.txt');
  const current = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, 'utf8').trim() : '# Fernando Parreiras';
  const articleLines = articles.map((article) => `- [${article.title}](${siteUrl}/artigos/${article.slug}/): ${article.excerpt}`).join('\n');
  fs.writeFileSync(llmsPath, `${current}\n\n## Conhecimento\n- [Conhecimento](${siteUrl}/artigos/): Artigos e trilhas sobre liderança, negócios, carreira com IA, jovens e mudança profissional.\n${articleLines}\n`, 'utf8');
}

export function main() {
  if (!fs.existsSync(indexPath)) throw new Error('dist/index.html não encontrado. Execute o Vite antes deste gerador.');
  const baseHtml = fs.readFileSync(indexPath, 'utf8');

  const landingSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Conhecimento — Fernando Parreiras',
    url: `${siteUrl}/artigos/`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({ '@type': 'ListItem', position: index + 1, url: `${siteUrl}/artigos/${article.slug}/`, name: article.title })),
    },
  };

  writePage('artigos', buildPage(baseHtml, {
    title: 'Conhecimento | Fernando Parreiras',
    description: 'Artigos e trilhas sobre liderança, negócios, carreira com IA, jovens e mudança profissional.',
    canonical: `${siteUrl}/artigos/`,
    schema: landingSchema,
    body: renderStaticLanding(),
  }));

  for (const article of articles) {
    const canonical = `${siteUrl}/artigos/${article.slug}/`;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      image: absoluteUrl(article.image),
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      mainEntityOfPage: canonical,
      keywords: article.tags.join(', '),
      author: { '@type': 'Person', name: 'Fernando Parreiras', url: siteUrl },
    };
    writePage(path.join('artigos', article.slug), buildPage(baseHtml, {
      title: `${article.title} | Fernando Parreiras`,
      description: article.excerpt,
      canonical,
      image: article.image,
      type: 'article',
      publishedAt: article.publishedAt,
      modifiedAt: article.updatedAt,
      tags: article.tags,
      schema,
      body: renderStaticArticle(article),
    }));
  }

  ensureDir(path.join(distDir, 'artigos'));
  fs.writeFileSync(path.join(distDir, 'artigos', 'rss.xml'), generateFeed(), 'utf8');
  mergeSitemap();
  openKnowledgeRedirects();
  appendLlms();
  console.log(`Conhecimento gerado: ${articles.length} artigos, RSS, sitemap e HTML estático.`);
}

const isMainModule = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMainModule) main();
