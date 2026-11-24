import { normalizeText } from "./ingredient-match.js";

const aliases = [
  ["Chicken thighs, boneless and skinless", /^(?:raw )?boneless skinless chicken thighs$|^chicken thighs$/],
  ["Chicken breast, boneless and skinless", /^(?:raw )?boneless skinless chicken breast$|^chicken breasts?$/],
  ["Salmon fillets", /^(?:raw )?salmon fillets?$/],
  ["Shrimp, peeled and deveined", /^(?:(?:small|raw) )*shrimp$/],
  ["Scallions", /^(?:scallions?|spring onions?|green onions?)$/],
  ["Garlic", /^(?:(?:minced|grated|chopped) )?garlic$/],
  ["Fresh ginger", /^(?:(?:fresh|minced|grated) )*ginger$/],
  ["Eggs", /^(?:large )?eggs?(?: without shells)?$/],
  ["Carrots", /^carrots?$/],
  ["Cucumber", /^cucumbers?$/],
  ["Neutral oil", /^neutral (?:cooking )?oil$/],
  ["Toasted sesame oil", /^toasted sesame oil$/],
  ["Cooked rice", /^(?:chilled )?cooked rice$/],
  ["Plain nonfat Greek yogurt", /^plain nonfat greek yogurt$/]
];

const aisleRules = [
  ["Meat, seafood & eggs", /^(?:raw |cooked |skinless |boneless |lean |bone in |ground |large )*(?:chicken thighs?|chicken breast|chicken cutlets?|ground chicken|turkey breast|turkey|pork|beef|steak|flank steak|sirloin|filet mignon|oxtail|salmon|shrimp|crab|lobster|cod|sea bass|lamb|eggs?|liquid egg whites)\b/],
  ["Produce & frozen vegetables", /\b(?:broccoli|carrots?|scallions?|onions?|shallots?|ginger|garlic|lemongrass|cabbage|spinach|kale|watercress|lettuce|cucumbers?|zucchini|peppers?|jalapeno|chile|chiles|cilantro|mint|basil|daikon|shiitake|eggplant|potatoes|squash|avocado|edamame|peas|green beans|corn kernels|sprouts|berries|lime|lemon|orange|pear)\b/],
  ["Dairy & tofu", /\b(?:yogurt|milk|butter|mozzarella|tofu|whey)\b/],
  ["Grains, noodles & beans", /\b(?:rice|noodles|quinoa|oats|tortillas|black beans|lentils|wonton wrappers)\b/]
];
const pantryWords = /\b(?:sauce|stock|broth|flakes|seeds|ground black pepper|ground white pepper|dried chile|juice|zest|oil|vinegar|starch|flour|paste|wine|sesame|salt|sugar|syrup|dried shrimp|dried mushrooms|coconut milk|fermented black beans|kombu)\b/;

function groceryName(label) {
  const name = label.split(",")[0];
  const plain = normalizeText(name);
  if (/^(?:(?:cold|warm|hot|lukewarm|boiling|just boiled) )?water\b/.test(plain)) return null;
  return aliases.find(([,pattern])=>pattern.test(plain))?.[0] ?? name;
}

function groceryUnit(amount, unit) {
  const scales = {kg:[1000,"g"],L:[1000,"mL"],tbsp:[3,"tsp"],cup:[48,"tsp"],cups:[48,"tsp"],cloves:[1,"clove"],stalks:[1,"stalk"]};
  const [factor,key] = scales[unit] ?? [1,unit];
  return [amount * factor,key];
}

export function groceryTotals(cooks, recipes, recipeIngredients) {
  const items = new Map();
  for (const cook of cooks) {
    const recipe = recipes.get(cook.id);
    if (!recipe) continue;
    const portions = cook.servings / (recipe.servings ?? 1);
    for (const [amount,unit,label] of recipeIngredients(recipe)) {
      const name = groceryName(label);
      if (!name) continue;
      const key = normalizeText(name);
      const [quantity,unitKey] = groceryUnit(amount * portions,unit);
      const aisle = (!pantryWords.test(key) && aisleRules.find(([,regex])=>regex.test(key))?.[0]) || "Pantry & seasonings";
      if (!items.has(key)) items.set(key,{key,name,aisle,units:new Map()});
      const totals = items.get(key).units;
      totals.set(unitKey,(totals.get(unitKey) ?? 0) + quantity);
    }
  }
  return [...items.values()].sort((a,b)=>a.name.localeCompare(b.name)).map(item=>({
    ...item, units:[...item.units].sort(([a],[b])=>a.localeCompare(b)).map(([unit,n])=>[unit,Math.round(n*100)/100])
  }));
}

export function grocerySignature(item) {
  return JSON.stringify(item.units);
}

export const groceryQuantity = (item, measure) => item.units.map(([unit,amount]) => measure(amount,unit)).join(" + ");
function groceryGroups(items) {
  return [...aisleRules.map(([name]) => name),"Pantry & seasonings"]
    .map(aisle => [aisle,items.filter(item => item.aisle === aisle)]).filter(([,list]) => list.length);
}

export function groceryText(items, checked, measure) {
  return groceryGroups(items).map(([aisle,list]) => [
    aisle,...list.map(item => (checked[item.key] === grocerySignature(item) ? "[x] " : "[ ] ") + item.name + " · " + groceryQuantity(item,measure))
  ].join("\n")).join("\n\n");
}

export function groceryChanges(before, after) {
  const prior = new Map(before.map(item => [item.key,item]));
  const next = new Map(after.map(item => [item.key,item]));
  return [...new Set([...prior.keys(),...next.keys()])].map(key => [prior.get(key),next.get(key)])
    .filter(([a,b]) => !a || !b || grocerySignature(a) !== grocerySignature(b))
    .sort(([a,b],[c,d]) => (b ?? a).name.localeCompare((d ?? c).name));
}

export function renderWeeklyGroceries(items, checked, measure) {
  const completed = items.filter(item=>checked[item.key] === grocerySignature(item)).length;
  return items.length ? '<p data-weekly-progress aria-live="polite">' + completed + ' of ' + items.length + ' ingredients checked</p><div class="grocery-grid">' +
    groceryGroups(items).map(([aisle,list]) =>
      '<section class="grocery-group"><h3>' + aisle + '</h3>' + list.map(item=>
        '<label class="grocery-item"><input type="checkbox" data-weekly-item="' + item.key + '"' + (checked[item.key] === grocerySignature(item) ? ' checked' : '') + '><span>' + item.name + '</span><strong>' +
        groceryQuantity(item,measure) + '</strong></label>'
      ).join("") + '</section>'
    ).join("") + '</div>' : '<p class="matcher-empty">Add a meal to this week to build your grocery list.</p>';
}
