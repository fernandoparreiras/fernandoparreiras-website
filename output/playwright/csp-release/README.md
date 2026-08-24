# QA — CSP por rota e apresentações

Data: 2026-08-23
Base: `origin/main` em `3760f02`, branch `codex/csp-presentation-hardening`

## Escopo

- CSP estrita nas rotas comuns, sem `unsafe-inline` ou `unsafe-eval` para scripts.
- Exceção restrita a `/presentations/*` para os bundles autocontidos.
- Validação dos headers efetivos pelo Netlify Dev, não apenas do arquivo TOML.

## Evidências

| Cenário | Resultado |
| --- | --- |
| Home desktop | H1, retrato, imagens proprietárias e layout sem overflow; console limpo |
| Home 390 x 844 | Retrato, headline e CTA móvel visíveis; sem overflow |
| Reflow equivalente a 200% (640 px) | H1 e conteúdo preservados; zero overflow horizontal |
| Teclado | Primeiro `Tab` expõe "Pular para o conteúdo"; `Enter` move o foco para `#main-content` |
| Contato 390 x 844 | Formulário presente; CTA móvel global ausente; sem controles encobertos |
| AI Human First | 31 slides, React/Babel carregados, sem erro do bundler, sem recurso externo; ArrowRight avançou para o slide 2 |
| IA para Negócios | 66 slides, React/Babel carregados, sem erro do bundler, sem recurso externo |
| Headers | Uma única CSP por resposta em `/` e nos dois HTMLs de apresentação |

Capturas:

- `home-desktop.png`
- `home-mobile.png`
- `contact-mobile.png`
- `ai-human-first.png`
- `ia-para-negocios.png`

## Gates locais

- `npm test`: 28/28 testes aprovados.
- `npm run lint`: aprovado.
- `npm run build`: aprovado, 14 rotas estáticas validadas e gate de artigos fechado.
- `npm audit --audit-level=high`: zero vulnerabilidades.
- Busca por instrumentação Horizons/editor visual em `dist`: zero ocorrências.

Esta evidência local ainda não comprova operação em produção. A classificação `OPERATING` depende do merge, deploy do SHA exato e repetição dos checks no domínio público.
