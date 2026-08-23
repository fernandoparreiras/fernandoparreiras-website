# Auditoria e hardening de acessibilidade — 2026-08-23

## Escopo

Tranche vinculada à issue CH-13 para a jornada comercial entre navegação, conteúdo e contato. A validação combina inspeção visual no navegador integrado, contratos automatizados de código e os gates completos do repositório.

Esta evidência não declara conformidade WCAG integral. Testes com tecnologias assistivas reais, zoom de 200% e matriz completa de navegadores continuam sendo uma etapa separada de homologação.

## Evidências visuais aceitas

- `01-home-entry.png`: entrada da home em produção antes do hardening, usada para conferir hierarquia, recorte, cabeçalho e CTA principal.
- `03-contact-validation.png`: validação nativa do formulário de contato com foco visível no primeiro campo obrigatório.
- `04-home-keyboard-focus-after.png`: versão local após o hardening, com foco visível no link “Soluções” e composição principal preservada.

Uma captura intermediária do skip link foi descartada da evidência porque o navegador integrado não reproduziu uma tecla Tab inicial de forma confiável.

## Problemas encontrados e correções

1. O menu móvel movia o foco para o primeiro link e devolvia ao botão no Escape, mas não fechava o ciclo de tabulação. O overlay agora é um diálogo modal, retém Tab e Shift+Tab entre o botão e os links, restaura o overflow anterior e devolve o foco ao controle de abertura.
2. Mudanças de rota reposicionavam apenas a rolagem. Agora, após a primeira carga, o foco programático também vai para a região de conteúdo principal, evitando que usuários de teclado continuem no cabeçalho sem contexto da nova página.
3. A preferência de movimento reduzido era respeitada apenas em componentes isolados. `MotionConfig reducedMotion="user"` passa a governar toda a árvore Framer Motion, mantendo a regra CSS de contingência.
4. O CTA comercial fixo podia cobrir o final do conteúdo em telas menores. As páginas que exibem o CTA agora reservam espaço inferior, e elementos focados recebem margem de rolagem compatível. A rota de contato não renderiza o CTA fixo.
5. Textos auxiliares e placeholders abaixo do contraste desejado foram elevados para 60% ou 55% de branco. Branco a 60% resulta em contraste calculado de 7,18:1 ou superior nos fundos escuros usados nesta experiência.
6. O checkbox de consentimento e o link da política de privacidade receberam foco visível explícito.

## Contratos automatizados

`tests/accessibility-contract.test.js` protege:

- um H1 por composição comercial;
- diálogo, retenção e devolução de foco do menu móvel;
- foco no conteúdo após mudança de rota;
- movimento reduzido global;
- reserva de espaço e supressão do CTA fixo na rota de contato.

No navegador integrado, a navegação SPA da home para `/solucoes` deixou a região “Conteúdo principal” ativa, o skip link também levou o foco a essa região e a rota manteve um único H1 na árvore de acessibilidade.

## Limites da evidência

- A inspeção visual foi feita no navegador integrado em viewport desktop.
- A validação de 200% e a auditoria assistiva completa não são inferidas a partir das capturas.
- Semântica e comportamento são protegidos pelos contratos de código, mas a issue CH-13 deve permanecer aberta até a homologação complementar de zoom, mobile e tecnologia assistiva.
