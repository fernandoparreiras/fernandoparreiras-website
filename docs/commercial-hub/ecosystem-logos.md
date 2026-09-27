# Logos dos cards do ecossistema

Em 27/09/2026, os cards de Tech Human, Fernando Parreiras, NEEDYU e Trustyu/FORGE receberam as marcas usadas nos respectivos sites oficiais. A configuração em `src/data/commercialHub.js` atende simultaneamente ao resumo da home e à página `/negocios/`, por meio do componente existente `InitiativeLogo`.

Os arquivos foram preservados sem redesenho, recorte ou recoloração. A apresentação mantém a proporção original e usa arquivos locais, compatíveis com a CSP do site. Textos, destinos e demais iniciativas permanecem com sua configuração anterior.

| Marca | Arquivo local | Origem |
| --- | --- | --- |
| Tech Human | `/images/ecosystem/tech-human.png` | [Símbolo do cabeçalho do site oficial](https://www.techhuman.com.br/brand/logos/th-icon.png) |
| Fernando Parreiras | `/images/brand/fernando-parreiras-monogram-256.webp` | [Símbolo já usado no cabeçalho do site pessoal](https://fernandoparreiras.com.br/images/brand/fernando-parreiras-monogram-256.webp) |
| NEEDYU | `/images/ecosystem/needyu.svg` | [Logo horizontal branca usada no site oficial](https://needyu.ai/images/candidate/needyu-logo-horizontal-flat-all-white-transparent.svg), para superfícies escuras |
| Trustyu / FORGE | `/images/ecosystem/trustyu.svg` | [Símbolo do cabeçalho da FORGE](https://forge.trustyu.ai/trustyu-logo.svg) |

O caminho de origem da NEEDYU contém `candidate`, mas esse arquivo foi identificado no HTML público servido em `https://needyu.ai/`. A evidência é seu uso atual no site oficial, não o nome do diretório.

## Validação local

- 52 testes aprovados; lint, build, `git diff --check` e auditoria das dependências de produção aprovados, sem vulnerabilidades.
- Home e Negócios verificadas em 1440, 1100, 768, 390 e 320 px, com as quatro logos carregadas e sem rolagem horizontal.
- Console do artefato de produção sem erros. O aviso preexistente de tamanho do bundle permanece.
- Publicação depende da integração e da conferência do deploy e do domínio oficial.
