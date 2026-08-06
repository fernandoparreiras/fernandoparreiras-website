/**
 * Projeções aprovadas de artigos publicados na Trustyu Forge.
 *
 * Este catálogo começa intencionalmente vazio. Um item só pode ser incluído
 * depois de passar pelo contrato editorial `forge.article-static/v1` e estar
 * disponível em sua URL canônica pública. Enquanto estiver vazio, rota, menu,
 * sitemap e JSON-LD de artigos permanecem desativados.
 */
export const FORGE_ARTICLES = Object.freeze([]);

export const hasPublishedForgeArticles = FORGE_ARTICLES.length > 0;
