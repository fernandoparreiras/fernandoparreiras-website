# Roadmap de implementação

## Prioridades

| Prioridade | Critério |
| --- | --- |
| P0 | sem a entrega, o site continua sem rota comercial clara ou sem captura funcional |
| P1 | aumenta prova, descoberta, qualidade do lead ou capacidade operacional |
| P2 | otimiza um sistema já operando; depende de dados ou infraestrutura |

## Dependências

```text
EPIC-01 Estratégia e arquitetura
  -> EPIC-02 Homepage e roteamento
  -> EPIC-03 Ofertas e prova
  -> EPIC-04 Captação e mensuração
  -> EPIC-05 Autoridade e descoberta
  -> EPIC-06 Operação, experimentação e escala
```

## Fase 0 — Fundação canônica

Objetivo: eliminar ambiguidade antes de expandir código.

- estratégia, taxonomia e claims;
- mapa de públicos e destinos;
- arquitetura de informação;
- eventos e estados de evidência;
- integração da base da PR #7.

Saída: documentos canônicos, backlog, branch isolada e base SEO reconciliada.

## Fase 1 — P0: hub comercial funcional

Objetivo: transformar a home em um sistema de escolha e contato.

- novo hero;
- seletor de intenção;
- prova verificável;
- ecossistema estático e categorizado;
- ofertas productizadas;
- cases iniciais;
- galeria “Em cena”;
- qualificação com WhatsApp;
- navegação curta e CTA mobile;
- eventos de conversão.

Saída: usuário encontra a rota correta e envia demanda contextualizada.

## Fase 2 — P1: páginas comerciais e autoridade

Objetivo: captar demanda específica, melhorar SEO e reduzir dúvidas antes do contato.

- páginas de solução;
- página de palestras/media kit;
- página de negócios;
- página de cases;
- hub de conteúdo;
- artigos Forge condicionados a conteúdo aprovado;
- dados estruturados, sitemap e HTML estático;
- assets críticos versionados localmente.

Saída: cada intenção relevante possui uma landing indexável e um CTA próprio.

## Fase 3 — P1/P2: operação de vendas

Objetivo: persistir, rotear e acompanhar leads.

- endpoint server-side;
- proteção antiabuso;
- CRM;
- consentimento e privacidade;
- confirmação e agenda;
- UTMs e atribuição;
- painel de funil.

Saída: submissão real observada da página até o destino comercial.

## Fase 4 — P2: aprendizado e escala

Objetivo: otimizar com dados reais.

- linha de base de 30 dias;
- testes de promessa e CTA;
- personalização por origem;
- nutrição por intenção;
- multilíngue orientado por demanda;
- revisão trimestral de negócios e maturidade.

## Definition of Done por issue

Uma issue só está `VERIFIED` quando:

- critérios de aceite atendidos;
- lint dos arquivos tocados passa;
- testes automatizados relevantes passam;
- build de produção passa;
- `git diff --check` passa;
- desktop e mobile são inspecionados;
- teclado, foco e reduced motion são verificados quando aplicável;
- documentação e status são atualizados.

Uma issue só está `OPERATING` quando:

- merge concluído;
- deploy público corresponde ao SHA;
- rota e assets retornam 200;
- evento ou formulário real percorre o destino esperado;
- regressões críticas não são observadas.

## Estratégia de entrega

- Branch: `codex/commercial-hub`.
- Base: `main` atual, reconciliada com a PR #7.
- PR inicial: draft até a validação visual e técnica.
- Escopo de staging: somente arquivos do hub, documentação e base SEO reconciliada.
- Cutover Netlify/DNS permanece dependente da issue #1 e de aceite humano explícito.

