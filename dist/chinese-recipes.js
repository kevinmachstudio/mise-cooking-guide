const wok = (title,path) => [title + " · The Woks of Life","https://thewoksoflife.com/" + path + "/"];

export const chineseRegions = {
  north:"Northern China", east:"Eastern China", west:"Western China", south:"Southern China", "hong-kong":"Hong Kong"
};

export const koiPalace = {
  name:"Koi Palace",place:"Daly City, CA",area:"bay",sources:[
    ["Koi Palace’s Daly City menus","https://koipalace.com/menu"],
    ["Koi Palace’s classic dim sum","https://koipalace.com/dim-sum"]
  ]
};

export const koiRecipes = [
  {
    id:"koi-char-siu-bao",restaurant:"koi-palace",dimSum:true,name:"Steamed Char Siu Bao",cuisine:"Cantonese",animal:"Pork",time:135,active:45,servings:4,pieces:12,
    desc:"Soft steamed buns filled with sticky chopped barbecue pork.",
    inspiration:"Koi Palace’s Daly City menu includes steamed BBQ pork buns. Store-bought char siu lets you focus on the dough and the fold.",
    menu:["Daly City menu with steamed BBQ pork buns","https://static1.squarespace.com/static/56d0ef9504426223fa0faa3a/t/64028480b82fe446f8b8e2af/1677886606327/KPD%2BDinner%2BMenu%2B03_23.pdf"],
    items:[[300,"g","All-purpose flour"],[165,"mL","Lukewarm water"],[4,"g","Instant yeast"],[1,"tsp","Baking powder"],[2,"tbsp","Sugar, divided"],[1,"tbsp","Neutral oil"],[230,"g","Cooked char siu pork, chopped"],[1,"tbsp","Oyster sauce"],[2,"tsp","Soy sauce"],[60,"mL","Cold water"],[1,"tbsp","Cornstarch"]],
    steps:[
      "Mix flour, yeast, baking powder, half the sugar, lukewarm water, and oil. Knead until smooth, about 8 minutes. Cover and let rise until puffy, about 60 minutes.",
      "Simmer chopped char siu with oyster sauce, soy sauce, and remaining sugar. Mix the cold water and starch, add to the pork, and simmer until thick. Transfer to a shallow container and chill the filling while the dough rises.",
      "Divide the dough into pieces of about 40 g. Roll each into a round with a thicker center. Fill with a heaped tablespoon of pork, pleat shut, and set each bun on a square of parchment. Cover and proof until slightly puffy, about 15 minutes.",
      "Steam over gently boiling water for 12–14 minutes, leaving room between buns. Let sit with the lid closed for 2 minutes. If using leftover pork for the filling, check it reaches 165°F / 74°C."
    ],
    swap:"Use cooked chicken tossed with a little char siu sauce for another filling. If the dough feels dry, knead in water a teaspoon at a time.",
    store:"Refrigerate cooked buns promptly or freeze after they cool. Re-steam and heat the filling to 165°F / 74°C."
  },
  {
    id:"koi-daikon-cake",restaurant:"koi-palace",dimSum:true,name:"Pan-Fried Daikon Cake with XO Sauce",cuisine:"Cantonese",animal:"Pork & seafood",time:170,active:35,servings:4,pieces:12,
    desc:"Savory turnip cake flecked with lap cheong and dried shrimp, seared crisp.",
    inspiration:"Koi Palace lists pan-fried daikon cake with XO sauce. This version steams a loaf first and fries it in slices.",
    menu:["Koi Palace listing for Pan-Fried Daikon Cake","https://www.doordash.com/store/32517?pickup=true"],
    items:[[800,"g","Daikon, peeled and coarsely grated"],[180,"g","White rice flour"],[20,"g","Cornstarch"],[250,"mL","Water and reserved daikon juices combined"],[70,"g","Lap cheong (Chinese sausage), diced"],[18,"g","Dried shrimp"],[2,"","Scallions"],[0.5,"tsp","Fine salt"],[0.25,"tsp","Ground white pepper"],[2,"tbsp","Neutral oil, divided"],[2,"tbsp","XO sauce"]],
    steps:[
      "Soak dried shrimp in warm water for 15 minutes, drain, and chop. Simmer the grated daikon with a splash of water until softened. Drain over a bowl and save the liquid.",
      "Fry sausage and dried shrimp in half the oil until fragrant. Whisk rice flour, cornstarch, salt, and pepper with the measured liquid. Stir into the warm daikon with the sausage, shrimp, and sliced scallions. Cook over low heat, stirring, until paste-like.",
      "Spread into an oiled loaf pan and steam, covered, for 55–65 minutes until set. Test the center with a skewer. Cool briefly, then refrigerate until firm enough to slice, at least 1 hour.",
      "Slice about ½ inch thick. Pan-fry in remaining oil until browned on both sides and the centers reach 165°F / 74°C. Serve with XO sauce."
    ],
    swap:"Use cooked mushrooms instead of sausage and dried shrimp for a different filling. Choose a mushroom-based XO-style sauce if avoiding seafood.",
    store:"Chill the steamed loaf and slice what you need. Pan-fry slices to order. Freeze leftovers between sheets of parchment."
  }
];

export const regionalRecipes = [
  {
    id:"di-san-xian",region:"north",origin:"Dongbei",name:"Di San Xian",cuisine:"Northeastern Chinese",animal:"Vegetables",time:35,active:25,servings:3,
    desc:"Eggplant, potato, and green pepper in a glossy garlic-soy sauce.",
    inspiration:"In this Dongbei dish, the three vegetables cook separately first so each keeps its texture.",
    reference:wok("Di San Xian","di-san-xian-stir-fry"),
    items:[[300,"g","Japanese eggplant"],[260,"g","Yukon Gold potatoes"],[160,"g","Green bell pepper"],[3,"tbsp","Neutral oil"],[3,"cloves","Garlic"],[2,"tsp","Cornstarch"],[60,"mL","Water"],[1.5,"tbsp","Light soy sauce"],[1,"tsp","Dark soy sauce"],[1,"tsp","Sugar"]],
    steps:[
      "Cut potato, eggplant, and pepper into similar bite-size pieces. Whisk water, both soy sauces, sugar, and half the starch. Toss eggplant with the rest of the starch.",
      "Heat most of the oil in a wide skillet. Fry potatoes, turning until golden and tender, 8–12 minutes. Remove. Fry eggplant in the same skillet until browned and soft, adding a little oil if needed. Remove.",
      "Add remaining oil, pepper, and minced garlic. Stir-fry for 1–2 minutes. Return potatoes and eggplant. Stir the sauce again, pour it around the skillet, and toss until glossy."
    ],
    swap:"Use Chinese eggplant or thin-skinned globe eggplant. Red bell pepper works if you prefer a sweeter bite.",
    store:"Chill and reheat in a skillet with a spoonful of water. A hot pan restores some of the texture."
  },
  {
    id:"beijing-fried-sauce-noodles",region:"north",origin:"Beijing",name:"Beijing Zhajiangmian",cuisine:"Northern Chinese",animal:"Pork",time:40,active:30,servings:4,
    desc:"Chewy wheat noodles with savory pork and fermented bean sauce, plus crisp cucumber.",
    inspiration:"Beijing-style zhajiangmian pairs a concentrated fried bean sauce with noodles and fresh vegetable strips.",
    reference:["Zha Jiang Mian · Red House Spice","https://redhousespice.com/zha-jiang-mian/"],
    items:[[400,"g","Fresh wheat noodles"],[300,"g","Ground pork"],[45,"g","Fermented yellow soybean paste (huangdoujiang)"],[25,"g","Sweet flour sauce (tianmianjiang)"],[2,"","Scallions"],[2,"tsp","Ginger"],[1,"tbsp","Shaoxing wine"],[1,"tbsp","Neutral oil"],[100,"mL","Water"],[160,"g","Cucumber"],[100,"g","Carrots"]],
    steps:[
      "Whisk the two pastes with the water. Cut cucumber and carrots into thin matchsticks. Mince ginger and separate sliced scallion whites and greens.",
      "Heat oil in a skillet and brown pork, breaking it into small crumbles. Stir in scallion whites, ginger, and Shaoxing wine. Check the pork reaches 160°F / 71°C.",
      "Stir in the bean sauce. Simmer gently for about 12 minutes, stirring often, until it coats the spoon. Boil noodles according to the package and drain.",
      "Top noodles with a spoonful of sauce, cucumber, carrot, and the scallion greens. Add more sauce to taste."
    ],
    swap:"Use ground turkey and cook it to 165°F / 74°C. Beijing-style dried yellow soybean paste can replace jarred paste after thinning it with water to a similar consistency.",
    store:"Keep sauce, noodles, and raw vegetables separate. Reheat sauce with a little water before tossing."
  },
  {
    id:"shanghai-scallion-oil-noodles",region:"east",origin:"Shanghai",name:"Shanghai Scallion Oil Noodles",cuisine:"Shanghainese",animal:"Vegetables",time:25,active:20,servings:2,
    desc:"Glossy soy-seasoned wheat noodles with crisp caramelized scallions.",
    inspiration:"Cong you ban mian is a Shanghai noodle dish built around oil flavored with slowly fried scallions.",
    reference:wok("Shanghai Scallion Oil Noodles","soy-scallion-noodles-cong-ban-mian"),
    items:[[270,"g","Fresh wheat noodles"],[120,"g","Scallions"],[3,"tbsp","Neutral oil"],[1.5,"tbsp","Light soy sauce"],[2,"tsp","Dark soy sauce"],[1.5,"tsp","Sugar"]],
    steps:[
      "Dry the scallions well and cut them into 2-inch lengths, keeping whites and greens separate.",
      "Warm oil over medium-low. Add the white pieces, then the greens after 2 minutes. Fry gently until deep golden and crisp, 8–12 minutes. Lift scallions out before they burn.",
      "Cook and drain noodles. Take the pan off the heat, wait for the sizzling to subside, then carefully stir in soy sauces and sugar. Toss through the noodles and top with the crisp scallions."
    ],
    swap:"Use dried wheat noodles if needed. A little extra light soy sauce can replace dark soy for a lighter-colored bowl.",
    store:"Eat freshly tossed for the crispest scallions. Refrigerate any leftovers promptly and reheat the noodles in a skillet."
  },
  {
    id:"yangzhou-fried-rice",region:"east",origin:"Yangzhou, Jiangsu",name:"Yangzhou Fried Rice",cuisine:"Jiangsu Chinese",animal:"Pork & seafood",time:25,active:20,servings:3,
    desc:"Light-colored fried rice dotted with shrimp, egg, char siu, and vegetables.",
    inspiration:"Yangzhou is the namesake of this fried-rice tradition. This version keeps soy sauce out of the wok so the individual grains and diced toppings stand out.",
    reference:wok("Young Chow Fried Rice","young-chow-fried-rice"),
    items:[[550,"g","Chilled cooked rice"],[120,"g","Raw shrimp, peeled and deveined"],[110,"g","Cooked char siu pork, diced"],[2,"egg","Eggs"],[60,"g","Carrots, diced"],[60,"g","Frozen peas"],[2,"","Scallions"],[2,"tbsp","Neutral oil"],[0.5,"tsp","Fine salt"],[0.25,"tsp","Ground white pepper"]],
    steps:[
      "Break up clumps in the chilled rice. Beat the eggs, dice shrimp, and slice the scallions.",
      "Heat a little oil in a wide skillet. Scramble eggs until set and transfer to a plate. Fry shrimp until opaque, then remove them.",
      "Fry carrot, peas, and char siu with remaining oil. Add rice, salt, and pepper. Toss over high heat until the rice reaches 165°F / 74°C. Return shrimp and egg and finish with scallions."
    ],
    swap:"Use diced cooked ham instead of char siu, or use extra egg and vegetables in place of the shrimp and pork.",
    store:"Start with cooked rice that was chilled promptly. Refrigerate leftover fried rice in a shallow container and reheat until steaming throughout."
  },
  {
    id:"sichuan-mapo-tofu",region:"west",origin:"Sichuan",name:"Sichuan Mapo Tofu",cuisine:"Sichuanese",animal:"Tofu & pork",time:30,active:25,servings:3,
    desc:"Tender tofu in a spicy fermented bean sauce with pork and Sichuan peppercorn.",
    inspiration:"Mapo tofu is a Sichuan classic. Pixian doubanjiang provides the core savory heat while ground Sichuan peppercorn gives the finishing tingle.",
    reference:wok("Mapo Tofu","ma-po-tofu-real-deal"),
    items:[[450,"g","Soft tofu"],[150,"g","Ground pork"],[1.5,"tbsp","Doubanjiang"],[2,"tsp","Fermented black beans (douchi)"],[1,"tsp","Sichuan peppercorns"],[2,"cloves","Garlic"],[2,"tsp","Ginger"],[210,"mL","Unsalted stock"],[2,"tsp","Cornstarch"],[1,"tbsp","Neutral oil"],[2,"","Scallions"]],
    steps:[
      "Toast the peppercorns briefly, then grind. Cut tofu into 1-inch cubes. Warm the cubes for 2–3 minutes in gently simmering water, then drain.",
      "Heat oil in a skillet and brown pork, breaking it into crumbles. Cook it to 160°F / 71°C. Lower the heat and fry chopped doubanjiang, black beans, garlic, and ginger until fragrant.",
      "Pour in most of the stock and bring to a simmer. Add tofu and cook gently for 4–5 minutes. Stir the cornstarch into the remaining cold stock, then add it in stages until the sauce coats the tofu. Finish with peppercorn and sliced scallions."
    ],
    swap:"Use chopped mushrooms and vegetable stock for a meatless version. Medium tofu holds together better if soft tofu is hard to handle.",
    store:"Chill tofu and sauce together. Reheat over low heat with a splash of water and avoid stirring too vigorously."
  },
  {
    id:"xinjiang-cumin-lamb",region:"west",origin:"Xinjiang",name:"Xinjiang Cumin Lamb",cuisine:"Xinjiang-inspired",animal:"Lamb",time:35,active:25,servings:3,
    desc:"Thin lamb slices seared with toasted cumin, chile, onion, and cilantro.",
    inspiration:"Cumin and chile are characteristic of this Xinjiang-style combination. The home version uses thinly sliced boneless lamb leg and a hot skillet.",
    reference:wok("Xinjiang Cumin Lamb","cumin-lamb"),
    items:[[430,"g","Boneless lamb leg, thinly sliced"],[1.5,"tbsp","Cumin seeds"],[1,"tsp","Dried chile flakes"],[1,"tbsp","Light soy sauce"],[2,"tsp","Shaoxing wine"],[2,"tsp","Cornstarch"],[140,"g","Yellow onion"],[2,"cloves","Garlic"],[2,"tbsp","Neutral oil"],[18,"g","Cilantro"]],
    steps:[
      "Toast cumin until aromatic and coarsely crush it. Toss the sliced lamb with soy, wine, and cornstarch. Refrigerate 10 minutes while you slice the onion and mince the garlic.",
      "Sear lamb in batches over high heat with most of the oil. Check thick pieces reach 145°F / 63°C and rest the lamb for 3 minutes.",
      "Fry onion and garlic in the remaining oil until just softened. Add cumin and chile. Return the rested lamb, toss briefly, and finish with cilantro."
    ],
    swap:"Use boneless lamb shoulder or flank steak. Reduce chile for a cumin-forward, milder plate.",
    store:"Reheat covered so the meat stays tender. Add fresh cilantro after warming."
  },
  {
    id:"cantonese-ginger-scallion-fish",region:"south",origin:"Guangdong",name:"Cantonese Ginger–Scallion Fish",cuisine:"Cantonese",animal:"Seafood",time:20,active:15,servings:2,
    desc:"Delicate steamed white fish with ginger threads, scallions, and hot aromatic oil.",
    inspiration:"Steaming fish and finishing it with ginger, scallions, and seasoned soy is a familiar Cantonese preparation. Fillets make it easy to serve at home.",
    reference:wok("Cantonese Steamed Fish","cantonese-steamed-fish"),
    items:[[360,"g","Skinless cod or sea bass fillets"],[25,"g","Fresh ginger"],[3,"","Scallions"],[1.5,"tbsp","Light soy sauce"],[2,"tbsp","Water"],[0.5,"tsp","Sugar"],[1.5,"tbsp","Neutral oil"]],
    steps:[
      "Set a heatproof plate on a rack in a covered steamer. Cut ginger and scallions into thin slivers. Scatter half the ginger beneath and over the fish.",
      "Steam over simmering water until the thickest part reaches 145°F / 63°C, about 7–11 minutes depending on thickness. Tip off excess liquid.",
      "Warm soy sauce, water, and sugar in a small pan and pour around the fish. Scatter the remaining ginger and scallions over it. Heat the oil until shimmering and spoon it carefully over the aromatics."
    ],
    swap:"Use tilapia, black sea bass, or another firm, mild white fish. Set a heatproof rack in a deep lidded pan if you don’t have a steamer.",
    store:"Keep the fish and sauce together in a shallow container. Reheat gently, covered."
  },
  {
    id:"cantonese-chicken-claypot",region:"south",origin:"Guangdong",name:"Chicken & Lap Cheong Claypot Rice",cuisine:"Cantonese",animal:"Chicken & pork",time:65,active:25,servings:4,
    desc:"Chicken, Chinese sausage, and shiitake over rice with a browned bottom crust.",
    inspiration:"Cantonese claypot rice cooks toppings over the grain so the aromatics season the rice. A small heavy pot is a practical stand-in for a claypot.",
    reference:wok("Chicken and Mushroom Clay Pot Rice","chicken-mushroom-clay-pot-rice"),
    items:[[310,"g","Jasmine rice"],[370,"mL","Water"],[360,"g","Chicken thighs, boneless and skinless"],[90,"g","Lap cheong (Chinese sausage)"],[20,"g","Dried shiitake mushrooms"],[1.5,"tbsp","Light soy sauce"],[1,"tbsp","Oyster sauce"],[1,"tbsp","Shaoxing wine"],[1,"tsp","Toasted sesame oil"],[1,"tsp","Fresh ginger"],[1,"tbsp","Neutral oil"],[2,"","Scallions"]],
    steps:[
      "Soak shiitake in hot water for about 20 minutes. Remove stems and slice caps. Slice sausage and cut chicken into small even pieces. Toss with soy, oyster sauce, wine, sesame oil, and grated ginger.",
      "Rinse and drain rice. Coat a small heavy pot with neutral oil, add rice and measured water, and bring to a simmer. When the water drops near the rice surface, arrange chicken, sausage, and mushrooms in a loose layer on top.",
      "Cover, reduce to low, and cook about 20–25 minutes. Check chicken reaches 165°F / 74°C and sausage is cooked as directed. If necessary add a tablespoon of water and cook longer.",
      "When the rice is tender, raise heat to medium for 2–3 minutes to brown the base. Rest covered for 5 minutes and finish with sliced scallions."
    ],
    swap:"Use a heavy saucepan with a tight lid. If skipping sausage, add more shiitake and adjust salt to taste.",
    store:"Cool rice and toppings promptly in shallow containers. Reheat with a splash of water until the center is hot."
  },
  {
    id:"hong-kong-baked-pork-chop-rice",region:"hong-kong",origin:"Hong Kong",name:"Hong Kong Baked Pork Chop Rice",cuisine:"Hong Kong café-style",animal:"Pork",time:55,active:30,servings:4,
    desc:"Tomato-sauced pork chops over egg fried rice with a bubbling cheese top.",
    inspiration:"A cha chaan teng comfort dish that layers a pork chop and tomato gravy over fried rice, then bakes them together.",
    reference:wok("Hong Kong Baked Pork Chop Rice","baked-pork-chop-rice"),
    items:[[520,"g","Boneless pork chops"],[570,"g","Chilled cooked rice"],[2,"egg","Eggs"],[400,"g","Canned crushed tomatoes"],[100,"g","Yellow onion"],[90,"g","Shredded mozzarella"],[2,"tbsp","Tomato paste"],[2,"tbsp","Cornstarch"],[2,"tbsp","Neutral oil"],[2,"tsp","Light soy sauce"],[1,"tsp","Sugar"],[0.25,"tsp","Ground black pepper"]],
    steps:[
      "Heat oven to 425°F / 220°C. Pound chops to about ½ inch thick. Season with soy and pepper, then dust with cornstarch. Sear in half the oil, turning once, until browned and 145°F / 63°C. Rest at least 3 minutes.",
      "Scramble eggs in remaining oil, then stir-fry with the chilled rice until it reaches 165°F / 74°C. Spread the rice in a baking dish.",
      "Soften sliced onion in the pan, then fry tomato paste briefly. Add crushed tomatoes and sugar. Simmer until thick enough to spoon, about 8 minutes.",
      "Lay rested chops on the rice, spoon over tomato sauce, and scatter mozzarella. Bake 8–12 minutes, until the cheese bubbles."
    ],
    swap:"Use thin chicken cutlets cooked to 165°F / 74°C. A mild cheddar gives a sharper topping.",
    store:"Refrigerate portions in shallow containers. Reheat covered and uncover at the end to restore the cheese crust."
  },
  {
    id:"hong-kong-egg-tarts",region:"hong-kong",origin:"Hong Kong",dimSum:true,name:"Hong Kong Egg Tarts",cuisine:"Hong Kong bakery-style",animal:"Eggs & dairy",time:85,active:30,servings:4,pieces:8,
    desc:"Smooth, sunny custard in buttery, lightly sweet shortcrust shells.",
    inspiration:"Hong Kong bakeries serve egg tarts with both flaky and shortcrust shells. This version uses a press-in shortcrust.",
    reference:wok("Hong Kong Egg Tarts","hong-kong-egg-tarts"),
    items:[[165,"g","All-purpose flour"],[100,"g","Unsalted butter, softened"],[35,"g","Powdered sugar"],[3,"egg","Eggs, divided"],[65,"g","Sugar"],[125,"mL","Hot water"],[80,"mL","Evaporated milk"],[0.5,"tsp","Vanilla extract"]],
    steps:[
      "Cream butter and powdered sugar, beat in a third of the eggs, and mix in flour just until a dough forms. Chill 20 minutes. Divide into roughly 40 g pieces and press into tart tins. Keep the shells chilled while making the filling.",
      "Dissolve granulated sugar in the hot water and let cool. Whisk in remaining eggs, evaporated milk, and vanilla without whipping in much air. Strain through a fine sieve.",
      "Heat the oven to 375°F / 190°C. Pour custard into shells just below the rim. Bake 10 minutes, then lower to 325°F / 165°C. Bake until set at the edges with a slight center wobble and at least 160°F / 71°C in the custard, about 12–18 minutes more.",
      "Cool in the tins for a few minutes before lifting out. Serve warm or at room temperature."
    ],
    swap:"Use ready-made unsweetened tart shells to save prep. Whole milk can replace evaporated milk for a lighter custard.",
    store:"Refrigerate the custard tarts within 2 hours and serve chilled or rewarm gently in the oven."
  }
];
