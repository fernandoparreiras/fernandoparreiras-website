# Calendário editorial — Conhecimento

## Objetivo

Coleção de dezoito artigos: seis já publicados, sete evergreen e cinco ensaios especiais. Aprovação autoral e de integração recebida de Fernando Parreiras em 28/08/2026, 02/09/2026, 10/09/2026 e 15/09/2026. A agenda ordinária foi conciliada com Tech Human e Trustyu Forge para uma publicação por dia no portfólio, às 9h no horário de São Paulo.

Em 02/09/2026, a campanha Technical Product Owner / AI-Native Product Lead foi antecipada por decisão editorial explícita. O artigo autoral entra às 09h23 BRT, depois do texto já agendado para o mesmo dia. A exceção regulariza um especial aprovado e não autoriza antecipações automáticas futuras.

Em 15/09/2026, a edição coordenada `services-new-software-2026-09-15` foi aprovada
fora da cadência ordinária. O artigo autoral “Serviço é o novo software” entra às 13h35 BRT,
com uma lente de liderança, estratégia e responsabilidade; Tech Human e Perspectivas Trustyu
publicam leituras complementares. A edição não desloca datas evergreen.

Em 10/09/2026, o Radar de Evidências originou uma edição especial coordenada para Tech Human,
Fernando Parreiras e Trustyu Forge. O ensaio autoral ocupa um segundo slot no mesmo dia sem deslocar
o evergreen já previsto; a promoção final permanece condicionada à confirmação humana do artefato
exato e não cria precedente automático para o radar.

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
| 9 nov. 2026 | Carreira com IA | Seu próximo diferencial pode estar no que você não aprova | Agendado |
| 10 nov. 2026 | Negócios e liderança | Produtividade sem direção apenas acelera o desperdício | Agendado |

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
