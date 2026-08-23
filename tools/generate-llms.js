#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FORGE_ARTICLES } from '../src/data/forgeArticles.js';
import { PUBLIC_BASE_ROUTES, ROUTE_METADATA, absoluteUrl } from '../src/data/siteMetadata.js';
import { validateArticles } from './generate-static-routes.js';

export function generateLlmsTxt(articles = FORGE_ARTICLES) {
  validateArticles(articles);
  const routes = [
    ...PUBLIC_BASE_ROUTES,
    ...(articles.length > 0 ? [ROUTE_METADATA['/artigos/']] : [])
  ];
  const pages = routes
    .map((metadata) => `- [${metadata.title}](${absoluteUrl(metadata.path)}): ${metadata.description}`)
    .join('\n');

  return `# Fernando Parreiras\n\n## Páginas públicas\n\n${pages}\n`;
}

export function main() {
  const outputDirectory = path.resolve('dist');
  if (!fs.existsSync(outputDirectory)) {
    throw new Error('Execute o build antes de gerar llms.txt.');
  }

  fs.writeFileSync(path.join(outputDirectory, 'llms.txt'), generateLlmsTxt(), 'utf8');
}

const isMainModule = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMainModule) {
  main();
}
