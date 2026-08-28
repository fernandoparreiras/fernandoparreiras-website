import assert from 'node:assert/strict';
import test from 'node:test';
import { editorialArticles, getPublishedArticles } from '../src/data/articles.js';
import { scheduledArticles } from '../src/data/scheduledArticles.js';

const EXPECTED_SCHEDULE = [
  ['dia-seguinte-primeira-venda', '2026-09-02T09:00:00-03:00'],
  ['valor-do-julgamento-com-ia', '2026-09-05T09:00:00-03:00'],
  ['produtividade-sem-direcao-acelera-o-desperdicio', '2026-09-06T09:00:00-03:00'],
  ['redesenhar-o-valor-que-voce-entrega-com-ia', '2026-09-10T09:00:00-03:00'],
  ['faculdade-curso-certificacao-ou-projeto', '2026-09-14T09:00:00-03:00'],
  ['competencias-que-sobrevivem-a-uma-mudanca-de-carreira', '2026-09-18T09:00:00-03:00'],
  ['equipes-com-agentes-de-ia-ainda-precisam-de-responsabilidade-humana', '2026-09-22T09:00:00-03:00'],
  ['plano-de-90-dias-para-uma-transicao-profissional-com-ia', '2026-09-26T09:00:00-03:00'],
];

test('coleção editorial inicial possui quatorze artigos com minissérie autoral', () => {
  assert.equal(editorialArticles.length, 14);

  const countsByTrack = editorialArticles.reduce((counts, article) => ({
    ...counts,
    [article.track]: (counts[article.track] || 0) + 1,
  }), {});
  assert.deepEqual(
    countsByTrack,
    {
      'carreira-ia': 4,
      'jovens-futuro': 3,
      'lideranca-negocios': 4,
      'mudanca-carreira': 3,
    }
  );
});

test('fila inclui dois especiais e preserva quatro dias entre evergreen', () => {
  const chronological = [...scheduledArticles].sort(
    (left, right) => new Date(left.scheduledAt) - new Date(right.scheduledAt)
  );

  assert.deepEqual(
    chronological.map((article) => [article.slug, article.scheduledAt]),
    EXPECTED_SCHEDULE
  );

  for (let index = 3; index < chronological.length; index += 1) {
    const interval = new Date(chronological[index].scheduledAt) - new Date(chronological[index - 1].scheduledAt);
    assert.equal(interval, 4 * 24 * 60 * 60 * 1000);
  }
});

test('artigos futuros permanecem fora do acervo até o horário agendado', () => {
  const immediatelyBeforeFirstRelease = getPublishedArticles('2026-09-02T11:59:59Z');
  const firstRelease = getPublishedArticles('2026-09-02T12:00:00Z');
  const completeRelease = getPublishedArticles('2026-09-26T12:00:00Z');

  assert.equal(immediatelyBeforeFirstRelease.length, 6);
  assert.equal(firstRelease.length, 7);
  assert.equal(firstRelease[0].slug, 'dia-seguinte-primeira-venda');
  assert.equal(completeRelease.length, 14);
  assert.equal(completeRelease[0].slug, 'plano-de-90-dias-para-uma-transicao-profissional-com-ia');
});

test('data editorial e data de ativação usam o mesmo dia em São Paulo', () => {
  for (const article of scheduledArticles) {
    assert.equal(article.scheduledAt.slice(0, 10), article.publishedAt);
    assert.equal(article.updatedAt, article.publishedAt);
    assert.match(article.scheduledAt, /T09:00:00-03:00$/);
  }
});
