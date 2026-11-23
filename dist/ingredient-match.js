export function normalizeText(value) {
  return value.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g," ").trim();
}

export function matchesText(query, content) {
  const haystack = normalizeText(content);
  return normalizeText(query).split(" ").filter(Boolean).every(token => haystack.includes(token));
}

const units = /^(?:(?:kg|g|grams?|kilograms?|mg|ml|l|liters?|litres?|oz|ounces?|lbs?|pounds?|cups?|tablespoons?|tbsp|tbs|teaspoons?|tsp|cloves?|stalks?|slices?|sprigs?|heads?|pieces?|packs?|packets?|bags?|bottles?|cans?|jars?|bunch(?:es)?|pinch(?:es)?)(?:\s+of)?\b\s*)+/i;
const quantity = /^(?:(?:\d+(?:(?:\.|\/)\d+)?|[¼½¾⅐-⅞])\s*(?:[-–×x]\s*)?)+/i;
const descriptors = /^(?:(?:small|large|medium|finely|thinly|whole|sliced|diced|minced(?! (?:chicken|pork|lamb)\b)|grated|chopped|shredded|frozen|shelled|raw|fresh|leaf|ground(?= black pepper| white pepper| turmeric| cumin| coriander))\s+)+/;
function cleanIngredient(text) {
  const bare = text
    .replace(/^\s*(?:\[[ xX]\]|[•●◦✓☐☑*–-])+\s*/, "")
    .replace(/\([^)]*\)/g, " ").trim();
  const withoutQty = quantity.test(bare) && !/^\d{2}\s+flour\b/i.test(bare)
    ? bare.replace(quantity,"").replace(units,"")
    : bare;
  return normalizeText(withoutQty).replace(descriptors,"").replace(/(?:\s+x)?\s+\d+$/,"").trim();
}

const aliasGroups = {
  "chicken thigh": ["chicken thighs","boneless chicken thigh","boneless skinless chicken thighs","skinless chicken thighs"],
  "chicken breast": ["chicken breasts","boneless chicken breast","boneless skinless chicken breast","boneless skinless chicken breasts","chicken cutlet","chicken cutlets"],
  "ground chicken": ["lean ground chicken","chicken mince","minced chicken"],
  "salmon": ["salmon fillet","salmon fillets","skin on salmon","skinless salmon"],
  "shrimp": ["prawn","prawns","peeled shrimp","deveined shrimp","peeled and deveined shrimp","jumbo shrimp"],
  "cod": ["skinless cod","cod fillet","cod fillets"],
  "sea bass": ["sea bass fillet","sea bass fillets","black sea bass"],
  "lobster": ["lobster meat","lobster tail","lobster tails"],
  "crab": ["crab meat","cooked crab meat","cooked crab","dungeness crab","blue crab","dungeness crab meat","blue crab meat"],
  "flank steak": ["beef flank","beef flank steak","flank"],
  "sirloin": ["top sirloin","sirloin steak","top sirloin steak"],
  "filet mignon": ["beef tenderloin","fillet steak","filet steak"],
  "short ribs": ["short rib","beef short rib","beef short ribs"],
  "bone-in short ribs": ["bone in beef short ribs","english cut short ribs"],
  "boneless short ribs": ["boneless beef short ribs"],
  "marrow bones": ["beef leg bones","beef marrow bones","ox bones","beef soup bones","beef bones"],
  "brisket": ["beef brisket"],
  "oxtail": ["ox tail","oxtails","beef oxtail"],
  "pork spareribs": ["pork ribs","pork spare ribs","spareribs","spare ribs"],
  "pork loin": ["pork loin chops","pork loin roast","pork loin steaks"],
  "ground pork": ["pork mince","minced pork"],
  "ground lamb": ["lamb mince","minced lamb"],
  "lamb leg": ["boneless lamb leg","leg of lamb"],
  "char siu": ["cooked char siu pork","char siu pork","chinese barbecue pork","chinese bbq pork"],
  "pork chops": ["pork chop","boneless pork chops","boneless pork chop"],
  "lap cheong": ["chinese sausage","chinese cured sausage","cantonese sausage"],
  "eggs": ["egg","chicken eggs","chicken egg"],
  "tofu": ["firm tofu","extra firm tofu","super firm tofu","extra firm bean curd","firm bean curd"],
  "soft tofu": ["soft bean curd","silken tofu"],
  "edamame": ["soybeans edamame","edamame beans","shelled soybeans"],
  "scallions": ["scallion","green onion","green onions","spring onion","spring onions"],
  "carrot": ["carrots"],
  "cucumber": ["cucumbers","persian cucumber","persian cucumbers"],
  "broccoli": ["broccoli florets","broccoli crowns"],
  "green beans": ["green bean","string beans","string bean","snap beans","haricots verts"],
  "potatoes": ["potato","yukon gold potatoes","yukon gold potato"],
  "green pepper": ["green bell pepper","green bell peppers","green pepper","green peppers"],
  "brussels sprouts": ["brussel sprouts","brussels sprout","brussel sprout"],
  "cabbage": ["red cabbage","purple cabbage","green cabbage"],
  "napa cabbage": ["chinese cabbage","napa","baechu"],
  "lettuce": ["lettuce leaves","leaf lettuce"],
  "eggplant": ["eggplants","aubergine","aubergines","japanese eggplant","chinese eggplant"],
  "onion": ["onions","yellow onion","yellow onions"],
  "red onion": ["red onions","purple onion"],
  "shallot": ["shallots"],
  "fried shallots": ["crispy fried shallots","crispy shallots"],
  "shiitake": ["shiitake mushrooms","shiitakes","shiitake mushroom"],
  "dried shiitake": ["dried shiitake mushrooms","dried shiitakes"],
  "lime": ["limes","lime juice"],
  "lemon": ["lemons","lemon juice"],
  "orange": ["oranges","orange juice","orange zest"],
  "ginger": ["ginger root"],
  "garlic": ["garlic cloves","garlic clove"],
  "lemongrass": ["lemon grass","lemongrass stalks","lemongrass stalk"],
  "holy basil": ["holy basil leaves","tulsi"],
  "thai basil": ["thai basil leaves"],
  "cilantro": ["coriander leaves","cilantro leaves"],
  "peas": ["green peas","petit pois"],
  "thai chile": ["thai chiles","thai chili","thai chillies","birds eye chile","birds eye chili"],
  "jalapeno": ["jalapenos","jalapeno pepper","jalapeno peppers"],
  "daikon": ["daikon radish","white radish"],
  "kabocha": ["kabocha squash","japanese pumpkin"],
  "asian pear": ["asian pears","nashi pear","korean pear"],
  "rice": ["cooked rice","plain rice","white rice","cooked white rice","brown rice","cooked brown rice","short grain rice","jasmine rice","basmati rice","leftover rice","day old rice","steamed rice","chilled cooked rice"],
  "rice vermicelli": ["dry rice vermicelli","rice noodles vermicelli","thin rice noodles","bihon","rice noodle vermicelli"],
  "thick rice vermicelli": ["thick round rice vermicelli","dry thick round rice vermicelli","bun bo hue noodles"],
  "wide rice noodles": ["ho fun","flat wide rice noodles","chow fun noodles","wide flat rice noodles"],
  "pho noodles": ["banh pho","dry flat pho noodles","flat pho noodles","flat rice sticks for pho"],
  "somyeon": ["dry somyeon noodles","somen","somen noodles","somyeon noodles"],
  "korean rice cakes": ["tteok","tteokbokki rice cakes","cylindrical korean rice cakes","garaetteok"],
  "wonton wrappers": ["round thin wonton wrappers","wonton skins","wonton wrapper","shumai wrappers","siu mai wrappers"],
  "chow mein noodles": ["chow mein noodle","chow mein"],
  "wheat noodles": ["chinese wheat noodles","wheat noodle","dried wheat noodles"],
  "flour tortillas": ["flour tortilla","wheat tortillas"],
  "salt": ["fine salt","kosher salt","sea salt","table salt"],
  "black pepper": ["pepper","black peppercorns"],
  "white pepper": ["white peppercorns"],
  "sugar": ["granulated sugar","white sugar","caster sugar","cane sugar"],
  "brown sugar": ["light brown sugar","dark brown sugar"],
  "neutral oil": ["neutral cooking oil","vegetable oil","canola oil","grapeseed oil","sunflower oil","avocado oil","rice bran oil","cooking oil"],
  "sesame oil": ["toasted sesame oil","roasted sesame oil"],
  "sesame seeds": ["toasted sesame seeds","roasted sesame seeds"],
  "soy sauce": ["light soy sauce","japanese soy sauce","regular soy sauce","shoyu","tamari","low sodium soy sauce"],
  "soup soy sauce": ["korean soup soy sauce","guk ganjang"],
  "rice vinegar": ["rice wine vinegar","unseasoned rice vinegar"],
  "black vinegar": ["chinkiang black vinegar","chinkiang vinegar","chinese black vinegar","zhenjiang vinegar"],
  "white miso": ["shiro miso","white miso paste"],
  "gochujang": ["gochujang paste","korean red pepper paste","korean chili paste"],
  "gochugaru": ["korean chile flakes","korean red pepper flakes"],
  "doubanjiang": ["pixian doubanjiang","sichuan chile bean paste","spicy broad bean paste","chili bean paste"],
  "huangdoujiang": ["fermented yellow soybean paste","yellow soybean paste"],
  "tianmianjiang": ["sweet flour sauce","sweet bean sauce"],
  "fish sauce": ["nuoc mam","nam pla"],
  "lime and fish sauce dressing": ["prepared lime and fish sauce dressing","nuoc cham","vietnamese dipping sauce"],
  "shrimp paste (mam ruoc)": ["vietnamese fermented shrimp paste","mam ruoc","fermented shrimp paste"],
  "douchi": ["fermented black beans","salted black soybeans","fermented black soybeans"],
  "sichuan peppercorns": ["szechuan peppercorns","sichuan peppercorn","szechuan peppercorn"],
  "chile flakes": ["dried chile flakes","dried chili flakes","red pepper flakes","crushed red pepper","chilli flakes"],
  "shaoxing wine": ["shaoxing","unsalted shaoxing wine","shaoxing rice wine","chinese cooking wine"],
  "stock": ["unsalted stock","broth","unsalted broth"],
  "chicken stock": ["low sodium chicken stock","unsalted chicken stock","chicken broth","unsalted chicken broth"],
  "beef stock": ["unsalted beef stock","beef broth","unsalted beef broth"],
  "coconut milk": ["unsweetened coconut milk","canned coconut milk"],
  "cornstarch": ["corn starch","cornflour"],
  "rice flour": ["white rice flour"],
  "tapioca starch": ["tapioca flour"],
  "flour": ["all purpose flour","plain flour","ap flour"],
  "gelatin": ["unflavored powdered gelatin","powdered gelatin","unflavored gelatin"],
  "curry paste": ["thai red curry paste","red curry paste"],
  "kombu": ["dried kombu","dashima","dried kelp"],
  "butter": ["unsalted butter"],
  "mozzarella": ["shredded mozzarella","mozzarella cheese"],
  "mayonnaise": ["mayo"],
  "corn kernels": ["corn","sweetcorn","sweet corn"],
  "tomatoes": ["tomato"],
  "chicken fat": ["rendered chicken fat","schmaltz"],
  "crushed tomatoes": ["canned crushed tomatoes","crushed tomato"],
  "star anise": ["star anise pods","star anise pod"],
  "cinnamon stick": ["cinnamon sticks"],
  "bamboo shoots": ["canned bamboo shoots"],
  "water": ["cold water","warm water","lukewarm water","just boiled water","hot water","boiling water","water and reserved daikon juices combined"]
};
const aliases = new Map(Object.entries(aliasGroups).flatMap(([name, forms]) =>
  [name, ...forms].map(form => [cleanIngredient(form), name])
));
const alternatives = new Map([
  ["red or green cabbage", ["cabbage"]],
  ["japanese or chinese eggplant", ["eggplant"]],
  ["cooked dungeness or blue crab meat", ["crab"]],
  ["beef leg or marrow bones", ["marrow bones"]],
  ["top sirloin or filet mignon", ["sirloin","filet mignon"]],
  ["skinless cod or sea bass fillets", ["cod","sea bass"]],
  ["lemon basil or thai basil", ["lemon basil","thai basil"]],
  ["cilantro or vietnamese coriander", ["cilantro","vietnamese coriander"]],
  ["mint or cilantro", ["mint","cilantro"]]
]);
const broadChoices = {
  chicken: ["chicken thigh","chicken breast","ground chicken"],
  beef: ["short ribs","bone-in short ribs","boneless short ribs","flank steak","sirloin","filet mignon","brisket","oxtail"],
  "short ribs": ["bone-in short ribs","boneless short ribs"],
  "bone-in short ribs": ["short ribs","boneless short ribs"],
  "boneless short ribs": ["short ribs","bone-in short ribs"],
  "flanken short ribs": ["short ribs","bone-in short ribs","boneless short ribs"],
  steak: ["flank steak","sirloin","filet mignon"],
  pork: ["pork spareribs","pork loin","ground pork","pork chops","char siu"],
  lamb: ["ground lamb","lamb leg"],
  fish: ["salmon","cod","sea bass"],
  "white fish": ["cod","sea bass"],
  "cooked shrimp": ["shrimp"],
  "soft tofu": ["tofu"],
  tofu: ["soft tofu"],
  "rice noodles": ["rice vermicelli","thick rice vermicelli","wide rice noodles","pho noodles"],
  miso: ["white miso"],
  "soy sauce": ["soup soy sauce"],
  vinegar: ["rice vinegar","black vinegar"],
  basil: ["thai basil","holy basil","lemon basil"],
  "chile": ["thai chile","jalapeno"],
  "chili": ["thai chile","jalapeno"],
  "chile flakes": ["gochugaru"],
  "cinnamon": ["cinnamon stick"],
  "stock": ["chicken stock","beef stock"],
  "shiitake": ["dried shiitake"]
};
const essentials = new Set(["neutral oil","salt","black pepper","sugar"]);
const substantial = new Set(["chicken thigh","chicken breast","ground chicken","salmon","shrimp","cod","lobster","crab","flank steak","sirloin","filet mignon","short ribs","bone-in short ribs","boneless short ribs","marrow bones","oxtail","brisket","pork spareribs","pork loin","ground pork","ground lamb","eggs","tofu","rice","rice vermicelli","thick rice vermicelli","wide rice noodles","pho noodles","somyeon","korean rice cakes","wonton wrappers","chow mein noodles","flour tortillas","eggplant","edamame","broccoli","cabbage","napa cabbage","kabocha","green beans","brussels sprouts"]);

function ingredientKeys(label) {
  const clean = cleanIngredient(label);
  return alternatives.get(clean) ?? [aliases.get(clean) ?? clean];
}

export function parseInventory(text) {
  const items = new Set();
  for (const part of text.split(/[\n,;+•]+/)) {
    const clean = cleanIngredient(part);
    if (!clean || /^(?:and|to taste|as needed|for serving|boneless and skinless|peeled and deveined)$/.test(clean)) continue;
    const names = clean.includes(" and ") && !aliases.has(clean) ? part.trim().split(/\s+and\s+/i) : [part];
    for (const name of names) ingredientKeys(name).filter(Boolean).forEach(key => items.add(key));
  }
  return items;
}

export function matchInventory(text, recipes, recipeIngredients, assumeStaples = true) {
  const inventory = parseInventory(text);
  const checkKeys = new Set([...inventory].flatMap(key => broadChoices[key] ?? []));
  // A generic stock recipe can use either poultry or beef stock.
  if (inventory.has("chicken stock") || inventory.has("beef stock")) inventory.add("stock");
  if (inventory.has("lime") && inventory.has("fish sauce") && (assumeStaples || inventory.has("sugar"))) inventory.add("lime and fish sauce dressing");
  return recipes.map(recipe => {
    const have = [];
    const missing = [];
    const check = [];
    let matched = 0;
    let total = 0;
    let explicit = 0;
    for (const [, ,label] of recipeIngredients(recipe)) {
      const name = label.split(",")[0];
      const keys = ingredientKeys(name);
      if (keys.includes("water")) continue;
      const weight = keys.some(key => substantial.has(key)) ? 3 : 1;
      total += weight;
      const exact = keys.some(key => inventory.has(key));
      if (exact || (assumeStaples && keys.some(key => essentials.has(key)))) {
        have.push(name);
        matched += weight;
        if (exact) explicit += weight;
      } else if (keys.some(key => checkKeys.has(key))) {
        check.push(name);
        matched += weight * .4;
        explicit += weight * .4;
      } else missing.push(name);
    }
    return {recipe,have,missing,check,explicit,score:Math.round((matched / total) * 100)};
  }).filter(result => result.explicit > 0)
    .sort((a,b) => b.score - a.score || b.explicit - a.explicit || a.missing.length - b.missing.length || a.recipe.time - b.recipe.time);
}
