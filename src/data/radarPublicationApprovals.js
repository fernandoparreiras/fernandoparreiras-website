export const radarPublicationApprovals = Object.freeze({
  "saber-quando-parar-uma-ia": Object.freeze({
    approvedBy: "Fernando Parreiras",
    approvedAt: "2026-09-10T19:12:00Z",
    evidenceUrl:
      "https://github.com/fernandoparreiras/fernandoparreiras-website/pull/38#pullrequestreview-5171245449",
    contentFile: "src/data/radarSeptember10Articles.js",
    contentSha256: "0b29454cc6d485883727d9d358e98ddfac194c9b7cb25f9ed9d4583bf1d3c167",
  }),
});

export function isRadarArticleApproved(article) {
  return Object.hasOwn(radarPublicationApprovals, article.slug);
}
