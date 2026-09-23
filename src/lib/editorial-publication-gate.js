const SOURCE_HEADINGS = new Set([
  "Fonte e natureza do texto",
  "Fontes e natureza do texto",
]);
const RESPONSIBILITY_HEADING = "Nota editorial e de responsabilidade";
const HTTPS_MARKDOWN_LINK = /\[[^\]]+\]\(https:\/\/[^\s)]+\)/;
const PENDING_REVIEW = /\bpendente\b|sem aprova[cç][aã]o/iu;
const SOURCE_LIKE_HEADING = /^fontes?\b/iu;

function sectionText(section) {
  return [
    ...(section.paragraphs || []),
    ...(section.bullets || []),
    section.quote || "",
  ].join("\n");
}

export function validateEditorialPublication(article) {
  if (!article?.scheduledAt) return;

  const sourceSection = article.content?.find(
    ({ heading }) => SOURCE_HEADINGS.has(heading),
  );
  const responsibilitySection = article.content?.find(
    ({ heading }) => heading === RESPONSIBILITY_HEADING,
  );
  const incompatibleSourceSection = article.content?.find(
    ({ heading }) => SOURCE_LIKE_HEADING.test(heading),
  );

  if (!sourceSection && incompatibleSourceSection) {
    throw new Error(
      `${article.slug}: título editorial incompatível em “${incompatibleSourceSection.heading}”; use “Fonte e natureza do texto” ou “Fontes e natureza do texto”.`,
    );
  }

  if (!sourceSection || !HTTPS_MARKDOWN_LINK.test(sectionText(sourceSection))) {
    throw new Error(
      `${article.slug}: publicação bloqueada sem fonte HTTPS clicável em “Fonte(s) e natureza do texto”.`,
    );
  }

  if (!responsibilitySection) {
    throw new Error(
      `${article.slug}: publicação bloqueada sem “${RESPONSIBILITY_HEADING}”.`,
    );
  }

  if (PENDING_REVIEW.test(sectionText(responsibilitySection))) {
    throw new Error(
      `${article.slug}: publicação bloqueada por revisão editorial pendente.`,
    );
  }
}

export function validateEditorialPublications(articles) {
  articles.forEach(validateEditorialPublication);
}
