# Docks — implementação e homologação em 2026-10-05

Estado atual: CRM e site publicados; assinatura, deduplicação e dois aceites de email confirmados no runtime de produção. O usuário confirmou recebimento e apresentou captura do aviso interno na caixa de entrada. Continuação e recibos de produção ao final; as seções anteriores preservam o histórico de homologação.

## Configuração e correção

Destinatário autorizado: fernando@fernandoparreiras.com.br, confirmado no contexto production do projeto Netlify fernando-parreiras (15c1d2ae-ff58-4ac8-a441-0294871b6aa9).

Foi criada uma chave aleatória exclusiva para Docks, configurada como FERNANDO_DOCKS_CRM_SIGNING_SECRET no Netlify (production, functions, secret) e FERNANDO_BASE44_CRM_SIGNING_SECRET no app Base44 TechHuman Platform (68c31e0af65f4fae2d88486f). Nenhum valor foi registrado neste documento ou no Git. As chaves anteriores dos formulários de contato/newsletter não foram alteradas.

O site usa a chave exclusiva apenas para formType=docks. No Base44, apenas source.site=fernandoparreiras.com.br com source.form_type=fernando-docks seleciona a chave exclusiva. A leitura usa secrets.get() no contexto do pedido, com compatibilidade Deno.env.get para configuração anterior. Chave Docks ausente não usa a chave compartilhada como substituta. Corpo inteiro, UUID e timestamp continuam autenticados pelo protocolo lead-ingest.v1.

Cancelamento e chave protegida do destinatário passam a usar a chave Docks; não havia registro real Docks confirmado na homologação anterior. Não rotacionar essa chave depois de iniciar a operação sem plano de migração dos cancelamentos/supressões.

## Validações concluídas

- Site: 67 testes passaram; lint e build passaram. Os testes verificam HMAC Docks com chave independente, recusa de fallback à chave anterior e manutenção da assinatura anterior no contato mesmo quando ambas estão configuradas.
- CRM: 232 verificações passaram, incluindo schemas Docks e seleção de segredo por origem/formulário. Os testes do handler mantêm autenticação, janela de replay e validação estrita.
- A função ingestLead foi enviada pelo CLI oficial Base44. Para evitar validação de um schema User com RLS anterior incompatível com o CLI, foi usado pacote mínimo contendo somente ingestLead e suas dependências compartilhadas; nenhum schema, frontend ou outra função foi enviado nessa operação.
- Código sincronizado no sandbox Base44 e checkpoint final criado: 6ac3e9be8b6869bdfb126f9e, commit 6fd96b246b7314da1983b3a234caef522da112e6, nome “Docks: segredo exclusivo por formulario e leitura runtime”.

## Publicação e teste real pendentes

A consulta dirigida aos metadados oficiais do app retornou last_deployed_at=2026-09-28T17:40:51.619000. O CLI oficial confirmou o endereço público https://tech-human-crm.base44.app.

Dois pedidos de diagnóstico sem payload válido (portanto sem criação de lead ou envio de email) retornaram HTTP 401 no endpoint público: assinatura com a nova chave e assinatura incorreta. O cabeçalho X-TechHuman-Ingest-Version: docks-secret-v1, adicionado pela correção, não apareceu. A diferença entre relógio local e Date do servidor era aproximadamente 1 segundo. A rota SDK no mesmo subdomínio apresentou o mesmo resultado. Esses recibos demonstram que a versão nova não foi confirmada no endpoint público; enviar uma função não provou atualização do app publicado.

A tentativa de publicar o app usando POST /api/apps/68c31e0af65f4fae2d88486f/deploy foi bloqueada pela revisão automática antes da execução: a operação publica o app inteiro e pode afetar recursos/comportamentos do CRM além do Docks. Implementação e testes foram autorizados, mas a revisão exige autorização específica para esse escopo de produção. Não houve tentativa por outro caminho depois do bloqueio.

Não houve novo cadastro real, envio de email ou publicação do site em produção nesta etapa. O servidor local foi encerrado. O contexto deploy-preview continua sem a configuração completa, portanto não deve ser tratado como fluxo operacional.

Após autorização específica da publicação Base44: revisar/publicar o checkpoint; exigir resposta 400 para assinatura válida com payload incompleto e 401 para assinatura incorreta; depois executar um único cadastro autorizado, apenas material (sem complementos/newsletter/conversa), verificando Lead, LeadSubmission, LeadActivity e recibos do provedor de email. O email autorizado continua o mesmo. A publicação do site e a homologação da rotina agendada são etapas posteriores, sem promover aprovação de teste local a prova de operação pública.

Referência de runtime/publicação: https://docs.base44.com/developers/backend/resources/backend-functions/overview e https://github.com/base44/base44-platform-starter/blob/main/docs/base44-platform-api.md.

## Continuação após autorização específica do usuário

O usuário autorizou explicitamente a publicação do checkpoint no app inteiro em produção. A operação de publicação retornou HTTP 200. A leitura posterior dos metadados confirmou last_deployed_at=2026-10-05T18:36:38.378000, last_deployed_checkpoint_id=6ac3e9be8b6869bdfb126f9e e last_deployed_git_commit_hash=6fd96b246b7314da1983b3a234caef522da112e6. Nenhuma nova alteração de código Base44 foi necessária.

O endpoint público agora retorna X-TechHuman-Ingest-Version: docks-secret-v1. Assinatura correta com corpo incompleto retorna 400 invalid_payload; assinatura incorreta retorna 401 unauthorized.

Um pedido real autorizado foi enviado pela UI em http://localhost:8897/docks/democratizacao-ia/ para fernando@fernandoparreiras.com.br, nome “Fernando — homologação Docks 05/10”, apenas material, referência FP-F16E0FA7. O pedido inicial excedeu o prazo de 8 segundos do cliente CRM. Foram confirmados um Lead, uma LeadSubmission e uma LeadActivity, relacionados ao mesmo pedido; apresentação democratizacao-ia, evento ai-summit-csc-2026, score 10, uma estrela e opções followup/newsletter/commercial=false. A retomada com o mesmo UUID retornou outcome=duplicate e conservou um registro de submissão/atividade. O recibo CRM ficou salvo no job local.

O aviso interno recebeu HTTP 400 do Resend. Consulta dirigida e capturada, sem impressão de valores, confirmou que RESEND_API_KEY fornecida à CLI contém uma máscara e não tem formato de chave Resend. O diagnóstico com a mesma chave de deduplicação retornou validation_error, “API key is invalid”. Isso demonstra falha de autenticação do valor mascarado usado localmente, não invalidez da chave real armazenada nem falha dos formulários em produção. Não foi confirmado nenhum aceite de email pelo provedor; o material não foi tentado porque a fila exige o aviso interno antes dele. Não houve escolha/disparo de complementos, Carta ou conversa.

Netlify Secrets Controller mantém segredos write-only: somente código hospedado recebe o valor real; UI/CLI/API retornam máscaras fora do contexto dev. Não copiar a máscara como credencial, trocar a chave válida de produção, desabilitar a proteção ou usar chaves de outros projetos para contornar o teste. Referência: https://docs.netlify.com/build/environment-variables/secrets-controller/.

A homologação motivou duas correções no site: prazo CRM exclusivo Docks com padrão/teto de 20 segundos (FERNANDO_DOCKS_CRM_TIMEOUT_MS; formulários existentes conservam seus prazos) e logs de falha com códigos estritamente permitidos, sem texto arbitrário, email ou segredo. 68 testes, lint e build passaram. O teste verifica também o teto e a independência do prazo Docks, além da proteção dos logs.

Foi criado somente um rascunho Netlify (sem --prod) para investigar a execução hospedada: deploy 6ac3f0b32c72fa9ab381dca5, state=ready, context=deploy-preview, published_at=null, URL https://6ac3f0b32c72fa9ab381dca5--fernando-parreiras.netlify.app. --context production afeta o build da CLI, mas esse rascunho continua no contexto runtime deploy-preview, sem configuração completa. Nenhum pedido foi enviado nele. A leitura dirigida do site confirmou published_deploy.id=6ac2b1a44f36280008c94c0d, context=production, published_at=2026-10-04T20:06:11.612Z; o domínio principal não mudou.

Próximo gate: publicar a PR do site pelo fluxo normal autorizado e validar os recibos de aviso/material com a chave protegida no servidor Netlify. Persistência CRM e assinatura já foram homologadas. Email real, execução agendada em produção, cancelamento e retenção operacional continuam sem homologação pública; os respectivos testes locais não substituem essas provas.

## Produção autorizada em 05/10

O usuário autorizou “Pode publicar em producao tudo o que for necessário pra fazer funcionar”. A PR #59 foi integrada por squash, commit 2b4de953108123338f1fff3533dfe4eea8c062ba. Netlify publicou o deploy 6ac405e58800210008bc443e, context=production, state=ready, published_at=2026-10-05T20:20:39.890Z. O build oficial empacotou contact, docks, docks-cancel, docks-events, docks-followup e docks-report; a rotina docks-followup foi registrada com cron */15 * * * *.

A página oficial /docks/democratizacao-ia/, o deck, roteiro e QR retornaram HTTP 200. A canonical é https://fernandoparreiras.com.br/docks/democratizacao-ia/. Deck, roteiro e QR coincidem por SHA256 com os artefatos locais. O formulário abre com todas as escolhas desmarcadas. 68 testes, lint e build passaram novamente.

O pedido local pendente FP-F16E0FA7 foi recuperado na fila privada docks-delivery-v1, preservando UUID, submittedAt e hash. A montagem do payload de retomada coincide com payload_hash da LeadSubmission: 25f7c87ad10538257f3e276ecf864ef85ffe1cd5d609645deab39e7cc5eb95d2. O recibo CRM foi revalidado com o mesmo pedido para comprovar assinatura no servidor publicado; resposta outcome=duplicate, mesmo Lead, sem nova submissão ou atividade. POST /api/docks retornou HTTP 200, ok=true, mesma referência.

O job terminou state=complete, com CRM e dois recibos Resend: aviso interno 01a10dbb-7d79-79ac-91c7-45a4f2946c4a; material 01a10dbb-7e06-730c-8275-3494759525f8. O material foi tentado às 2026-10-05T20:22:29.467Z. O usuário respondeu “Recebi sim. Valide.” e apresentou captura do aviso interno na caixa de entrada, enviado às 17:22 BRT, com referência, origem, nome e email corretos. A captura apresentada comprova a chegada do aviso interno; o aceite do material está confirmado pelo provedor. Não houve envio de complementos, newsletter ou contato comercial.

Validação da captura identificou e corrigiu “1 estrelas” para “1 estrela” no assunto e qualificação do aviso interno. O interesse do Docks também passa a usar o rótulo do catálogo (“Aplicar IA na empresa”) no aviso interno, em vez do rótulo genérico de contato. Não reenviar o aviso já aceito para demonstrar essa correção.

O relatório privado inicialmente retornou 503 por token ausente. Foi configurado FERNANDO_DOCKS_REPORT_TOKEN somente em production/functions como secret. A cópia local permanece em .netlify/docks-report-token.env, ignorada pelo Git e com permissão 0600; não incluir valor em documentos, saída ou clientes públicos. Workflow oficial 37369588271 solicitado para aplicar a configuração. Pedido inválido retorna 400 e link de cancelamento sem assinatura retorna 400.

Foi preparado teste de retenção com registro sintético sem contato, email ou conteúdo: cc409d6f-97de-4086-865e-b0aee2e9f609, submetido há 31 dias; o índice D+30 está vencido. A remoção pela próxima execução da rotina em produção deve ser confirmada antes de registrar homologação de limpeza. O teste não pode enviar mensagens nem registrar contato no CRM. D+2/D+7 e cancelamento válido permanecem cobertos pelos testes locais; não foram enviados complementos sem escolha explícita.
