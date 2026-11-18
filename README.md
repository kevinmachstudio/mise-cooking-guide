# Mise

A static field guide for home cooking. Browse pantry staples, scale a sauce, plan five high-protein Asian lunches, or explore meat cuts.

## Run locally

```sh
python3 -m http.server 8787 --directory dist
```

Open [localhost:8787](http://localhost:8787). The site needs no build step. Lunch choices, portion counts, and grocery checkmarks are stored in the browser.

## Deploy

GitHub Pages uses the checked-in Actions workflow and serves `dist/`. In the repository’s Pages settings, choose **GitHub Actions** as the source. Netlify reads `netlify.toml` and publishes the same directory. The production site can be updated with `netlify deploy --prod` once linked.

## Recipe and image sources

Every recipe links to its published source. The site's portions, ingredient combinations, and estimated macros are adaptations; the adaptations have not been independently kitchen-tested. The generated images illustrate the dishes.

The built-in image generator produced an overhead editorial photo of soy-glazed chicken, rice, edamame, and purple cabbage on a dark table, plus a nine-photo grid of the other lunch dishes. The individual WebP images are in `dist/assets/`.
