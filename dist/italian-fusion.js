const polentaSource = ["Italia.it","Polenta traditions in Le Marche","https://www.italia.it/en/marche/things-to-do/polenta-in-marche"];
const californiaGuide = ["2026 MICHELIN Guide California","https://guide.michelin.com/us/en/article/michelin-guide-ceremony/guide-michelin-california"];
const stateBirdOctober = "https://static1.squarespace.com/static/6500a081b4e5021dc4f378b1/t/6ae2bbd17b846255e0f3a290/1793244113810/10.28.26%2BSBP%2BKitchen%2BMenu.pdf";
const stateBirdYuba = "https://static1.squarespace.com/static/6500a081b4e5021dc4f378b1/t/68be04a0772335588a7aaedb/1757283488761/9.6.2025%2BSBP%2BKitchen%2BMenu.pdf";

export const italianRecipes = [
  {
    id:"parmesan-polenta-mushroom-ragu",name:"Creamy Parmesan Polenta & Mushroom Ragù",origin:"Northern Italian-inspired",cuisine:"Italian",animal:"Vegetables",time:50,active:25,servings:4,
    desc:"Soft yellow polenta under a spoonable ragù of browned mushrooms, thyme, and red wine.",
    source:polentaSource,
    items:[[175,"g","Medium-grind polenta cornmeal"],[850,"mL","Water"],[1,"tsp","Fine salt"],[500,"g","Mixed cremini and shiitake mushrooms"],[2,"tbsp","Extra-virgin olive oil"],[100,"g","Yellow onion"],[2,"cloves","Garlic"],[1,"tbsp","Tomato paste"],[90,"mL","Dry red wine"],[160,"mL","Unsalted vegetable stock"],[1,"tsp","Fresh thyme leaves"],[25,"g","Unsalted butter"],[55,"g","Grated Parmesan"]],
    steps:[
      "Bring the water and half the salt to a simmer. Whisk in the cornmeal gradually. Reduce heat and cook gently, scraping the bottom regularly, until creamy and no longer gritty, about 30–40 minutes or according to the package. Add hot water a little at a time if it tightens.",
      "Slice the mushrooms and brown them in batches in about half the oil. Transfer to a plate. Dice the onion and soften in the remaining oil, then stir in minced garlic and tomato paste for 1 minute.",
      "Pour in the wine and scrape up the browned bits. Add the mushrooms, stock, thyme, and remaining salt. Simmer until the liquid lightly coats the mushrooms, about 8–12 minutes.",
      "Stir butter and Parmesan into the polenta off the heat. Spoon into warm bowls and top with the mushroom ragù."
    ],
    swap:"Use oyster mushrooms for a meatier texture. An equal volume of extra stock can replace the wine. Use a vegetarian hard cheese if needed.",
    store:"Keep the ragù and polenta in separate containers. Reheat the polenta with a little water while stirring. Firm leftover polenta can be sliced and pan-seared."
  },
  {
    id:"crispy-polenta-sausage-rapini",name:"Crispy Polenta with Sausage & Broccoli Rabe",origin:"Northern Italian-inspired",cuisine:"Italian",animal:"Pork",time:35,active:25,servings:4,
    desc:"Golden polenta rounds with browned fennel sausage, lemon, and garlicky broccoli rabe.",
    source:polentaSource,
    items:[[500,"g","Cooked tube polenta"],[360,"g","Raw Italian pork sausage"],[350,"g","Broccoli rabe"],[2,"tbsp","Extra-virgin olive oil"],[3,"cloves","Garlic"],[.25,"tsp","Red pepper flakes"],[1,"","Lemon"],[25,"g","Grated Parmesan"]],
    steps:[
      "Cut polenta into rounds about ½ inch thick. Pat dry. Slice the tough ends off the broccoli rabe, blanch the greens for 1–2 minutes, then drain very well.",
      "Heat half the oil in a wide skillet. Sear polenta rounds in an uncrowded layer until browned on both sides, about 4 minutes per side. Transfer to a rack.",
      "Remove sausage from its casings and brown it in the skillet, breaking it into large pieces. Check the center of larger pieces reaches 160°F / 71°C. Transfer to a plate.",
      "Use the remaining oil to sauté minced garlic and flakes briefly. Toss in the greens and sausage. Finish with lemon juice and serve over the polenta with Parmesan."
    ],
    swap:"Use broccolini for a milder green. Leftover firm polenta can replace store-bought tube polenta.",
    store:"Chill the sausage and greens separately from the polenta. Re-crisp the polenta in a skillet and reheat the sausage and greens until hot throughout."
  },
  {
    id:"pasta-alla-norma",name:"Pasta alla Norma",origin:"Sicily",cuisine:"Italian",animal:"Vegetables",time:45,active:25,servings:4,
    desc:"Rigatoni with roasted eggplant, tomato, fresh basil, and shaved ricotta salata.",
    source:["Italia.it","Sicilian dishes and pasta alla Norma","https://www.italia.it/en/sicily/things-to-do/typical-sicilian-products-dishes"],
    items:[[600,"g","Globe eggplant"],[3,"tbsp","Extra-virgin olive oil"],[.75,"tsp","Fine salt"],[3,"cloves","Garlic"],[500,"g","Crushed tomatoes"],[320,"g","Dry rigatoni"],[20,"g","Fresh basil"],[65,"g","Ricotta salata"]],
    steps:[
      "Heat the oven to 450°F / 230°C. Cut eggplant into bite-size pieces, toss with most of the oil and some of the salt, and spread on a lined pan. Roast until browned and tender, about 25 minutes.",
      "Soften sliced garlic in the remaining oil without browning. Add crushed tomatoes and remaining salt and simmer until slightly thickened, about 15 minutes.",
      "Cook rigatoni until just al dente. Save a little cooking water, then add the drained pasta to the sauce. Fold in most of the roasted eggplant and splash in pasta water if needed.",
      "Top each bowl with the reserved eggplant, torn basil, and shavings of ricotta salata."
    ],
    swap:"Use another short pasta. A small amount of crumbled feta can stand in for ricotta salata.",
    store:"Refrigerate pasta and sauce separately when feasible. Add basil and cheese after reheating."
  },
  {
    id:"lemon-chicken-piccata",name:"Lemon Chicken Piccata",origin:"Italian American",cuisine:"Italian American",animal:"Chicken",time:30,active:25,servings:4,
    desc:"Thin pan-seared cutlets in a lemon, caper, and parsley pan sauce.",
    source:["Giada De Laurentiis","Chicken piccata","https://www.foodnetwork.com/recipes/giada-de-laurentiis/chicken-piccata-recipe2-1913809"],
    items:[[600,"g","Chicken breast, boneless and skinless"],[35,"g","All-purpose flour"],[.5,"tsp","Fine salt"],[2,"tbsp","Extra-virgin olive oil"],[120,"mL","Unsalted chicken stock"],[2,"tbsp","Lemon juice"],[2,"tbsp","Capers, drained and rinsed"],[30,"g","Unsalted butter"],[14,"g","Flat-leaf parsley"]],
    steps:[
      "Split thick breasts horizontally into cutlets. Pound to an even thickness, season with salt, and lightly dredge in flour. Shake off the excess and discard flour that touched raw chicken.",
      "Heat oil in a wide skillet. Sear in batches, turning once, until the cutlets brown and the center reaches 165°F / 74°C. Move to a plate.",
      "Pour stock, lemon juice, and capers into the skillet. Scrape up the browned bits and reduce until lightly concentrated. Remove from heat and swirl in cold butter a piece at a time.",
      "Return the cutlets to coat, then finish with chopped parsley and spoon the lemon-caper sauce over each serving."
    ],
    swap:"Use turkey cutlets and cook them to the same safe temperature. Sliced green olives can replace capers.",
    store:"Refrigerate chicken with the sauce. Reheat covered with a little water and add fresh parsley after reheating."
  },
  {
    id:"tuscan-ribollita",name:"Tuscan Ribollita with White Beans & Kale",origin:"Tuscany",cuisine:"Italian",animal:"Vegetables",time:65,active:25,servings:4,
    desc:"Cannellini, Tuscan kale, vegetables, and day-old bread in a thick rustic soup.",
    source:["Visit Tuscany","Tuscan soups and ribollita","https://www.visittuscany.com/en/ideas/5-tuscan-soups/"],
    items:[[2,"tbsp","Extra-virgin olive oil"],[110,"g","Yellow onion"],[100,"g","Carrots"],[90,"g","Celery"],[3,"cloves","Garlic"],[1,"tsp","Fresh thyme leaves"],[240,"g","Crushed tomatoes"],[700,"mL","Unsalted vegetable stock"],[500,"g","Cooked cannellini beans, drained"],[230,"g","Tuscan kale"],[125,"g","Day-old country bread"],[.5,"tsp","Fine salt"]],
    steps:[
      "Finely dice onion, carrots, and celery. Soften in most of the oil over medium heat. Stir in minced garlic and thyme, then add tomatoes, stock, and salt.",
      "Mash about a third of the beans with a ladleful of broth and return them to the pot with the whole beans. Strip the kale stems, chop the leaves, and add them. Simmer until the greens and vegetables are tender, about 25 minutes.",
      "Tear the bread into bite-size pieces and stir it into the soup. Rest off heat for 10 minutes, then bring it back to a simmer. Thin with a little hot water if needed.",
      "Ladle into bowls and finish with the remaining olive oil."
    ],
    swap:"Use Great Northern beans and a sturdy dark leafy green if cannellini and Tuscan kale are unavailable.",
    store:"Chill in shallow containers. The bread thickens the soup as it sits. Add a splash of water or stock when reheating."
  },
  {
    id:"tagliatelle-bolognese",name:"Tagliatelle with Slow-Cooked Bolognese",origin:"Bologna",cuisine:"Italian",animal:"Beef & pork",time:165,active:35,servings:4,
    desc:"Wide ribbons coated in a thick, slow-simmered beef and pancetta ragù.",
    source:["Accademia Italiana della Cucina","The Bologna ragù reference","https://www.accademiaitalianadellacucina.it/it/node/62013"],
    items:[[350,"g","Ground beef"],[90,"g","Pancetta"],[80,"g","Yellow onion"],[70,"g","Carrots"],[65,"g","Celery"],[1,"tbsp","Extra-virgin olive oil"],[100,"mL","Dry red wine"],[240,"g","Tomato passata"],[1,"tbsp","Tomato paste"],[260,"mL","Unsalted beef stock"],[100,"mL","Whole milk"],[320,"g","Dry tagliatelle"],[35,"g","Grated Parmesan"]],
    steps:[
      "Finely dice the pancetta, onion, carrot, and celery. Render the pancetta in the oil over medium-low. Add the vegetables and cook until softened, about 8 minutes.",
      "Turn up the heat and brown the ground beef, breaking it into small pieces. Cook to 160°F / 71°C. Stir in tomato paste, then add wine and let it nearly evaporate.",
      "Add passata and most of the stock. Bring to a gentle simmer, leaving the lid ajar, and cook for about two hours. Stir occasionally and use the reserved stock if it becomes dry. Add milk for the final 20 minutes and simmer until the sauce coats a spoon.",
      "Cook tagliatelle. Toss the drained pasta with the ragù and enough pasta water to coat the ribbons. Finish with Parmesan."
    ],
    swap:"Pappardelle and rigatoni both hold the ragù. Replace wine with stock if you prefer.",
    store:"Chill the sauce separately from the pasta. Freeze sauce in serving-size portions, then thaw in the refrigerator before reheating."
  }
].map(recipe => ({...recipe,collection:"italian",imageExt:"jpg"}));

export const fusionRestaurants = {
  benu:{name:"Benu",place:"San Francisco, CA",area:"bay",sources:[
    ["Benu tasting menu information","https://www.benusf.com/menu"],
    ["MICHELIN interview with Corey Lee","https://guide.michelin.com/us/en/article/features/benu-korean-3-michelin-star-restaurant-corey-lee-celebrates-a-decade-of-3-michelin-stars"],californiaGuide]},
  "state-bird":{name:"State Bird Provisions",place:"San Francisco, CA",area:"bay",sources:[["State Bird Provisions","https://www.statebirdsf.com/"],californiaGuide]},
  "mister-jius":{name:"Mister Jiu’s",place:"San Francisco, CA",area:"bay",sources:[
    ["Mister Jiu’s dinner menu","https://www.misterjius.com/menu"],
    ["MICHELIN’s Bay Area Chinese restaurant guide","https://guide.michelin.com/en/best-of/best-chinese-restaurants-in-san-francisco"],californiaGuide]},
  singlethread:{name:"SingleThread",place:"Healdsburg, CA",area:"bay",sources:[
    ["Kyle Connaughton’s published black cod preparation","https://www.four-magazine.com/recipes/kyle-connaughton-black-cod-fukkura-san-with-charred-leeks-spring-vegetables-and-saikyo-miso-broth/"],californiaGuide]},
  maido:{name:"Maido",place:"Lima, Peru",area:"latin-america",sources:[
    ["50 Best interview with Mitsuharu Tsumura","https://www.the50.com/stories/News/maido-chef-mitsuharu-tsumura-secret-best-restaurant-latin-america-making-people-happy.html"]]}
};

export const fusionRecipes = [
  {
    id:"benu-lobster-soup-dumplings",restaurant:"benu",name:"Lobster Soup Dumplings",cuisine:"Chinese–Californian",animal:"Seafood",time:200,active:60,servings:4,pieces:20,dimSum:true,
    desc:"Pleated dumplings with lobster, shrimp, and a spoonful of hot seafood broth inside.",
    inspiration:"MICHELIN’s profile of Corey Lee describes Benu’s lobster coral xiao long bao. Here, an unsalted seafood stock and a little gelatin provide the broth inside a home-rolled wrapper.",
    items:[[145,"mL","Unsalted seafood stock"],[5,"g","Unflavored powdered gelatin"],[195,"g","All-purpose flour"],[100,"mL","Warm water"],[180,"g","Raw lobster meat"],[95,"g","Raw shrimp, peeled and deveined"],[2,"tsp","Light soy sauce"],[1,"tsp","Fresh ginger"],[.5,"tsp","Toasted sesame oil"],[2,"tbsp","Chinkiang black vinegar"]],
    steps:[
      "Sprinkle gelatin over a little of the cold stock and let it bloom for 5 minutes. Heat the remaining stock, dissolve the gelatin in it, then pour into a shallow dish and refrigerate until firm, about 2 hours.",
      "Mix the flour and warm water, then knead until smooth. Rest the dough covered for 30 minutes. Finely chop the lobster, mince the shrimp until sticky, and mix with soy, grated ginger, and sesame oil. Dice the cold jelly and fold it into the cold filling.",
      "Divide the dough into equal pieces for the indicated yield. Roll thin rounds with slightly thicker centers. Add a spoonful of filling and pleat tightly shut. Keep unused dough and filling covered and the filling cold between batches.",
      "Steam in a lined basket with room between dumplings, about 8–10 minutes. Check that the shellfish filling is opaque throughout and reaches 145°F / 63°C. Cool briefly on a spoon and serve with black vinegar."
    ],
    swap:"Use all shrimp when lobster is difficult to find. Use seafood stock with a mild flavor so it does not overpower the filling.",
    store:"Freeze unsteamed dumplings on a tray, then bag them. Steam from frozen and check the center. The soup is hottest right after steaming."
  },
  {
    id:"state-bird-duck-gyoza",restaurant:"state-bird",name:"Black Sesame Duck Gyoza & Tomato Ponzu",cuisine:"Japanese–Californian",animal:"Duck",time:50,active:35,servings:4,pieces:20,
    desc:"Pan-crisped duck dumplings with black sesame and a bright tomato-yuzu dip.",
    inspiration:"State Bird listed black-sesame duck gyoza with tomato-yuzu ponzu on an October 2026 kitchen menu. This adaptation uses store-bought wrappers with a tomato dipping sauce mixed at home.",
    menu:["State Bird’s October 2026 kitchen menu",stateBirdOctober],
    items:[[300,"g","Ground duck"],[90,"g","Napa cabbage"],[25,"g","Scallions"],[1,"tsp","Fresh ginger"],[1,"tbsp","Black sesame seeds"],[1,"tbsp","Light soy sauce"],[20,"","Gyoza wrappers"],[1,"tbsp","Neutral oil"],[80,"mL","Water"],[130,"g","Ripe tomatoes"],[1,"tbsp","Yuzu juice"],[2,"tsp","Rice vinegar"]],
    steps:[
      "Finely mince the cabbage and squeeze out excess moisture. Mix with duck, minced scallions, grated ginger, most of the sesame, and half the soy. Keep cold while wrapping.",
      "Spoon the filling equally onto the wrappers. Moisten the rims, fold in half, and pleat one edge against the other. Press firmly to close.",
      "Sear the bottoms in oil in an uncrowded skillet until golden. Add water carefully, cover, and steam until the centers reach 165°F / 74°C. Uncover and evaporate remaining water to re-crisp.",
      "Grate the tomato on a coarse grater, discarding loose skin. Whisk the pulp with yuzu, rice vinegar, and remaining soy. Serve with the gyoza and remaining sesame."
    ],
    swap:"Use ground chicken if duck is hard to find. A lemon-lime blend can replace bottled yuzu juice.",
    store:"Freeze uncooked dumplings in a single layer or refrigerate cooked leftovers promptly. Keep the tomato dip separate."
  },
  {
    id:"state-bird-yuba-amatriciana",restaurant:"state-bird",name:"Yuba all’Amatriciana with Mushrooms",cuisine:"Japanese–Italian fusion",animal:"Tofu & pork",time:45,active:25,servings:4,
    desc:"Tender tofu-skin ribbons in tomato sauce with browned mushrooms, pancetta, and pecorino.",
    inspiration:"An archived State Bird kitchen menu paired yuba with an amatriciana-style sauce, jowl bacon, and chanterelles. This home version uses pancetta and a mix of mushrooms over cut tofu skin.",
    menu:["State Bird’s September 2025 kitchen menu",stateBirdYuba],
    items:[[200,"g","Dried yuba sheets"],[110,"g","Pancetta"],[300,"g","Mixed mushrooms"],[1,"tbsp","Extra-virgin olive oil"],[2,"cloves","Garlic"],[.5,"tsp","Red pepper flakes"],[500,"g","Crushed tomatoes"],[35,"g","Grated pecorino Romano"],[12,"g","Flat-leaf parsley"]],
    steps:[
      "Soak the sheets according to the package until pliable. Drain them well, then cut into broad ribbons.",
      "Dice the pancetta. Render until golden over medium heat. Transfer it to a plate. Brown the sliced mushrooms in the drippings and measured oil, working in batches.",
      "Add sliced garlic and chile flakes briefly, then add tomatoes. Simmer until thickened, about 12–15 minutes. Add the yuba and cooked pancetta and simmer gently until the ribbons are hot and tender.",
      "Top with pecorino and chopped parsley. Loosen with a spoonful of hot water if the sauce tightens."
    ],
    swap:"Use chanterelles when available. Oyster mushrooms and shiitake make a flavorful mixed substitute.",
    store:"Chill the finished sauce and yuba promptly. Reheat with a little water. Add fresh cheese and parsley just before serving."
  },
  {
    id:"mister-jius-maitake-tofu",restaurant:"mister-jius",name:"Silken Tofu with Maitake & Cranberry Beans",cuisine:"Cantonese–Californian",animal:"Tofu",time:35,active:25,servings:4,
    desc:"Warm silken tofu with crisp maitake, creamy beans, and fragrant Sichuan peppercorn oil.",
    inspiration:"MICHELIN’s 2026 Bay Area guide describes Brandon Jew’s pairing of silken tofu, maitake, cranberry beans, and green Sichuan peppercorn. This version builds a quick scallion oil instead of a separate garlic confit.",
    items:[[600,"g","Silken tofu"],[240,"g","Maitake mushrooms"],[230,"g","Cooked cranberry beans, drained"],[2,"tbsp","Neutral oil"],[3,"cloves","Garlic"],[.5,"tsp","Green Sichuan peppercorns"],[120,"mL","Unsalted vegetable stock"],[1,"tbsp","Light soy sauce"],[2,"","Scallions"]],
    steps:[
      "Drain the tofu and slide it onto a heatproof plate. Steam gently until warm throughout, about 6–8 minutes. Tip away excess water.",
      "Tear maitake into clusters. Heat most of the oil in a skillet and sear the clusters undisturbed on the first side until browned, then turn and cook the other side. Transfer to a plate.",
      "Toast and crush the peppercorns. Briefly sizzle sliced garlic and scallion whites in the remaining oil, then add stock, soy, and the beans. Simmer until hot and lightly saucy.",
      "Spoon tofu into shallow bowls. Add beans and their broth, browned maitake, scallion greens, and the crushed peppercorns."
    ],
    swap:"Use cooked borlotti, pinto, or cannellini beans. Oyster mushrooms can replace maitake.",
    store:"Pack tofu and beans together and keep mushrooms separate for texture. Reheat gently."
  },
  {
    id:"singlethread-miso-black-cod",restaurant:"singlethread",name:"Black Cod with Charred Leeks & Miso Broth",cuisine:"Japanese–Californian",animal:"Seafood",time:40,active:25,servings:4,
    desc:"Gently steamed sablefish with charred leeks, snap peas, and a savory white miso broth.",
    inspiration:"Kyle Connaughton’s published SingleThread dish uses a donabe to pair black cod with charred leeks, seasonal vegetables, and white miso broth. This version uses a lidded skillet.",
    items:[[600,"g","Black cod fillets"],[260,"g","Leeks"],[210,"g","Sugar snap peas"],[420,"mL","Unsalted dashi"],[40,"g","White miso"],[1,"tbsp","Neutral oil"],[.5,"tsp","Fine salt"],[2,"","Scallions"]],
    steps:[
      "Rinse sand from the leeks and split them lengthwise. Pat dry and char the cut sides in the oil in a wide skillet, then chop into short pieces. Trim the snap peas.",
      "Bring the dashi and leeks to a gentle simmer. Season the fish with the measured salt, then set the pieces on the leeks. Cover and steam gently. Add snap peas for the last few minutes.",
      "Lift the fish out when its thickest part reaches 145°F / 63°C. Whisk the miso with a little hot broth in a bowl, then stir it back into the skillet off heat.",
      "Place each portion over the leeks and peas. Ladle the broth around it and finish with sliced scallions."
    ],
    swap:"Black cod is also sold as sablefish. Conventional cod is leaner and may cook faster. Use kombu dashi for a lighter broth.",
    store:"Chill fish and broth separately. Reheat gently, covered, and check the center with a thermometer."
  },
  {
    id:"maido-nikkei-short-ribs",restaurant:"maido",name:"Nikkei Short Ribs with Scallion Fried Rice",cuisine:"Japanese–Peruvian",animal:"Beef",time:205,active:35,servings:4,
    desc:"Soy-sake braised beef, scallion fried rice, and a bright ají amarillo-lime finish.",
    inspiration:"Chef Mitsuharu Tsumura’s Maido serves Nikkei cooking that blends Japanese and Peruvian traditions. An interview with 50 Best identifies his long-braised short rib as a signature. This Dutch-oven version is an interpretation for home cooks.",
    items:[[850,"g","Boneless beef short ribs"],[2,"tbsp","Neutral oil"],[130,"g","Yellow onion"],[3,"cloves","Garlic"],[1,"tbsp","Fresh ginger"],[110,"mL","Sake"],[3,"tbsp","Mirin"],[3,"tbsp","Soy sauce"],[450,"mL","Unsalted beef stock"],[420,"g","Chilled cooked rice"],[90,"g","Scallions"],[1,"tbsp","Ají amarillo paste"],[1,"","Lime"]],
    steps:[
      "Heat the oven to 325°F / 165°C. Pat the beef dry and sear in most of the oil in a Dutch oven, then transfer to a plate. Soften diced onion and stir in minced garlic and ginger.",
      "Add sake and scrape the bottom. Add mirin, soy, and beef stock, then return the beef. Cover and braise until fork-tender, about 2½–3 hours. Skim fat and reduce the liquid on the stovetop until it coats the back of a spoon.",
      "Stir-fry chilled rice and sliced scallions in the remaining oil until the rice reaches 165°F / 74°C. Whisk lime juice and ají amarillo with a spoonful of the braising liquid.",
      "Serve the glazed rib over the scallion rice and finish with the ají-lime sauce."
    ],
    swap:"Use trimmed beef chuck cut into thick pieces. Add ají amarillo gradually if your paste is especially hot.",
    store:"Cool beef and rice promptly in separate shallow containers. Reheat the beef in its braising sauce."
  }
].map(recipe => ({...recipe,collection:"fusion",imageExt:"jpg"}));
