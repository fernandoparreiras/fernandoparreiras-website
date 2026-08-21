# Runbook de migração para Netlify

Este documento prepara a migração de hospedagem sem executá-la. O domínio canônico permanece
`https://fernandoparreiras.com.br/`; a mudança de DNS exige aprovação humana e janela de rollback.

## Estado preparado no repositório

- build reproduzível com Node.js 22 e saída em `dist/`;
- redirect de `www` para o domínio apex e arquivo `_redirects` gerado pelo estado editorial;
- rotas públicas materializadas como HTML e URLs desconhecidas respondendo 404, sem soft 404;
- headers de segurança e cache imutável para assets versionados;
- `robots.txt`, `sitemap.xml`, `llms.txt` e metadados gerados apenas para rotas públicas;
- rota `/artigos/` respondendo 404 enquanto não existir publicação aprovada.

## Cutover aprovado

1. Criar o site no Netlify a partir deste repositório e manter o subdomínio de preview.
2. Confirmar `npm ci`, `npm test`, `npm run lint` e `npm run build` no deploy de preview.
3. Validar `/`, `/docks/`, `/epitafio/`, `/robots.txt`, `/sitemap.xml` e `/llms.txt` no preview.
4. Cadastrar primeiro `www.fernandoparreiras.com.br` e depois o domínio apex no Netlify.
5. Registrar os valores DNS atuais e reduzir o TTL antes da janela de migração.
6. Aplicar os registros indicados pelo Netlify, aguardar TLS válido e testar o redirect `www → apex`.
7. Verificar analytics, formulários e links externos antes de encerrar a hospedagem anterior.

## Rollback

Se TLS, resolução ou rotas críticas falharem, restaurar os registros DNS anotados no passo 5. O
arquivo `.htaccess` permanece versionado até a conclusão do cutover justamente para preservar a
opção de retorno à hospedagem anterior, mas o gerador o remove de `dist/` para que ele não faça
parte do deploy Netlify.

## Pendências humanas

- autorizar a conexão do repositório ao workspace Netlify;
- aprovar a janela e a alteração de DNS;
- fornecer ou aprovar uma versão local dos assets de marca ainda servidos pela Hostinger;
- somente após o primeiro artigo aprovado, incluir sua projeção no catálogo da Forge e validar a
  ativação coordenada do hub autoral.
