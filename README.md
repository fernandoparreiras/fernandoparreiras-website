# Site de Fernando Parreiras

Hub público de Fernando Parreiras para liderança, produtos de IA, pensamento sistêmico, mentoria e iniciativas Tech Human.

## Identidade canônica

O domínio canônico é [fernandoparreiras.com.br](https://fernandoparreiras.com.br/). O build publica
metadados `ProfilePage`/`Person` com os perfis oficiais fornecidos pelo autor e redireciona `www`
para o domínio apex.

Iniciativas relacionadas:

- [Trustyu.ai](https://trustyu.ai)
- [Tech Human](http://techhuman.com.br)

## Stack

![React](https://img.shields.io/badge/React-111827?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-111827?style=for-the-badge&logo=framer&logoColor=white)

## Desenvolvimento local

```bash
npm install
npm run dev
```

Validação e build de produção:

```bash
npm test
npm run lint
npm run build
```

O build gera HTML inicial e metadados específicos para as rotas públicas, além de `robots.txt`,
`sitemap.xml` e `llms.txt` coerentes entre si.

## Artigos da Trustyu Forge

O arquivo `src/data/forgeArticles.js` é o único ponto de ativação do hub autoral. Enquanto o
catálogo estiver vazio, “Artigos” não aparece no menu, a rota `/artigos/` não é gerada, responde
404 no Netlify e o sitemap não a anuncia. Um item futuro precisa apontar para a publicação canônica
na Forge e carregar o digest exato da aprovação editorial.

Não há CMS nem conteúdo editorial definido neste repositório. A publicação original pertence à
Trustyu Forge; este site funciona como vínculo autoral e índice canônico de saída.

## Hospedagem

`netlify.toml` contém build, redirects, headers e cache. O procedimento de DNS e rollback está em
[`docs/netlify-cutover-runbook.md`](docs/netlify-cutover-runbook.md); o cutover continua sendo uma
ação humana separada.
