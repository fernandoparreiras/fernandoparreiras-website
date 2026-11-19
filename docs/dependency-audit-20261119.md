# Auditoria de dependências — 19/11/2026

A qualificação editorial do PR #70 encontrou no lockfile herdado da main cinco alertas no recorte `npm audit --omit=dev`: um alto e quatro moderados. O README exige auditoria verde antes da integração. Este patch separado corrige o gate sem alterar texto, data, calendário, runtime de formulários, workflows ou política de segurança.

## Alteração

Somente o lockfile muda: `postcss-selector-parser` 6.1.4 → 6.1.6, `source-map-js` 1.2.1 → 1.2.4, `sucrase` 3.35.0 → 3.35.1 e `vite` 7.3.6 → 7.3.8. As quatro atualizações são patches dentro dos ranges já declarados. A árvore deixa de precisar de 30 nós transitivos antigos; `package.json`, engines, scripts e APIs do site ficam idênticos. Não há overrides, shims, alteração de hashes ou uso de `--force`.

## Qualificação local

Node 22.23.3 / npm 10.9.9, instalação limpa `npm ci`, `npm ls --all` sem peers inválidos, 69 testes sem skips, lint e build real passaram. `KNOWLEDGE_BUILD_AT` permaneceu ausente; nenhum build futuro foi usado. Auditorias completa e omit-dev terminaram com zero alertas conhecidos. Zero alertas não equivale a risco zero. O gate de auditoria não foi suprimido nem teve seu limiar alterado.

O lote editorial #70 continua separado. Sua aprovação não implica aprovação deste patch de dependências. A integração da correção exige aceite específico; até lá não há deploy ou alegação de produção corrigida.

## Fontes primárias

- source-map-js: https://github.com/advisories/GHSA-68fv-2mgg-jv7q
- glob: https://github.com/advisories/GHSA-3g3m-2fjr-6pw4
- minimatch: https://github.com/advisories/GHSA-g3hv-75wg-m249
- postcss-selector-parser: https://github.com/advisories/GHSA-rj75-hqrm-r3gf

As entradas do registro oficial foram revalidadas em 19/11/2026. A auditoria identifica versões afetadas; não demonstra exploração ou exposição das páginas estáticas.
