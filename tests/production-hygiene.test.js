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

test('política de segurança pública limita origens e enquadramento', () => {
  const netlify = readSource('netlify.toml');

  assert.match(netlify, /Content-Security-Policy/);
  assert.match(netlify, /default-src 'self'/);
  assert.match(netlify, /frame-ancestors 'none'/);
  assert.match(netlify, /object-src 'none'/);
});

test('metadados têm um único proprietário durante a hidratação', () => {
  const privacyPage = readSource('src/pages/PrivacyPage.jsx');
  const pageSeo = readSource('src/components/PageSeo.jsx');

  assert.doesNotMatch(privacyPage, /Helmet|canonical|<title>/);
  assert.match(pageSeo, /property="og:image"/);
  assert.match(pageSeo, /name="twitter:image"/);
  assert.match(pageSeo, /summary_large_image/);
});
