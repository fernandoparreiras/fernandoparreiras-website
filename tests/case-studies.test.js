import assert from 'node:assert/strict';
import test from 'node:test';
import { caseStudies } from '../src/data/commercialHub.js';

const requiredClients = [
  'Trustyu.ai',
  'NeedyU.ai',
  'OON Seguradora',
  'Grupo CSC',
  'Inforlube Group',
  'AG Immigration USA'
];

test('a seleção inclui os seis cases solicitados e retira os dois descontinuados', () => {
  const clients = caseStudies.map((item) => item.client);

  for (const client of requiredClients) {
    assert.ok(clients.includes(client), `case ausente: ${client}`);
  }

  assert.equal(clients.includes('Phygtl.world'), false);
  assert.equal(clients.includes('Sicoob Credicom'), false);
});

test('a home destaca os quatro primeiros novos cases', () => {
  assert.deepEqual(
    caseStudies.slice(0, 4).map((item) => item.client),
    requiredClients.slice(0, 4)
  );
});

test('todo case tem identificação única, narrativa e fonte pública canônica', () => {
  const ids = new Set();

  for (const item of caseStudies) {
    assert.equal(ids.has(item.id), false, `id duplicado: ${item.id}`);
    ids.add(item.id);
    assert.ok(item.category.length > 3, `categoria ausente: ${item.client}`);
    assert.ok(item.challenge.length > 20, `desafio insuficiente: ${item.client}`);
    assert.ok(item.role.length > 20, `papel insuficiente: ${item.client}`);
    assert.ok(item.work.length > 20, `atuação insuficiente: ${item.client}`);
    assert.equal(item.sourceUrl, 'https://www.techhuman.com.br/cases/');
  }
});
