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
  assert.equal(scheduledArticles.length, 26);
  assert.equal(new Set(scheduledArticles.map((a) => a.scheduledAt)).size, 26);
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
