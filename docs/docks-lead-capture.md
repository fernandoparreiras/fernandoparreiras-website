# Docks: material, relacionamento e qualificação

Implementação publicada em duas entregas: este site e o contrato/interface do CRM TechHuman Platform. O contrato `fernando-docks.v1` foi confirmado em produção antes da publicação do formulário. Os formulários de contato e newsletter existentes não mudam.

## Experiência

- `/docks/` continua sendo um acervo aberto, com os links anteriores preservados.
- Cada apresentação tem `/docks/{slug}/`, metadados, entrada no sitemap, apresentação livre, roteiro visível e download em `roteiro.txt`.
- O build gera `qr.png` (1024px) para cada apresentação, apontando à página com `utm_source`, `utm_medium=qr` e `utm_campaign`. Os arquivos de apresentações não são alterados.
- Nome, e-mail e interesse no pedido inicial. Contexto, atuação e prazo só são exigidos se houver pedido de conversa; empresa e WhatsApp são opcionais.
- Material, dois complementos, Carta do Fernando e conversa têm escolhas independentes. Todas são registradas no snapshot da submissão. A Carta segue a operação existente de newsletter; este fluxo não cria um disparo recorrente adicional.

O email Docks do participante usa tema claro, tipografia editorial, chamada principal para a apresentação, link do roteiro e convite a uma primeira aplicação. Os dois complementos usam a mesma identidade e somente saem com escolha explícita.

## Entrega e retomada

`POST /api/docks` valida o catálogo no servidor, calcula a qualificação e cria um registro privado em Netlify Blobs. Exige configuração de Resend e CRM habilitado. Uma resposta de sucesso exige recibos de CRM, aviso interno e material. O recibo de Resend prova aceite do provedor, não chegada à caixa, leitura ou resposta.

O navegador reutiliza o UUID ao repetir os mesmos dados após erro. Mudanças no conteúdo iniciam outra submissão. O servidor recusa reutilização de UUID com payload diferente. Cada etapa conserva recibo e chave própria de idempotência. Claims condicionais por ETag serializam o mesmo job e pedidos Docks do mesmo destinatário. Isto não resolve corridas de outros formulários ou escritores do CRM, cujo contrato de concorrência global continua limitado.

Uma rotina Netlify roda a cada 15 minutos no deploy publicado. Índices por data indicam material pendente, complemento D+2, reflexão D+7 e limpeza D+30. Complementos só saem com escolha explícita. Há novo teste de cancelamento imediatamente antes de cada complemento. Uma mensagem já aceita ou em trânsito pode não ser interceptada pelo cancelamento.

GET no link assinado de cancelamento abre confirmação; POST cancela complementos de todos os pedidos anteriores daquele e-mail. Um pedido posterior com nova escolha explícita pode voltar a receber os dois complementos. O link não expõe e-mail e não cancela Carta nem conversa. As escolhas no CRM são snapshots históricos; não representam o estado atual da supressão da fila.

Falha parcial conserva o job para retomada e retorna erro ao participante. Tentativa ambígua de envio com mais de 20 horas vai a revisão humana, respeitando a janela de deduplicação de 24h do Resend. O responsável deve verificar logs `docks_delivery_pending` e registros `state=review`; não repetir disparos manualmente sem conferir recibos. Não se afirma entrega exatamente uma vez em cenários de falha da infraestrutura.

Blobs de produção usam `docks-delivery-v1`. Previews usam namespace por deploy para não consumir jobs reais. Segredos ficam só no servidor. Limpeza apaga jobs com dados pessoais após 30 dias e eventos anônimos após 30 dias, na próxima execução. A chave protegida de supressão permanece para respeitar cancelamentos.

## Qualificação comercial inicial

Versão `docks-score.v1`; hipótese operacional, sem calibração preditiva. Não é um diagnóstico de maturidade de IA nem Trustyu SCORE.

- Perfil: até 30 pontos (atuação declarada, até 20; organização informada, 10).
- Intenção: até 50 pontos (pedido de conversa, 20; desafio, 15; prazo, até 15).
- Engajamento: 10 dos 20 pontos possíveis na primeira versão, pela solicitação explícita de material. Aberturas de e-mail e navegação não pontuam. Os outros 10 não são inventados nem preenchidos automaticamente.
- Faixas: 1 estrela abaixo de 15; 2 a partir de 15; 3 a partir de 40; 4 a partir de 60. Cinco exige ao menos 75, conversa solicitada, contexto compatível, desafio e prazo agora/30–60 dias. O máximo inicial é 90.

O CRM registra motivos, dados ausentes e versão em LeadSubmission e LeadActivity. O Lead guarda a sugestão, preservando uma qualificação anterior mais forte quando chega apenas outro pedido de material. Uma nova conversa explícita pode atualizar a sugestão. Revisão humana exige motivo, gera atividade e fica separada da sugestão automática; ingestão não sobrescreve a revisão.

## Medição

Eventos anônimos de visualização, abertura, download, início e conclusão de formulário são armazenados sem nome, e-mail, telefone, IP ou texto do desafio. Campanha anônima só aceita o ID conhecido do evento. São indicadores sujeitos a bloqueadores, repetição e bots; visualização não é pessoa única.

`GET /api/docks-report` exige `Authorization: Bearer <FERNANDO_DOCKS_REPORT_TOKEN>`, de pelo menos 32 caracteres. Retorna agregados de 30 dias por evento: visualizações, inícios, pedidos, conversas solicitadas, prioridade inicial e aceites de material/complementos. Não retorna dados de contato. Cadastros/visualizações é indicador, não taxa por pessoa única.

A aba Docks do CRM lê o histórico paginado de atividades, deduplica por submissão e contato em cada evento e cruza estágios comerciais. Respostas e reuniões realizadas dependem de datas confirmadas manualmente. Contatos que participaram de vários eventos podem aparecer em vários grupos; não se atribui causalidade comercial exclusiva. A lista principal do CRM conserva seu limite existente de 500 leads; a aba respeita o conjunto e os filtros carregados. Não tratar a visão como censo ilimitado.

## Implantação e homologação

1. Revisar e implantar a PR do CRM: contrato de rota, schemas das três entidades e interface. Preservar as políticas RLS existentes.
2. Conferir `RESEND_API_KEY`, `FERNANDO_CONTACT_EMAIL_FROM`, `FERNANDO_CONTACT_EMAIL_TO`, `FERNANDO_CONTACT_REPLY_TO`, `FERNANDO_BASE44_CRM_ENABLED=true` e `FERNANDO_DOCKS_CRM_SIGNING_SECRET` (mínimo 32 bytes). A chave exclusiva Docks corresponde a `FERNANDO_BASE44_CRM_SIGNING_SECRET` no Base44, selecionada apenas para `source.site=fernandoparreiras.com.br` e `source.form_type=fernando-docks`. Contato e newsletter mantêm as chaves anteriores. Configurar token privado de relatório se esse endpoint for usado.
3. Publicar a PR do site pelo fluxo normal Netlify. Registrar SHAs e recibos dos provedores. Não promover pacote local manualmente por cima de produção.
4. Fazer um pedido real autorizado: conferir material e roteiro no e-mail, Lead, LeadSubmission e LeadActivity, consentimentos e origem. Repetir para conferir matching e reenvio.
5. Confirmar invocação da rotina e um job de teste autorizado com vencimento controlado. Conferir cancelamento, supressão e limpeza. Nunca disparar para contatos reais sem a escolha correspondente.
6. Conferir QR, rotas oficiais, download, móvel e ausência de erros. Só então declarar o piloto operacional.

## Validação local

Site: 68 testes, lint e build completos; auditoria de produção sem vulnerabilidades. Browser: desktop e 390×844, sem transbordamento horizontal e sem exceções de página; abertura dos campos condicionais e escolhas opcionais desmarcadas conferidas. A prévia estática não executa Functions nem prova entrega real.

CRM: 224 verificações existentes, seis específicas Docks, uma de schemas e uma de seleção de segredo (232 no total); payload gerado pelo site aceito pelo validador real do CRM; ingestão pura tipada; oito componentes alterados compilados isoladamente e lint dos arquivos alterados. O aplicativo completo possui problemas anteriores: lint global com 512 erros e import ausente `@/functions/getPublicDeck` em PublicDeck, confirmado em origin/main. Resolver a validação da aplicação completa ou obter o build oficial Base44 antes de publicar o CRM.

Referências: [Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/), [Scheduled Functions](https://docs.netlify.com/build/functions/scheduled-functions/), [Resend: idempotência](https://resend.com/docs/dashboard/emails/idempotency-keys).

## Estado da homologação em 05/10

O checkpoint Base44 foi publicado após autorização específica e o endpoint confirmou a versão nova, assinatura correta (400 com corpo inválido) e assinatura incorreta (401). O pedido FP-F16E0FA7 gravou Lead, LeadSubmission e LeadActivity com score 10/uma estrela, somente material. A retomada confirmou deduplicação. O site foi publicado após autorização: PR #59, commit 2b4de953108123338f1fff3533dfe4eea8c062ba, deploy 6ac405e58800210008bc443e. A retomada do mesmo pedido no servidor de produção confirmou assinatura, deduplicação e aceite Resend de aviso/material. O usuário apresentou capturas de ambos os emails na caixa de entrada. A execução automática de retenção foi comprovada com job sintético vencido, sem dados pessoais. Recibos e limites em docs/docks-homologacao-2026-10-05.md.

FERNANDO_DOCKS_CRM_TIMEOUT_MS tem padrão e teto de 20000 ms, independente do prazo dos formulários existentes. Logs da fila exibem apenas códigos de falha permitidos, sem texto arbitrário do provedor.
