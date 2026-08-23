# EPIC e backlog executável

## EPIC-01 — Transformar fernandoparreiras.com.br em hub comercial

**Resultado:** o site apresenta Fernando, reconhece intenção, encaminha para a oferta/negócio correto, prova capacidade e captura uma demanda qualificada.

**KPIs:** seleção de intenção, CTR do CTA, início e conclusão de lead, distribuição por destino e conversas qualificadas.

**Dependências externas:** domínio/deploy Netlify (#1), confirmação de claims e resultados de cases, definição de CRM.

**Guardrails:** maturidade explícita, sem PMF/adopção inferida, sem segredo no frontend e sem cutover de DNS automático.

---

## CH-01 — P0 — Documentar estratégia, arquitetura e governança

### Entregáveis

- fonte de verdade no repositório;
- públicos, ofertas, negócios e maturidade;
- IA, funil, eventos e guardrails;
- roadmap e DoD.

### Aceite

- documentos possuem links entre si;
- estados `PLANNED/IMPLEMENTED/VERIFIED/OPERATING` estão definidos;
- claims proibidos e dependências externas estão explícitos.

---

## CH-02 — P0 — Reestruturar hero, navegação e roteamento por intenção

### Entregáveis

- promessa comercial;
- CTA principal e secundário;
- seletor “O que você precisa mover agora?”;
- menu curto e CTA persistente no mobile;
- eventos `hero_cta_click` e `intent_select`.

### Aceite

- cada intenção possui destino coerente;
- navegação funciona em qualquer rota;
- mobile não possui overflow ou controle coberto;
- foco e reduced motion verificados.

---

## CH-03 — P0 — Reorganizar negócios por categoria e maturidade

### Entregáveis

- grade estática para operação, produtos/ventures e propósito/mídia;
- descrição, público, problema, papel de Fernando e CTA;
- estágios explícitos do portfólio Trustyu;
- remoção da dependência do marquee como descoberta.

### Aceite

- nenhum negócio é apenas um nome sem contexto;
- links externos possuem nome acessível e segurança adequada;
- produtos em formação não recebem linguagem de operação validada.

---

## CH-04 — P0 — Productizar advisory, conselho e transformação empresarial

### Entregáveis

- overview `/solucoes/`;
- `/solucoes/advisory-executivo/`;
- `/solucoes/conselho/`;
- `/solucoes/transformacao-tecnologia-ia/`;
- ICP, situações, entregáveis, formato, prova e CTA por página.

### Aceite

- páginas não duplicam o catálogo Tech Human;
- CTAs carregam intenção para a qualificação;
- metadados e schema são específicos.

---

## CH-05 — P0 — Publicar cases iniciais com prova responsável

### Entregáveis

- página `/cases/`;
- cards iniciais baseados em material público autorizado;
- contexto, papel, trabalho e fonte;
- CTA relacionado.

### Aceite

- sem métrica ou resultado inventado;
- cada case identifica fonte pública e papel;
- cards funcionam no teclado e no mobile.

---

## CH-06 — P0 — Implementar qualificação e encaminhamento funcional

### Entregáveis

- página `/contato/` e bloco resumido na home;
- campos de intenção, identidade, empresa, desafio, urgência e contato;
- consentimento;
- mensagem estruturada para WhatsApp;
- eventos `lead_start` e `lead_submit`.

### Aceite

- submissão sem dados obrigatórios é bloqueada;
- mensagem não inclui campo vazio ou informação oculta;
- nenhum dado é persistido silenciosamente;
- fallback de email e contato direto continuam disponíveis.

---

## CH-07 — P1 — Criar backend de lead e integração CRM

### Entregáveis

- endpoint server-side;
- validação, rate limit, antiabuso e logs sem conteúdo sensível;
- persistência de consentimento;
- roteamento por intenção;
- integração com CRM e confirmação.

### Aceite

- segredo apenas no servidor;
- submissão real observada ponta a ponta;
- política de retenção e exclusão documentada;
- erro apresenta retry e canal alternativo.

---

## CH-08 — P1 — Criar página de palestras e media kit

### Entregáveis

- `/palestras/`;
- temas, públicos e formatos;
- fotos “Em cena”, TED e Docks;
- briefing com data, local, audiência e objetivo;
- media kit versionado quando aprovado.

### Aceite

- nenhuma foto perde sujeito em desktop/mobile;
- mídia possui alt text;
- CTA envia intenção `palestra`.

---

## CH-09 — P1 — Consolidar autoridade, conteúdo e Forge

### Entregáveis

- `/conteudos/`;
- livros, TED, Spotify, Docks e iniciativas de mídia por categoria;
- `/artigos/` somente com assets Forge publicados e aprovados;
- CTAs contextuais.

### Aceite

- não existe página vazia de artigos;
- canonical permanece na origem quando necessário;
- conteúdo se conecta a oferta sem interromper leitura.

---

## CH-10 — P1 — Completar SEO estático e descoberta

### Entregáveis

- metadados por rota;
- JSON-LD adequado;
- HTML inicial pré-renderizado;
- robots, sitemap e `llms.txt` derivados de rotas públicas;
- canonical apex e redirect `www` preparados.

### Aceite

- teste de geração estática passa;
- rotas públicas retornam HTML com title, description e canonical;
- sitemap não inclui rota gated ou inexistente.

---

## CH-11 — P1 — Instrumentar funil e atribuição

### Entregáveis

- utilitário de analytics provider-agnostic;
- eventos documentados;
- UTMs preservadas no lead;
- consentimento respeitado;
- plano de dashboard.

### Aceite

- eventos não enviam texto livre ou PII;
- payloads podem ser inspecionados em desenvolvimento;
- nomes e propriedades seguem convenção única.

---

## CH-12 — P1 — Versionar assets críticos e otimizar performance

### Entregáveis

- galeria WebP responsiva;
- inventário de imagens Hostinger ainda externas;
- substituição gradual por assets locais autorizados;
- dimensões, lazy loading e cache.

### Aceite

- nenhuma imagem crítica depende de URL temporária;
- layout não muda durante carregamento;
- build não referencia arquivo ausente.

---

## CH-13 — P1 — Validar acessibilidade e movimento reduzido

### Entregáveis

- skip link, headings, landmarks e foco;
- menu com estado acessível;
- navegação por teclado;
- reduced motion;
- contraste e zoom 200%.

### Aceite

- fluxo hero -> intenção -> contato funciona sem mouse;
- menu mobile retém e devolve foco;
- conteúdo permanece disponível sem animação.

---

## CH-14 — P1 — Preparar e validar deploy Netlify

### Entregáveis

- build e deploy preview;
- redirects SPA e canonical;
- headers de segurança;
- formulário/backend quando aplicável;
- plano de DNS, SSL e rollback.

### Aceite

- issue #1 satisfeita;
- preview aprovado;
- cutover somente com autorização humana;
- domínio público verificado após propagação.

---

## CH-15 — P2 — Estabelecer linha de base e experimentação

### Entregáveis

- 30 dias de métricas;
- relatório por origem, intenção e oferta;
- backlog de hipóteses;
- teste controlado de promessa/CTA;
- revisão de multilíngue por demanda real.

### Aceite

- hipótese, métrica e critério de decisão definidos antes do teste;
- nenhuma personalização usa dado sensível;
- conclusão documenta aprendizado e decisão.

