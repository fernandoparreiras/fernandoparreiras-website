import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isAcademyPath,
  normalizePathname,
  shouldShowMobileCommercialCta
} from '../src/lib/navigation.js';

test('normaliza a barra final sem alterar a raiz', () => {
  assert.equal(normalizePathname('/'), '/');
  assert.equal(normalizePathname('/contato/'), '/contato');
  assert.equal(normalizePathname('/contato////'), '/contato');
});

test('CTA móvel fica oculto em contato com ou sem barra final', () => {
  assert.equal(shouldShowMobileCommercialCta('/contato'), false);
  assert.equal(shouldShowMobileCommercialCta('/contato/'), false);
  assert.equal(shouldShowMobileCommercialCta('/contato////'), false);
  assert.equal(shouldShowMobileCommercialCta('/cases/'), true);
  assert.equal(shouldShowMobileCommercialCta('/'), true);
});

test('rotas legadas da Academy permanecem fora da composição do site pessoal', () => {
  assert.equal(isAcademyPath('/academy'), true);
  assert.equal(isAcademyPath('/academy/ia-sem-confusao/'), true);
  assert.equal(shouldShowMobileCommercialCta('/academy/ia-sem-confusao/'), false);
});
