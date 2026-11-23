import { macros } from "./food.js";

// Approximate kcal, protein, carbs and fat per 100 g. Use the label for whey and packaged foods.
const components = {
  yogurt:["Plain nonfat Greek yogurt",59,10.2,3.6,0.4],
  whey:["Whey protein powder",393,79,8,6],
  oats:["Dry rolled oats",389,16.9,66.3,6.9],
  berries:["Mixed berries",50,0.7,12,0.3],
  maple:["Maple syrup",260,0,67,0],
  eggs:["Large eggs (without shells)",143,12.6,0.7,9.5],
  whites:["Liquid egg whites",52,10.9,0.7,0.2],
  turkeyCooked:["Cooked turkey breast",135,29,0,1.8],
  potato:["Potatoes, diced",77,2,17.5,0.1],
  spinach:["Baby spinach",23,2.9,3.6,0.4],
  oil:["Olive oil",884,0,0,100],
  chicken:["Raw boneless skinless chicken breast",120,22.5,0,2.6],
  quinoa:["Cooked quinoa",120,4.4,21.3,1.9],
  broccoli:["Broccoli florets",34,2.8,6.6,0.4],
  lemon:["Lemon juice",22,0.35,6.9,0],
  turkey:["Raw 93% lean ground turkey",172,21.4,0,7.7],
  beans:["Cooked or canned black beans, drained",132,8.9,23.7,0.5],
  rice:["Cooked rice",130,2.7,28.2,0.3],
  salsa:["Tomato salsa",31,1.4,6.6,0.2],
  avocado:["Avocado",160,2,8.5,14.7],
  shrimp:["Raw shrimp, peeled and deveined",85,20.3,0,0.5],
  edamame:["Shelled edamame",121,11.9,8.9,5.2],
  sesame:["Toasted sesame oil",884,0,0,100],
  soy:["Soy sauce",53,8.1,4.9,0.6],
  salmon:["Raw salmon fillet",208,20.4,0,13.4],
  lentils:["Cooked lentils",116,9,20.1,0.4],
  kale:["Chopped kale",35,2.9,4.4,1.5]
};

function meal(details, quantities) {
  const nutrition = [0,0,0,0];
  const items = quantities.map(([key,grams]) => {
    const [label,kcal,protein,carbs,fat] = components[key];
    [protein,carbs,fat,kcal].forEach((value,index) => { nutrition[index] += value * grams / 100; });
    return [grams,"g",label];
  });
  return {...details,servings:1,template:true,nutrition,items};
}

export const templateRecipes = [
  meal({
    id:"protein-yogurt-oats",name:"Greek Yogurt, Oats & Berries",cuisine:"Meal prep",animal:"Dairy",time:10,active:10,
    desc:"Greek yogurt and whey stirred into oats with berries and maple.",
    steps:["Stir whey into the Greek yogurt until smooth. Thin with a splash of water if needed.","Fold in oats and berries, then top with maple syrup. Serve immediately or chill overnight."],
    swap:"Use comparable plain high-protein yogurt and check the package values. Blueberries, raspberries, or chopped strawberries all work.",
    store:"Refrigerate covered at 40°F / 4°C or colder. For the best texture, eat within 2 days."
  }, [["yogurt",300],["whey",28],["oats",60],["berries",100],["maple",10]]),
  meal({
    id:"turkey-egg-skillet",name:"Turkey, Egg & Potato Skillet",cuisine:"Meal prep",animal:"Turkey & eggs",time:30,active:20,
    desc:"Golden potatoes, turkey breast, eggs, and spinach in one skillet.",
    steps:["Dice the potato and boil until just tender, 7–10 minutes. Drain, then brown in olive oil in a skillet.","Add diced cooked turkey and spinach. If using leftover turkey, heat it to 165°F / 74°C.","Beat eggs and egg whites together, pour into the pan, and fold over medium-low heat until set and at least 160°F / 71°C. Season to taste."],
    swap:"Use leftover cooked chicken breast in place of turkey. Sweet potato gives a sweeter version.",
    store:"Chill in a shallow container and reheat covered until the center reaches 165°F / 74°C."
  }, [["eggs",100],["whites",210],["turkeyCooked",100],["potato",160],["spinach",65],["oil",5]]),
  meal({
    id:"chicken-quinoa-broccoli",name:"Lemon Chicken, Quinoa & Broccoli",cuisine:"Meal prep",animal:"Chicken",time:30,active:20,
    desc:"Pan-seared lemon chicken with warm quinoa and broccoli.",
    steps:["Pat chicken dry, halve thick pieces horizontally, and season to taste. Rub with half the oil.","Cook the chicken over medium-high, turning once, until the thickest piece reaches 165°F / 74°C.","Steam broccoli until crisp-tender and warm the quinoa. Slice chicken and serve with broccoli, quinoa, lemon juice, and remaining oil."],
    swap:"Use brown rice in place of quinoa or green beans in place of broccoli. The estimated nutrition will change.",
    store:"Pack together in a shallow container. Add a splash of water and reheat covered."
  }, [["chicken",250],["quinoa",140],["broccoli",140],["oil",8],["lemon",30]]),
  meal({
    id:"lean-turkey-taco-bowl",name:"Turkey, Black Bean & Rice Taco Bowl",cuisine:"Taco-style",animal:"Turkey",time:25,active:20,
    desc:"Lean turkey, black beans, and rice with tomato salsa and avocado.",
    steps:["Brown the turkey in a nonstick skillet, breaking it apart. If desired, season with cumin, paprika, and a pinch of salt. Cook through to 165°F / 74°C.","Warm the beans and rice. Spoon them into a bowl with the browned turkey and top with salsa and sliced avocado."],
    swap:"Use pinto beans instead of black beans. Use a measured spoonful of roasted salsa verde in place of tomato salsa if preferred.",
    store:"Refrigerate the turkey, rice, and beans promptly. Pack salsa and avocado separately.",sauce:"taco-roasted-salsa-verde"
  }, [["turkey",220],["beans",110],["rice",130],["salsa",65],["avocado",45]]),
  meal({
    id:"sesame-shrimp-edamame-bowl",name:"Sesame Shrimp & Edamame Bowl",cuisine:"Meal prep",animal:"Seafood",time:25,active:20,
    desc:"Pan-seared shrimp with edamame, broccoli, rice, and sesame soy.",
    steps:["Cook the edamame according to its package. Steam broccoli and warm the rice.","Pat shrimp dry, then sear in a hot nonstick pan until pearly and opaque throughout.","Toss the hot shrimp with soy sauce and sesame oil. Spoon over rice with vegetables."],
    swap:"Use cubed white fish and cook it to 145°F / 63°C. Use tamari if suitable.",
    store:"Pack in a shallow container and refrigerate promptly. Reheat covered to 165°F / 74°C."
  }, [["shrimp",220],["edamame",150],["broccoli",100],["rice",115],["sesame",5],["soy",10]]),
  meal({
    id:"salmon-lentils-kale",name:"Salmon, Lentils & Lemon Yogurt",cuisine:"Meal prep",animal:"Seafood",time:25,active:15,
    desc:"Roasted salmon with lentils, tender kale, and tangy lemon yogurt.",
    steps:["Heat the oven to 425°F / 220°C. Season salmon to taste and roast on a lined pan until it reaches 145°F / 63°C, about 10–15 minutes depending on thickness.","Simmer lentils and chopped kale together with a splash of water until the kale is tender.","Whisk yogurt and lemon juice. Serve the salmon over lentils and spoon over the yogurt."],
    swap:"Use cooked chickpeas instead of lentils, or use baby spinach in place of kale.",
    store:"Store salmon and lentils together and refrigerate yogurt separately. Add yogurt after reheating."
  }, [["salmon",215],["lentils",130],["kale",85],["yogurt",95],["lemon",15]])
];

export function estimatedNutrition(recipe) {
  if (recipe?.template) return recipe.nutrition;
  if (Number.isInteger(recipe?.day)) return macros(recipe);
}

const breakfast = ["protein-yogurt-oats","turkey-egg-skillet"];
const lunch = ["teriyaki-chicken","miso-salmon","basil-chicken","soboro-don","lemongrass-chicken","gochujang-chicken","ginger-pork"];
const dinner = ["chicken-quinoa-broccoli","lean-turkey-taco-bowl","sesame-shrimp-edamame-bowl","salmon-lentils-kale"];
const mealDay = (index,[morning,evening,lunchSize,dinnerSize]) => ({
  breakfast:{id:breakfast[morning],servings:1},
  lunch:{id:lunch[index],servings:lunchSize},
  dinner:{id:dinner[evening],servings:dinnerSize}
});

export const weeklyTemplates = [
  {id:"high-protein-1700",name:"High protein · 1,600–1,800 kcal",protein:160,low:1600,high:1800,week:[
    [0,0,1,1],[1,0,1,1],[0,2,1,1],[1,0,1,1],[0,0,1,1],[1,2,1,1],[0,3,1,1]
  ].map((row,index)=>mealDay(index,row))},
  {id:"high-protein-1900",name:"High protein · 1,800–2,000 kcal",protein:160,low:1800,high:2000,week:[
    [0,0,1.25,1],[1,1,1,1],[0,2,1.25,1],[1,3,1.25,1],[0,0,1.25,1],[1,1,1,1],[0,3,1.25,1]
  ].map((row,index)=>mealDay(index,row))}
];

export function summarizeMeals(meals, recipesById) {
  const summary = {kcal:0,protein:0,known:0,count:0};
  for (const item of meals) {
    if (!item) continue;
    summary.count++;
    const stats = estimatedNutrition(recipesById.get(item.id));
    if (!stats) continue;
    summary.known++;
    summary.protein += stats[0] * item.servings;
    summary.kcal += stats[3] * item.servings;
  }
  return summary;
}
