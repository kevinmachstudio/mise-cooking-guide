const chronicle = ["Chronicle 2026 Bay Area Top 100", "https://www.sfchronicle.com/projects/2026/top-100-best-restaurants-san-francisco-bay-area/"];
const dimSumGuide = ["2026 San Francisco Standard dim sum picks", "https://sfstandard.com/2026/04/25/best-dim-sum-san-francisco/"];
const michelin = ["2026 MICHELIN Guide California", "https://guide.michelin.com/ca/en/article/michelin-guide-ceremony/guide-michelin-california"];

export const restaurants = {
  kunjip: {name:"Kunjip", place:"Santa Clara, CA", area:"bay", sources:[chronicle]},
  gao: {name:"Gao Viet Kitchen", place:"San Mateo, CA", area:"bay", sources:[
    ["Gao Viet’s San Mateo menu", "https://gaovietkitchen.com/san-mateo-menu/"]]},
  yank: {name:"Yank Sing", place:"San Francisco, CA", area:"bay", sources:[
    ["Yank Sing’s dim sum menu", "https://yanksing.com/menu/"], dimSumGuide]},
  dragon: {name:"Dragon Beaux", place:"San Francisco, CA", area:"bay", sources:[
    ["Dragon Beaux menus", "https://dragonbeaux.com/menus/"], dimSumGuide]},
  palette: {name:"Palette Tea House", place:"San Francisco, CA", area:"bay", sources:[
    ["Palette Tea House’s San Francisco menu", "https://paletteteahouse.com/-food-menu"], dimSumGuide]},
  sanhowon: {name:"San Ho Won", place:"San Francisco, CA", area:"bay", sources:[
    ["San Ho Won’s menu", "https://www.sanhowon.com/menu"],
    ["MICHELIN’s San Ho Won profile", "https://guide.michelin.com/ca/en/california/san-francisco/restaurant/san-ho-won"], michelin]},
  nari: {name:"Nari", place:"San Francisco, CA", area:"bay", sources:[
    ["Nari’s food menu", "https://www.narisf.com/food-menu"], michelin]},
  chairman: {name:"The Chairman", place:"Hong Kong", area:"asia", sources:[
    ["Asia’s 50 Best Restaurants 2026 · No. 1", "https://www.the50.com/restaurants/best-in-asia/the-list/The-Chairman.html"]]},
  mingles: {name:"Mingles", place:"Seoul, South Korea", area:"asia", sources:[
    ["Asia’s 50 Best Restaurants 2026 · No. 4", "https://www.the50.com/restaurants/best-in-asia/the-list/mingles.html"]]},
  lei: {name:"Lei", place:"New York, NY", area:"us", sources:[
    ["Lei’s cat’s-ear noodles · Resy interview", "https://blog.resy.com/2025/05/lei-wine-bar-nyc/"],
    ["2026 James Beard Award · Best New Restaurant", "https://web.jamesbeard.org/stories/james-beard-award-winners-2026"]]}
};

// Each ingredient is [amount for the full batch, unit, shopping label].
export const restaurantRecipes = [
  {
    id:"seolleongtang", restaurant:"kunjip", name:"Seolleongtang", cuisine:"Korean", animal:"Beef", time:390, active:30, servings:4,
    desc:"Cloudy ox-bone broth with brisket, thin noodles, and plenty of scallions.",
    inspiration:"The Chronicle singled out Kunjip’s cloudy bone-broth soup in its 2026 Top 100. This version uses marrow bones, oxtail, and brisket.",
    items:[[1,"kg","Beef leg or marrow bones"],[500,"g","Oxtail"],[350,"g","Beef brisket"],[4,"L","Water, plus more for soaking and topping up"],[160,"g","Dry somyeon noodles"],[4,"","Scallions"],[1,"tsp","Fine salt, plus more to taste"],[0.5,"tsp","Ground black pepper"]],
    steps:[
      "Soak the bones and oxtail in cold water in the fridge for 1 hour. Drain, cover with fresh water, and boil for 10 minutes. Drain, rinse the bones and oxtail, and wash the pot.",
      "Return the bones and oxtail to the pot with the measured water. Boil steadily, partially covered, until cloudy and rich, about 5 hours. Top up with hot water as needed to keep the bones submerged. Remove the oxtail when tender, typically after 2½–3 hours, pull the meat from the bones, and refrigerate it promptly.",
      "Add the brisket for the last 1½–2 hours, until a fork slides through easily. Strain the broth, skim excess fat, and thin to taste. Slice the brisket and reheat the oxtail meat in the broth to 165°F / 74°C.",
      "Cook and drain the noodles separately. Divide among bowls with the beef, ladle over the hot broth, and serve with sliced scallions, salt, and pepper."
    ],
    swap:"Use frozen unsalted Korean ox-bone broth (sagol) and leftover cooked brisket for a much faster version. Serve with rice instead of noodles.",
    store:"Chill strained broth and meat in shallow separate containers. Freeze the broth in portions and cook fresh noodles on serving day."
  },
  {
    id:"spicy-galbijjim", restaurant:"kunjip", name:"Spicy Galbijjim", cuisine:"Korean", animal:"Beef", time:175, active:30, servings:4,
    desc:"Sweet-hot short ribs with kabocha squash and chewy rice cakes.",
    inspiration:"Kunjip’s galbijjim pairs braised beef short ribs with pumpkin and thick rice cakes, as described in the Chronicle’s 2026 Top 100.",
    items:[[1.2,"kg","Bone-in beef short ribs, English cut"],[2,"cups","Unsalted beef stock"],[0.25,"cup","Soy sauce"],[2,"tbsp","Gochujang"],[1,"tbsp","Gochugaru"],[2,"tbsp","Brown sugar"],[120,"g","Asian pear, grated"],[5,"cloves","Garlic, grated"],[2,"tsp","Ginger, grated"],[350,"g","Kabocha squash, cut into wedges"],[200,"g","Cylindrical Korean rice cakes"],[2,"","Scallions"]],
    steps:[
      "Boil the ribs in plain water for 8 minutes. Drain and rinse. Stir stock, soy sauce, gochujang, gochugaru, sugar, pear, garlic, and ginger in a Dutch oven.",
      "Add the ribs, bring to a simmer, then cover and cook gently for 1½–2 hours, turning once, until the meat yields easily to a fork. Skim excess fat and add a splash of water if the liquid reduces too fast.",
      "Soak refrigerated rice cakes in warm water for 10 minutes, then drain. Add the squash to the ribs and simmer until almost tender, about 12–15 minutes. Add the rice cakes and simmer another 5–8 minutes, until tender.",
      "Simmer uncovered briefly if the sauce needs thickening. Top with sliced scallions and serve with rice."
    ],
    swap:"Use butternut squash in place of kabocha. For less heat, start with half the pepper flakes and add more at the end.",
    store:"Chill ribs and sauce together. Reheat gently with a splash of water. Add freshly softened rice cakes on serving day for the best texture."
  },
  {
    id:"shaking-beef", restaurant:"gao", name:"Shaking Beef (Bò Lúc Lắc)", cuisine:"Vietnamese", animal:"Beef", time:35, active:20, servings:2,
    desc:"Pan-seared steak cubes with quick-pickled onion, cress, and lime.",
    inspiration:"Shaking beef is on Gao Viet’s San Mateo menu. This skillet version uses sirloin and a lime-pepper finish.",
    items:[[350,"g","Top sirloin or filet mignon"],[1,"tbsp","Oyster sauce"],[2,"tsp","Soy sauce"],[1,"tsp","Fish sauce"],[2,"tsp","Sugar, divided"],[2,"cloves","Garlic, minced"],[1,"tbsp","Neutral oil"],[70,"g","Red onion, thinly sliced"],[2,"tbsp","Rice vinegar"],[80,"g","Watercress"],[1,"","Lime"],[0.25,"tsp","Ground black pepper"],[0.25,"tsp","Fine salt"]],
    steps:[
      "Cut the steak into 1-inch cubes. Toss with oyster sauce, soy, fish sauce, garlic, and half the sugar. Refrigerate for 15 minutes. Toss the sliced onion with vinegar and the remaining sugar.",
      "Drain off excess marinade. Heat a wide skillet over medium-high and add the oil. Sear in batches until browned all around and 145°F / 63°C in the center. Rest for 3 minutes.",
      "Pile steak onto watercress with the drained onion. Squeeze the lime into a small bowl with the salt and pepper for dipping."
    ],
    swap:"Ribeye gives a richer result. Arugula works in place of watercress.",
    store:"Keep cress and pickled onions separate. Reheat the steak briefly in a covered skillet, then plate over the fresh greens."
  },
  {
    id:"banh-khot", restaurant:"gao", name:"Shrimp Bánh Khọt", cuisine:"Vietnamese", animal:"Seafood", time:45, active:35, servings:4, pieces:24,
    desc:"Mini coconut-rice pancakes with shrimp, lettuce, and sweet-tart dipping sauce.",
    inspiration:"Gao Viet serves bánh khọt. This version makes crisp little rice-flour pancakes with shrimp and herbs.",
    items:[[150,"g","White rice flour"],[25,"g","Cornstarch"],[0.5,"tsp","Ground turmeric"],[0.5,"tsp","Fine salt"],[120,"mL","Unsweetened coconut milk, stirred"],[210,"mL","Cold water"],[200,"g","Small raw shrimp, peeled and deveined"],[2,"","Scallions, sliced"],[2,"tbsp","Neutral oil, plus more as needed"],[8,"","Lettuce leaves"],[20,"g","Mint or cilantro"],[4,"tbsp","Prepared lime and fish sauce dressing"]],
    steps:[
      "Whisk the flours, turmeric, salt, coconut milk, and water until smooth. Rest 10 minutes, then stir in the scallions. Pat the shrimp dry and halve any large ones.",
      "Heat a bánh khọt or æbleskiver pan over medium heat. Brush each well with oil, stir the batter, and pour a scant tablespoon into each well. Add one piece of shrimp per pancake and cover for 2–3 minutes.",
      "Uncover and cook a few minutes until the bases and edges are crisp and the shrimp are opaque and pearly throughout. Lift out with a spoon and re-oil the wells before the next batch.",
      "Wrap each pancake in lettuce with herbs and dip in the dressing."
    ],
    swap:"Without a well pan, make small flat pancakes in an oiled skillet. Use diced tofu instead of shrimp for a different topping.",
    store:"Keep pancakes separate from greens and sauce. Re-crisp on a rack in a hot oven before serving.", sauce:"lime-fish"
  },
  {
    id:"surf-turf-pho", restaurant:"gao", name:"Surf-and-Turf Phở", cuisine:"Vietnamese", animal:"Beef & seafood", time:190, active:30, servings:4,
    desc:"Spiced beef-rib phở with rice noodles, shrimp, lime, and jalapeño.",
    inspiration:"Gao Viet’s Phozilla combines lobster and several cuts of beef. This stovetop version pairs beef ribs with shrimp and starts with unsalted stock.",
    items:[[900,"g","Bone-in beef short ribs"],[2,"L","Unsalted beef stock"],[1,"","Yellow onion, halved"],[70,"g","Fresh ginger, split lengthwise"],[3,"","Star anise pods"],[1,"","Cinnamon stick"],[2,"tsp","Coriander seeds"],[2,"tbsp","Fish sauce, plus more to taste"],[2,"tsp","Sugar"],[280,"g","Dry flat phở noodles"],[240,"g","Raw shrimp, peeled and deveined"],[2,"","Scallions"],[1,"","Lime"],[1,"","Jalapeño"]],
    steps:[
      "Char the cut sides of the onion and ginger in a dry skillet. Toast star anise, cinnamon, and coriander until fragrant and put them in a spice bag.",
      "Cover ribs with water, boil for 8 minutes, then drain and rinse. Simmer the ribs gently with the stock, onion, ginger, and spices, partially covered, for about 2½ hours, until tender. Remove the spice bag after 45 minutes. Top up with water if needed.",
      "Strain the stock, skim excess fat, and return the ribs to the pot. Season with fish sauce and sugar. Cook the noodles separately and divide into bowls.",
      "Poach the shrimp in the simmering broth until opaque and pearly throughout. Add ribs, shrimp, and broth to the bowls. Serve with scallions, lime, and jalapeño."
    ],
    swap:"Use cooked lobster meat in place of shrimp and warm it in the broth just before serving.",
    store:"Chill broth and ribs separately from noodles and shrimp. Bring the broth back to a boil before assembling with freshly cooked noodles."
  },
  {
    id:"big-rib-bun-bo-hue", restaurant:"gao", name:"Big Rib Bún Bò Huế", cuisine:"Vietnamese", animal:"Beef", time:185, active:30, servings:4,
    desc:"Thick rice noodles in a chile-red, lemongrass-scented beef broth.",
    inspiration:"Gao Viet lists a signature Bún Bò Huế with a braised beef rib. This version builds the broth around that rib and the characteristic lemongrass and shrimp paste.",
    items:[[950,"g","Bone-in beef short ribs"],[2,"L","Unsalted beef stock"],[3,"stalks","Lemongrass, divided"],[1,"","Yellow onion, halved"],[2,"tbsp","Fish sauce"],[2,"tsp","Vietnamese fermented shrimp paste (mắm ruốc)"],[1,"tsp","Sugar"],[2,"tbsp","Annatto oil"],[2,"","Shallots, minced"],[3,"cloves","Garlic, minced"],[2,"tsp","Dried chile flakes, to taste"],[300,"g","Dry thick round rice vermicelli"],[150,"g","Finely shredded cabbage"],[20,"g","Cilantro or Vietnamese coriander"],[1,"","Lime"]],
    steps:[
      "Boil the ribs in plain water for 8 minutes, drain, and rinse. Bruise two-thirds of the lemongrass and simmer it with the ribs, stock, and onion for 2–2½ hours, until the ribs are fork-tender. Top up with water if needed.",
      "Finely mince the tender inner part of the remaining lemongrass. Sauté it with shallot and garlic in annatto oil, then stir in chile flakes and take the pan off the heat.",
      "Remove the onion and stalks from the broth. Dissolve the shrimp paste in a ladle of hot broth and strain it back into the pot. Add fish sauce, sugar, and the aromatic oil. Simmer 5 minutes and taste.",
      "Cook noodles separately. Divide with cabbage among bowls, add ribs, and pour over the broth. Finish with herbs and lime."
    ],
    swap:"If you can’t find annatto oil, sauté in neutral oil and add a pinch of mild paprika for color. Fermented shrimp paste is a defining flavor, so start with less if the brand is very strong.",
    store:"Chill and freeze broth and ribs together if making ahead. Cook noodles and prepare fresh toppings on the day you serve it."
  },
  {
    id:"pork-shrimp-siu-mai", restaurant:"yank", dimSum:true, name:"Pork & Shrimp Siu Mai", cuisine:"Cantonese", animal:"Pork & seafood", time:45, active:30, servings:4, pieces:20,
    desc:"Open-top dumplings with bouncy pork and shrimp filling.",
    inspiration:"Pork and shrimp siu mai appear on Yank Sing’s menu and in the San Francisco Standard’s 2026 dim sum recommendations.",
    items:[[240,"g","Ground pork"],[150,"g","Raw shrimp, peeled, deveined, and chopped"],[40,"g","Fresh shiitake mushrooms, minced"],[20,"","Round thin wonton wrappers"],[1,"tbsp","Light soy sauce"],[1,"tbsp","Cornstarch"],[2,"tsp","Shaoxing wine"],[1,"tsp","Toasted sesame oil"],[1,"tsp","Sugar"],[0.25,"tsp","Ground white pepper"],[2,"tbsp","Finely minced carrot"]],
    steps:[
      "Mix the pork, shrimp, mushrooms, soy sauce, starch, wine, sesame oil, sugar, and pepper until the filling becomes sticky. Keep it cold until wrapping.",
      "Spoon about a tablespoon into each wrapper. Cup the wrapper around the filling with your thumb and forefinger. Flatten the base, leave the top open, and add a pinch of carrot.",
      "Arrange with space between dumplings in a parchment-lined steamer. Steam over boiling water for 8–10 minutes, until the center reaches 160°F / 71°C. Steam in batches if needed."
    ],
    swap:"Trim the corners of square wonton wrappers if round ones are unavailable. Ground chicken works at a safe minimum of 165°F / 74°C.",
    store:"Freeze formed dumplings in a single layer, then bag them. Steam from frozen with a few extra minutes and check the filling temperature."
  },
  {
    id:"black-bean-spareribs", restaurant:"yank", dimSum:true, name:"Black Bean Steamed Spareribs", cuisine:"Cantonese", animal:"Pork", time:55, active:15, servings:4,
    desc:"Bite-size pork ribs steamed with garlic, ginger, and fermented black beans.",
    inspiration:"Yank Sing lists steamed spareribs. The Standard’s 2026 dim sum panel calls out its black bean version.",
    items:[[500,"g","Pork spareribs, butcher-cut into bite-size pieces"],[1,"tbsp","Fermented black beans (douchi)"],[2,"cloves","Garlic, minced"],[1,"tsp","Ginger, minced"],[1,"tbsp","Shaoxing wine"],[1,"tbsp","Oyster sauce"],[1,"tsp","Sugar"],[2,"tsp","Cornstarch"],[1,"tsp","Toasted sesame oil"],[1,"","Scallion"]],
    steps:[
      "Rinse the black beans and chop coarsely. Pat the ribs dry, then stir them with the beans, garlic, ginger, wine, oyster sauce, sugar, cornstarch, and sesame oil. Refrigerate for 20 minutes.",
      "Spread the ribs in a shallow heatproof plate in a single layer. Set it over rapidly boiling water in a covered steamer. Steam for 15–20 minutes, until cooked through and tender. Check the largest piece away from the bone for at least 145°F / 63°C.",
      "Rest for 3 minutes. Spoon the steaming juices over the ribs and scatter sliced scallion on top."
    ],
    swap:"Use thick boneless country-style rib pieces if short-crosscut ribs are unavailable. Use chopped fermented black soybeans rather than canned black beans.",
    store:"Refrigerate with the steaming juices. Reheat covered so the meat stays moist."
  },
  {
    id:"pork-soup-dumplings", restaurant:"dragon", dimSum:true, name:"Pork Soup Dumplings (Xiao Long Bao)", cuisine:"Shanghainese", animal:"Pork", time:220, active:60, servings:4, pieces:24,
    desc:"Hand-pleated dumplings with hot broth inside.",
    inspiration:"Dragon Beaux’s soup dumpling sampler was singled out by the Standard’s 2026 panel. This recipe focuses on one pork filling so you can learn the fold.",
    items:[[180,"mL","Low-sodium chicken stock"],[6,"g","Unflavored powdered gelatin"],[200,"g","All-purpose flour"],[105,"mL","Warm water"],[240,"g","Ground pork"],[1,"tbsp","Light soy sauce"],[2,"tsp","Shaoxing wine"],[1,"tsp","Toasted sesame oil"],[2,"tsp","Ginger, grated"],[0.5,"tsp","Sugar"],[2,"tbsp","Chinkiang black vinegar, for serving"]],
    steps:[
      "Bloom gelatin in one-quarter of the cold stock for 5 minutes. Heat the rest, dissolve the gelatin in it, and pour into a shallow dish. Refrigerate until firm, about 2 hours, then finely cube it.",
      "Mix flour and warm water, knead 6–8 minutes until smooth, and rest covered for 30 minutes. Mix pork with soy, wine, sesame oil, ginger, and sugar until sticky. Fold in the chilled jelly and keep the filling cold.",
      "Divide the dough into balls of about 13 g each. Roll each into a thin 3-inch round with slightly thicker centers. Place about 17 g of filling in each and pleat tightly shut, pushing excess air out. Keep unrolled dough covered.",
      "Steam in batches on perforated parchment for 8–10 minutes, until a test dumpling reaches 160°F / 71°C. Let each dumpling cool briefly on a spoon before opening the wrapper. Serve with vinegar."
    ],
    swap:"Use a well-gelled homemade stock in place of gelatin-set stock. Ground chicken works with a 165°F / 74°C final temperature.",
    store:"Steam soon after wrapping for the best seals. Freeze uncooked dumplings in a single layer and steam straight from frozen, checking a test dumpling for doneness."
  },
  {
    id:"lobster-har-gow", restaurant:"palette", dimSum:true, name:"Lobster Har Gow with Butter", cuisine:"Cantonese", animal:"Seafood", time:55, active:40, servings:4, pieces:16,
    desc:"Translucent lobster and shrimp dumplings with warm butter.",
    inspiration:"Palette Tea House lists lobster dumplings with butter sauce. This har gow dough uses wheat starch for the characteristic translucent wrapper.",
    items:[[105,"g","Wheat starch"],[30,"g","Tapioca starch"],[150,"mL","Just-boiled water, added gradually"],[2,"tsp","Neutral oil"],[140,"g","Raw lobster meat, finely chopped"],[120,"g","Raw shrimp, peeled, deveined, and finely chopped"],[35,"g","Canned bamboo shoots, drained and minced"],[1,"tsp","Ginger, grated"],[1,"tsp","Cornstarch"],[0.5,"tsp","Sugar"],[0.5,"tsp","Fine salt"],[2,"tbsp","Unsalted butter"]],
    steps:[
      "Mix lobster, shrimp, bamboo shoots, ginger, cornstarch, sugar, and salt until tacky. Chill while making wrappers.",
      "Mix wheat and tapioca starch. Stir in most of the boiling water and add the rest a little at a time until the dough is soft and cohesive. Knead in the oil as soon as it’s cool enough to handle.",
      "Keep the dough covered. Divide into pieces of about 18 g each and flatten each into a thin circle between oiled sheets of parchment. Add a heaped teaspoon of filling and pinch into crescents.",
      "Steam in a lined basket over boiling water for 6–8 minutes, until the filling is firm and opaque throughout. Serve with melted butter."
    ],
    swap:"Use all shrimp to make classic shrimp har gow. Look for wheat starch labeled tang flour at an Asian grocery store.",
    store:"Chill steamed dumplings promptly. Re-steam gently to soften the wrappers before serving."
  },
  {
    id:"grilled-galbi", restaurant:"sanhowon", name:"Grilled Galbi with Scallion Salad", cuisine:"Korean", animal:"Beef", time:70, active:25, servings:4,
    desc:"Thick-cut soy–pear short ribs with charred edges and a sharp scallion salad.",
    inspiration:"San Ho Won’s house double-cut galbi is a charcoal-grilled short rib. This backyard version uses boneless short ribs and a soy–pear marinade.",
    items:[[650,"g","Boneless beef short ribs, ¾–1 inch thick"],[3,"tbsp","Soy sauce"],[100,"g","Asian pear, grated"],[1,"tbsp","Brown sugar"],[3,"cloves","Garlic, grated"],[2,"tsp","Toasted sesame oil, divided"],[6,"","Scallions"],[1,"tbsp","Rice vinegar"],[0.5,"tsp","Gochugaru"],[1,"tsp","Toasted sesame seeds"]],
    steps:[
      "Whisk soy sauce, pear, sugar, garlic, and half the sesame oil. Coat ribs, cover, and refrigerate at least 45 minutes.",
      "Thinly slice scallions lengthwise. Soak in ice water for 5 minutes, drain well, and toss with vinegar, remaining sesame oil, gochugaru, and sesame seeds.",
      "Drain the ribs and discard the used marinade. Grill over medium-high heat, turning until browned on both sides. Move to a cooler zone if the glaze darkens too quickly. Cook to 145°F / 63°C, rest 3 minutes, and slice across the grain.",
      "Serve with the dressed scallions and steamed rice or lettuce leaves."
    ],
    swap:"Cook in a cast-iron grill pan if you’re indoors. A grated firm apple can stand in for Asian pear.",
    store:"Store the beef separately from the dressed scallions. Slice after reheating so the meat stays moist."
  },
  {
    id:"crispy-eggplant-curry", restaurant:"nari", name:"Crispy Eggplant Coconut Curry", cuisine:"Thai-inspired", animal:"Vegetables", time:45, active:25, servings:4,
    desc:"Roasted eggplant over a warmly spiced coconut curry with basil and shallots.",
    inspiration:"Nari’s menu pairs crispy eggplant with bumbai curry, lemon basil, and fried shallots. This pantry version builds a different curry from red paste and toasted spices.",
    items:[[700,"g","Japanese or Chinese eggplant"],[3,"tbsp","Neutral oil, divided"],[2,"tbsp","Cornstarch"],[0.5,"tsp","Fine salt"],[3,"tbsp","Thai red curry paste, to taste"],[1,"tsp","Ground coriander"],[0.5,"tsp","Ground cumin"],[0.25,"tsp","Ground turmeric"],[400,"mL","Unsweetened coconut milk"],[120,"mL","Water"],[1,"tbsp","Fish sauce"],[1,"tsp","Brown sugar"],[1,"tbsp","Lime juice"],[15,"g","Lemon basil or Thai basil"],[25,"g","Crispy fried shallots"]],
    steps:[
      "Heat the oven to 450°F / 230°C. Cut the eggplant into thick batons. Toss with salt, cornstarch, and two-thirds of the oil. Spread on a lined sheet with space between pieces.",
      "Roast for 20–25 minutes, turning halfway, until the edges are crisp and the centers are soft.",
      "Fry curry paste and dry spices in the remaining oil over medium heat for 1 minute. Add coconut milk and water and simmer gently for 10 minutes. Stir in fish sauce, sugar, and lime juice. Adjust to taste.",
      "Spoon curry into shallow bowls and pile the eggplant on top right before serving. Scatter basil and fried shallots over it."
    ],
    swap:"For a plant-based version, choose a curry paste without shrimp or fish and use vegetarian fish sauce. Try green beans or tofu with the same sauce.",
    store:"Keep curry and eggplant separate. Reheat the curry in a saucepan and re-crisp the eggplant in a hot oven."
  },
  {
    id:"shaoxing-crab-noodles", restaurant:"chairman", name:"Shaoxing Crab & Rice Noodles", cuisine:"Cantonese-inspired", animal:"Seafood", time:35, active:25, servings:4,
    desc:"Sweet crab and wide rice noodles in a light ginger, wine, and chicken-fat sauce.",
    inspiration:"The Chairman’s steamed flower crab with aged Shaoxing wine and flat rice noodles is its signature, according to the 2026 Asia’s 50 Best profile. This version uses cooked Dungeness or other local crab.",
    items:[[350,"g","Cooked Dungeness or blue crab meat, checked for shell"],[600,"g","Fresh wide rice noodles"],[300,"mL","Unsalted chicken stock"],[60,"mL","Unsalted Shaoxing wine"],[2,"tbsp","Rendered chicken fat"],[20,"g","Fresh ginger, sliced"],[3,"","Scallions, whites and greens separated"],[1,"tsp","Light soy sauce"],[0.25,"tsp","Ground white pepper"]],
    steps:[
      "Loosen fresh noodles according to the package, then divide among warm shallow bowls. Pat the cooked crab meat dry.",
      "Melt chicken fat in a saucepan and cook ginger and scallion whites until fragrant. Add wine and simmer for 2 minutes, then add stock, soy sauce, and pepper. Simmer 5 minutes.",
      "Fold the crab into the hot sauce and heat through gently. If using cooked leftovers, heat to 165°F / 74°C. Spoon over the noodles and add chopped scallion greens."
    ],
    swap:"About 250 g of dried wide rice noodles can replace fresh noodles. Use dry sherry in place of Shaoxing, or more stock for an alcohol-free version. Neutral oil can stand in for chicken fat.",
    store:"Chill crab and sauce separately from noodles. Reheat the sauce first and add crab at the end."
  },
  {
    id:"napa-seafood-hot-pot", restaurant:"mingles", name:"Napa & Seafood Hot Pot", cuisine:"Korean-inspired", animal:"Seafood", time:45, active:25, servings:4,
    desc:"A clear kelp broth with napa cabbage, shiitake, shrimp, and white fish.",
    inspiration:"Mingles’ signature mingling pot includes napa cabbage, mushrooms, fish, beef tendon, abalone, and shrimp. This streamlined version uses cod and shrimp.",
    items:[[1.5,"L","Water"],[12,"g","Dried kombu"],[20,"g","Dried shiitake mushrooms"],[400,"g","Napa cabbage, cut into large pieces"],[180,"g","Daikon, thinly sliced"],[350,"g","Skinless cod, cut into chunks"],[250,"g","Raw shrimp, peeled and deveined"],[1,"tbsp","Korean soup soy sauce"],[1,"tsp","Toasted sesame oil"],[2,"","Scallions"]],
    steps:[
      "Soak kombu and dried shiitake in the water for 15 minutes. Heat until just below a boil and remove the kombu. Lift out the mushrooms, trim away stems, then slice and return the caps to the broth.",
      "Add daikon and the firm cabbage stems. Simmer for about 8–10 minutes. Add the leaves and season with soup soy sauce.",
      "Add cod and shrimp. Simmer gently until the fish reaches 145°F / 63°C and the shrimp are opaque and pearly throughout, usually 4–6 minutes depending on thickness.",
      "Finish with sesame oil and sliced scallions. Ladle into bowls with rice on the side."
    ],
    swap:"Use firm tofu and extra mushrooms for a vegetarian pot. For a milder broth, start with half the soup soy sauce.",
    store:"Freeze broth with cabbage and mushrooms if you’re making it ahead. Add seafood fresh when you reheat the broth."
  },
  {
    id:"cats-ear-lamb-noodles", restaurant:"lei", name:"Cat’s-Ear Noodles with Cumin Lamb", cuisine:"Chinese American-inspired", animal:"Lamb", time:75, active:45, servings:4,
    desc:"Hand-rolled flour noodles with cumin-scented tomato and lamb ragù.",
    inspiration:"Lei won the 2026 James Beard Award for Best New Restaurant. Chef Patty Lee’s menu has featured hand-rolled cat’s-ear noodles with cumin and tomato-braised lamb.",
    items:[[320,"g","All-purpose flour"],[155,"mL","Warm water"],[0.5,"tsp","Fine salt"],[400,"g","Ground lamb"],[1,"tbsp","Neutral oil"],[100,"g","Yellow onion, diced"],[3,"cloves","Garlic, minced"],[2,"tsp","Ground cumin"],[1,"tsp","Ground coriander"],[0.5,"tsp","Dried chile flakes"],[1,"tbsp","Tomato paste"],[400,"g","Canned crushed tomatoes"],[1,"tbsp","Light soy sauce"],[15,"g","Cilantro"]],
    steps:[
      "Mix flour, water, and salt into a shaggy dough. Knead 6–8 minutes until smooth, then cover and rest for 25 minutes.",
      "While the dough rests, brown lamb in oil, breaking up the meat, and cook it to 160°F / 71°C. Add onion and cook until softened. Stir in garlic, cumin, coriander, chile, and tomato paste. Add tomatoes and soy sauce and simmer 20 minutes.",
      "Roll dough into ropes about ½ inch thick and cut into small pillows. Press and drag each piece with your thumb across a lightly floured board to form a small curl.",
      "Boil in salted water until the noodles float and are tender but chewy, 3–5 minutes. Toss with the ragù and finish with chopped cilantro."
    ],
    swap:"Orecchiette is a good shortcut if you’d like to skip shaping. Ground beef can replace the lamb.",
    store:"Chill the ragù and cooked noodles separately. The sauce freezes well. Reheat with a spoonful of water before tossing with the noodles."
  }
];
