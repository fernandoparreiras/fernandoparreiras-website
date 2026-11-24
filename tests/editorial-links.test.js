import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import {
  editorialHtml,
  editorialSegments,
} from "../src/lib/editorial-links.js";
import { radarArticles } from "../src/data/radarArticles.js";
import { radarPublicationApprovals } from "../src/data/radarPublicationApprovals.js";
import { scheduledArticles } from "../src/data/scheduledArticles.js";

test("fontes HTTPS viram links sem HTML arbitrário", () => {
  assert.equal(
    editorialHtml("Leia [paper](https://example.org/paper) agora."),
    'Leia <a href="https://example.org/paper" rel="noopener noreferrer">paper</a> agora.',
  );
  assert.equal(
    editorialHtml("<script>x</script>"),
    "&lt;script&gt;x&lt;/script&gt;",
  );
  assert.deepEqual(editorialSegments("[x](javascript:alert)"), [
    { text: "[x](javascript:alert)" },
  ]);
  assert.deepEqual(editorialSegments("[x](https://user:pass@example.org)"), [
    { text: "[x](https://user:pass@example.org)" },
  ]);
  assert.deepEqual(editorialSegments("Sem link"), [{ text: "Sem link" }]);
  assert.deepEqual(editorialSegments(""), []);
});

test("ensaios aprovados têm fontes diretas, nota e agenda sem colisões", () => {
  assert.equal(radarArticles.length, 3);
  assert.equal(scheduledArticles.length, 29);
  assert.equal(new Set(scheduledArticles.map((a) => a.scheduledAt)).size, 29);
  for (const article of radarArticles) {
    const body = article.content
      .flatMap((section) => section.paragraphs)
      .join("\n");
    assert.match(body, /https:\/\//);
    assert.match(body, /sem revisão humana independente/);
    assert.doesNotMatch(
      body,
      /pendentes neste rascunho|Revisão editorial humana: pendente/,
    );
  }
});

test("especial de SDLC referencia o PNG social materializado", () => {
  const article = scheduledArticles.find(
    ({ slug }) => slug === "agilidade-ia-sdlc-fluxo-completo",
  );

  assert.ok(article);
  assert.equal(
    article.image,
    "/images/conhecimento/agilidade-ia-sdlc-fluxo-completo.png",
  );

  const imagePath = new URL(`../public${article.image}`, import.meta.url);
  assert.equal(fs.existsSync(imagePath), true, `ativo ausente: ${article.image}`);
  assert.ok(fs.statSync(imagePath).size > 0, `ativo vazio: ${article.image}`);
});

test("reserva de dezembro possui fontes, nota editorial, CTA e ativo materializado", () => {
  const article = scheduledArticles.find(
    ({ slug }) =>
      slug ===
      "aprendizagem-de-equipe-precisa-sobreviver-a-troca-de-ferramenta",
  );

  assert.ok(article);
  assert.equal(article.scheduledAt, "2026-12-04T09:00:00-03:00");
  assert.equal(article.cta.href, "/contato/");

  const body = article.content
    .flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
      section.quote || "",
    ])
    .join("\n");
  assert.ok((body.match(/https:\/\//g) || []).length >= 5);

  for (const passage of [
    "Antes de preservar toda conversa ou toda configuração",
    "Esses elementos não tornam duas ferramentas equivalentes",
    "Tratar memória como um único repositório cria outra dependência",
    "Nenhuma dessas memórias precisa virar um documento longo",
    "A aprendizagem não precisa esperar uma grande migração",
    "O NIST AI RMF Generative AI Profile recomenda documentação",
    "Para um fluxo relevante, uma página curta pode conectar as quatro memórias",
    "Esse registro é uma síntese prática, não um método cientificamente validado",
  ]) {
    assert.ok(body.includes(passage), `trecho perdido na exportação: ${passage}`);
  }

  const editorialNote = article.content.find(
    ({ heading }) => heading === "Nota editorial e de responsabilidade",
  );
  assert.ok(editorialNote);
  assert.match(editorialNote.paragraphs.join("\n"), /assistência de IA/);
  assert.match(body, /sem revisão humana independente adicional/);

  const imagePath = new URL(`../public${article.image}`, import.meta.url);
  assert.equal(fs.existsSync(imagePath), true, `ativo ausente: ${article.image}`);
  assert.ok(fs.statSync(imagePath).size > 0, `ativo vazio: ${article.image}`);
});

test("revisão de metas possui evidências, limites, CTA de leads e agenda protegida", () => {
  const article = scheduledArticles.find(
    ({ slug }) => slug === "revisar-metas-quando-a-capacidade-de-execucao-muda",
  );

  assert.ok(article);
  assert.equal(article.scheduledAt, "2026-12-08T09:00:00-03:00");
  assert.equal(article.cta.href, "/contato/");

  const body = article.content
    .flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
      section.quote || "",
    ])
    .join("\n");
  assert.ok((body.match(/https:\/\//g) || []).length >= 8);

  for (const passage of [
    "Toda meta carrega uma hipótese de capacidade",
    "Velocidade local não é capacidade do sistema",
    "Quatro escolhas para alocar a nova capacidade",
    "Rebase a meta em seis campos",
    "Proteja parte da capacidade para confiabilidade e aprendizagem",
    "Faça a revisão em um ciclo de 30 dias",
  ]) {
    assert.ok(
      article.content.some(({ heading }) => heading === passage),
      `seção ausente: ${passage}`,
    );
  }

  for (const passage of [
    "Capacidade não precisa terminar sempre em quantidade",
    "Essas opções competem pelo mesmo recurso",
    "Uma revisão de capacidade pode caber em uma página",
    "O NIST AI RMF recomenda definir contexto",
    "Uma meta revisada pode continuar contendo quantidade",
    "Nenhum indicador é neutro",
    "Para uma mudança relevante de IA ou automação",
    "O ciclo não prova causalidade",
  ]) {
    assert.ok(body.includes(passage), `trecho perdido na exportação: ${passage}`);
  }

  assert.match(body, /sem revisão humana independente adicional/);
  assert.match(body, /converse comigo sobre advisory, palestras/);

  const editorialNote = article.content.find(
    ({ heading }) => heading === "Nota editorial e de responsabilidade",
  );
  assert.ok(editorialNote);
  assert.match(editorialNote.paragraphs.join("\n"), /assistência de IA/);

  const imagePath = new URL(`../public${article.image}`, import.meta.url);
  assert.equal(fs.existsSync(imagePath), true, `ativo ausente: ${article.image}`);
  assert.ok(fs.statSync(imagePath).size > 0, `ativo vazio: ${article.image}`);
});

test("o especial de 10/09 só entra na fila com aprovação do conteúdo exato", () => {
  const approval = radarPublicationApprovals["saber-quando-parar-uma-ia"];
  const content = fs.readFileSync(approval.contentFile);
  const digest = createHash("sha256").update(content).digest("hex");

  assert.equal(digest, approval.contentSha256);
  assert.equal(approval.approvedBy, "Fernando Parreiras");
  assert.match(approval.evidenceUrl, /pullrequestreview-5171245449$/);
  assert.ok(
    scheduledArticles.some((article) => article.slug === "saber-quando-parar-uma-ia"),
  );
});
