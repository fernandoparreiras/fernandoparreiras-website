# Design QA — hero com retrato pessoal

## Evidências

- Verdade visual de origem:
  - hero público antes da mudança: `artifacts/design-qa/hero-personal-photo/reference-production-1440x900.png`
  - retrato selecionado: `public/images/em-cena/fernando-parreiras-palestra-principal-1122.webp`
  - anexo original do retrato: `/Users/parreiras/Pictures/OFICIAL-PARREIRAS-PALESTRAS.png`
- Implementação final:
  - desktop: `artifacts/design-qa/hero-personal-photo/implementation-desktop-1440x900-v2.png`
  - transição de breakpoint: `artifacts/design-qa/hero-personal-photo/implementation-desktop-1024x900-v2.png`
  - tablet: `artifacts/design-qa/hero-personal-photo/implementation-tablet-768x1024-v1.png`
  - mobile: `artifacts/design-qa/hero-personal-photo/implementation-mobile-390x844-v2.png`
- Comparação combinada: `artifacts/design-qa/hero-personal-photo/comparison-board.png`
- Estado: home pública, tema escuro, visitante anônimo, hero no topo.
- Normalização: referência pública e implementação desktop capturadas a 1440 × 900 CSS px e 1440 × 900 pixels; densidade 1:1. Mobile capturado a 390 × 844 CSS px e 390 × 844 pixels; densidade 1:1. Retrato-fonte com 1122 × 1402 pixels e variante responsiva com 720 × 900 pixels.

## Comparação final

### Fontes e tipografia

Raleway Variable, pesos, tracking, line-height e hierarquia foram preservados. A escala do título foi reduzida de forma responsiva entre 1024 e 1535 px para liberar o rosto e manter os CTAs no primeiro viewport; em 2xl a escala original retorna. O texto e as quebras continuam fortes e legíveis.

### Espaçamento e ritmo de layout

O alinhamento do conteúdo, os três níveis de CTA e a estrutura do hero foram preservados. No desktop, o retrato ocupa a faixa direita e termina junto à base do hero. No mobile, a foto abre a experiência e se funde verticalmente ao conteúdo antes do eyebrow e do H1. Não há overflow horizontal em 390, 768, 1024 ou 1440 px.

### Cores e tokens visuais

Preto, branco e verde `#d8ff57` permanecem como tokens dominantes. O azul do palco acrescenta profundidade sem criar uma nova cor de interface. Gradientes escuros e opacidade controlada integram a imagem ao fundo e mantêm contraste sobre a tipografia.

### Qualidade e fidelidade da imagem

Foi usado o retrato oficial fornecido, sem geração artificial ou substituto. O desktop carrega 1122 × 1402 e o mobile seleciona 720 × 900. O rosto permanece nítido; o recorte móvel prioriza rosto e tronco, enquanto o desktop preserva rosto, gesto e marca Tech Human. Não foram observados halos, distorção ou compressão visível.

### Copy e conteúdo

Eyebrow, H1, parágrafo e CTAs permaneceram integralmente iguais. A foto é decorativa no contexto do hero (`alt=""` e contêiner fora da árvore assistiva), evitando repetir o nome já anunciado no cabeçalho e no texto.

### Ícones, estados e acessibilidade

Ícones e estados de foco existentes foram preservados. A entrada do retrato respeita `prefers-reduced-motion`; com redução de movimento a animação não inicia. Há um único H1. O CTA primário foi acionado e levou corretamente a `#intentions`; links para negócios e palestras mantêm seus destinos. O console final não apresentou avisos ou erros.

## Histórico de comparação e correções

### Iteração 1 — bloqueada

- [P2] Escala excessiva na transição para desktop em 1024 × 900.
  - Evidência anterior: `artifacts/design-qa/hero-personal-photo/implementation-desktop-1024x900-v1.png`.
  - Diferença: o título herdava 6.4rem no primeiro breakpoint desktop, elevava o hero a 1094 px e empurrava os CTAs para fora do primeiro viewport.
  - Correção: escala passou a 5rem em `lg`, 5.75rem em `xl` e 6.4rem apenas em `2xl`, com limites de largura correspondentes.

### Iteração 2 — aprovada

- Evidência posterior: `artifacts/design-qa/hero-personal-photo/implementation-desktop-1024x900-v2.png`.
- Resultado: hero reduzido a 828 px, rosto com área de respiro, mensagem preservada e três CTAs visíveis.
- Não restam achados P0, P1 ou P2.

## Achados residuais

- [P3] Em 390 × 844, o conteúdo completo do hero continua além do primeiro viewport para preservar foto e título em escala legível. O CTA comercial móvel permanece fixo e visível, portanto a conversão não fica sem ação disponível.

## Checklist de implementação

- [x] Retrato oficial responsivo integrado.
- [x] Fusão visual sem aparência de banner chapado.
- [x] Entrada suave com redução de movimento.
- [x] Desktop, tablet, transição de 1024 px e mobile verificados.
- [x] CTA primário e destinos secundários verificados.
- [x] Console sem erros ou avisos.

final result: passed
