# Design QA — Conhecimento / Modelo 3

## Evidence

- Source visual truth: `/Users/parreiras/.codex/generated_images/01a03ada-a5a5-75b1-b21b-5b9f23ca0f29/exec-d9b726d3-75ee-42ee-a0a2-f2678d17e9c1.png`
- Source pixels: 1374 × 1145 at density 1.
- Desktop implementation after production-baseline reconciliation: `/Users/parreiras/.codex/visualizations/2026/08/25/01a03ada-a5a5-75b1-b21b-5b9f23ca0f29/knowledge-version-reconciliation/local-knowledge-corrected-full.png`
- Desktop CSS viewport: 1374 × 1145 at device scale factor 1.
- Mobile implementation: `/Users/parreiras/.codex/visualizations/2026/08/25/01a03ada-a5a5-75b1-b21b-5b9f23ca0f29/knowledge-build/model3-implementation-mobile.png`
- Mobile CSS viewport: 390 × 844 at device scale factor 1; full-page capture 390 × 5127.
- Combined comparison: `/Users/parreiras/.codex/visualizations/2026/08/25/01a03ada-a5a5-75b1-b21b-5b9f23ca0f29/knowledge-build/model3-design-comparison.png`
- Validated production home: `/Users/parreiras/.codex/visualizations/2026/08/25/01a03ada-a5a5-75b1-b21b-5b9f23ca0f29/knowledge-version-reconciliation/production-home.png`
- Reconciled local home: `/Users/parreiras/.codex/visualizations/2026/08/25/01a03ada-a5a5-75b1-b21b-5b9f23ca0f29/knowledge-version-reconciliation/local-home-production-baseline.png`
- State: landing page, unfiltered. Article detail, search result and selected-track states were verified separately.
- Normalization: source and implementation first viewport were compared side by side at equal displayed width. Trilhas and Carta do Fernando were compared in a second, bottom-aligned focused pair.

## Full-view comparison

The implementation preserves the selected Personal Journal composition: charcoal editorial surface, signal-lime accents, split author hero, search-and-filter rail, serif featured essay, compact article rows, four guided tracks and a closing author letter. The existing Fernando Parreiras header and approved repository portrait were retained as product constraints.

The implementation is taller than the visual concept because it presents five complete recent-article rows with real metadata and tags rather than compressing or inventing reading-progress data. This is an intentional product-content adaptation and does not change the selected hierarchy or interaction model.

## Focused-region comparison

- Hero and search: source and implementation share the same split, author-first framing, headline hierarchy, image art direction and immediate discovery controls.
- Featured essay and recent list: serif display type, minimal separators, lime labels and row-based density match the reference direction. The production title and metadata use the actual editorial dataset.
- Trilhas and Carta do Fernando: the focused bottom comparison confirms four equal editorial columns and the newsletter conversion band.
- Image fidelity: the visible portrait uses the supplied WebP repository asset; no placeholder or fabricated person was introduced.

## Required fidelity surfaces

- Fonts and typography: Raleway Variable remains the product font; Georgia/system serif is restricted to the journal signature and featured essay. Weight, tracking, line height and wrapping preserve the source hierarchy.
- Spacing and layout rhythm: sharp borders, grid alignment, narrow labels and compact article rows reproduce the source grammar. The responsive layout removes columns cleanly without horizontal overflow.
- Colors and visual tokens: black, charcoal, white and `#d8ff57` match both the source and the existing site identity.
- Image quality and asset fidelity: the approved portrait remains sharp and uses a face-preserving crop on desktop and mobile.
- Copy and content: all Portuguese copy is production-oriented and tied to the four real editorial tracks. No placeholder text or false reading-progress state remains.

## Comparison history

### Model 3 pass 1

- No actionable P0, P1 or P2 visual mismatches were found in the combined first-viewport and focused lower-section comparison.
- Accepted product constraints: existing site header, actual article titles, real metadata and a scrollable full catalog instead of the concept's compressed single-artboard density.
- Post-pass evidence: `model3-design-comparison.png`, `model3-implementation-desktop.png` and `model3-implementation-mobile.png`.

### Production-baseline reconciliation

- [P1] The first preview had been assembled on local `main` at `5cc3751`, 13 commits behind the production baseline `181e443`, so `/` rendered the retired home composition.
- Fix: preserved the dirty local checkout and recreated the Conhecimento work on isolated branch `codex/knowledge-model-3`, based directly on `origin/main` at `181e443`.
- Post-fix evidence: the local and production H1 are identical; the hero and all home sections have zero source diff against `origin/main`; navigation differs only by the intentional `Conhecimento` entry.
- Post-fix visual evidence: `production-home.png`, `local-home-production-baseline.png` and `local-knowledge-corrected-full.png`.

### Header interaction refinement

- Added a one-pixel signal-lime underline that expands from the center on hover and keyboard focus; active routes retain the underline and lime label.
- Added the search icon only to `Conhecimento`, on desktop and mobile. Applying icons to every item was rejected because it would add visual noise to the compact primary navigation and compete with the main CTA.
- Motion follows the existing reduced-motion preference, and the original visible focus outline remains intact.
- Post-pass evidence: `header-hover-audit/02-header-hover-negocios.png`, `header-hover-audit/03-header-hover-conhecimento.png`, `header-hover-audit/04-header-conhecimento-ativo.png` and `header-hover-audit/05-mobile-menu.png`.

## Interaction and browser verification

- Search for `jovens` returned two articles and persisted `?q=jovens`.
- Track filter `Carreira com IA` returned two articles, persisted `?trilha=carreira-ia` and set `aria-pressed=true`.
- Article detail rendered the feedback and sharing utilities.
- Helpful feedback set `aria-pressed=true` and announced the response.
- Copy link announced `Link copiado.` using the canonical article URL.
- Mobile layout at 390 × 844 reported `clientWidth=390` and `scrollWidth=390`.
- Browser console check on the article route returned no warnings or errors.
- The reconciled home and Conhecimento route both reported `clientWidth=390` and `scrollWidth=390` at the mobile breakpoint.
- Header rest, hover, active and mobile-menu states were visually verified after the navigation refinement.

## Findings

No actionable P0, P1 or P2 findings remain.

## Follow-up polish

- [P3] Unique key visuals may be commissioned for future essays. The current version deliberately reuses approved photography.
- [P3] The newsletter form contract is implemented, but production submission remains to be verified after deployment.

## Implementation checklist

- [x] Exact selected Model 3 implemented in the existing product.
- [x] Desktop and mobile visual comparison completed.
- [x] Search, filters, article feedback and copy sharing verified.
- [x] Static article HTML, metadata, RSS, sitemap and LLM output regenerated.
- [x] P0/P1/P2 visual gate cleared.
- [x] Minimal header hover, active state and Conhecimento icon verified on desktop and mobile.

final result: passed
