import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const REPOSITORY_ROOT = path.resolve(import.meta.dirname, '..');
const readSource = (file) => fs.readFileSync(path.join(REPOSITORY_ROOT, file), 'utf8');

test('instrumentação do editor visual fica restrita ao servidor de desenvolvimento', () => {
  const viteConfig = readSource('vite.config.js');

  assert.match(viteConfig, /\.\.\.\(isDev \? \[addTransformIndexHtml\] : \[\]\)/);
  assert.doesNotMatch(viteConfig, /console\.warn\s*=/);
  assert.doesNotMatch(viteConfig, /customLogger/);
  assert.doesNotMatch(viteConfig, /TEMPLATE_BANNER_SCRIPT_URL/);
});

test('política de segurança pública limita origens, scripts e enquadramento', () => {
  const netlify = readSource('netlify.toml');

  assert.match(netlify, /Content-Security-Policy/);
  assert.match(netlify, /default-src 'self'/);
  assert.match(netlify, /frame-ancestors 'none'/);
  assert.match(netlify, /object-src 'none'/);
  assert.match(netlify, /script-src 'self'; script-src-attr 'none'/);
  assert.match(netlify, /style-src 'self'; style-src-attr 'unsafe-inline'/);
});

test('apresentações recebem uma CSP isolada para os bundles autocontidos', () => {
  const netlify = readSource('netlify.toml');
  const presentationPolicy = netlify.match(
    /for = "\/presentations\/\*"[\s\S]*?Content-Security-Policy = "([^"]+)"/
  )?.[1];

  assert.ok(presentationPolicy, 'a rota de apresentações precisa declarar uma CSP própria');
  assert.match(presentationPolicy, /script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:/);
  assert.match(presentationPolicy, /script-src-attr 'none'/);
  assert.doesNotMatch(presentationPolicy, /unpkg|googleapis|gstatic/);
});

test('HTML estático de conhecimento respeita a CSP sem estilos inline', () => {
  const generator = readSource('tools/generate-knowledge.mjs');
  const staticStyles = readSource('public/knowledge-static.css');

  assert.match(generator, /href="\/knowledge-static\.css"/);
  assert.doesNotMatch(generator, /<style>/);
  assert.match(staticStyles, /\.static-knowledge/);
});

test('metadados têm um único proprietário durante a hidratação', () => {
  const privacyPage = readSource('src/pages/PrivacyPage.jsx');
  const pageSeo = readSource('src/components/PageSeo.jsx');

  assert.doesNotMatch(privacyPage, /Helmet|canonical|<title>/);
  assert.match(pageSeo, /property="og:image"/);
  assert.match(pageSeo, /name="twitter:image"/);
  assert.match(pageSeo, /summary_large_image/);
});
