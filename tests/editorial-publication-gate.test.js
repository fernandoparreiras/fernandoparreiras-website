import assert from "node:assert/strict";
import test from "node:test";
import { scheduledArticles } from "../src/data/scheduledArticles.js";
import {
  validateEditorialPublication,
  validateEditorialPublications,
} from "../src/lib/editorial-publication-gate.js";

const dueSlugs = [
  "redesenhar-o-valor-que-voce-entrega-com-ia",
  "faculdade-curso-certificacao-ou-projeto",
];

test("artigos evergreen vencidos passam pelo gate de fontes e responsabilidade", () => {
  const dueArticles = scheduledArticles.filter(({ slug }) =>
    dueSlugs.includes(slug),
  );

  assert.equal(dueArticles.length, dueSlugs.length);
  assert.doesNotThrow(() => validateEditorialPublications(dueArticles));
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
