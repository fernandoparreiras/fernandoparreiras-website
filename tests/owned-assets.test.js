import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const REPOSITORY_ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE_FILES = [
  'index.html',
  'src/components/About.jsx',
  'src/components/Books.jsx',
  'src/components/EpitafioPage.jsx',
  'src/components/Header.jsx',
  'src/components/Hero.jsx'
];

test('ativos críticos não dependem do CDN legado da Hostinger', () => {
  const source = SOURCE_FILES
    .map((file) => fs.readFileSync(path.join(REPOSITORY_ROOT, file), 'utf8'))
    .join('\n');

  assert.doesNotMatch(source, /horizons-cdn\.hostinger\.com/);
  assert.doesNotMatch(source, /images\.unsplash\.com/);
});

test('todo ativo proprietário referenciado existe no diretório público', () => {
  const source = SOURCE_FILES
    .map((file) => fs.readFileSync(path.join(REPOSITORY_ROOT, file), 'utf8'))
    .join('\n');
  const publicAssetPaths = [...source.matchAll(/["'](\/(?:favicon\.png|images\/[^"']+))["']/g)]
    .map((match) => match[1]);

  assert.ok(publicAssetPaths.length >= 16, 'o inventário deve cobrir os ativos migrados');

  for (const assetPath of publicAssetPaths) {
    const localPath = path.join(REPOSITORY_ROOT, 'public', assetPath);
    assert.equal(fs.existsSync(localPath), true, `ativo ausente: ${assetPath}`);
    assert.ok(fs.statSync(localPath).size > 0, `ativo vazio: ${assetPath}`);
  }
});
