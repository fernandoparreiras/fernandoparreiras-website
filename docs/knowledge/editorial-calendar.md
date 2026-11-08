# Calendário editorial — Conhecimento

## Objetivo

Coleção de 31 artigos completos: seis originais e vinte e cinco entradas com horário editorial, incluindo especiais. Aprovação autoral e de integração recebida de Fernando Parreiras em 28/08/2026, 02/09/2026, 10/09/2026, 15/09/2026, 18/09/2026, 20/10/2026, 24/10/2026 e 03/11/2026 para os respectivos lotes. A agenda foi conciliada com Tech Human e Trustyu Forge; o especial canônico sobre Forward Deployed Engineer entra em 20/09/2026 às 13h30 no horário de São Paulo. Os dois textos preparados em 08/11/2026 foram integrados pela PR #67 no SHA `a70198a802196f1ff05ece6610379f99c83f124c`; a publicação de cada um continua submetida ao respectivo horário e aos gates do site oficial.

Em 02/09/2026, a campanha Technical Product Owner / AI-Native Product Lead foi antecipada por decisão editorial explícita. O artigo autoral entra às 09h23 BRT, depois do texto já agendado para o mesmo dia. A exceção regulariza um especial aprovado e não autoriza antecipações automáticas futuras.

Em 15/09/2026, a edição coordenada `services-new-software-2026-09-15` foi aprovada
fora da cadência ordinária. O artigo autoral “Serviço é o novo software” entra às 13h35 BRT,
com uma lente de liderança, estratégia e responsabilidade; Tech Human e Perspectivas Trustyu
publicam leituras complementares. A edição não desloca datas evergreen.

Em 10/09/2026, o Radar de Evidências originou uma edição especial coordenada para Tech Human,
Fernando Parreiras e Trustyu Forge. O ensaio autoral ocupa um segundo slot no mesmo dia sem deslocar
o evergreen já previsto; a promoção final permanece condicionada à confirmação humana do artefato
exato e não cria precedente automático para o radar.

Em 03/11/2026, Fernando aprovou a publicação extraordinária do especial “Agilidade × IA” às 18h10 BRT. O texto entra depois do ensaio regular das 09h, sem alterar a cadência, os especiais de 09 e 10/11 nem a reserva móvel. A integração no código não equivale a deploy ou publicação observada; esses estados exigem os gates operacionais do domínio oficial.

Em 08/11/2026, Fernando autorizou antecipar exclusivamente o especial autoral “Company Brain: quando a memória da empresa começa a decidir, quem responde?” para 19h BRT do mesmo dia. A mudança não desloca os especiais de 09 e 10/11 nem as entradas ordinárias de 14, 18 e 22/11. Preparação, integração e publicação continuam estados separados e exigem os gates do site oficial.

## Agenda aprovada

| Data | Trilha | Artigo | Estado inicial |
| --- | --- | --- | --- |
| 2 set. 2026 | Negócios e liderança | O dia seguinte à primeira venda | Agendado |
| 2 set. 2026, 09h23 | Carreira com IA | A carreira que nasce entre o produto e o código: AI-Native Product Lead | Publicação especial antecipada |
| 10 set. 2026 | Carreira com IA | Você não precisa competir com a IA. Precisa redesenhar o valor que entrega | Agendado |
| 10 set. 2026, 13h46 | Liderança e julgamento | Saber pedir que a IA continue é fácil. Difícil é saber quando parar | Especial coordenado — artefato exato confirmado em 10/09/2026 |
| 14 set. 2026 | Jovens e futuro | Faculdade, curso, certificação ou projeto: onde investir primeiro? | Agendado |
| 18 set. 2026 | Mudança de carreira | Competências que sobrevivem a uma mudança de carreira | Agendado |
| 22 set. 2026 | Negócios e liderança | Equipes com agentes de IA ainda precisam de responsabilidade humana | Agendado |
| 24 set. 2026 | Negócios e liderança | Liderar quando toda área pode criar software | Agendado — série Democratização da IA |
| 26 set. 2026 | Mudança de carreira | Um plano de 90 dias para uma transição profissional com IA | Agendado |
| 3 nov. 2026, 18h10 | Negócios e liderança | Agilidade × IA: desenvolver deixou de ser Frontend + Backend — agora é responder pelo fluxo completo | Especial extraordinário aprovado em 03/11/2026 |
| 8 nov. 2026, 19h | Negócios e liderança | Company Brain: quando a memória da empresa começa a decidir, quem responde? | Especial extraordinário autorizado em 08/11/2026 |
| 9 nov. 2026 | Carreira com IA | Seu próximo diferencial pode estar no que você não aprova | Agendado |
| 10 nov. 2026 | Negócios e liderança | Produtividade sem direção apenas acelera o desperdício | Agendado |
| 14 nov. 2026 | Carreira com IA | Mostrar como você verifica, além do que produz | Agendado |
| 18 nov. 2026 | Carreira com IA | Conversa de carreira começa pelo problema, não pelo cargo | Agendado |
| 22 nov. 2026 | Carreira com IA | Como discordar de uma resposta convincente da IA | Reserva preparada em PR — não integrada nem publicada |

## Contrato de publicação

- `src/data/scheduledArticles.js` guarda a fila aprovada e o instante `scheduledAt` de cada texto.
- `src/data/articles.js` expõe ao site somente artigos cuja ativação já venceu.
- A data de referência do bundle é congelada quando o Vite inicia o build. Um visitante não consegue adiantar a fila alterando o relógio do navegador.
- Antes da ativação, o texto permanece ausente da listagem, busca, página individual, dados estruturados, RSS, sitemap e `llms.txt`.
- Na data agendada, um novo build de produção materializa a rota e os arquivos de descoberta.
- `KNOWLEDGE_BUILD_AT` permite reproduzir um build futuro em QA sem alterar as datas da fila.
- A automação operacional deve verificar diariamente a fila aprovada e reconstruir o `main` somente quando houver artigo vencido ainda não público. Deve verificar rota, sitemap, RSS, CSP e console antes de classificar a entrada como publicada. A cadência dos seis evergreen continua a cada quatro dias, a partir de 10/09.

## Critérios editoriais

- Fernando Parreiras permanece como camada autoral: experiência profissional, carreira, liderança, escolhas e futuro do trabalho.
- Na série Democratização da IA, o site pessoal discute julgamento, autonomia e responsabilidade de líderes; mecanismos técnicos permanecem no Forge e desenho operacional na Tech Human.
- Conteúdo não é republicado literalmente da Tech Human ou Trustyu.
- Afirmações permanecem como análise, orientação ou experiência profissional; não são inventados resultados, clientes, métricas ou certificações.
- Cada artigo possui trilha, categoria, formato, três tags controladas, natureza editorial e CTA contextual.
- Os dois ensaios do Radar distinguem opinião, proposta e achados exploratórios; mantêm links diretos, limitações, assistência de IA e auto-revisão do original em português. Aprovação autoral não equivale a revisão independente ou confirmação científica.
- A tradução assistida por IA é identificada no Forge; o site pessoal mantém apenas o original português.

## Reserva antecipada — 20/10/2026

Cinco ensaios completos em 22, 26 e 30/10, 03 e 07/11 recompõem a cadência de quatro dias a partir de 22/10. As datas aprovadas de 09 e 10/11 e todos os especiais permanecem intactos. Não se retrodatam entregas para preencher o intervalo anterior.

`editorial-next-cycle.json` define pautas até 28/12 e reserva mínima de 14 dias; `planned` não equivale a texto pronto nem publicação. A sessão dona é **FERNANDO PARREIRAS: Artigos site Oficial**. Conferir worktrees e PRs por slug antes de produzir e não duplicar a fila desta integração.

## Extensão da reserva — 24/10/2026

O ensaio completo “Mostrar como você verifica, além do que produz” foi preparado para 14/11/2026 às 09h BRT. A entrada amplia a reserva móvel sem ocupar ou deslocar os especiais de 09 e 10/11. Até a integração em `main`, o artigo permanece apenas preparado em PR; mesmo depois da integração, o gate temporal deve mantê-lo ausente da rota, busca, RSS, sitemap e `llms.txt` antes de `scheduledAt`.

## Extensão da reserva — 08/11/2026

O artigo ordinário “Como discordar de uma resposta convincente da IA” foi convertido de pauta `planned` em texto completo para 22/11/2026 às 09h BRT, alcançando o limite da reserva móvel de 14 dias. A antecipação extraordinária do Company Brain para 08/11 às 19h não substitui nem desloca essa obrigação. O artigo de 22/11 deve continuar fora de rota, busca, RSS, sitemap e `llms.txt` até o respectivo `scheduledAt`.
