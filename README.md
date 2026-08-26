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
| `/sobre/` | Trajetória, princípios e posicionamento |
| `/contato/` | Canais de contato e conversão |
| `/docks/` | Biblioteca de apresentações públicas |

Rotas editoriais futuras são publicadas de forma fail-closed: enquanto não houver item aprovado no catálogo, elas não entram no menu, no sitemap nem no conjunto de páginas estáticas.

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

O build produz o bundle Vite e, em seguida, gera o HTML inicial das rotas públicas, `robots.txt`, `sitemap.xml` e `llms.txt` a partir das mesmas fontes canônicas.

## Conteúdo e publicação

O site não depende de CMS. Navegação, soluções, cases, apresentações e metadados ficam versionados em `src/data/`.

O catálogo `src/data/forgeArticles.js` é o gate do índice autoral da Trustyu FORGE. Um artigo só pode ser anunciado quando existir uma publicação canônica aprovada e o registro local carregar seu vínculo e digest editorial. Com o catálogo vazio, `/artigos/` permanece fora da navegação e responde 404 em produção.

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
