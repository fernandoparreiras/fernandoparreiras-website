# Dossiê de pesquisa — Agilidade × IA no SDLC

Data de corte: 3 de novembro de 2026

Estado: apoio editorial; não publicar como artigo

Artigo relacionado: `agilidade-ia-sdlc-fluxo-completo.md`

## Método

- Quatro frentes de busca: evidência de produtividade, agentes de engenharia, SDLC/full-cycle/plataformas e segurança/governança.
- 202 resultados retornados e triados com busca semântica.
- 18 fontes primárias ou de alta autoridade aprofundadas.
- Preferência por papers, documentação oficial, relatórios de pesquisa e fontes que declaram metodologia.
- Estudos com medidas incompatíveis não foram combinados em uma “taxa média” de ganho.
- Resultado histórico foi preservado com data, população, tarefa e limitação.
- A auditoria de Trustyu Forge e AI Works foi somente leitura e comparou a documentação com o código e os estados correntes dos repositórios.

## Síntese da evidência

| Fonte | O que sustenta | Limite editorial obrigatório |
| --- | --- | --- |
| [Manifesto Ágil](https://agilemanifesto.org/) e [princípios](https://agilemanifesto.org/principles.html) | Agilidade prioriza colaboração, software funcionando, resposta à mudança, entrega contínua, excelência técnica, ritmo sustentável e reflexão. | Fonte normativa de 2001; não trata IA, agentes ou operação de plataformas modernas. |
| [DORA 2025](https://dora.dev/research/2025/dora-report/) | IA funciona como amplificador do sistema organizacional; 90% de uso, mais de 80% de percepção de produtividade e 30% com pouca ou nenhuma confiança; throughput e produto melhoram, estabilidade permanece negativamente associada. | Pesquisa majoritariamente observacional e autorrelatada; associação não prova causalidade. |
| [DORA 2024](https://dora.dev/research/2024/dora-report/) | Aceleração local pode coexistir com perda de throughput ou estabilidade. | Survey transversal; parte das medidas é perceptiva. |
| [DORA — impacto da GenAI](https://dora.dev/ai/gen-ai-report/dora-impact-of-generative-ai-in-software-development.pdf) | Aumento de 25% na adoção apareceu associado a +7,5% em documentação, +3,4% em qualidade percebida do código, +3,1% em revisão, -1,5% em throughput e -7,2% em estabilidade. | Números de 2024; não usar como taxa causal ou atual universal. |
| [Métricas DORA](https://dora.dev/guides/dora-metrics-four-keys/) | Separa throughput, instabilidade, rework e recuperação. | Não mede valor de produto nem experiência das pessoas sozinha. |
| [Continuous delivery — DORA](https://dora.dev/capabilities/continuous-delivery/) | Pequenos lotes, testabilidade, deployabilidade, segurança, observabilidade e feedback rápido sustentam entrega de baixo risco. | Guia de capacidade, não experimento sobre agentes. |
| [Experimento GitHub Copilot](https://arxiv.org/html/2302.06590) | 95 profissionais recrutados e randomizados; entre os 70 concluintes, a tarefa JavaScript foi concluída 55,8% mais rápido, IC 95% de 21% a 89%. | Resultado condicionado à conclusão; uma tarefa curta e delimitada não representa um SDLC completo. |
| [Três experimentos de campo](https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/) | 4.867 desenvolvedores; estimativa agrupada de +26,08% em tarefas concluídas, erro-padrão de 10,3%; maior ganho entre menos experientes. | Experimentos individuais ruidosos; tarefas concluídas são proxy, não valor, qualidade ou SDLC completo. |
| [METR — estudo early 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) | 16 especialistas, 246 tarefas em projetos maduros: uso das ferramentas daquele período aumentou o tempo em 19%; percepção dos participantes indicava ganho. | Resultado histórico e amostra específica; os autores o consideram desatualizado para ferramentas atuais. |
| [METR — atualização 2026](https://metr.org/blog/2026-02-24-uplift-update/) | Os autores consideram provável que o resultado do início de 2025 já não represente as ferramentas de 2026, mas medir produtividade tornou-se mais difícil com seleção de participantes/tarefas e múltiplos agentes concorrentes. | A própria METR recusou uma nova estimativa forte; não publicar os números brutos como speedup atual. |
| [SWE-bench](https://www.swebench.com/original) | 2.294 instâncias construídas a partir de issues e pull requests em 12 projetos Python; mede navegação, patch e testes fail-to-pass. | Tarefa-to-patch não cobre descoberta, valor, autorização, release, operação ou impacto. |
| [SWE-Lancer](https://proceedings.mlr.press/v267/miserendino25a.html) | Mais de 1.400 tarefas reais avaliadas em US$ 1 milhão, incluindo implementação e decisões gerenciais; na publicação original os modelos não resolviam a maioria. | Conjunto concentrado e tarefas relativamente especificadas; não equivale a ownership organizacional. |
| [Asleep at the Keyboard?](https://arxiv.org/abs/2108.09293) | Aproximadamente 40% de 1.689 programas gerados em cenários de risco continham vulnerabilidade; demonstra que plausibilidade não é segurança. | Copilot inicial e prompts sintéticos; jamais apresentar o percentual como taxa de vulnerabilidade de modelos atuais. |
| [SPACE](https://cacm.acm.org/practice/the-space-of-developer-productivity/) | Produtividade combina satisfação, performance, atividade, colaboração e eficiência/fluxo; uma métrica de atividade é insuficiente. | Framework de mensuração, não estudo causal de IA. |
| [Netflix — Full Cycle Developers](https://netflixtechblog.com/full-cycle-developers-at-netflix-a08c31f83249) | Design-build-run reduz handoffs e fecha feedback; depende de ferramentas, treinamento, capacidade e especialistas centrais. | Estudo de caso de uma organização altamente madura; também registra carga cognitiva e burnout como riscos. |
| [CNCF Platforms White Paper](https://tag-app-delivery.cncf.io/whitepapers/platforms/) | Plataforma self-service pode reduzir carga cognitiva e incorporar governança em golden paths. | Documento de consenso profissional, não evidência causal. |
| [Team Topologies](https://teamtopologies.com/key-concepts-content/team-interaction-modeling-with-team-topologies) | Times stream-aligned, platform, enabling e complicated-subsystem combinam autonomia e especialização. | Modelo contextual; não copiar mecanicamente para um organograma. |
| [NIST SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final) e [perfil GenAI 800-218A](https://www.nist.gov/publications/secure-software-development-practices-generative-ai-and-dual-use-foundation-models-ssdf) | Segurança integrada ao SDLC: preparar, proteger, produzir com segurança e responder; o perfil estende práticas ao ciclo de sistemas de IA. | Framework de alto nível; cada organização precisa convertê-lo em controles, gates e evidências executáveis. |

## O que os estudos não autorizam afirmar

- “IA aumenta a produtividade de todo desenvolvedor em X%.”
- “Mais tarefas concluídas significa melhor produto ou código mais seguro.”
- “Um benchmark de patch comprova autonomia de produto ou operação.”
- “Um resultado de 2025 descreve modelos e agentes de novembro de 2026.”
- “Full-cycle elimina especialistas.”
- “Agilidade dispensa especificação, arquitetura, segurança ou documentação.”
- “A organização deve maximizar o uso de IA independentemente do contexto.”

## Auditoria Trustyu Forge

### Base factual

- Fonte canônica: `trustyu-docs` em `origin/main` SHA `ceb06efe0a40650e910df3fd4f6650e9a963049e`.
- Runtime: `trustyu-infra` SHA `e65c4c41b6ed56fe2d01f60afa19e7f97fb3b04d`.
- `trustyu-forge-skills` SHA `47759f1db053bce623a85fdc3e54ad437ecc648c` é distribuição gerada, não a fonte canônica.

### Capacidades sustentadas por código e documentação

- fluxo `SPEC → EXPLORE → PLAN → RED → IMPLEMENT → GREEN → SELF-VERIFY → PR`;
- risco proporcional R0–R3;
- feature-spec gate e risk signal;
- pacotes de evidência e conformidade;
- workflows de lifecycle e readiness;
- verificação independente e autoridade humana;
- distinção entre implementado, verificado e operando.

### Limite

A qualificação Forge 3.3 está verificada no repositório proprietário que a executou, não em toda a frota. O piloto no AI Works está designado, mas ainda não qualificado integralmente.

### Referências locais

- `trustyu-docs/JARVIS.md:80-105`
- `trustyu-docs/docs/adr/foundation/0030-spec-driven-autonomous-feature-development.md:36-85`
- `trustyu-docs/docs/architecture/forge-3/forge-33/README.md:67-80`
- `trustyu-docs/docs/architecture/forge-3/forge-33/trustyu-works-operational-pilot.md:61-83`

## Auditoria Trustyu AI Works

### Base factual

- Repositório: `trustyu-ai-workstation` SHA `e0e194568575a64af3cb03c038e4df1245dcc457`, igual a `origin/main` na auditoria.

### Capacidades sustentadas por código e documentação

- workbench/plataforma para autoria, publicação e operação de recursos AI-native;
- 12 tipos públicos de recurso no estado auditado, dos quais cinco têm ciclo compilado e publicado;
- compilação e publicação de recursos nativos com alvos imutáveis no escopo suportado;
- orquestração com Temporal, OpenWorkflow/Zigflow e workerd;
- readiness, promoção progressiva e rollback;
- avaliações offline e online;
- gates e overrides auditáveis;
- Assistant durável, com autoridade temporária, sandbox e efeitos controlados.

### Limites

- Code Ops genérico para repositórios Git arbitrários — branch, commit, push e PR — permanece proposta;
- `sdk.code`, private tree e GitHub write adapter não estão implementados;
- CI principal está desabilitado manualmente;
- workflows recentes de infraestrutura e release são manuais;
- sandbox do Assistant está em estado parcial: contratos e isolamento existem, mas faltam smokes autenticados e qualificação operacional mais ampla;
- essas capacidades não provam hoje o SDLC completo de qualquer software.

### Referências locais

- `trustyu-ai-workstation/docs/architecture/overview.md:30-89`
- `trustyu-ai-workstation/docs/architecture/overview.md:201-234`
- `trustyu-ai-workstation/docs/guides/solution-delivery-contract-2026-10.md:45-82`
- `trustyu-ai-workstation/specs/056-git-code-ops/spec.md:1-15`
- `trustyu-ai-workstation/specs/056-git-code-ops/spec.md:63-72`
- `trustyu-ai-workstation/specs/056-git-code-ops/tasks.md:3-32`
- `trustyu-ai-workstation/docs/ci-cd.md:50-89`

## Formulação aprovada pela evidência

> **Forge organiza intenção, risco, gates e evidências; AI Works aproxima execução, ferramentas e agentes. Juntos, formam a arquitetura para reduzir a distância entre intenção e mudança verificável.**

Ou, em versão curta:

> **Forge torna a autonomia qualificável; AI Works é o plano de execução projetado para transformá-la, no escopo verificado, em fluxo operacional.**

As duas formulações descrevem o encaixe arquitetural. Nenhuma deve ser usada para afirmar cobertura universal ou operação de frota já comprovada.
