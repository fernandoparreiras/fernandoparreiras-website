import assert from 'node:assert/strict';
import test from 'node:test';
import { editorialArticles } from '../src/data/articles.js';
import { ARTICLE_SHARE_INTENTS, buildArticleShareKit } from '../src/lib/article-share-copy.js';

test('todo artigo possui intenção de discussão e conversão definida', () => {
  assert.deepEqual(
    Object.keys(ARTICLE_SHARE_INTENTS).sort(),
    editorialArticles.map((article) => article.slug).sort(),
  );

  for (const article of editorialArticles) {
    const intent = ARTICLE_SHARE_INTENTS[article.slug];
    assert.match(intent.discussion, /\?$/);
    assert.ok(intent.commercialCta.length >= 60, article.slug);
    assert.match(intent.destination, /^\//);
  }
});

test('copies são específicas por canal e sempre preservam discussão, artigo e CTA comercial', () => {
  for (const article of editorialArticles) {
    const kit = buildArticleShareKit(article);
    const channelTexts = [
      kit.linkedin.text,
      kit.whatsapp.text,
      kit.email.body,
      kit.instagram.text,
      kit.copy.text,
      kit.native.text,
    ];

    assert.equal(new Set(channelTexts).size, channelTexts.length, article.slug);
    for (const copy of channelTexts) {
      assert.match(copy, new RegExp(article.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      assert.ok(copy.includes(kit.intent.discussion), article.slug);
      assert.ok(copy.includes(kit.intent.commercialCta), article.slug);
      assert.ok(copy.includes('utm_term=cta_comercial'), article.slug);
    }

    assert.ok(kit.linkedin.text.length <= 3000, article.slug);
    assert.ok(kit.instagram.text.length <= 2200, article.slug);
    assert.equal((kit.linkedin.text.match(/#[A-Za-z0-9]+/g) || []).length, 3);
  }
});

test('links rastreiam canal, artigo e posição sem alterar a rota canônica', () => {
  const article = editorialArticles.find(({ slug }) => slug === 'ai-native-product-lead-nova-profissao');
  const kit = buildArticleShareKit(article);
  const linkedinArticle = new URL(kit.linkedin.articleUrl);
  const linkedinShare = new URL(kit.linkedin.shareUrl);
  const whatsappShare = new URL(kit.whatsapp.shareUrl);
  const emailShare = new URL(kit.email.shareUrl);

  assert.equal(linkedinArticle.pathname, `/artigos/${article.slug}/`);
  assert.equal(linkedinArticle.searchParams.get('utm_source'), 'linkedin');
  assert.equal(linkedinArticle.searchParams.get('utm_campaign'), 'conhecimento_compartilhamento');
  assert.equal(linkedinShare.hostname, 'www.linkedin.com');
  assert.equal(linkedinShare.searchParams.get('url'), kit.linkedin.articleUrl);
  assert.equal(whatsappShare.hostname, 'wa.me');
  assert.ok(whatsappShare.searchParams.get('text').includes(article.title));
  assert.equal(emailShare.protocol, 'mailto:');
  assert.ok(emailShare.searchParams.get('body').includes(kit.intent.commercialCta));
});

test('CTA editorial de compartilhamento não substitui a rota comercial', () => {
  const article = editorialArticles.find(({ slug }) => slug === 'primeira-oportunidade-procure-valor-nao-apenas-cargo');
  const kit = buildArticleShareKit(article);

  assert.equal(kit.intent.destination, '/palestras');
  assert.ok(kit.linkedin.text.includes('utm_term=cta_comercial'));
  assert.ok(!kit.linkedin.text.includes('wa.me'));
});
