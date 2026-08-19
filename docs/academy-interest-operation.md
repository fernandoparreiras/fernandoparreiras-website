# Operação mínima — lista de interesse da TECH HUMAN ACADEMY

Status deste documento: contrato operacional da landing `IA sem Confusão`.

## Escopo

- A página registra interesse; não vende vagas nem recebe pagamento.
- Data, local, investimento, capacidade e política de cancelamento permanecem fora da publicação até confirmação.
- A lista serve somente para comunicar as condições da primeira turma e a eventual abertura de inscrição.

## Dados e consentimento

| Campo | Obrigatório | Limite | Finalidade |
| --- | --- | --- | --- |
| `name` | sim | 100 caracteres | identificar a pessoa interessada |
| `email` | sim | 160 caracteres | enviar as informações da turma |
| `city` | não | 100 caracteres | apoiar a decisão de localidade |
| `question` | não | 600 caracteres | compreender a principal dúvida de entrada |
| `consent` | sim | booleano | registrar autorização específica |
| `consentVersion` | sim | `academy-interest-2026-08-18` | preservar a versão aceita |
| `source` | sim | `academy-ia-sem-confusao` | identificar a origem |
| `submittedAt` | sim | ISO 8601 | registrar o momento do envio |

Retenção máxima: 12 meses. Revogação, correção ou exclusão: `fernando@fernandoparreiras.com.br`.

## Backend de produção

O site público está hospedado no Hostinger Horizons. O formulário de produção deve usar o backend nativo da plataforma, com uma coleção chamada `academy_interest`, validação dos campos e notificação para `fernando@fernandoparreiras.com.br`.

Ambientes de teste e produção devem ser tratados como bases separadas. Antes de publicar:

1. enviar um registro no modo de teste;
2. confirmar que o registro apareceu na coleção correta;
3. confirmar o recebimento da notificação;
4. excluir o registro de teste;
5. publicar e repetir um teste controlado no ambiente de produção;
6. excluir o registro controlado após a verificação.

## Contrato HTTP do repositório

Quando `VITE_ACADEMY_INTEREST_ENDPOINT` estiver definido, a aplicação envia `POST` com `Content-Type: application/json` e o payload da tabela acima. Qualquer resposta HTTP `2xx` é considerada sucesso.

Sem endpoint configurado, a aplicação abre uma mensagem de e-mail já preenchida. Se o endpoint falhar, mostra atalhos de e-mail e WhatsApp. Esse fallback evita perder o contato, mas não deve ser apresentado como uma integração operacional confirmada.

## Guardrails

- Não ativar newsletter genérica com o consentimento atual.
- Não adicionar campos de telefone, empresa ou cargo sem necessidade e nova revisão.
- Não adicionar pixels ou analytics de campanha antes de atualizar o aviso e a decisão operacional.
- Não afirmar que a lista está `OPERATING` sem um envio verificado no ambiente publicado.
- Não habilitar pagamento antes da aprovação explícita de oferta, preço, política, capacidade e fluxo de atendimento.

## Prompt de implementação no Hostinger Horizons

Executar em duas etapas, revisar no preview e só então publicar.

### Etapa 1 — página e formulário

> Crie a rota pública `/academy/ia-sem-confusao` para a TECH HUMAN ACADEMY, mantendo o restante do site. Use fundo branco e preto, verde-lima `#d8ff57`, tipografia Raleway e linguagem direta. A página deve registrar interesse, não vender vagas. Inclua o formulário nativo com nome e e-mail obrigatórios; cidade e principal dúvida sobre IA opcionais; checkbox obrigatório com consentimento específico; e link para `/privacidade#academy-lista-interesse`. Salve no backend em `academy_interest`, incluindo versão do consentimento, origem e data de envio, e envie notificação para `fernando@fernandoparreiras.com.br`.

### Etapa 2 — privacidade e segurança editorial

> Crie `/privacidade` com a seção `academy-lista-interesse`: finalidade limitada às informações da primeira turma; Hostinger como fornecedora de hospedagem/backend; retenção máxima de 12 meses; direitos e revogação por `fernando@fernandoparreiras.com.br`; sem venda de dados, publicidade de terceiros ou newsletter genérica. Na landing, não invente data, local, preço, número de vagas, certificado reconhecido, garantia de resultado ou urgência. Mostre confirmação clara após envio e fallback por e-mail e WhatsApp se ocorrer erro.

## Evidência mínima para mudança de estado

| Estado | Evidência requerida |
| --- | --- |
| `IMPLEMENTED` | rota, conteúdo, formulário e aviso presentes no código ou editor |
| `VERIFIED` | build válido e teste de formulário no preview/teste |
| `PUBLISHED` | URL pública responde e apresenta a versão aprovada |
| `OPERATING` | registro e notificação confirmados no ambiente de produção |
