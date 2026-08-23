import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const REPOSITORY_ROOT = path.resolve(import.meta.dirname, '..');
const heroSource = fs.readFileSync(path.join(REPOSITORY_ROOT, 'src/components/Hero.jsx'), 'utf8');

test('hero usa o retrato oficial em tamanhos responsivos', () => {
  assert.match(heroSource, /<picture>/);
  assert.match(heroSource, /fernando-parreiras-palestra-principal-720\.webp/);
  assert.match(heroSource, /fernando-parreiras-palestra-principal-1122\.webp/);
  assert.match(heroSource, /loading="eager"/);
  assert.match(heroSource, /width="1122"/);
  assert.match(heroSource, /height="1402"/);
});

test('entrada do retrato respeita a preferência de movimento reduzido', () => {
  assert.match(heroSource, /initial=\{reduceMotion \? false : \{ opacity: 0, scale: 1\.035, x: 24 \}\}/);
  assert.match(heroSource, /animate=\{reduceMotion \? undefined : \{ opacity: 1, scale: 1, x: 0 \}\}/);
});

test('retrato decorativo não repete o nome para leitores de tela', () => {
  assert.match(heroSource, /aria-hidden="true"/);
  assert.match(heroSource, /alt=""/);
});
