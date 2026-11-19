import { pantry, sauces, recipes, ingredients, days, macros } from "./food.js";
import { meats } from "./cuts.js";
import { restaurants, restaurantRecipes } from "./restaurants.js";

const shapes = {
  mark:'<path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',
  'arrow-up':'<path d="M6 18 18 6M8 6h10v10"/>',
  x:'<path d="m6 6 12 12M18 6 6 18"/>',
  jar:'<path d="M7 3h10v4H7zM8 7v2l-3 3v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7l-3-3V7M5 14h14M9 17h6"/>',
  whisk:'<path d="M13 11c-2-1-5 0-7 2s-3 5-2 6 4 0 6-2 3-5 3-7zM4 19c1-3 4-6 9-8m0 0 7-7m-5 9 6-6M3 21l2-2"/>',
  bowl:'<path d="M3 12h18c0 5-3 8-9 8s-9-3-9-8zM9 20h6M6 9c-1-2 2-3 1-5m5 5c-1-2 2-3 1-5m5 5c-1-2 2-3 1-5"/>',
  knife:'<path d="M3 19 19 3c2 4 0 8-3 10l-4 3-2-2-5 7H3zM10 14l2 2"/>',
  clock:'<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
  people:'<circle cx="9" cy="7" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 4a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v2"/>',
  basket:'<path d="M3 9h18l-3 11H6L3 9zM8 9l4-6 4 6M9 12v5m6-5v5"/>',
  flame:'<path d="M12 22c4 0 7-3 7-7 0-3-2-6-4-8 0 4-2 4-2 4 0-5-2-8-4-9 0 5-4 8-4 13 0 4 3 7 7 7z"/><path d="M12 22c-2 0-3-2-3-4 0-2 2-3 3-5 0 2 3 3 3 5 0 2-1 4-3 4z"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  printer:'<path d="M7 7V3h10v4m0 10h4V8H3v9h4m0-4h10v8H7zm11-2h.01"/>'
};
const icon = (name, size = 20) => '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + shapes[name] + '</svg>';
document.querySelectorAll("[data-icon]").forEach(el => { el.innerHTML = icon(el.dataset.icon, el.dataset.icon === "mark" ? 19 : 18); });

const view = document.querySelector("#view");
const hero = document.querySelector(".hero");
const searchDialog = document.querySelector("#search-dialog");
const searchInput = document.querySelector("#search-input");
const searchStatus = document.querySelector("#search-status");
const searchResults = document.querySelector("#search-results");
const recipeDialog = document.querySelector("#recipe-dialog");
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem("mise-" + key)) ?? fallback; } catch { return fallback; }
};
const write = (key, value) => { try { localStorage.setItem("mise-" + key, JSON.stringify(value)); } catch {} };
const byId = (items, id) => items.find(item => item.id === id);
const allRecipes = [...recipes, ...restaurantRecipes];
const asCount = (value, max = 12) => Math.max(1, Math.min(max, Math.floor(Number(value) || 1)));
const notice = text => {
  const toast = document.querySelector("#toast");
  toast.textContent = text;
  toast.classList.add("shown");
  clearTimeout(notice.timeout);
  notice.timeout = setTimeout(() => toast.classList.remove("shown"), 2400);
};
const selected = Object.assign({}, read("week", {}));
let portions = asCount(read("portions", 1), 8);
let saucePortions = asCount(read("sauce-portions", 2));
let weekTab = "week";
let cuisine = "japanese";
let currentRoute = "";
let returnRoute = "lunches";
let recipeToOpen;
let pantryRegion = "All";
let sauceFilter = "All";
let recipePortions = 1;

const recipeRoute = recipe => "#recipe/" + recipe.id;
const dishPhoto = (recipe, lazy = true, alt = recipe.name) => '<img src="assets/' + (recipe.image ?? recipe.id) + '.webp" alt="' + alt + '"' + (lazy ? ' loading="lazy"' : '') + '>';
const dayOptions = index => recipes.filter(recipe => recipe.day === index);
const weekRecipes = () => days.map((_, index) => dayOptions(index).find(recipe => recipe.id === selected[index]) ?? dayOptions(index)[0]);
const typeLinks = [
  ["restaurants","bowl","Restaurant recipes","Bay Area favorites, dim sum, and more.","fern"],
  ["pantry","jar","Pantry staples","The ingredients that build a cuisine.","sage"],
  ["sauces","whisk","Sauce calculator","Easy sauces, scaled to your table.","peach"],
  ["lunches","bowl","5-day lunch plan","Ten high-protein recipes to mix and match.","gold"],
  ["meat","knife","Meat & cuts","Know what to buy and how to cook it.","rose"]
];
const chip = (label, img = null) => '<span class="chip">' + (img ? icon(img,15) : "") + label + '</span>';
const sectionIntro = (label, title, description, img) => '<section class="page-head"><div class="wrap"><a href="#home" class="crumb">Home</a><span class="crumb-divider">/</span><span class="crumb-current">' + label + '</span><div class="page-heading"><div><h1>' + title + '</h1><p>' + description + '</p></div><div class="page-icon">' + icon(img,55) + '</div></div></div></section>';

function home() {
  return '<section class="wrap explore"><div class="section-head"><div><div class="eyebrow"><i></i> THE CHEAT SHEETS</div><h2>What are we cooking?</h2></div><p>Pick a guide and get straight to the good part.</p></div><div class="tiles">' +
    typeLinks.map(([id,img,title,desc,color]) => '<a class="tile ' + color + '" href="#' + id + '"><div class="tile-top"><span class="tile-icon">' + icon(img,26) + '</span>' + (id === "restaurants" ? '' : '<span class="tile-arrow">' + icon("arrow-up",19) + '</span>') + '</div><h3>' + title + '</h3><p>' + desc + '</p></a>').join("") +
    '</div></section><section class="wrap home-plan"><div class="feature-images">' + [recipes[2], recipes[4], recipes[8]].map(r => '<a href="' + recipeRoute(r) + '">' + dishPhoto(r) + '</a>').join("") +
    '</div><div class="feature-copy"><div class="eyebrow"><i></i> THE LUNCH PLAN</div><h2>5 Days of High-Protein Asian Lunches</h2><p>Choose one of two lunches for each day, then get a grocery list and a prep schedule for the week.</p><a class="button dark" href="#lunches">Build your lunch plan ' + icon("arrow") + '</a></div></section>';
}

function pantryPage() {
  const item = byId(pantry, cuisine) ?? pantry[0];
  const regions = ["All", ...new Set(pantry.map(p => p.region))];
  const visible = pantry.filter(p => pantryRegion === "All" || p.region === pantryRegion);
  const related = recipes.filter(r => r.cuisine.toLowerCase().startsWith(item.name.toLowerCase()));
  return sectionIntro("Pantry", "Pantry staples", "Start with the ingredients you’ll reach for most. Find out what each one does and what you can use in a pinch.", "jar") +
    '<section class="wrap page-body"><div class="pills" aria-label="Filter by region">' + regions.map(region => '<button data-region="' + region + '" aria-pressed="' + (pantryRegion === region) + '">' + region + '</button>').join("") + '</div><div class="pantry-layout"><aside class="cuisine-list" aria-label="Choose a cuisine">' +
    visible.map(p => '<a href="#pantry/' + p.id + '" class="cuisine-choice" ' + (p.id === item.id ? 'aria-current="true"' : '') + '><span class="emblem" aria-hidden="true">' + p.emblem + '</span><span>' + p.name + '</span>' + icon("arrow",16) + '</a>').join("") +
    '</aside><article class="pantry-content"><header class="detail-banner ' + item.color + '"><span class="emblem" aria-hidden="true">' + item.emblem + '</span><div><h2>' + item.name + ' pantry</h2><p>' + item.summary + '</p></div></header><div class="staples">' +
    item.staples.map(([name,desc,swap],i) => '<div class="staple" id="ingredient-' + i + '"><h3>' + name + '</h3><p>' + desc + '</p><p class="swap"><strong>Swap</strong> ' + swap + '</p></div>').join("") +
    '</div><div class="related"><h3>Put it to work</h3><div>' + item.sauces.map(id => '<a class="text-link" href="#sauces/' + id + '">' + byId(sauces,id).name + icon("arrow-up",15) + '</a>').join("") +
    related.map(r => '<a class="text-link" href="' + recipeRoute(r) + '">' + r.name + icon("arrow-up",15) + '</a>').join("") + '</div></div></article></div></section>';
}

const fractions = new Map([[0.125,"⅛"],[0.25,"¼"],[0.375,"⅜"],[0.5,"½"],[0.625,"⅝"],[0.75,"¾"],[0.875,"⅞"]]);
function numberLabel(n) {
  const whole = Math.floor(n);
  const fraction = fractions.get(n - whole);
  return fraction ? (whole || "") + fraction : n.toLocaleString("en-US", {maximumFractionDigits:2});
}
function measure(amount, unit) {
  if (!unit) return numberLabel(amount);
  if (unit === "kg" && amount < 1) return measure(amount * 1000,"g");
  if (unit === "L" && amount < 1) return measure(amount * 1000,"mL");
  if (unit === "tbsp" && amount < 1) return measure(amount * 3,"tsp");
  if (unit === "cup" || unit === "cups") {
    if (amount < .25) return measure(amount * 48,"tsp");
    unit = amount > 1 ? "cups" : "cup";
  }
  if (unit === "tsp" && amount >= 3) {
    const tbsp = Math.floor(amount / 3);
    const remain = amount % 3;
    return numberLabel(tbsp) + " tbsp" + (remain ? " + " + numberLabel(remain) + " tsp" : "");
  }
  if (unit === "cloves" || unit === "stalks") unit = unit.slice(0,-1);
  const plural = ["egg","clove","chile","stalk"].includes(unit) && amount > 1;
  return numberLabel(amount) + " " + unit + (plural ? "s" : "");
}

function counter(key, value, max, label) {
  return '<div class="counter"><button type="button" data-adjust="' + key + '" data-step="-1" aria-label="Fewer ' + label + '" ' + (value === 1 ? 'disabled' : '') + '>' + icon("minus",17) +
    '</button><output aria-live="polite">' + value + '</output><button type="button" data-adjust="' + key + '" data-step="1" aria-label="More ' + label + '" ' + (value === max ? 'disabled' : '') + '>' + icon("plus",17) + '</button></div>';
}

function saucePage(focus) {
  const filters = ["All", "Glaze", "Stir-fry", "Dressing", "Dipping"];
  return sectionIntro("Sauces", "Sauce calculator", "Pick a sauce, set the number of people, and measure straight from the card.", "whisk") +
    '<section class="wrap page-body"><div class="control-bar"><div class="pills" aria-label="Filter sauces">' + filters.map(f => '<button data-sauce-filter="' + f + '" aria-pressed="' + (f === sauceFilter) + '">' + f + '</button>').join("") +
    '</div><div class="count-control">' + icon("people") + '<span>People</span>' + counter("sauce",saucePortions,12,"people") + '</div></div><div class="sauce-grid">' +
    sauces.filter(s => sauceFilter === "All" || s.use === sauceFilter).map(s =>
    '<article class="sauce-card ' + (focus === s.id ? "target" : "") + '" id="sauce-' + s.id + '"><div class="sauce-head ' + s.color + '"><span class="sauce-icon">' + icon("whisk",25) + '</span><div><div class="mini">' + s.cuisine + ' <b>·</b> ' + s.time + ' min</div><h2>' + s.name + '</h2></div></div><div class="sauce-body"><p>' + s.desc + '</p><div class="ratio"><strong>Ratio</strong> ' + s.ratio + '</div><ul class="measure-list">' +
    s.items.map(([ingredient,base]) => '<li><span>' + ingredient + '</span><strong>' + measure(base * saucePortions / 2, "tsp") + '</strong></li>').join("") +
    '</ul><p class="method">' + s.method + '</p><p class="swap"><strong>Swap</strong> ' + s.swap + '</p>' + (s.recipe ? '<a class="text-link" href="#recipe/' + s.recipe + '">Try it on ' + byId(recipes,s.recipe).name + icon("arrow-up",14) + '</a>' : '') + '</div></article>').join("") +
    '</div></section>';
}

function weekCards() {
  const week = weekRecipes();
  return '<div class="week-grid">' + week.map((r, index) => '<article class="day-card"><div class="day-title"><h2>' + days[index] + '</h2>' + chip(r.cuisine) + '</div><a class="day-visual" href="' + recipeRoute(r) + '">' + dishPhoto(r) + '</a><div class="day-content"><h3><a href="' + recipeRoute(r) + '">' + r.name + '</a></h3><p>' + r.desc +
    '</p><div class="day-meta">' + chip(macros(r)[0] + ' g protein',"flame") + chip(r.time + " min","clock") + '</div><label class="option-label" for="day-' + index + '">Choose your lunch</label><select id="day-' + index + '" data-day="' + index + '">' +
    dayOptions(index).map(option => '<option value="' + option.id + '" ' + (option === r ? 'selected' : '') + '>' + option.name + '</option>').join("") + '</select><a class="text-link" href="' + recipeRoute(r) + '">Open recipe ' + icon("arrow",16) + '</a></div></article>').join("") + '</div>';
}
function recipeLibrary() {
  return '<div class="library-grid">' + recipes.map(r => '<a class="library-card" href="' + recipeRoute(r) + '">' + dishPhoto(r) + '<div><div class="mini">' + r.cuisine + '</div><h2>' + r.name + '</h2><p>' + macros(r)[0] + ' g protein · ' + r.time + ' min</p></div></a>').join("") + '</div>';
}

function duration(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return [hours && hours + " hr", rest && rest + " min"].filter(Boolean).join(" ");
}

function restaurantPage(filter) {
  const filters = [["all","All recipes"],["bay","Bay Area"],["dim-sum","Dim sum"],["us","Elsewhere in the U.S."],["asia","Across Asia"]];
  const active = filters.some(([id]) => id === filter) ? filter : "all";
  const visible = restaurantRecipes.filter(r => active === "all" || restaurants[r.restaurant].area === active || (active === "dim-sum" && r.dimSum));
  return sectionIntro("Recipes", "Restaurant recipes", "Cook your way through Bay Area favorites, a dim sum brunch, and standout dishes from 2026 restaurant lists.", "bowl") +
    '<section class="wrap page-body"><div class="restaurant-controls"><div class="pills" aria-label="Filter restaurant recipes">' +
    filters.map(([id,label]) => '<a href="#restaurants' + (id === "all" ? "" : "/" + id) + '" ' + (active === id ? 'aria-current="page"' : '') + '>' + label + '</a>').join("") +
    '</div><p>' + visible.length + (visible.length === 1 ? ' recipe' : ' recipes') + '</p></div><div class="library-grid restaurant-grid">' +
    visible.map(r => {
      const place = restaurants[r.restaurant];
      return '<a class="library-card restaurant-card" href="' + recipeRoute(r) + '">' + dishPhoto(r,true,"") + '<div><div class="restaurant-origin">' + place.name + ' <span>· ' + place.place + '</span></div><h2>' + r.name + '</h2><p>' + r.desc + '</p><div class="restaurant-meta">' + chip(duration(r.time),"clock") + chip(r.cuisine) + '</div></div></a>';
    }).join("") + '</div></section>';
}
function groceryList() {
  const totals = new Map();
  for (const r of weekRecipes()) {
    for (const [id, quantity] of r.items) totals.set(id, (totals.get(id) ?? 0) + quantity * portions);
  }
  const key = "groceries-" + weekRecipes().map(r => r.id).join("-") + "-" + portions;
  const checked = read(key, []);
  const groups = ["Protein","Produce","Grains & noodles","Frozen & chilled","Pantry"];
  return '<div class="list-intro"><div><h2>Your grocery list</h2><p>For ' + (portions * 5) + ' lunches. Meat and seafood weights are raw. For rice, buy about ' + numberLabel(Math.ceil((totals.get("rice") ?? 0) / 30) * 10) + ' g dry or use the cooked amount below.</p></div><button type="button" class="button light" data-print>' + icon("printer",18) + ' Print list</button></div><div class="grocery-grid" data-grocery-key="' + key + '">' +
    groups.map(group => '<section class="grocery-group"><h3>' + group + '</h3>' + [...totals].filter(([id]) => ingredients[id][2] === group).map(([id,n]) => {
      const [label,unit] = ingredients[id];
      return '<label class="grocery-item"><input type="checkbox" data-grocery="' + id + '" ' + (checked.includes(id) ? "checked" : "") + '><span>' + label + '</span><strong>' + (["clove","chile","egg"].includes(unit) ? numberLabel(n) : measure(n,unit)) + '</strong></label>';
    }).join("") + '</section>').join("") + '</div>';
}
function prep() {
  const week = weekRecipes();
  const riceAmount = week.reduce((total, r) => total + (r.items.find(([id]) => id === "rice")?.[1] ?? 0) * portions, 0);
  const wednesday = week[2].id === "shrimp-fried-rice" ? "Make the fried rice on Wednesday from chilled cooked rice. Freeze the Wednesday rice on Sunday if you need to hold it longer than three days, then thaw it in the fridge." : "Cook the Thai basil chicken on Sunday or Wednesday. Fry the egg on Wednesday.";
  return '<div class="prep-layout"><article class="prep-checklist"><div class="eyebrow"><i></i> SUNDAY PREP · ABOUT 75 MINUTES</div><h2>Cook ahead for your week</h2><p>Timing assumes one or two portions per day and a stovetop with two burners. For bigger batches, allow extra time for browning and cooling.</p><ol class="timeline">' +
    [["0–15 min","Start rice and prep produce","Cook enough rice to yield " + numberLabel(riceAmount) + " g for the week. Wash and chop the vegetables for Monday to Wednesday and leave later-week greens whole. Label your containers."],
     ["15–30 min","Mix sauces and cook Monday’s protein","Measure the seasonings for the first two lunches. Cook " + week[0].name + " using the recipe. Keep wet toppings away from crunchy vegetables."],
     ["30–55 min","Cook Tuesday’s lunch","Make " + week[1].name + ". " + wednesday + " If you’re cooking Wednesday’s protein now, overlap it with Tuesday’s cooking on a second burner."],
     ["55–75 min","Portion, chill, and freeze","Portion cooked food in shallow containers. Refrigerate Monday through Wednesday’s cooked portions within 2 hours, or 1 hour above 90°F / 32°C. Chill the rice promptly and freeze Thursday and Friday portions."],
     ["Thursday and Friday","Finish later-week lunches","Cook " + week[3].name + " on Thursday and " + week[4].name + " on Friday, or freeze cooked proteins on Sunday and thaw each in the fridge overnight. Keep any raw meat for later in the week frozen until it’s time to thaw it."]].map(([time,title,copy]) =>
    '<li><span>' + time + '</span><div><h3>' + title + '</h3><p>' + copy + '</p></div></li>').join("") +
    '</ol></article><aside class="safety-note sage"><span class="tile-icon">' + icon("clock",25) + '</span><h3>Store & reheat safely</h3><ul><li>Keep the fridge at 40°F / 4°C or colder.</li><li>Eat refrigerated cooked leftovers within 3–4 days. Freeze portions you’ll need beyond that.</li><li>Reheat cooked leftovers to 165°F / 74°C. Stir microwave meals halfway through and check the center.</li><li>Pack raw cucumber, herbs, and slaw separately to keep them crisp and cold.</li></ul><a class="text-link" href="https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts">FoodSafety.gov storage chart ' + icon("arrow-up",15) + '</a></aside></div>';
}
function lunchPage() {
  const week = weekRecipes();
  const avg = Math.round(week.reduce((sum, r) => sum + macros(r)[0], 0) / week.length);
  const tabs = [["week","5-day plan","bowl"],["recipes","All 10 recipes","jar"],["groceries","Grocery list","basket"],["prep","Prep walkthrough","clock"]];
  const panels = {week:weekCards, recipes:recipeLibrary, groceries:groceryList, prep};
  return sectionIntro("Lunch plan", "5 Days of High-Protein Asian Lunches", "Pick one lunch per day. Your grocery list and prep schedule update when you swap a meal.", "bowl") +
    '<section class="wrap page-body"><div class="plan-summary"><div>' + chip("5 days","bowl") + chip("10 recipes","jar") + chip(avg + " g average protein","flame") + '</div><div class="count-control">' + icon("people") + '<span>Portions per day</span>' + counter("week",portions,8,"portions per day") + '</div></div><div class="plan-tabs" aria-label="Lunch plan views">' +
    tabs.map(([id,name,img]) => '<button data-week-tab="' + id + '" aria-pressed="' + (id === weekTab) + '">' + icon(img,18) + ' ' + name + '</button>').join("") +
    '</div><div class="plan-panel" id="plan-' + weekTab + '">' + panels[weekTab]() + '</div></section>';
}

const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g,"");
const cutRoute = (animal, cut) => "#meat/" + animal.id + "/" + slug(cut[1]);
function externalRecipe([name, url]) {
  const label = name ?? byId(recipes, url.split("/")[1])?.name;
  return '<a class="text-link" href="' + url + '">' + label + ' ' + icon("arrow-up",15) + '</a>';
}
function meatPage(animal, active) {
  const [zone,name,method,choose,prepare,temp,reference] = active;
  return sectionIntro("Meat guide", "At the butcher counter", "Choose a protein and tap a cut to compare what to buy, how to cook it, and which recipe to start with.", "knife") +
    '<section class="wrap page-body"><div class="pills species" aria-label="Choose a protein">' + meats.map(m => '<a href="#meat/' + m.id + '" ' + (animal === m ? 'aria-current="page"' : '') + '>' + m.name + '</a>').join("") +
    '</div><div class="meat-layout"><article class="map-panel"><div class="map-head"><h2>' + animal.name + ' cuts</h2><p>' + animal.summary + '</p></div><div class="animal-map"><canvas id="cut-map" width="1060" height="510" aria-hidden="true"></canvas></div><div class="map-legend">' +
    animal.zones.map(([region], index) => '<a href="' + cutRoute(animal,animal.cuts.find(c => c[0] === region)) + '" ' + (zone === region ? 'aria-current="true"' : '') + '><span>' + (index+1) + '</span>' + region + '</a>').join("") + '</div></article>' +
    '<article class="cut-detail"><div class="eyebrow"><i></i> ' + (zone || animal.name).toUpperCase() + '</div><h2>' + name + '</h2>' + chip(method,"flame") +
    '<div class="cut-facts"><div><h3>What to buy</h3><p>' + choose + '</p></div><div><h3>How to cook it</h3><p>' + prepare + '</p></div><div><h3>Safe minimum</h3><p>' + temp + '</p></div></div><div class="related"><h3>Try it in the kitchen</h3>' + externalRecipe(reference) + '</div></article></div>' +
    '<div class="all-cuts"><h2>Explore all ' + animal.name.toLowerCase() + ' cuts</h2><div class="pills">' + animal.cuts.map(cut => '<a href="' + cutRoute(animal,cut) + '" ' + (cut === active ? 'aria-current="true"' : '') + '>' + cut[1] + '</a>').join("") + '</div><p class="reference">Cut references and safety guidance · ' + externalRecipe(animal.reference) + ' · <a href="https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures">FoodSafety.gov</a></p></div></section>';
}
function drawMeat(animal, active) {
  const canvas = document.querySelector("#cut-map");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(2,2);
  const outline = new Path2D(animal.outline);
  ctx.fillStyle = "#f4e2d4";
  ctx.strokeStyle = "#9f6b58";
  ctx.lineWidth = 2.2;
  ctx.fill(outline); ctx.stroke(outline);
  for (const [i,[zone,path,x,y]] of animal.zones.entries()) {
    const region = new Path2D(path);
    ctx.fillStyle = active[0] === zone ? animal.color : ["#e8b9a4","#edc7ae","#ead6b4"][i % 3];
    ctx.fill(region);
    ctx.strokeStyle = "#fff4e8";
    ctx.lineWidth = 1.35;
    ctx.stroke(region);
    ctx.beginPath(); ctx.arc(x,y,9,0,2*Math.PI);
    ctx.fillStyle = active[0] === zone ? "#fff8ee" : "#f9e7d8";
    ctx.fill();
    ctx.fillStyle = "#513629";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText(i+1,x,y+0.5);
  }
  ctx.strokeStyle = "#976e5d"; ctx.lineWidth = 2; ctx.lineCap = "round";
  animal.accents.forEach(path => ctx.stroke(new Path2D(path)));
  const spot = event => {
    const bounds = canvas.getBoundingClientRect();
    const x = (event.clientX-bounds.left) * canvas.width / bounds.width;
    const y = (event.clientY-bounds.top) * canvas.height / bounds.height;
    return animal.zones.find(([,path]) => ctx.isPointInPath(new Path2D(path),x,y))?.[0];
  };
  canvas.addEventListener("pointermove", event => { canvas.style.cursor = spot(event) ? "pointer" : "default"; });
  canvas.addEventListener("click", event => {
    const zone = spot(event);
    if (zone) location.hash = cutRoute(animal, animal.cuts.find(c => c[0] === zone));
  });
}

function nutrition(r) {
  const [protein,carbs,fat,kcal] = macros(r);
  return '<div class="macro-grid" aria-label="Estimated macros per serving">' +
    [[kcal,"Calories"],[protein + " g","Protein"],[carbs + " g","Carbs"],[fat + " g","Fat"]].map(([value,label]) => '<div><strong>' + value + '</strong><span>' + label + '</span></div>').join("") +
    '</div><p class="reference">Estimates per serving from typical ingredient values. Brands and substitutions vary. <a href="https://fdc.nal.usda.gov/">USDA FoodData Central</a></p>';
}

function recipeIngredients(r) {
  if (r.restaurant) return r.items;
  return r.items.map(([id,amount]) => [amount,ingredients[id][1],ingredients[id][0]]);
}

function recipeSource(r) {
  if (!r.restaurant) {
    return '<div class="related source-note"><p>The bowl and its macros are Mise adaptations. See the original recipe for the published preparation.</p><a class="text-link" href="' + r.source[2] + '">' + r.source[1] + ' · ' + r.source[0] + ' ' + icon("arrow-up",15) + '</a></div>';
  }
  return '<div class="recipe-inspiration"><h3>Restaurant inspiration</h3><p>' + r.inspiration + ' This is a Mise home-kitchen adaptation.</p><div class="recipe-source-links">' +
    restaurants[r.restaurant].sources.map(([label,url]) => '<a href="' + url + '">' + label + '</a>').join("") + '</div></div>';
}

function showRecipe(r) {
  const place = restaurants[r.restaurant];
  const scale = recipePortions / (r.servings ?? 1);
  const byline = place ? place.name + " · " + place.place : r.cuisine;
  const yieldNote = r.pieces ? '<p class="reference recipe-yield">Makes about ' + Math.round(r.pieces * scale) + ' pieces</p>' : '';
  recipeDialog.innerHTML = '<div class="recipe-cover">' + dishPhoto(r,false) + '<button class="icon-button" type="button" data-close aria-label="Close recipe">' + icon("x") + '</button></div><div class="recipe-content"><div class="eyebrow"><i></i> ' + byline.toUpperCase() + '</div><h2 id="recipe-title">' + r.name + '</h2><p>' + r.desc + '</p><div class="recipe-meta">' + chip(duration(r.time) + (r.active ? " total" : ""),"clock") + (r.active ? chip(duration(r.active) + " hands-on") : "") + chip(r.animal,"bowl") + '</div>' + (place ? '' : nutrition(r)) +
    '<div class="recipe-columns"><section><div class="recipe-ingredients"><h3>Ingredients</h3><div class="count-control"><span>Servings</span>' + counter("recipe",recipePortions,8,"servings") + '</div></div>' + yieldNote + '<ul class="measure-list">' +
    recipeIngredients(r).map(([amount,unit,label]) => '<li><span>' + label + '</span><strong>' + measure(amount * scale,unit) + '</strong></li>').join("") +
    '</ul></section><section><h3>Method</h3><ol class="steps">' + r.steps.map(step => '<li>' + step + '</li>').join("") + '</ol>' + (place ? '' : '<p class="reference">For larger batches, sear in batches to avoid crowding the pan.</p>') + '</section></div><div class="recipe-notes"><div class="sage"><h3>Substitutions</h3><p>' + r.swap + '</p></div><div class="gold"><h3>Storage & reheating</h3><p>' + r.store +
    '</p><p>Chill within 2 hours, use within 3–4 days or freeze, and reheat cooked leftovers to 165°F / 74°C.</p></div></div>' + recipeSource(r) +
    (r.sauce ? '<a class="text-link recipe-sauce" href="#sauces/' + r.sauce + '">Related sauce calculator</a>' : '') + '</div>';
  if (!recipeDialog.open) recipeDialog.showModal();
}

const entries = [
  ...recipes.map(r => ({title:r.name, kind:"Recipe", link:recipeRoute(r), desc:r.cuisine + " · " + r.time + " min · " + macros(r)[0] + " g protein", terms:r.items.map(([id]) => ingredients[id][0]).join(" ")})),
  ...restaurantRecipes.map(r => ({title:r.name, kind:"Recipe", link:recipeRoute(r), desc:restaurants[r.restaurant].name + " · " + restaurants[r.restaurant].place + " · " + duration(r.time), terms:[r.inspiration,r.cuisine,r.animal,r.dimSum ? "dim sum yum cha" : "",...recipeIngredients(r).map(([, ,label]) => label)].join(" ")})),
  ...sauces.map(s => ({title:s.name, kind:"Sauce", link:"#sauces/" + s.id, desc:s.cuisine + " · " + s.time + " min", terms:s.items.map(([name]) => name).join(" ") + " " + s.use})),
  ...pantry.flatMap(p => p.staples.map(([name, desc],i) => ({title:name, kind:"Pantry", link:"#pantry/" + p.id + "/" + i, desc:p.name + " pantry · " + desc, terms:p.name}))),
  ...meats.flatMap(m => m.cuts.map(c => ({title:c[1], kind:"Meat cut", link:cutRoute(m,c), desc:m.name + " · " + c[2], terms:c.slice(3,5).join(" ")})))
];
const normalize = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
function search() {
  const query = normalize(searchInput.value);
  const tokens = query.split(" ").filter(Boolean);
  const results = tokens.length ? entries.map(item => {
    const title = normalize(item.title);
    const searchable = normalize([item.title,item.kind,item.desc,item.terms].join(" "));
    const score = tokens.every(token => searchable.includes(token)) ? (title === query ? 9 : title.startsWith(query) ? 6 : title.includes(query) ? 3 : 1) : 0;
    return {item,score};
  }).filter(result => result.score).sort((a,b) => b.score-a.score).map(result => result.item) : ["Seolleongtang","Pork & Shrimp Siu Mai","Teriyaki glaze","Flank steak"].map(title => entries.find(e => e.title === title));
  searchStatus.textContent = query ? results.length + (results.length === 1 ? " result" : " results") + (results.length > 24 ? " · showing first 24" : "") : "Popular in the guide";
  searchResults.innerHTML = results.length ? results.slice(0,24).map(r => '<a href="' + r.link + '" class="search-result"><span class="result-kind">' + r.kind + '</span><span><strong>' + r.title + '</strong><small>' + r.desc + '</small></span>' + icon("arrow-up",16) + '</a>').join("") :
    '<p class="empty">No matches. Try a shorter ingredient or a cut name.</p>';
}
function openSearch(query = "") {
  if (!searchDialog.open) searchDialog.showModal();
  searchInput.value = query;
  search();
  searchInput.focus();
}
searchInput.addEventListener("input", search);
searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === "ArrowDown") {
    const link = searchResults.querySelector("a");
    if (!link) return;
    event.preventDefault();
    if (event.key === "Enter") link.click(); else link.focus();
  }
});
searchResults.addEventListener("click", event => {
  const link = event.target.closest("a");
  if (!link) return;
  searchDialog.close();
  if (location.hash === link.hash) renderRoute(true);
});

function renderRoute(reset = false, requestedFocus = "") {
  const [section, id, sub] = location.hash.slice(1).split("/");
  const route = ["restaurants","pantry","sauces","lunches","meat"].includes(section) ? section : "home";
  if (section === "recipe") {
    const r = byId(allRecipes,id);
    if (r) {
      if (!currentRoute) {
        history.replaceState(null,"",r.restaurant ? "#restaurants" : "#lunches");
        renderRoute(true);
        history.replaceState(null,"",recipeRoute(r));
      }
      if (recipeToOpen !== r) {
        returnRoute = currentRoute;
        recipePortions = r.servings ?? (currentRoute.startsWith("lunches") ? portions : 1);
        recipeToOpen = r;
      }
      showRecipe(r);
      document.title = r.name + " — Mise";
      return;
    }
  }
  const closedRecipe = recipeToOpen;
  recipeToOpen = null;
  if (recipeDialog.open) recipeDialog.close();
  const hash = section === route ? location.hash.slice(1) : route;
  const viewChanged = currentRoute.split("/")[0] !== route;
  const restoringRecipe = closedRecipe && currentRoute === hash;
  currentRoute = hash;
  hero.hidden = route !== "home";
  let markup = "";
  let animal;
  let active;
  let target;
  if (route === "restaurants") {
    markup = restaurantPage(id);
  } else if (route === "pantry") {
    const item = byId(pantry,id);
    if (item) {
      cuisine = item.id;
      if (reset && pantryRegion !== "All" && item.region !== pantryRegion) pantryRegion = "All";
    }
    const pantryFocus = item && /^[0-5]$/.test(sub) ? sub : "";
    markup = pantryPage();
    if (pantryFocus) target = "#ingredient-" + pantryFocus;
  } else if (route === "sauces") {
    if (reset && byId(sauces,id)) sauceFilter = "All";
    markup = saucePage(id);
    if (byId(sauces,id)) target = "#sauce-" + id;
  } else if (route === "lunches") {
    if (reset) weekTab = ["recipes","groceries","prep"].includes(id) ? id : "week";
    markup = lunchPage();
  } else if (route === "meat") {
    animal = byId(meats,id) ?? meats[0];
    active = animal.cuts.find(c => slug(c[1]) === sub) ?? animal.cuts[0];
    markup = meatPage(animal,active);
  } else {
    markup = home();
  }
  view.innerHTML = markup;
  if (animal) drawMeat(animal,active);
  document.querySelectorAll("nav a").forEach(link => {
    if (link.hash === "#" + route) link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  });
  document.title = ({"home":"Mise — The home cook’s field guide","restaurants":"Restaurant recipes — Mise","pantry":"Pantry staples — Mise","sauces":"Sauce calculator — Mise","lunches":"5 Days of High-Protein Asian Lunches — Mise","meat":"Meat & cuts — Mise"})[route];
  if (requestedFocus) view.querySelector(requestedFocus)?.focus({preventScroll:true});
  if (restoringRecipe) document.querySelector('main a[href="' + recipeRoute(closedRecipe) + '"]')?.focus({preventScroll:true});
  if (reset && target) {
    const el = view.querySelector(target);
    el?.classList.add("target");
    el?.scrollIntoView({block:"start"});
  } else if (reset && viewChanged) {
    window.scrollTo(0,0);
  }
}
window.addEventListener("hashchange", () => renderRoute(true));
recipeDialog.addEventListener("close", () => {
  if (location.hash.startsWith("#recipe/") && !recipeDialog.open) location.hash = returnRoute;
});

for (const dialog of [searchDialog, recipeDialog]) {
  dialog.addEventListener("click", event => {
    if (event.target.closest("[data-close]") || event.target === dialog) dialog.close();
  });
}
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName) && !searchDialog.open && !recipeDialog.open) {
    event.preventDefault();
    openSearch();
  }
});
document.addEventListener("click", event => {
  const skip = event.target.closest(".skip");
  if (skip) {
    event.preventDefault();
    document.querySelector("#main").focus();
    return;
  }
  const link = event.target.closest("a[href^='#']");
  if (link && recipeDialog.open && recipeDialog.contains(link) && !link.hash.startsWith("#recipe/")) recipeDialog.close();
  const button = event.target.closest("button");
  if (!button) return;
  const d = button.dataset;
  if (button.hasAttribute("data-search")) openSearch();
  if (d.query) openSearch(d.query);
  if (d.region) {
    pantryRegion = d.region;
    const first = pantry.find(p => d.region === "All" || p.region === d.region);
    if (d.region !== "All" && byId(pantry,cuisine).region !== d.region) {
      cuisine = first.id;
      history.replaceState(null,"","#pantry/" + cuisine);
    }
    renderRoute(false,'[data-region="' + d.region + '"]');
  }
  if (d.sauceFilter) {
    sauceFilter = d.sauceFilter;
    if (location.hash.includes("/")) history.replaceState(null,"","#sauces");
    renderRoute(false,'[data-sauce-filter="' + d.sauceFilter + '"]');
  }
  if (d.weekTab) {
    weekTab = d.weekTab;
    history.replaceState(null,"",d.weekTab === "week" ? "#lunches" : "#lunches/" + d.weekTab);
    renderRoute(false,'[data-week-tab="' + d.weekTab + '"]');
  }
  if (d.adjust) {
    const step = Number(d.step);
    const selector = '[data-adjust="' + d.adjust + '"][data-step="' + d.step + '"]';
    const alternate = '[data-adjust="' + d.adjust + '"][data-step="' + -step + '"]';
    if (d.adjust === "sauce") { saucePortions = asCount(saucePortions + step); write("sauce-portions",saucePortions); }
    if (d.adjust === "week") { portions = asCount(portions + step,8); write("portions",portions); }
    if (d.adjust === "recipe") {
      recipePortions = asCount(recipePortions + step,8);
      const top = recipeDialog.scrollTop;
      showRecipe(recipeToOpen);
      recipeDialog.scrollTop = top;
    } else renderRoute(false);
    const parent = d.adjust === "recipe" ? recipeDialog : view;
    const preferred = parent.querySelector(selector);
    (preferred?.disabled ? parent.querySelector(alternate) : preferred)?.focus({preventScroll:true});
  }
  if (button.hasAttribute("data-print")) window.print();
});

document.addEventListener("change", event => {
  const input = event.target;
  if (input.hasAttribute("data-day")) {
    selected[input.dataset.day] = input.value;
    write("week",selected);
    renderRoute(false,"#day-" + input.dataset.day);
    notice(days[input.dataset.day] + " lunch updated");
  }
  if (input.hasAttribute("data-grocery")) {
    const key = input.closest("[data-grocery-key]").dataset.groceryKey;
    const values = new Set(read(key,[]));
    if (input.checked) values.add(input.dataset.grocery); else values.delete(input.dataset.grocery);
    write(key,[...values]);
  }
});
renderRoute(true);
