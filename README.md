# Mise

A static field guide for home cooking. Plan meals for the week, match recipes to the ingredients you have, browse regional and restaurant-inspired recipes, and look up pantry staples.

## Run locally

```sh
python3 -m http.server 8787 --directory dist
```

Open [localhost:8787](http://localhost:8787). The weekly calendar, submitted ingredient lists, lunch choices, portion counts, and grocery checkmarks are stored in the browser. After editing files in `dist/`, run `node scripts/build-offline.mjs` to refresh the service worker and its cache version.

Select **Install** in the header for the browser prompt or home-screen instructions. Open the installed app once while online and check **App & offline access** in the footer. Once the guide is ready, the built-in recipes, images, search, planner, and saved kitchen data work offline. External source links require a connection.

Open **My notes** in a recipe to write personal cooking notes. Notes save automatically in that browser. **Copy notes** copies their plain text for pasting elsewhere.

Tap the heart on a recipe card or the **Favorite** button inside a recipe. Find saved recipes under **Recipes → Favorites** or use **Favorites** on the planner’s recipe shelf. Your browser remembers them and includes them in kitchen backups.

On **This Week**, use **Kitchen data** to copy all recipe notes or transfer saved data with a JSON backup. Restoring a backup keeps other local entries and gives the file priority where it supplies the same note, calendar slot, checklist, or setting.

Use **Change → Quick swaps** on a planned meal to see faster, higher-protein, or ingredient-based alternatives and preview changes to weekly groceries. **Share week** copies the displayed plan and grocery checklist as text, including batch sizes and leftover sources.

Open **Groceries** on the weekly planner and group the list by **Store aisle** or **Cuisine**. Ingredients used by several cuisines appear once with their total quantity. The **Grocery guide** under Pantry has a searchable directory with cuisine, ingredient type, and store filters.

Drag from anywhere in a filled meal cell to transfer it to a different day or meal slot. On a touchscreen, touch and hold the cell before dragging. A filled destination swaps the two meals. Drop on a day heading to keep the same meal time, or press **Move** to pick a slot.

Each recipe has **Original**, **Restaurant-style**, and **Fitness** versions. The chosen version has its own measured quantities and directions and scales with the recipe's serving control. The calendar and groceries use Original quantities.

Weekday calendar slots use the lunch plan until edited. Weekly templates preview and apply a full week of meals with daily estimated protein and calories. The sauce calculator filters by style and use, and the seafood directory links to five recipes or transferable methods per fish.

The Nutrition & Longevity guide links to primary studies and public-health guidance. Its hero uses a generated editorial photo of a Japanese-inspired lunch with tofu, greens, sweet potato, and noodles.

## Deploy

GitHub Pages uses the checked-in Actions workflow and serves `dist/`. In the repository’s Pages settings, choose **GitHub Actions** as the source. Netlify reads `netlify.toml` and publishes the same directory. Both builds run `node scripts/build-offline.mjs`. For direct uploads, run that command before uploading `dist/`.

## Recipe and image sources

Every recipe links to its published source. The site's portions, ingredient combinations, and estimated macros are adaptations; the adaptations have not been independently kitchen-tested. The generated images illustrate the dishes.

The restaurant collection links to menus, restaurant reporting, and 2026 dining guides. The recipes are written for home kitchens. The built-in image generator created cookbook-style illustrations of the adaptations, including the Bay Area soups, four dim sum dishes, and the regional restaurant picks in `dist/assets/`.

The cookbook-style images in `dist/assets/` also illustrate the California Fish Grill and Panda Express dishes, Koi Palace dim sum, and mainland Chinese and Hong Kong recipes.

The Italian and Asian fusion collections cite culinary references, menus, or chef interviews on each recipe. Their JPEG photos use two ImageGen cookbook contact sheets, with warm rustic Italian plating and California-style restaurant plating for the home adaptations.

The built-in image generator produced an overhead editorial photo of soy-glazed chicken, rice, edamame, and purple cabbage on a dark table, plus a nine-photo grid of the other lunch dishes. The individual WebP images are in `dist/assets/`.
