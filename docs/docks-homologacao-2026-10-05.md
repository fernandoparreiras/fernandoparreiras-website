# Docks — implementação e homologação em 2026-10-05

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
