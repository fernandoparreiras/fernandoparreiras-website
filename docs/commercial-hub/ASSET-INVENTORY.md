# Inventário de ativos proprietários

## Objetivo

Eliminar a dependência do site público em relação ao CDN legado da Hostinger e manter imagens críticas versionadas junto do código, com nomes compreensíveis, dimensões explícitas e formatos adequados para a web.

## Migração executada

| Área | Ativos | Destino local | Tratamento |
| --- | ---: | --- | --- |
| Marca | 2 | `/favicon.png`, `/images/brand/` | favicon reduzido e monograma WebP de 256 px |
| Perfil | 1 | `/images/profile/` | retrato WebP com dimensões nativas declaradas |
| Livros e ebooks | 11 | `/images/content/books/` | capas WebP, carregamento tardio e dimensões declaradas |
| Mídia | 2 | `/images/content/media/` | TEDx e POR Music em WebP 16:9 |
| Legado | 1 | `/images/legacy/` | imagem do Epitáfio em WebP |

Os 16 arquivos remotos totalizavam aproximadamente 10 MB. A versão local otimizada ocupa aproximadamente 1 MB sem alterar enquadramento ou proporção.

## Guardrails

- ativos críticos não podem apontar para `horizons-cdn.hostinger.com`;
- novas imagens devem usar nomes semânticos, texto alternativo útil e dimensões explícitas;
- imagens abaixo da dobra devem usar `loading="lazy"` e `decoding="async"`;
- imagens de palco fornecidas pelo owner permanecem em `/images/em-cena/`, com variantes responsivas já versionadas;
- o fallback de capas é visual e local, sem dependência de banco de imagens externo;
- a suíte `tests/owned-assets.test.js` falha se a dependência legada reaparecer ou se um arquivo referenciado estiver ausente.

## Pendências deliberadas

- o media kit para download continua condicionado à aprovação humana de biografia, temas, direitos e claims;
- novas fotografias devem ser incorporadas somente após confirmação de direito de uso e revisão de recorte em desktop e mobile.
