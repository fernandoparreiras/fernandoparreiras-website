import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { FORGE_ARTICLES, hasPublishedForgeArticles } from '../src/data/forgeArticles.js';
import { generateLlmsTxt } from '../tools/generate-llms.js';
import {
  generateStaticRoutes,
  renderRedirects,
  renderSeoBlock,
  validateArticles
} from '../tools/generate-static-routes.js';
import { ROUTE_METADATA } from '../src/data/siteMetadata.js';

const SOURCE_HTML = `<!doctype html>
<html lang="pt-BR"><head>
<!-- SEO:START --><title>Raiz</title><!-- SEO:END -->
<link rel="stylesheet" href="/assets/site.css">
</head><body><div id="root"></div><script type="module" src="/assets/site.js"></script></body></html>`;

const SYNTHETIC_ARTICLE = Object.freeze({
  id: 'article-fixture-nao-publicar',
  title: 'Artigo sintético para validar o gate',
  description: 'Fixture sem pauta editorial usado apenas para validar a ativação estática do hub autoral.',
  canonicalUrl: 'https://forge.trustyu.ai/artigos/fixture-nao-publicar/',
  publishedAt: '2026-08-05T12:00:00Z',
  approvalDigest: `sha256:${'a'.repeat(64)}`
});

test('o catálogo real começa vazio e mantém o gate público fechado', () => {
  assert.deepEqual(FORGE_ARTICLES, []);
  assert.equal(hasPublishedForgeArticles, false);
  assert.doesNotThrow(() => validateArticles(FORGE_ARTICLES));
});

test('o validator rejeita publicação fora da canonical da Forge', () => {
  assert.throws(
    () => validateArticles([{ ...SYNTHETIC_ARTICLE, canonicalUrl: 'https://example.com/artigos/x/' }]),
    /publicação canônica na Forge/
  );
});

test('o validator rejeita asset sem digest de aprovação', () => {
  assert.throws(
    () => validateArticles([{ ...SYNTHETIC_ARTICLE, approvalDigest: 'pendente' }]),
    /SHA-256 aprovado/
  );
});

test('o validator rejeita data de calendário que o JavaScript normalizaria', () => {
  assert.throws(
    () => validateArticles([{ ...SYNTHETIC_ARTICLE, publishedAt: '2026-02-29T12:00:00Z' }]),
    /UTC no formato ISO 8601/
  );
});

test('metadados de autor usam canonical apex e perfis fornecidos', () => {
  const seo = renderSeoBlock(ROUTE_METADATA['/']);
  assert.match(seo, /https:\/\/fernandoparreiras\.com\.br\//);
  assert.match(seo, /linkedin\.com\/in\/fernandoparreiras/);
  assert.match(seo, /github\.com\/fernandoparreiras/);
  assert.match(seo, /instagram\.com\/parreiras\.fernando/);
});

test('build vazio não cria rota, menu semântico ou sitemap de artigos', () => {
  const outputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'fernando-site-empty-'));
  fs.writeFileSync(path.join(outputDirectory, '.htaccess'), 'configuração legada', 'utf8');
  generateStaticRoutes({ sourceHtml: SOURCE_HTML, outputDirectory, articles: [] });

  assert.equal(fs.existsSync(path.join(outputDirectory, 'artigos', 'index.html')), false);
  assert.equal(fs.existsSync(path.join(outputDirectory, '.htaccess')), false);
  assert.equal(fs.existsSync(path.join(outputDirectory, '404.html')), true);
  assert.equal(fs.existsSync(path.join(outputDirectory, 'docks', 'index.html')), true);
  assert.equal(fs.existsSync(path.join(outputDirectory, 'epitafio', 'index.html')), true);
  assert.doesNotMatch(fs.readFileSync(path.join(outputDirectory, 'sitemap.xml'), 'utf8'), /artigos/);
  assert.match(fs.readFileSync(path.join(outputDirectory, '_redirects'), 'utf8'), /\/artigos\/\*/);
  assert.doesNotMatch(fs.readFileSync(path.join(outputDirectory, '_redirects'), 'utf8'), /\/index\.html 200/);
  assert.doesNotMatch(generateLlmsTxt([]), /Artigos publicados/);
});

test('primeiro asset aprovado ativa HTML estático, SEO e descoberta juntos', () => {
  const outputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'fernando-site-active-'));
  generateStaticRoutes({
    sourceHtml: SOURCE_HTML,
    outputDirectory,
    articles: [SYNTHETIC_ARTICLE]
  });

  const articleHtml = fs.readFileSync(path.join(outputDirectory, 'artigos', 'index.html'), 'utf8');
  const sitemap = fs.readFileSync(path.join(outputDirectory, 'sitemap.xml'), 'utf8');
  assert.match(articleHtml, /Artigo sintético para validar o gate/);
  assert.match(articleHtml, /application\/ld\+json/);
  assert.match(articleHtml, /https:\/\/forge\.trustyu\.ai\/artigos\/fixture-nao-publicar\//);
  assert.doesNotMatch(articleHtml, /<script[^>]+type="module"/);
  assert.match(sitemap, /https:\/\/fernandoparreiras\.com\.br\/artigos\//);
  assert.doesNotMatch(renderRedirects([SYNTHETIC_ARTICLE]), /\/artigos\/\*/);
  assert.doesNotMatch(renderRedirects([SYNTHETIC_ARTICLE]), /\/index\.html 200/);
  assert.match(generateLlmsTxt([SYNTHETIC_ARTICLE]), /Artigos publicados na Trustyu Forge/);
});
