# SER, FAZER e DOAR — iniciativas na home

A home reúne POR.life, SER Talks e Jornada Cast na seção `/#servir`, logo após a apresentação de Fernando. SER, FAZER e DOAR são o tema comum; não representam uma classificação exclusiva de cada projeto. Doar é apresentado como compartilhar tempo, conhecimento e cuidado, sem introduzir arrecadação financeira.

Os dados de `src/data/initiatives.js` alimentam a seção e os cards já existentes em `/negocios/`. `InitiativeLogo` mantém as mesmas marcas nas duas apresentações. O resumo de negócios na home fica com as frentes comerciais e de produtos, evitando repetir as três iniciativas.

## Origem das logos

Arquivos preservados sem redesenho ou alteração das marcas. Imagens locais, compatíveis com a CSP existente; nenhuma dependência de CDN em tempo de navegação.

| Arquivo | Origem verificada em 27/09/2026 |
| --- | --- |
| `por-symbol.avif` | Arquivo fornecido pelo titular: `icones-e-logos-geral-mxB2eepaXWCK4xwe.avif`, símbolo também presente em [POR.life](https://por.life/) |
| `por-life.png` | Logo do cabeçalho de POR.life: [original](https://assets.zyrosite.com/A1a1JxxyV3U5GZvE/design-nomes-site-bar-1-Yyv0Ev4XVXTXk0xK.png) |
| `ser-talks.png` | Símbolo do cabeçalho de [SER Talks](https://sertalks.life/): [original](https://horizons-cdn.hostinger.com/8b836dbb-0e45-4183-a46a-c0d6b46e87c8/a7597e22f9a0bdce6c0e92f858487a42.png) |
| `jornada-cast.png` | Logo do cabeçalho de [Jornada Cast](https://www.jornadacast.com.br/): [original](https://assets.zyrosite.com/AMqanpDPBMH1vwyX/jornadalogo-mv05jjlQMGIV6qzw.png) |

SER Talks usa uma superfície clara para preservar o contraste do símbolo escuro. Os links abrem os três endereços oficiais em nova aba, com indicação acessível, e registram `initiative_click` na home. A página Negócios conserva o evento `business_click`.

## Validação da implementação

- 52 testes existentes aprovados; lint, build, auditoria de dependências de produção (zero vulnerabilidades) e `git diff --check` aprovados.
- Artefato de produção conferido no navegador: home em 1440, 768, 390 e 320 px; Negócios em 1440, 390 e 320 px. Logos carregadas e sem rolagem horizontal.
- Tab e Enter abriram SER Talks em nova aba. Os três destinos correspondem aos endereços fornecidos.
- Acesso direto a `/#servir` posiciona a seção abaixo do cabeçalho fixo; o comportamento de voltar ao topo permanece para rotas sem âncora.
- Nenhum erro de console no artefato de produção. O build mantém o aviso já existente de bundle acima de 500 kB.

Essas verificações cobrem a implementação local. A publicação deve ser confirmada pelo commit integrado, recibo da Netlify e inspeção do domínio oficial.
