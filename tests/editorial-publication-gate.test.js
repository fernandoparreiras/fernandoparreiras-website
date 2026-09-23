import assert from "node:assert/strict";
import test from "node:test";
import { scheduledArticles } from "../src/data/scheduledArticles.js";
import {
  validateEditorialPublication,
  validateEditorialPublications,
} from "../src/lib/editorial-publication-gate.js";

test("toda a fila agendada passa pelo gate antes da data de publicação", () => {
  assert.equal(scheduledArticles.length, 14);
  assert.doesNotThrow(() => validateEditorialPublications(scheduledArticles));
});

test("gate orienta o título canônico quando encontra uma seção de fontes incompatível", () => {
  assert.throws(
    () =>
      validateEditorialPublication({
        slug: "titulo-de-fontes-incompativel",
        scheduledAt: "2026-09-20T13:30:00-03:00",
        content: [
          {
            heading: "Fontes e limites da análise",
            paragraphs: ["[Fonte](https://example.org/report)."],
          },
          {
            heading: "Nota editorial e de responsabilidade",
            paragraphs: ["Revisão autoral concluída."],
          },
        ],
      }),
    /título editorial incompatível.*Fonte e natureza do texto/,
  );
});

test("gate rejeita artigo agendado sem fonte clicável", () => {
  assert.throws(
    () =>
      validateEditorialPublication({
        slug: "sem-fonte",
        scheduledAt: "2026-09-14T09:00:00-03:00",
        content: [
          { heading: "Fonte e natureza do texto", paragraphs: ["Sem link."] },
          {
            heading: "Nota editorial e de responsabilidade",
            paragraphs: ["Revisado."],
          },
        ],
      }),
    /sem fonte HTTPS clicável/,
  );
});

test("gate rejeita nota ausente ou revisão pendente", () => {
  const base = {
    slug: "nota-invalida",
    scheduledAt: "2026-09-14T09:00:00-03:00",
    content: [
      {
        heading: "Fonte e natureza do texto",
        paragraphs: ["[Fonte](https://example.org/report)."],
      },
    ],
  };

  assert.throws(
    () => validateEditorialPublication(base),
    /Nota editorial e de responsabilidade/,
  );
  assert.throws(
    () =>
      validateEditorialPublication({
        ...base,
        content: [
          ...base.content,
          {
            heading: "Nota editorial e de responsabilidade",
            paragraphs: ["Revisão editorial pendente."],
          },
        ],
      }),
    /revisão editorial pendente/,
  );
});

test("gate aceita transparência sobre ausência de revisão humana independente", () => {
  assert.doesNotThrow(() =>
    validateEditorialPublication({
      slug: "revisao-independente",
      scheduledAt: "2026-09-14T09:00:00-03:00",
      content: [
        {
          heading: "Fonte e natureza do texto",
          paragraphs: ["[Fonte](https://example.org/report)."],
        },
        {
          heading: "Nota editorial e de responsabilidade",
          paragraphs: ["Revisão autoral concluída, sem revisão humana independente."],
        },
      ],
    }),
  );
});
