# Fernando Parreiras — Commercial Hub

Este diretório é a fonte de verdade da transformação de `fernandoparreiras.com.br` em um hub de autoridade, negócios e conversão.

## Objetivo

Fazer o site cumprir quatro funções sem misturá-las:

1. apresentar Fernando com evidência e posicionamento atual;
2. reconhecer a intenção do visitante;
3. encaminhar cada demanda ao negócio, produto ou oferta correta;
4. transformar interesse em conversa qualificada e mensurável.

## Documentos canônicos

- [`STRATEGY.md`](./STRATEGY.md): posicionamento, públicos, arquitetura, funil, conteúdo, experiência e métricas.
- [`ROADMAP.md`](./ROADMAP.md): fases, prioridades, dependências, critérios de aceite e Definition of Done.
- [`ISSUES.md`](./ISSUES.md): EPIC e backlog executável, com entregáveis e validações por issue.

## Decisões vigentes

- O site pessoal é um **roteador comercial e de reputação**, não um catálogo plano de marcas.
- A Tech Human é o principal destino para transformação empresarial, tecnologia, produto, dados, IA e formação B2B.
- Advisory, conselho e palestras podem ser contratados a partir do site pessoal, com escopo e qualificação próprios.
- Needyu é apresentado como produto com rota direta para seus planos e contexto Enterprise.
- Trustyu/FORGE é apresentado como construção e co-construção de produtos de IA; produtos do portfólio usam estágio explícito.
- Propósito, mídia e formação — POR.life, Jornada Cast, SER Talks, Zoe Seekers e Essendi — aparecem em camada própria.
- Nenhum produto em formação será descrito como SaaS validado, PMF, adoção ou operação comercial sem evidência pública atual.
- A linguagem visual atual — preto, branco e verde-lima — é preservada e evoluída com fotografia real, áreas editoriais e menos movimento decorativo.
- A captura inicial funciona sem segredo no frontend: qualificação no site e encaminhamento para WhatsApp. Persistência em CRM é uma entrega operacional separada.
- Figma não faz parte do fluxo aprovado para esta transformação.

## Estado de entrega

| Estado | Significado |
| --- | --- |
| `PLANNED` | escopo documentado, sem implementação verificada |
| `IMPLEMENTED` | código presente na branch |
| `VERIFIED` | lint, testes, build e validação visual executados |
| `OPERATING` | merge, deploy público e observação real de uso |

O status de cada issue deve usar esses termos de forma literal. `IMPLEMENTED` ou `VERIFIED` não significa `OPERATING`.

## Atualização

Ao mudar posicionamento, maturidade de produto, CTA, rota ou métrica:

1. atualizar a estratégia;
2. atualizar a issue correspondente;
3. alterar código e testes;
4. registrar a validação;
5. só então elevar o estado da entrega.

