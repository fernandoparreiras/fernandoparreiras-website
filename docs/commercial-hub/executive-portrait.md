# Atualização do retrato executivo

Solicitação: atualizar o notebook para MacBook Pro com M5 Max, o celular para iPhone 17 Pro Max e escurecer a barba de Fernando, preservando a composição do retrato.

- Data: 27/09/2026.
- Origem: `public/images/profile/fernando-parreiras-retrato-executivo.webp`, preservado no repositório.
- Versão editada: `public/images/profile/fernando-parreiras-retrato-executivo-2026.webp`, 1136 × 1385 px.
- Uso: componente About, compartilhado pela home e por /sobre.
- Edição: ferramenta integrada imagegen, sem CLI de geração. Conversão para WebP com cwebp, qualidade 88.
- Aparelhos representados: MacBook Pro em preto espacial e iPhone 17 Pro Max em azul profundo. O chip M5 Max é interno e não possui identificação visível na carcaça.
- A imagem é uma edição generativa da fotografia fornecida; não é evidência documental dos aparelhos presentes na sessão original.

Referências oficiais consultadas para os aparelhos:
- https://support.apple.com/en-ie/126319
- https://www.apple.com/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/

## Prompt final

```text
Use case: identity-preserve, precise-object-edit.
Asset type: Photorealistic executive portrait for Fernando Parreiras's personal website.
Input image 1 is the EDIT TARGET, the original portrait. Edit this actual photograph; do not recreate or reinterpret the man.
Make exactly these three changes:
1. Replace the laptop in the lower-left foreground with an Apple MacBook Pro 16-inch with M5 Max, Space Black finish, realistic current MacBook Pro industrial design, black Apple logo on the back of the open display. Keep the existing laptop's position, perspective, open angle and approximate size. The chip is internal: do not add M5 text or any labels to the exterior.
2. Replace the phone on the desk with an iPhone 17 Pro Max in Deep Blue, lying naturally in the same spot and perspective, face down so the authentic rear design is visible: wide raised camera plateau across the top, three camera lenses clustered on the left, flash and LiDAR at right, aluminum unibody surrounding the rear glass panel. Preserve realistic scale relative to the hand and laptop, desk contact shadow and reflections.
3. Darken the man's beard and mustache to a natural dark brown consistent with his hair, substantially reducing the gray while retaining a few subtle natural gray hairs and realistic strand texture. Preserve the exact beard outline, length and density.
CRITICAL INVARIANTS: keep the man's exact facial identity and likeness, facial structure, eye shape and color, nose, smile, teeth, age, expression, hairstyle, skin tone and texture, body, hand anatomy and pose unchanged. Keep the wristwatch, clothing, chair, warm shelf lighting, gold sculpture, background, desk and framing unchanged. Keep the image as a portrait with the same full scene crop and aspect ratio as the original. Preserve the original photographic lighting and natural realism; no beautification, no skin smoothing, no new objects, no added text, no graphic overlays, no webpage interface.
Only the requested object replacements and beard color should change. Output the clean edited photograph.
```

