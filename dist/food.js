import { extraStaples, additionalPantries } from "./pantry-extra.js";

export const pantry = [
  {id:"japanese", name:"Japanese", region:"East Asia", emblem:"🇯🇵", color:"rose", summary:"Layer savory, sweet, and tangy seasonings over rice, noodles, and broth.", staples:[
    ["Japanese soy sauce","Salty, rounded seasoning for rice bowls and dipping sauces.","Tamari"],
    ["White miso","Mild fermented soybean paste for soup, marinades, and glazes.","Yellow miso, starting with less"],
    ["Mirin","Sweet rice seasoning that adds shine to glazes.","1 tbsp sake + 1 tsp sugar per tbsp"],
    ["Rice vinegar","Light acidity for dressings and sushi rice.","A mild apple cider vinegar"],
    ["Dashi","Bonito and kelp broth for soups and simmered dishes.","Kombu and shiitake stock"],
    ["Short-grain rice","Tender, slightly sticky base for donburi and bento.","Calrose rice"]], sauces:["teriyaki","miso-glaze"]},
  {id:"korean", name:"Korean", region:"East Asia", emblem:"🇰🇷", color:"peach", summary:"Build depth with fermented pastes, toasted sesame, and generous aromatics.", staples:[
    ["Gochujang","Sweet, hot fermented chile paste for glazes and dipping.","Miso plus gochugaru and a little sugar"],
    ["Doenjang","Robust soybean paste for stews and ssamjang.","Red miso, starting with less"],
    ["Gochugaru","Fruity red pepper flakes for seasoning, kimchi, and braises.","Mild red pepper flakes plus paprika"],
    ["Toasted sesame oil","Nutty finish for vegetables, rice, and marinades.","Toasted sesame seeds for flavor"],
    ["Soy sauce","Salty base for braises, bulgogi, and dipping sauces.","Tamari"],
    ["Kimchi","Fermented vegetables for rice, stews, and sides.","Quick-pickled cabbage for a fresh side"]], sauces:["gochujang","sesame-soy"]},
  {id:"chinese", name:"Chinese", region:"East Asia", emblem:"🇨🇳", color:"gold", summary:"Start with a flexible stir-fry pantry and add regional staples as you branch out.", staples:[
    ["Light soy sauce","All-purpose salty seasoning for stir-fries and marinades.","Regular soy sauce"],
    ["Dark soy sauce","Adds deep color and mild caramel sweetness.","Light soy sauce plus a little molasses"],
    ["Shaoxing wine","Adds aroma and depth to stir-fries and braises.","Dry sherry or unsalted stock"],
    ["Oyster sauce","Adds gloss and savory sweetness to vegetables and meat.","Mushroom stir-fry sauce"],
    ["Chinkiang vinegar","Malty black vinegar for dumplings and braises.","Rice vinegar with a little balsamic"],
    ["Cornstarch","Thickens sauces and helps protect thinly sliced meat.","Potato starch"]], sauces:["stir-fry","sesame-soy"]},
  {id:"thai", name:"Thai", region:"Southeast Asia", emblem:"🇹🇭", color:"sage", summary:"Balance salt, acid, heat, and sweetness with fresh herbs at the finish.", staples:[
    ["Fish sauce","Salty, savory base for dressings, curries, and stir-fries.","Vegetarian fish sauce"],
    ["Tamarind paste","Fruity sourness for pad thai and soups.","Lime for a brighter sour note"],
    ["Coconut milk","Adds body and richness to curries.","Coconut cream thinned with water"],
    ["Thai chiles","Sharp heat for pastes and sauces.","Serrano or a smaller amount of cayenne"],
    ["Palm sugar","Caramel sweetness for curries and dressings.","Light brown sugar"],
    ["Holy basil","Peppery, clove-like leaves for pad kra pao.","Thai basil for a more anise-forward dish"]], sauces:["lime-fish","peanut"]},
  {id:"vietnamese", name:"Vietnamese", region:"Southeast Asia", emblem:"🇻🇳", color:"gold", summary:"Pair a fish-sauce base with fresh herbs, tart citrus, and crisp vegetables.", staples:[
    ["Fish sauce","Deep, salty seasoning for dressings and marinades.","Vegetarian fish sauce"],
    ["Lemongrass","Citrusy aroma for grilled meats and soups.","Frozen minced lemongrass"],
    ["Rice vermicelli","Light rice noodles for bowls and fresh rolls.","Thin rice sticks"],
    ["Lime","Fresh acidity in dipping sauces and soups.","Rice vinegar to taste"],
    ["Mint and cilantro","Cool, fragrant contrast in bowls and rolls.","Thai basil or shiso"],
    ["Fried shallots","Crunchy, savory topping for noodles and rice.","Crisp fried onions"]], sauces:["lime-fish","peanut"]},
  {id:"indian", name:"Indian", region:"South Asia", emblem:"🇮🇳", color:"gold", summary:"A starting pantry for dal, fragrant rice, and richly spiced weeknight dishes.", staples:[
    ["Cumin seeds","Temper in hot oil for a nutty base.","Ground cumin, added with other spices"],
    ["Ground coriander","Adds earthy citrus notes to curries.","Freshly ground coriander seeds"],
    ["Turmeric","Earthy yellow spice for dals and marinades.","Omit if unavailable"],
    ["Garam masala","Warming spice blend often added near the end.","A small amount of ground cumin, cardamom, and cinnamon"],
    ["Ghee","Nutty clarified butter for tempering and sautéing.","Neutral oil"],
    ["Red lentils","Quick-cooking base for dal.","Split yellow mung beans, cooked until soft"]], sauces:["yogurt"]},
  {id:"filipino", name:"Filipino", region:"Southeast Asia", emblem:"🇵🇭", color:"rose", summary:"Stock sharp vinegar and fragrant aromatics for adobo, stews, and dipping sauces.", staples:[
    ["Cane vinegar","Clean, bright acidity for adobo and dipping.","Coconut vinegar or distilled vinegar to taste"],
    ["Soy sauce","Savory base for adobo and noodles.","Tamari"],
    ["Garlic","Foundation for fried rice, adobo, and marinades.","Frozen crushed garlic"],
    ["Bay leaves","Add a gentle herbal note to braises.","Omit if unavailable"],
    ["Calamansi","Fragrant tart citrus for sauces and marinades.","Lime with a splash of orange juice"],
    ["Fish sauce","Salty seasoning for soups and stews.","Vegetarian fish sauce"]], sauces:["lime-fish"]},
  {id:"mexican", name:"Mexican", region:"North America", emblem:"🇲🇽", color:"sage", summary:"Keep dried chiles, corn, and beans on hand, then finish with fresh lime and herbs.", staples:[
    ["Corn tortillas","Base for tacos, tostadas, and enchiladas.","Tortillas made from masa harina"],
    ["Dried ancho chiles","Mild raisiny flavor for sauces and marinades.","Dried pasilla"],
    ["Chipotles in adobo","Smoky heat for stews and salsas.","Smoked paprika plus a little cayenne"],
    ["Pinto beans","A creamy base for refried beans and bowls.","Black beans"],
    ["Tomatillos","Tart green base for salsa verde.","Canned tomatillos"],
    ["Cilantro and lime","Bright finish for tacos and beans.","Use lime on its own if cilantro is unavailable"]], sauces:["lime-dressing"]},
  {id:"italian", name:"Italian", region:"Europe", emblem:"🇮🇹", color:"sage", summary:"Build sauces and simple meals around good oil, tomatoes, and a well-stocked dry shelf.", staples:[
    ["Extra virgin olive oil","Adds fruity richness to sauces and vegetables.","A mild olive oil for cooking"],
    ["Whole peeled tomatoes","Crush into quick pasta sauces or braises.","Canned crushed tomatoes"],
    ["Dried pasta","A reliable base for pantry dinners.","A similar shape with the same cook time"],
    ["Parmigiano Reggiano","Adds savory depth to pasta, soups, and risotto.","Grana Padano"],
    ["Garlic","Base for many sauces and vegetable dishes.","Frozen crushed garlic"],
    ["Basil","Fragrant finish for tomato sauces and salads.","Flat-leaf parsley for a different fresh finish"]], sauces:["lime-dressing"]},
  {id:"levantine", name:"Levantine", region:"West Asia", emblem:"🫒", color:"peach", summary:"Bright citrus, olive oil, and earthy spices for dips, salads, and grilled meats.", staples:[
    ["Tahini","Sesame paste for dips and lemony dressings.","Unsweetened sesame butter"],
    ["Sumac","Tart berry spice for onions, chicken, and salads.","Lemon zest and a squeeze of lemon"],
    ["Za’atar","Herb, sesame, and sumac blend for flatbread and meat.","Dried thyme, sesame, and sumac"],
    ["Chickpeas","Base for hummus and hearty salads.","White beans for a creamy dip"],
    ["Lemon","Acidity for salads, dips, and marinades.","Lime or white wine vinegar to taste"],
    ["Flat-leaf parsley","Fresh herbal base for tabbouleh and toppings.","Mint and cilantro for a different herbal mix"]], sauces:["yogurt","lime-dressing"]}
].map(cuisine => ({...cuisine, staples:[...cuisine.staples, ...extraStaples[cuisine.id]]})).concat(additionalPantries);

export const sauces = [
  {id:"teriyaki", name:"Teriyaki glaze", cuisine:"Japanese", color:"peach", time:5, desc:"A glossy sweet-soy finish for chicken, salmon, or mushrooms.", ratio:"2 soy · 2 mirin · 2 sake · 1 sugar", items:[["Soy sauce",2],["Mirin",2],["Sake",2],["Sugar",1]], method:"Whisk and simmer in a small pan until it lightly coats a spoon, about 3–5 minutes. Brush onto cooked protein for the last minute.", swap:"Use unsalted stock in place of sake for a different flavor.", use:"Glaze", recipe:"teriyaki-chicken"},
  {id:"gochujang", name:"Gochujang glaze", cuisine:"Korean", color:"rose", time:3, desc:"Sticky, savory chile glaze for skillet chicken, tofu, or roasted vegetables.", ratio:"2 gochujang · 1 soy · 1 honey · 1 vinegar", items:[["Gochujang",2],["Soy sauce",1],["Honey",1],["Rice vinegar",1]], method:"Whisk smooth. Toss with cooked protein over medium-low heat for about a minute. Add a splash of water if it tightens in the pan.", swap:"For milder heat, replace half the gochujang with white miso.", use:"Glaze", recipe:"gochujang-chicken"},
  {id:"stir-fry", name:"All-purpose stir-fry sauce", cuisine:"Chinese-inspired", color:"gold", time:4, desc:"A quick glossy sauce for a hot pan of meat and vegetables.", ratio:"3 stock · 2 soy · 1 oyster", items:[["Unsalted stock",3],["Light soy sauce",2],["Oyster sauce",1],["Cornstarch",0.5],["Sugar",0.5]], method:"Whisk cold. Stir again just before pouring it into a hot pan with cooked meat and vegetables. Let bubble for 30–60 seconds.", swap:"Use mushroom stir-fry sauce in place of oyster sauce.", use:"Stir-fry", recipe:"beef-broccoli"},
  {id:"lime-fish", name:"Lime & fish sauce dressing", cuisine:"Vietnamese-inspired", color:"sage", time:5, desc:"A nước chấm-style dipping sauce for noodle bowls and grilled meat.", ratio:"4 water · 1 lime · 1 fish sauce · 1 sugar", items:[["Warm water",4],["Lime juice",1],["Fish sauce",1],["Sugar",1]], method:"Dissolve the sugar in warm water, then add the lime and fish sauce. Add minced garlic and sliced chile to taste.", swap:"Use vegetarian fish sauce for a fish-free version.", use:"Dressing", recipe:"lemongrass-chicken"},
  {id:"miso-glaze", name:"White miso glaze", cuisine:"Japanese", color:"gold", time:3, desc:"A gentle, savory-sweet coating for salmon, eggplant, or tofu.", ratio:"2 miso · 1 mirin · 1 sake · 1 sugar", items:[["White miso",2],["Mirin",1],["Sake",1],["Sugar",1]], method:"Whisk smooth. Brush a thin layer on the food before baking. Watch closely as it browns.", swap:"Use unsalted stock in place of sake.", use:"Glaze", recipe:"miso-salmon"},
  {id:"sesame-soy", name:"Sesame–soy dressing", cuisine:"East Asian-inspired", color:"sage", time:2, desc:"An easy dressing for cucumbers, greens, and cold noodles.", ratio:"2 soy · 2 vinegar · 1 oil · 1 sugar", items:[["Soy sauce",2],["Rice vinegar",2],["Toasted sesame oil",1],["Sugar",1]], method:"Dissolve the sugar in the vinegar and soy sauce. Whisk in sesame oil and toss with vegetables just before serving.", swap:"Try tamari in place of soy sauce.", use:"Dressing", recipe:"braised-tofu"},
  {id:"peanut", name:"Creamy peanut sauce", cuisine:"Southeast Asian-inspired", color:"peach", time:4, desc:"A spoonable sauce for rice noodles and fresh rolls.", ratio:"2 peanut butter · 1 lime · 1 soy · 2 water", items:[["Smooth peanut butter",2],["Lime juice",1],["Soy sauce",1],["Warm water",2],["Honey",0.5]], method:"Mix the peanut butter, lime, soy, and honey. Whisk in warm water gradually until smooth and pourable.", swap:"Use sunflower seed butter if suitable for your diners.", use:"Dipping"},
  {id:"yogurt", name:"Lemon herb yogurt", cuisine:"Everyday", color:"sage", time:5, desc:"A cool spoon-over for grilled lamb, chicken, and roasted vegetables.", ratio:"6 yogurt · 1 lemon · 1 herbs", items:[["Plain Greek yogurt",6],["Lemon juice",1],["Chopped mint or parsley",1],["Kosher salt",0.25]], method:"Whisk everything together and season to taste. Thin with a teaspoon of water at a time for a drizzle.", swap:"Use plain unsweetened dairy-free yogurt if preferred.", use:"Dipping"},
  {id:"lime-dressing", name:"Citrus vinaigrette", cuisine:"Everyday", color:"gold", time:3, desc:"A bright dressing for slaw, grains, and grilled vegetables.", ratio:"3 olive oil · 1 citrus", items:[["Olive oil",3],["Lime or lemon juice",1],["Honey",0.5],["Kosher salt",0.25]], method:"Whisk the citrus, honey, and salt, then stream in the oil. Taste on a leaf of whatever you’re dressing.", swap:"White wine vinegar works in place of citrus.", use:"Dressing"}
];

// Quantity units and approximate protein, carbs, and fat per unit.
export const ingredients = {
  thigh:["Chicken thighs, boneless and skinless","g","Protein",0.195,0,0.075],
  breast:["Chicken breast, boneless and skinless","g","Protein",0.225,0,0.026],
  salmon:["Salmon fillets","g","Protein",0.204,0,0.134],
  flank:["Flank steak","g","Protein",0.211,0,0.081],
  ground:["Lean ground chicken","g","Protein",0.19,0,0.08],
  shrimp:["Shrimp, peeled and deveined","g","Protein",0.203,0,0.005],
  egg:["Large eggs","egg","Protein",6.3,0.4,4.8],
  tofu:["Extra-firm tofu","g","Protein",0.14,0.028,0.075],
  pork:["Pork loin, thinly sliced","g","Protein",0.215,0,0.058],
  rice:["Cooked rice","g","Grains & noodles",0.027,0.282,0.003],
  noodles:["Dry rice vermicelli","g","Grains & noodles",0.06,0.80,0.006],
  cabbage:["Red or green cabbage","g","Produce",0.014,0.06,0.001],
  beans:["Shelled edamame","g","Frozen & chilled",0.119,0.089,0.052],
  cucumber:["Cucumber","g","Produce",0.006,0.036,0.001],
  broccoli:["Broccoli florets","g","Produce",0.028,0.066,0.004],
  carrot:["Carrots","g","Produce",0.009,0.096,0.002],
  peas:["Frozen peas","g","Frozen & chilled",0.052,0.137,0.004],
  scallion:["Scallions","g","Produce",0.018,0.073,0.002],
  ginger:["Fresh ginger, grated","tsp","Produce",0.036,0.36,0.015],
  garlic:["Garlic","clove","Produce",0.19,0.99,0.015],
  basil:["Holy basil leaves","g","Produce",0.031,0.027,0.006],
  mint:["Mint or cilantro","g","Produce",0.033,0.065,0.007],
  lettuce:["Leaf lettuce","g","Produce",0.014,0.029,0.002],
  lemongrass:["Minced lemongrass","tsp","Produce",0.036,0.50,0.009],
  chile:["Thai chile","chile","Produce",0.10,0.45,0.02],
  lime:["Lime juice","tsp","Produce",0.02,0.5,0],
  soy:["Soy sauce","tsp","Pantry",0.43,0.25,0.03],
  mirin:["Mirin","tsp","Pantry",0,2.1,0],
  sake:["Sake","tsp","Pantry",0.02,0.25,0],
  sugar:["Sugar","tsp","Pantry",0,4,0],
  honey:["Honey","tsp","Pantry",0.02,5.75,0],
  gochujang:["Gochujang","tsp","Pantry",0.22,1.7,0.02],
  vinegar:["Rice vinegar","tsp","Pantry",0,0.05,0],
  oil:["Neutral cooking oil","tsp","Pantry",0,0,4.5],
  sesame:["Toasted sesame oil","tsp","Pantry",0,0,4.5],
  miso:["White miso","tsp","Pantry",0.72,1.51,0.35],
  stock:["Unsalted stock","tsp","Pantry",0.05,0.02,0.01],
  oyster:["Oyster sauce","tsp","Pantry",0.09,0.61,0.01],
  starch:["Cornstarch","tsp","Pantry",0,2.33,0],
  fish:["Fish sauce","tsp","Pantry",0.27,0.18,0],
  flakes:["Gochugaru","tsp","Pantry",0.3,1,0.3],
  water:["Water","tsp","Kitchen",0,0,0]
};

export const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
const joc = "Just One Cookbook";
const wok = "The Woks of Life";
const kb = "Korean Bapsang";
export const recipes = [
  {id:"teriyaki-chicken", day:0, name:"Teriyaki Chicken Bowl", cuisine:"Japanese-inspired", time:25, desc:"Glossy skillet chicken, edamame, and crunchy cabbage over rice.", image:"hero", animal:"Chicken", items:[["thigh",160],["rice",135],["beans",55],["cabbage",60],["soy",2],["mirin",2],["sake",2],["sugar",1],["oil",1]],
    steps:["Warm the rice. Cook the edamame according to the package and shred the cabbage. Stir together the soy, mirin, sake, and sugar.","Pat the chicken dry. Heat the oil in a skillet over medium-high, then sear the chicken for about 5–7 minutes per side, until it reaches 165°F / 74°C.","Lower the heat, pour in the glaze, and turn the chicken until the sauce coats it. Slice and serve over rice with the edamame and cabbage."],
    swap:"Use chicken breast cut into even cutlets or double down on the edamame alongside tofu.", store:"Pack cabbage separately for crunch. Reheat chicken, rice, and edamame with a splash of water.", sauce:"teriyaki", source:[joc,"Chicken Teriyaki","https://www.justonecookbook.com/chicken-teriyaki/"]},
  {id:"gochujang-chicken", day:0, name:"Gochujang Chicken Bowl", cuisine:"Korean-inspired", time:25, desc:"Sticky chile-glazed chicken with cool cucumber and rice.", image:"gochujang", animal:"Chicken", items:[["thigh",170],["rice",135],["cucumber",85],["scallion",12],["gochujang",2],["soy",1],["honey",1],["vinegar",1],["oil",1],["sesame",0.5]],
    steps:["Warm the rice and slice the cucumber and scallions. Whisk gochujang, soy, honey, and vinegar.","Cut the chicken into bite-size chunks and pat dry. Heat neutral oil over medium-high and sear in a single layer, stirring occasionally, until the chicken reaches 165°F / 74°C.","Lower the heat. Add the glaze and toss until sticky, about a minute. Finish with sesame oil and scallions and serve with rice and cucumber."],
    swap:"Use chicken breast or replace half of the gochujang with white miso for less heat.", store:"Keep cucumber in a separate cold compartment. Reheat the chicken and rice, then add it.", sauce:"gochujang", source:[kb,"Spicy Chicken Bulgogi","https://www.koreanbapsang.com/spicy-grilled-korean-chicken/"]},
  {id:"miso-salmon", day:1, name:"Miso Salmon & Broccoli", cuisine:"Japanese-inspired", time:25, desc:"Roasted miso salmon with tender broccoli and steamed rice.", image:"salmon", animal:"Seafood", items:[["salmon",155],["rice",120],["broccoli",130],["miso",2],["mirin",1],["sake",1],["sugar",1],["oil",1]],
    steps:["Heat the oven to 425°F / 220°C. Toss the broccoli with oil and spread on a lined sheet pan. Roast for 8 minutes.","Whisk miso, mirin, sake, and sugar. Pat the salmon dry and brush it lightly with the glaze.","Add the salmon to the pan skin-side down. Roast 8–14 minutes more, until the fish reaches 145°F / 63°C. Serve over warm rice."],
    swap:"Use arctic char or firm tofu. Tofu can take a few extra minutes to brown.", store:"Keep the fish and rice in separate compartments. Reheat gently, covered, and check the center with a thermometer.", sauce:"miso-glaze", source:[joc,"Miso Salmon","https://www.justonecookbook.com/miso-salmon/"]},
  {id:"beef-broccoli", day:1, name:"Beef & Broccoli Rice Bowl", cuisine:"Chinese-inspired", time:25, desc:"Tender strips of steak and broccoli in a glossy stir-fry sauce.", image:"beef", animal:"Beef", items:[["flank",155],["rice",130],["broccoli",145],["soy",2],["oyster",1],["stock",3],["starch",0.5],["sugar",0.5],["garlic",1],["ginger",0.5],["oil",1.5]],
    steps:["Slice steak thinly across the grain. Whisk stock, soy, oyster sauce, cornstarch, and sugar. Mince the garlic and warm the rice.","Steam the broccoli until bright green and crisp-tender. Pat the steak dry and sear it in hot oil in a single layer. Cook to 145°F / 63°C and rest for 3 minutes.","Sauté garlic and ginger briefly, then add the broccoli and whisked sauce. Bring to a bubble until glossy. Toss with the rested steak and serve over rice."],
    swap:"Use flat iron steak or top sirloin. Mushroom stir-fry sauce can replace oyster sauce.", store:"Keep the rice and stir-fry separate for best texture. Reheat the stir-fry briefly in a covered skillet with a splash of water.", sauce:"stir-fry", source:[wok,"Beef with Broccoli","https://thewoksoflife.com/beef-with-broccoli-all-purpose-stir-fry-sauce/"]},
  {id:"basil-chicken", day:2, name:"Thai Basil Chicken", cuisine:"Thai-inspired", time:20, desc:"Garlicky ground chicken with chile and a handful of fragrant basil.", image:"basil", animal:"Chicken", items:[["ground",150],["egg",1],["rice",135],["basil",15],["garlic",2],["chile",1],["oyster",1.5],["soy",1],["fish",0.5],["sugar",0.5],["water",2],["oil",1.5]],
    steps:["Mince the chile and garlic. Stir together the oyster sauce, soy, fish sauce, sugar, and water. Warm the rice.","Heat most of the oil in a skillet. Stir garlic and chile briefly, add ground chicken, and break it up. Stir in sauce and cook the chicken to 165°F / 74°C. Fold in the basil off the heat.","Use the remaining oil to fry the egg until the white and yolk are firm. Serve the chicken and egg over rice."],
    swap:"Use ground turkey or chopped chicken breast. Thai basil works if holy basil is hard to find.", store:"Pack rice and chicken together. Cook the egg on serving day for the best texture.", source:[wok,"Pad Kra Pao","https://thewoksoflife.com/pad-kra-pao/"]},
  {id:"shrimp-fried-rice", day:2, name:"Shrimp & Egg Fried Rice", cuisine:"Chinese-inspired", time:20, desc:"A one-pan lunch with shrimp, egg, peas, and scallions.", image:"shrimp", animal:"Seafood", items:[["shrimp",150],["egg",1],["rice",150],["peas",50],["carrot",45],["scallion",12],["soy",2],["sesame",0.5],["oil",1.5]],
    steps:["Use cold cooked rice, chilled promptly after cooking. Dice the carrot and slice the scallions. Pat the shrimp dry.","Scramble the egg in a little oil until set, then remove it. Sear the shrimp in the same skillet until opaque throughout and set them aside.","Add remaining oil and stir-fry the carrot and peas, then add rice and soy. Cook until the rice reaches 165°F / 74°C. Fold in shrimp, egg, scallions, and sesame oil."],
    swap:"Use diced pre-cooked chicken or extra-firm tofu instead of shrimp.", store:"This is best freshly made. If packing, chill quickly and reheat covered with a few drops of water.", source:[wok,"Shrimp Fried Rice","https://thewoksoflife.com/shrimp-fried-rice/"]},
  {id:"soboro-don", day:3, name:"Chicken Soboro Don", cuisine:"Japanese-inspired", time:25, desc:"Ginger chicken crumbles, soft scrambled egg, and green peas.", image:"soboro", animal:"Chicken", items:[["ground",145],["egg",1],["rice",135],["peas",65],["ginger",0.75],["soy",2],["mirin",1],["sake",1],["sugar",1],["oil",1]],
    steps:["Warm the rice and cook the peas according to the package. Whisk the egg with a small pinch of salt if you like.","Put chicken, ginger, soy, mirin, sake, and sugar into a cool skillet. Stir over medium heat to break the chicken into fine crumbles. Continue until it reaches 165°F / 74°C and most of the liquid has evaporated.","Scramble the egg gently in oil until set. Spoon the chicken, egg, and peas over the rice in separate sections."],
    swap:"Ground turkey, lean ground pork, or crumbled firm tofu work with the same seasonings.", store:"Freeze the chicken and rice if made several days ahead. Add freshly cooked peas and scrambled egg on serving day.", source:[joc,"Soboro Don","https://www.justonecookbook.com/tori-soboro-donburi/"]},
  {id:"braised-tofu", day:3, name:"Braised Tofu & Edamame", cuisine:"Korean-inspired", time:25, desc:"Pan-seared tofu with a savory chile braise and edamame.", image:"tofu", animal:"Tofu", items:[["tofu",200],["beans",95],["rice",125],["scallion",12],["garlic",1],["soy",2],["water",6],["flakes",0.5],["sugar",0.5],["sesame",0.5],["oil",1]],
    steps:["Pat the tofu dry and cut into thick rectangles. Cook the edamame according to the package and warm the rice.","Pan-fry tofu in neutral oil for about 4 minutes per side, until golden. Stir together soy, water, gochugaru, sugar, sesame oil, minced garlic, and scallions.","Pour sauce into the skillet and simmer gently for 3–5 minutes, spooning it over the tofu. Serve with the edamame and rice."],
    swap:"Use tempeh or add mildly spiced red pepper flakes in place of gochugaru.", store:"Cook this on Thursday if starting prep Sunday. Store leftovers with the braising liquid and reheat gently.", sauce:"sesame-soy", source:[kb,"Dubu Jorim (Korean Braised Tofu)","https://www.koreanbapsang.com/dubu-jorim-korean-braised-tofu/"]},
  {id:"lemongrass-chicken", day:4, name:"Lemongrass Chicken Noodles", cuisine:"Vietnamese-inspired", time:35, desc:"Seared lemongrass chicken, cool vermicelli, and fresh herbs.", image:"lemongrass", animal:"Chicken", items:[["breast",165],["noodles",65],["cucumber",70],["carrot",45],["lettuce",40],["mint",12],["lemongrass",2],["garlic",1],["fish",2],["lime",2],["sugar",1.5],["water",4],["oil",1]],
    steps:["Stir lemongrass, minced garlic, half the fish sauce, a third of the sugar, and the oil together. Coat thin chicken cutlets and refrigerate while you prep the bowl.","Prepare the vermicelli according to the package and rinse cool. Slice the vegetables. Stir the remaining fish sauce and sugar with lime juice and water for dressing.","Sear the cutlets in a hot skillet until they reach 165°F / 74°C, about 4–6 minutes per side. Slice and serve with the noodles, vegetables, herbs, and dressing."],
    swap:"Use boneless chicken thigh or a suitable fish-free sauce if needed.", store:"Keep the vegetables, dressing, noodles, and chicken separate. If cooked on Sunday, freeze the chicken and thaw it in the fridge before Friday.", sauce:"lime-fish", source:["RecipeTin Eats","Vietnamese Lemongrass Chicken Noodle Bowls","https://www.recipetineats.com/vietnamese-chicken-noodle-bowl/"]},
  {id:"ginger-pork", day:4, name:"Ginger Pork & Cabbage", cuisine:"Japanese-inspired", time:20, desc:"Thin pork cutlets with a miso–ginger glaze and crisp cabbage.", image:"pork", animal:"Pork", items:[["pork",160],["rice",135],["cabbage",90],["ginger",1.5],["soy",1],["mirin",2],["sake",1],["miso",1],["oil",1]],
    steps:["Stir ginger, soy, mirin, sake, and miso together. Shred the cabbage and warm the rice.","Pat the pork dry and sear in a single layer in hot oil, turning once, until the thickest pieces reach 145°F / 63°C. Rest at least 3 minutes.","Reduce the sauce briefly in the same pan over medium-low heat. Spoon it over the rested pork and serve with cabbage and rice."],
    swap:"Use thin beef, chicken, or firm tofu and follow the safe temperature for the protein you choose.", store:"Cook Thursday evening or Friday for best texture. Pack cabbage separately from the pork and rice.", source:[joc,"Miso Ginger Pork","https://www.justonecookbook.com/miso-ginger-pork/"]}
];

export function macros(recipe) {
  const [protein, carbs, fat] = recipe.items.reduce((totals, [id, quantity]) =>
    totals.map((total, index) => total + ingredients[id][3 + index] * quantity), [0, 0, 0]);
  return [Math.round(protein), Math.round(carbs), Math.round(fat), Math.round((protein * 4 + carbs * 4 + fat * 9) / 5) * 5];
}
