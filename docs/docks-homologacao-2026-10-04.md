# Docks — homologação em 2026-10-04

## Destinatário confirmado

Consulta dirigida à variável FERNANDO_CONTACT_EMAIL_TO no contexto production do site Netlify fernando-parreiras (15c1d2ae-ff58-4ac8-a441-0294871b6aa9): fernando@fernandoparreiras.com.br. O usuário autorizou usar o mesmo endereço dos formulários existentes no teste. Apenas entrega de material foi selecionada; complementos, newsletter e conversa comercial ficaram desmarcados.

## Tentativas e resultado

- Prévia PR 59: formulário retornou erro com referência FP-98097934. As consultas dirigidas confirmaram ausência de FERNANDO_BASE44_CRM_ENABLED e FERNANDO_CONTACT_EMAIL_TO no contexto deploy-preview. Não houve cadastro correspondente no CRM.
- Teste local da mesma implementação via Netlify Dev, com contexto production e chave Resend do projeto: formulário retornou HTTP 503 com referência FP-A4CB437F. A validação isolada da configuração retornou invalid_signing_configuration. O valor disponibilizado à execução para FERNANDO_BASE44_CRM_SIGNING_SECRET estava presente, sem espaços nas pontas, não correspondia aos marcadores de ocultação verificados e tinha menos de 32 bytes. Nenhum valor secreto foi registrado.
- Consulta dirigida a LeadSubmission no Base44, por formulário Docks, e-mail e nome do teste, retornou zero registros. A falha de configuração ocorreu antes da criação do job e dos disparos. Nenhum e-mail foi enviado pelo fluxo de teste local.

Esses resultados não provam falha dos outros formulários em produção nem entrega operacional do Docks. A configuração obtida pela CLI deve ser conferida no Netlify antes de uma nova homologação.

## Próximos passos

Conferir a configuração efetiva de FERNANDO_BASE44_CRM_SIGNING_SECRET (mínimo 32 bytes) e sua correspondência com TECHHUMAN_BASE44_CRM_SIGNING_SECRET, selecionado pelo endpoint Base44 para a origem Fernando. Não alterar o contrato HMAC nem reduzir os requisitos para contornar a falha. Depois, repetir um único cadastro autorizado e verificar Lead, LeadSubmission, LeadActivity e os recibos de Resend. A prévia precisa de configuração apropriada para executar o fluxo hospedado; o teste local não substitui a validação da implantação final.

A consulta ampla de variáveis foi rejeitada pela revisão automática por poder retornar segredos; as consultas de e-mail e flag foram dirigidas, e o diagnóstico da assinatura exibiu apenas indicadores booleanos. O servidor local foi encerrado. Não houve publicação em produção.
