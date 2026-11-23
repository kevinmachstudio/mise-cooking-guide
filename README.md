# Mise

A static field guide for home cooking. Plan meals for the week, match recipes to the ingredients you have, browse regional and restaurant-inspired recipes, and look up pantry staples.

## Run locally

```sh
python3 -m http.server 8787 --directory dist
```

Open [localhost:8787](http://localhost:8787). The site needs no build step. The weekly calendar, submitted ingredient lists, lunch choices, portion counts, and grocery checkmarks are stored in the browser.

Weekday calendar slots use the lunch plan until edited. Weekly templates preview and apply a full week of meals with daily estimated protein and calories. The sauce calculator filters by style and use, and the seafood directory links to five recipes or transferable methods per fish.

The Nutrition & Longevity guide links to primary studies and public-health guidance. Its hero uses a generated editorial photo of a Japanese-inspired lunch with tofu, greens, sweet potato, and noodles.

## Deploy

GitHub Pages uses the checked-in Actions workflow and serves `dist/`. In the repository’s Pages settings, choose **GitHub Actions** as the source. Netlify reads `netlify.toml` and publishes the same directory. The production site can be updated with `netlify deploy --prod` once linked.

## Recipe and image sources

Every recipe links to its published source. The site's portions, ingredient combinations, and estimated macros are adaptations; the adaptations have not been independently kitchen-tested. The generated images illustrate the dishes.

The restaurant collection links to menus, restaurant reporting, and 2026 dining guides. The recipes are written for home kitchens. The built-in image generator created cookbook-style illustrations of the adaptations, including the Bay Area soups, four dim sum dishes, and the regional restaurant picks in `dist/assets/`.

The cookbook-style images in `dist/assets/` also illustrate the California Fish Grill and Panda Express dishes, Koi Palace dim sum, and mainland Chinese and Hong Kong recipes.

The built-in image generator produced an overhead editorial photo of soy-glazed chicken, rice, edamame, and purple cabbage on a dark table, plus a nine-photo grid of the other lunch dishes. The individual WebP images are in `dist/assets/`.
