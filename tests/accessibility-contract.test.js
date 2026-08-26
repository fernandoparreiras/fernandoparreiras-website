import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const REPOSITORY_ROOT = path.resolve(import.meta.dirname, '..');
const readSource = (file) => fs.readFileSync(path.join(REPOSITORY_ROOT, file), 'utf8');

const commercialRoutes = [
  ['início', 'src/components/Hero.jsx'],
  ['soluções', 'src/pages/SolutionsPage.jsx'],
  ['detalhe de solução', 'src/pages/SolutionDetailPage.jsx'],
  ['palestras', 'src/pages/TalksPage.jsx'],
  ['negócios', 'src/pages/BusinessHubPage.jsx'],
  ['cases', 'src/pages/CasesPage.jsx'],
  ['conteúdos', 'src/pages/ContentHubPage.jsx'],
  ['sobre', 'src/pages/AboutPage.jsx'],
  ['contato', 'src/pages/ContactPage.jsx']
];

test('cada composição comercial declara exatamente um H1', () => {
  for (const [routeName, file] of commercialRoutes) {
    const source = readSource(file);
    const directHeadings = [...source.matchAll(/<h1\b/g)].length;
    const pageHeroHeadings = source.includes('<PageHero') ? 1 : 0;
    const delegatedHeadings = source.includes('headingLevel="h1"') ? 1 : 0;
    assert.equal(
      directHeadings + pageHeroHeadings + delegatedHeadings,
      1,
      `a composição ${routeName} precisa declarar exatamente um H1`
    );
  }
});

test('menu móvel funciona como diálogo e mantém a tabulação dentro do fluxo', () => {
  const header = readSource('src/components/Header.jsx');

  assert.match(header, /role=\{isMobileMenuOpen \? 'dialog' : undefined\}/);
  assert.match(header, /aria-modal=\{isMobileMenuOpen \? 'true' : undefined\}/);
  assert.match(header, /event\.key === 'Tab'/);
  assert.match(header, /event\.key === 'Escape'/);
  assert.match(header, /menuButtonRef\.current, \.\.\.navigationLinks/);
  assert.match(header, /firstMobileLinkRef\.current\?\.focus\(\)/);
  assert.match(header, /menuButtonRef\.current\?\.focus\(\)/);
});

test('mudança de rota restaura rolagem e leva o foco ao conteúdo principal', () => {
  const scrollToTop = readSource('src/components/ScrollToTop.jsx');
  const app = readSource('src/App.jsx');

  assert.match(scrollToTop, /window\.scrollTo/);
  assert.match(scrollToTop, /getElementById\('main-content'\)\?\.focus/);
  assert.match(app, /id="main-content"/);
  assert.match(app, /tabIndex="-1"/);
  assert.match(app, /aria-label="Conteúdo principal"/);
});

test('preferência de movimento reduzido é aplicada a toda a árvore', () => {
  const app = readSource('src/App.jsx');
  const styles = readSource('src/index.css');

  assert.match(app, /<MotionConfig reducedMotion="user">/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});

test('ações de compartilhamento usam ícones com nomes acessíveis e tooltips', () => {
  const utilities = readSource('src/components/knowledge/ArticleUtilities.jsx');
  const accessibleNames = [
    'Compartilhar artigo',
    'Compartilhar no LinkedIn',
    'Compartilhar no WhatsApp',
    'Compartilhar por e-mail',
    'Copiar link do artigo',
    'Copiar legenda para Instagram'
  ];

  for (const accessibleName of accessibleNames) {
    assert.match(utilities, new RegExp(`aria-label="${accessibleName}"`));
  }

  assert.equal([...utilities.matchAll(/className="sr-only"/g)].length, 6);
  assert.match(utilities, /group-hover:opacity-100 group-focus-visible:opacity-100/);
  assert.match(utilities, /<Instagram className="h-5 w-5"/);
  assert.doesNotMatch(utilities, /<Share2[^>]+\/>\s*Compartilhar/);
  assert.doesNotMatch(utilities, /<Copy[^>]+\/>\s*Legenda para Instagram/);
});

test('CTA móvel reserva área útil e não aparece na rota de contato', () => {
  const app = readSource('src/App.jsx');

  assert.match(app, /shouldShowMobileCommercialCta\(location\.pathname\)/);
  assert.match(app, /showMobileCommercialCta \? 'pb-20 lg:pb-0'/);
  assert.match(app, /showMobileCommercialCta && <MobileCommercialCTA \/>/);
});
