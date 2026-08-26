# Fernando Parreiras — site pessoal

Código-fonte do [hub público de Fernando Parreiras](https://fernandoparreiras.com.br/): um ponto de entrada para advisory executivo, palestras, cases, iniciativas empresariais e conteúdo sobre inteligência artificial, liderança e tecnologia humanizada.

[![Site](https://img.shields.io/badge/site-fernandoparreiras.com.br-111827?style=flat-square)](https://fernandoparreiras.com.br/)
![React](https://img.shields.io/badge/React_18-111827?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_7-111827?style=flat-square&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-111827?style=flat-square&logo=tailwindcss&logoColor=38BDF8)
![Netlify](https://img.shields.io/badge/Netlify-deploy-111827?style=flat-square&logo=netlify&logoColor=00C7B7)

## O que este projeto entrega

- posicionamento profissional e apresentação das iniciativas Trustyu.ai e Tech Human;
- páginas de soluções, advisory, conselho, transformação com IA e palestras;
- área de conhecimento com artigos, trilhas, filtros e feed RSS;
- cases, livros, apresentações e outros ativos autorais;
- rotas estáticas e metadados próprios para descoberta, SEO e agentes de IA;
- experiência responsiva, navegação por teclado e suporte a movimento reduzido;
- controles de segurança, cache e redirecionamento mantidos no próprio repositório.

## Rotas principais

| Rota | Conteúdo |
| --- | --- |
| `/` | Visão geral, proposta de valor e caminhos por intenção |
| `/solucoes/` | Advisory executivo, conselho e transformação com tecnologia e IA |
| `/palestras/` | Temas, formatos e chamada para conversa |
| `/negocios/` | Iniciativas e ecossistema empresarial |
| `/cases/` | Trabalhos e resultados selecionados |
| `/conteudos/` | Livros, mídia e acervo autoral |
| `/artigos/` | Artigos sobre liderança, negócios, carreira e IA |
| `/artigos/:slug/` | Leitura individual com metadados e HTML estático |
| `/sobre/` | Trajetória, princípios e posicionamento |
| `/contato/` | Canais de contato e conversão |
| `/docks/` | Biblioteca de apresentações públicas |

O acervo de conhecimento é versionado junto com o código. Cada artigo publicado recebe rota estática, metadados `Article`, entrada no sitemap e item no feed RSS.

## Stack

- React 18 e React Router 7;
- Vite 7;
- Tailwind CSS 3 e Framer Motion;
- metadados de página com React Helmet;
- testes de contrato com o test runner nativo do Node.js;
- hospedagem, redirects, headers e cache na Netlify.

## Desenvolvimento local

Pré-requisito: Node.js `^20.19.0` ou `>=22.12.0`. O ambiente de produção usa Node.js 22.

```bash
npm ci
npm run dev
```

O servidor local usa `http://localhost:3000`.

## Validação

Antes de abrir uma PR, execute os mesmos gates usados para validar uma entrega:

```bash
npm test
npm run lint
npm run build
npm audit --omit=dev
```

O build produz o bundle Vite e, em seguida, gera o HTML inicial das rotas públicas e dos artigos, além de `robots.txt`, `sitemap.xml`, `llms.txt` e `/artigos/rss.xml` a partir das mesmas fontes canônicas.

## Conteúdo e publicação

O site não depende de CMS. Navegação, soluções, cases, apresentações, artigos e metadados ficam versionados em `src/data/`.

`src/data/articles.js` é a fonte canônica dos artigos disponíveis e do gate de publicação. A fila aprovada fica em `src/data/scheduledArticles.js`, com um instante `scheduledAt` explícito para cada texto. Um build inclui somente os artigos cuja data já venceu; os demais permanecem fora das rotas, busca, RSS, sitemap e `llms.txt`.

Como o site é estático, cada ativação exige um novo build de produção. O calendário e o contrato operacional estão documentados em [`docs/knowledge/editorial-calendar.md`](docs/knowledge/editorial-calendar.md). Rascunhos sem aprovação editorial devem continuar fora dos dois catálogos.

## Estrutura do repositório

```text
src/components/       componentes de seção e primitives de interface
src/pages/            páginas e composição das rotas
src/data/             conteúdo estruturado e metadados canônicos
src/lib/              analytics, navegação e utilitários
public/               imagens, apresentações e arquivos de descoberta
tests/                contratos de acessibilidade, rotas e higiene de produção
tools/                geração de páginas estáticas e arquivos para crawlers
docs/                 estratégia, QA e runbooks operacionais
netlify.toml           build, redirects, CSP, headers e cache
```

## Deploy e segurança

O domínio canônico é [fernandoparreiras.com.br](https://fernandoparreiras.com.br/); acessos por `www` são redirecionados para o domínio apex. A configuração da Netlify aplica CSP restritiva às rotas normais e uma política isolada apenas às apresentações autocontidas em `/presentations/*`.

O procedimento de DNS, verificação e rollback está em [`docs/netlify-cutover-runbook.md`](docs/netlify-cutover-runbook.md). Evidências de QA versionadas ficam em [`docs/qa/`](docs/qa/) e `output/playwright/`.

## Contribuição

Este é um site pessoal mantido por Fernando Parreiras. Mudanças devem ser propostas por branch e pull request, preservar os gates editoriais e manter testes, lint, build e auditoria de dependências verdes.

## Licença

Este repositório não publica uma licença open source. Código, conteúdo e ativos visuais permanecem sob os direitos de seus respectivos titulares.
