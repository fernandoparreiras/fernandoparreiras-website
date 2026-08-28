import test from 'node:test';
import assert from 'node:assert/strict';
import { editorialHtml, editorialSegments } from '../src/lib/editorial-links.js';
import { radarArticles } from '../src/data/radarArticles.js';
import { scheduledArticles } from '../src/data/scheduledArticles.js';

test('fontes HTTPS viram links sem HTML arbitrário', () => {
  assert.equal(editorialHtml('Leia [paper](https://example.org/paper) agora.'), 'Leia <a href="https://example.org/paper" rel="noopener noreferrer">paper</a> agora.');
  assert.equal(editorialHtml('<script>x</script>'), '&lt;script&gt;x&lt;/script&gt;');
  assert.deepEqual(editorialSegments('[x](javascript:alert)'), [{ text: '[x](javascript:alert)' }]);
  assert.deepEqual(editorialSegments('[x](https://user:pass@example.org)'), [{ text: '[x](https://user:pass@example.org)' }]);
  assert.deepEqual(editorialSegments('Sem link'), [{ text: 'Sem link' }]);
  assert.deepEqual(editorialSegments(''), []);
});

test('dois ensaios aprovados têm fontes diretas, nota e agenda sem colisões', () => {
  assert.equal(radarArticles.length, 2);
  assert.equal(scheduledArticles.length, 8);
  assert.equal(new Set(scheduledArticles.map(a => a.scheduledAt)).size, 8);
  for (const article of radarArticles) {
    const body = article.content.flatMap(section => section.paragraphs).join('\n');
    assert.match(body, /https:\/\/arxiv.org/);
    assert.match(body, /sem revisão humana independente/);
    assert.doesNotMatch(body, /pendentes neste rascunho|Revisão editorial humana: pendente/);
  }
});
