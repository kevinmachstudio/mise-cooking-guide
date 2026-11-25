import { matchInventory, matchesText } from "./ingredient-match.js";
import { estimatedNutrition, summarizeMeals, weeklyTemplates } from "./meal-templates.js";
import { groceryTotals, grocerySignature, groceryQuantity, groceryChanges, groceryText, renderWeeklyGroceries } from "./weekly-groceries.js";

const meals = {breakfast:"Breakfast", lunch:"Lunch", dinner:"Dinner"};
const shortDay = new Intl.DateTimeFormat("en-US", {weekday:"short"});
const fullDate = new Intl.DateTimeFormat("en-US", {weekday:"long", month:"short", day:"numeric"});
const storageKey = "meal-calendar";
const portionChoices = [.5,.75,1,1.25,1.5,1.75,2];
const example = "Chicken thighs, rice, scallions, cucumber, soy sauce, gochujang, honey, rice vinegar, sesame oil";

export function shiftDay(date, amount) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount, 12);
}

export function weekStart(date) {
  return shiftDay(date, -((date.getDay() + 6) % 7));
}

export function dateKey(date) {
  const pad = number => String(number).padStart(2,"0");
  return date.getFullYear() + "-" + pad(date.getMonth()+1) + "-" + pad(date.getDate());
}

export function storedMeal(value) {
  if (typeof value === "string") return {id:value,servings:1};
  if (value?.id && portionChoices.includes(value.servings)) return value;
  return null;
}

function sameMeal(first, second) {
  return first?.id === second?.id && first?.servings === second?.servings && first?.leftoverOf === second?.leftoverOf;
}

const mealOrder = Object.keys(meals);
function beforeSlot(first, second) {
  const [firstDay,firstMeal] = first.split("|");
  const [secondDay,secondMeal] = second.split("|");
  return firstDay < secondDay || (firstDay === secondDay && mealOrder.indexOf(firstMeal) < mealOrder.indexOf(secondMeal));
}

export function plannerPage(icon) {
  return `<div id="planner-page"><section class="planner-intro">
    <div class="wrap planner-intro-inner">
      <div><h1>This Week</h1><p>Plan breakfast, lunch, and dinner. Add a recipe to any day.</p></div>
      <div class="planner-intro-actions"><button type="button" class="button planner-match-link" data-jump-matcher>${icon("basket",19)} Cook from my ingredients</button>
        <button type="button" class="button light" data-kitchen-data>Kitchen data</button></div>
    </div>
  </section>
  <section class="wrap planner-body" aria-label="Weekly meal planner">
    <div class="calendar-toolbar">
      <div><h2 id="calendar-range" aria-live="polite"></h2><p id="calendar-count"></p></div>
      <div class="calendar-nav">
        <button class="button light" type="button" aria-controls="weekly-groceries" aria-expanded="false" data-show-groceries>${icon("basket",17)} Groceries</button>
        <button class="button light" type="button" data-share-week>${icon("copy",16)} Share week</button>
        <button class="button light" type="button" data-week-templates>Weekly templates</button>
        <button class="button light" type="button" data-plan-undo hidden>Undo</button>
        <button class="icon-button" type="button" data-week-move="-7" aria-label="Previous week">${icon("chevron-left",17)}</button>
        <button class="button light" type="button" data-week-today>Today</button>
        <button class="icon-button" type="button" data-week-move="7" aria-label="Next week">${icon("chevron-right",17)}</button>
      </div>
    </div>
    <div class="planner-layout">
      <div><p class="calendar-hint">${icon("grip",17)} <span><span class="calendar-mouse-hint">Drag any part of a meal cell.</span><span class="calendar-touch-hint">Touch and hold a meal cell to drag.</span> Drop on a day heading to keep its meal time.</span></p><div id="calendar-grid" class="calendar-grid"></div><p class="calendar-note">Weekday lunches start with your <a href="#lunches">5-day lunch plan</a>. Calendar edits are saved in this browser.</p></div>
      <aside class="recipe-shelf" aria-labelledby="shelf-title">
        <h2 id="shelf-title">Recipe shelf</h2><p>Drag a recipe onto the calendar, or select it to pick a day.</p>
        <label class="field-search">${icon("search",17)}<input type="search" id="shelf-search" placeholder="Find a recipe" aria-label="Search the recipe shelf" autocomplete="off"></label>
        <div id="shelf-results" class="shelf-results"></div>
      </aside>
    </div>
    <section id="weekly-groceries" class="weekly-groceries" aria-labelledby="weekly-groceries-title" hidden>
      <div class="weekly-groceries-head"><div><h2 id="weekly-groceries-title" tabindex="-1">Weekly groceries</h2><p id="weekly-groceries-range"></p></div><button class="button light" type="button" data-hide-groceries>Close list</button></div>
      <div id="weekly-grocery-items"></div>
    </section>
    <section class="matcher" aria-labelledby="matcher-title">
      <div class="matcher-heading"><h2 id="matcher-title">What can I cook?</h2><p>Paste what you have to find the closest recipes and see what’s missing.</p></div>
      <div class="matcher-layout">
        <form id="inventory-form" class="inventory-form">
          <label for="ingredient-inventory">Ingredients on hand</label>
          <textarea id="ingredient-inventory" rows="5" placeholder="Chicken thighs, rice, scallions…" required></textarea>
          <p class="inventory-tip">Separate items with commas or new lines. Matches check ingredient names, so confirm quantities in the recipe.</p>
          <label class="staples-toggle"><input type="checkbox" id="inventory-staples" checked> Assume I have plain oil, salt, black pepper, and sugar</label>
          <div class="inventory-actions"><button type="submit" class="button dark">Find recipes</button><button type="button" class="button light" data-inventory-example>Try an example</button></div>
        </form>
        <div id="inventory-panel"><p id="inventory-status" class="inventory-status" aria-live="polite"></p><div id="inventory-results" class="inventory-results"></div></div>
      </div>
    </section>
    <dialog id="planner-dialog" aria-labelledby="planner-dialog-title"></dialog>
  </section></div>`;
}

export function mountPlanner(root, recipes, {icon, read, write, notice, recipeIngredients, recipeRoute, dishPhoto, duration, recipeContext, weekRecipes, numberLabel, measure, copyText}) {
  const grid = root.querySelector("#calendar-grid");
  const shelf = root.querySelector("#shelf-results");
  const shelfSearch = root.querySelector("#shelf-search");
  const dialog = root.querySelector("#planner-dialog");
  const inventoryForm = root.querySelector("#inventory-form");
  const inventoryInput = root.querySelector("#ingredient-inventory");
  const inventoryStaples = root.querySelector("#inventory-staples");
  const inventoryStatus = root.querySelector("#inventory-status");
  const inventoryResults = root.querySelector("#inventory-results");
  const undo = root.querySelector("[data-plan-undo]");
  const groceryPanel = root.querySelector("#weekly-groceries");
  const groceryButton = root.querySelector("[data-show-groceries]");
  let shoppingItems = [];
  const recipeIndex = new Map(recipes.map(recipe => [recipe.id,recipe]));
  const cookingOrder = [...recipes].sort((a,b) => a.time - b.time || a.name.localeCompare(b.name));
  const searchIndex = new Map(recipes.map(recipe => [recipe.id, [recipe.name, recipeContext(recipe), recipe.cuisine, recipe.animal,
    ...recipeIngredients(recipe).map(([, ,name]) => name)].join(" ")]));
  const findRecipes = query => cookingOrder.filter(recipe => matchesText(query,searchIndex.get(recipe.id)));
  const savedInventory = read("inventory", {});
  const slots = new Map();
  const defaultMeals = new Map();
  let start = weekStart(new Date());
  let calendar = read(storageKey, {});
  let lastChange = [];
  let drag;
  let highlighted;
  let dragOrigin;
  let pointerDrag;
  let suppressDragClick = false;
  let moveSource;
  let moveCalendar;
  let activeSlot;
  let plannedRecipe;
  let draftBaseline = "";
  let swapServings;
  let swapOriginal;
  let swapPreview;

  const rawMealAt = (data,slot) => Object.hasOwn(data,slot) ? storedMeal(data[slot]) : defaultMeals.get(slot) ?? null;
  const validSource = (data,slot,entry) => {
    const source = entry?.leftoverOf;
    if (!source || !slots.has(source) || !beforeSlot(source,slot)) return false;
    const cook = rawMealAt(data,source);
    return cook?.id === entry.id && !cook.leftoverOf;
  };
  const mealAt = (data,slot) => {
    const entry = rawMealAt(data,slot);
    return entry?.leftoverOf && !validSource(data,slot,entry) ? {id:entry.id,servings:entry.servings} : entry;
  };
  const portionsMenu = (value = 1,name = "servings") => '<select name="' + name + '" aria-label="Portion for this meal">' + portionChoices.map(size =>
    '<option value="' + size + '"' + (size === value ? " selected" : "") + '>' + numberLabel(size) + (size === 1 ? " serving" : " servings") + '</option>').join("") + '</select>';
  const range = new Intl.DateTimeFormat("en-US", {month:"short", day:"numeric", year:"numeric"});
  const weekDates = () => Array.from({length:7}, (_, index) => shiftDay(start,index));

  function weekCooks(data) {
    const cooks = new Map();
    for (const slot of slots.keys()) {
      const entry = mealAt(data,slot);
      if (!entry) continue;
      const source = entry.leftoverOf || slot;
      const batch = cooks.get(source) ?? {id:entry.id,servings:0};
      batch.servings += entry.servings;
      cooks.set(source,batch);
    }
    return cooks;
  }

  const groceryItems = data => groceryTotals(weekCooks(data).values(),recipeIndex,recipeIngredients);

  function renderWeek(focusSlot) {
    calendar = read(storageKey, {});
    slots.clear();
    defaultMeals.clear();
    const today = dateKey(new Date());
    const week = weekDates();
    weekRecipes().forEach((recipe,index) => defaultMeals.set(dateKey(week[index]) + "|lunch",{id:recipe.id,servings:1}));
    for (const day of week) for (const [meal,label] of Object.entries(meals)) {
      slots.set(dateKey(day) + "|" + meal,label + " · " + fullDate.format(day));
    }
    const batchSizes = new Map();
    for (const slot of slots.keys()) {
      const entry = mealAt(calendar,slot);
      if (entry?.leftoverOf) batchSizes.set(entry.leftoverOf,(batchSizes.get(entry.leftoverOf) ?? 0) + entry.servings);
    }
    root.querySelector("#calendar-range").textContent = range.formatRange(start,week[6]);
    let count = 0;
    grid.innerHTML = week.map(day => {
      const key = dateKey(day);
      const isToday = key === today;
      const daily = summarizeMeals(Object.keys(meals).map(meal=>mealAt(calendar,key + "|" + meal)),recipeIndex);
      return `<article class="calendar-day${isToday ? ' current-day' : ''}" data-drop-day="${key}" aria-label="${fullDate.format(day)}">
        <h3><span class="calendar-weekday">${shortDay.format(day)}</span><time datetime="${key}"${isToday ? ' aria-current="date"' : ''}>${day.getDate()}</time></h3>
        ${Object.entries(meals).map(([meal, label]) => {
          const slot = key + "|" + meal;
          const entry = mealAt(calendar,slot);
          const recipe = recipeIndex.get(entry?.id);
          const extra = batchSizes.get(slot) ?? 0;
          if (recipe) count++;
          return `<div class="calendar-cell" data-drop-slot="${slot}"${recipe ? ' data-drag-meal' : ''}>
            <div class="slot-label"><span>${label}</span>${recipe ? `<button class="slot-remove" data-remove-meal="${slot}" type="button" aria-label="Remove ${recipe.name} from ${slots.get(slot)}">${icon("x",14)}</button>` : ""}</div>
            ${recipe ? `<a class="planned-meal" href="${recipeRoute(recipe)}" draggable="false" data-recipe-portion="${entry.servings+extra}">${recipe.name}</a>${entry.leftoverOf ? '<small class="batch-note" title="From ' + slots.get(entry.leftoverOf) + '">Leftovers · ' + numberLabel(entry.servings) + (entry.servings === 1 ? ' serving' : ' servings') + '</small>' : extra ? '<small class="batch-note">Cook ' + numberLabel(entry.servings+extra) + ' servings</small>' : entry.servings !== 1 ? '<small class="planned-portion">' + numberLabel(entry.servings) + ' servings</small>' : ''}` : ""}
            <div class="slot-actions">${recipe ? `<button class="slot-move" data-move-meal="${slot}" type="button" aria-label="Move ${recipe.name} from ${slots.get(slot)}" title="Drag or choose a destination">${icon("grip",15)} Move</button>` : ""}
              <button class="slot-picker${recipe ? ' occupied' : ''}" data-pick-slot="${slot}" type="button" aria-label="${recipe ? "Change" : "Add recipe to"} ${slots.get(slot)}">${recipe ? "Change" : icon("plus",14) + " Add"}</button></div>
          </div>`;
        }).join("")}
        <div class="day-nutrition">${daily.known ? `<strong>${Math.round(daily.protein)} g protein</strong><span>${Math.round(daily.kcal).toLocaleString("en-US")} kcal · est.</span>${daily.count > daily.known ? `<small>${daily.known} of ${daily.count} meals</small>` : ''}` : daily.count ? 'Estimate unavailable' : ''}</div>
      </article>`;
    }).join("");
    root.querySelector("#calendar-count").textContent = count + (count === 1 ? " meal planned" : " meals planned");
    undo.hidden = lastChange.length === 0;
    if (!groceryPanel.hidden) renderGroceries();
    if (focusSlot) grid.querySelector('[data-pick-slot="' + focusSlot + '"]')?.focus({preventScroll:true});
  }

  function groceryKey() { return "weekly-grocery-" + dateKey(start); }

  function renderGroceries() {
    shoppingItems = groceryItems(calendar);
    root.querySelector("#weekly-groceries-range").textContent = range.formatRange(start,shiftDay(start,6));
    root.querySelector("#weekly-grocery-items").innerHTML = renderWeeklyGroceries(shoppingItems,read(groceryKey(),{}),measure);
  }

  function stageCalendar(latest, changes, recordDefaults = false) {
    const updates = new Map();
    function stage(slot,next) {
      const previous = latest[slot];
      if (sameMeal(rawMealAt(latest,slot),next) && (!recordDefaults || Object.hasOwn(latest,slot))) return;
      updates.set(slot,{slot,previous:updates.has(slot) ? updates.get(slot).previous : previous,next});
      latest[slot] = next;
    }
    for (const change of changes) stage(...change);
    let replanned = 0;
    for (const slot of slots.keys()) {
      const entry = rawMealAt(latest,slot);
      if (!entry?.leftoverOf || validSource(latest,slot,entry)) continue;
      stage(slot,{id:entry.id,servings:entry.servings});
      replanned++;
    }
    return {updates:[...updates.values()],replanned};
  }

  function changeCalendar(changes, message, focusSlot, recordDefaults = false) {
    const latest = read(storageKey, {});
    const {updates,replanned} = stageCalendar(latest,changes,recordDefaults);
    if (updates.length && !write(storageKey,latest)) {
      notice("Couldn’t save this calendar change");
      return false;
    }
    if (updates.length) {
      lastChange = updates;
      notice(message + (replanned ? " · " + replanned + (replanned === 1 ? " leftover became a separate cook" : " leftovers became separate cooks") : ""));
    }
    renderWeek(focusSlot);
    return true;
  }

  function undoCalendar() {
    const latest = read(storageKey, {});
    const changedElsewhere = lastChange.some(({slot,next}) => !Object.hasOwn(latest,slot) || !sameMeal(storedMeal(latest[slot]),next));
    if (!changedElsewhere) {
      for (const {slot,previous} of lastChange) {
        if (previous === undefined) delete latest[slot]; else latest[slot] = previous;
      }
      write(storageKey,latest);
    }
    lastChange = [];
    renderWeek();
    root.querySelector("[data-week-today]").focus({preventScroll:true});
    notice(changedElsewhere ? "The calendar changed in another tab" : "Calendar change undone");
  }

  function renderShelf() {
    const list = findRecipes(shelfSearch.value);
    shelf.innerHTML = list.length ? list.map(recipe => `<button class="shelf-recipe" type="button" draggable="true" data-drag-recipe="${recipe.id}" data-plan-recipe="${recipe.id}">
      ${dishPhoto(recipe,true,"")}<span><strong>${recipe.name}</strong><small>${duration(recipe.time)} · ${recipe.cuisine}</small></span>${icon("plus",15)}
    </button>`).join("") : '<p class="shelf-empty">No recipes match that search.</p>';
  }

  function showDialog(title, body) {
    dialog.dataset.draft = "false";
    dialog.innerHTML = `<div class="dialog-head"><h2 id="planner-dialog-title">${title}</h2><button class="icon-button" type="button" aria-label="Close planner dialog" data-close-planner>${icon("x",18)}</button></div><p class="draft-message" role="status" data-draft-message hidden>Save your change or close the dialog to discard it.</p>${body}`;
    draftBaseline = dialogValues();
    if (!dialog.open) dialog.showModal();
  }

  function dialogValues() {
    return Array.from(dialog.querySelectorAll("select"),field=>field.value).join("|");
  }

  function renderPicker() {
    const field = dialog.querySelector("#picker-search");
    const list = findRecipes(field.value);
    dialog.querySelector("#picker-results").innerHTML = list.length ? list.map(recipe => `<button type="button" class="picker-result" data-choose-recipe="${recipe.id}">
      ${dishPhoto(recipe,true,"")}<span><strong>${recipe.name}</strong><small>${duration(recipe.time)} · ${recipe.cuisine}</small></span>${icon("plus",16)}
    </button>`).join("") : '<p class="shelf-empty">No recipes match that search.</p>';
  }

  function openPicker(slot) {
    activeSlot = slot;
    const entry = mealAt(read(storageKey,{}),slot);
    const existing = recipeIndex.get(entry?.id);
    const options = [...slots].filter(([source])=>beforeSlot(source,slot)).map(([source,label])=>{
      const cook = mealAt(calendar,source);
      if (!cook || cook.leftoverOf) return "";
      return '<option value="' + source + '" data-recipe="' + cook.id + '"' + (entry?.leftoverOf === source ? ' selected' : '') + '>' + label + ' · ' + recipeIndex.get(cook.id)?.name + '</option>';
    }).join("");
    showDialog(existing ? "Change recipe" : "Add a recipe", `<p class="planner-dialog-context">${slots.get(slot)}${existing ? " · Replacing " + existing.name : ""}</p>
      <label class="field-search">${icon("search",18)}<input type="search" id="picker-search" aria-label="Search recipes to add" placeholder="Try galbi, shrimp, or tofu" autocomplete="off"></label>
      <div class="picker-portion"><label>Portion ${portionsMenu(entry?.servings,"picker-servings")}</label>${existing ? '<button type="button" class="button light" data-save-portion>Save portion</button><button type="button" class="button light" data-quick-swaps>Quick swaps</button>' : ''}</div>
      ${options ? `<details class="leftover-picker"${entry?.leftoverOf ? ' open' : ''}><summary>Use leftovers</summary><form id="plan-leftovers"><label>Cooked earlier this week <select name="source" required><option value="">Choose the cooking meal</option>${options}</select></label><p>The source batch grows by the portion above. Refrigerate promptly and freeze anything you’ll keep longer than 3–4 days. <a href="https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts">FoodSafety.gov storage chart</a></p><button class="button light" type="submit">Save leftovers</button></form></details>` : ''}
      <div id="picker-results" class="picker-results"></div>`);
    renderPicker();
    dialog.querySelector("#picker-search").focus();
  }

  function openShare() {
    const current = read(storageKey,{});
    const cooks = weekCooks(current);
    const portion = servings => numberLabel(servings) + (servings === 1 ? " serving" : " servings");
    const plan = weekDates().map(day => {
      const lines = Object.entries(meals).flatMap(([meal,label]) => {
        const slot = dateKey(day) + "|" + meal;
        const entry = mealAt(current,slot);
        const recipe = recipeIndex.get(entry?.id);
        if (!recipe) return [];
        const batch = cooks.get(slot)?.servings;
        const prep = entry.leftoverOf ? " · Leftovers from " + slots.get(entry.leftoverOf) : batch > entry.servings ? " · Cook " + portion(batch) + " total" : "";
        return [label + ": " + recipe.name + " · " + portion(entry.servings) + prep];
      });
      return lines.length ? [fullDate.format(day),...lines].join("\n") : "";
    }).filter(Boolean).join("\n\n");
    const groceries = groceryText(groceryItems(current),read(groceryKey(),{}),measure);
    showDialog("Share this week", `<textarea class="transfer-text" id="share-week-text" rows="13" aria-label="Meal plan and grocery list" readonly></textarea>
      <div class="transfer-actions"><button class="button dark" type="button" data-copy-week>${icon("copy",16)} Copy plan and groceries</button><p role="status" data-copy-week-status></p></div>`);
    dialog.querySelector("#share-week-text").value = ["Mise meal plan · " + range.formatRange(start,shiftDay(start,6)),
      plan || "No meals planned.", "Groceries\n" + (groceries || "No groceries yet.")].join("\n\n");
    dialog.querySelector("[data-copy-week]").focus();
  }

  const proteinFor = (recipe,servings) => {
    const estimate = estimatedNutrition(recipe);
    return estimate ? Math.round(estimate[0] * servings) : null;
  };

  function openSwaps() {
    const entry = mealAt(read(storageKey,{}),activeSlot);
    const current = recipeIndex.get(entry?.id);
    if (!current) return openPicker(activeSlot);
    swapServings = Number(dialog.querySelector('[name="picker-servings"]').value);
    swapOriginal = entry;
    swapPreview = null;
    showDialog("Quick swaps", `<p class="planner-dialog-context">${slots.get(activeSlot)} · Replacing ${current.name}</p>
      <div class="swap-controls"><label class="template-select">Find a meal that’s
      <select id="swap-priority"><option value="faster">Faster to make</option><option value="protein">Higher in protein</option><option value="ingredients">Closer to my ingredients</option></select></label>
      <button class="button light" type="button" data-back-to-picker>Back to recipe search</button></div>
      <div id="swap-options" class="picker-results"></div><div id="swap-impact"></div>`);
    renderSwaps();
    dialog.querySelector("#swap-priority").focus();
  }

  function renderSwaps() {
    const latest = read(storageKey,{});
    const existing = mealAt(latest,activeSlot);
    const current = recipeIndex.get(existing?.id);
    const priority = dialog.querySelector("#swap-priority").value;
    const inventory = read("inventory",{});
    const protein = proteinFor(current,existing?.servings);
    const alternatives = cookingOrder.filter(recipe => recipe !== current);
    let suggestions;
    if (priority === "ingredients") {
      const matches = inventory.input?.trim() ? matchInventory(inventory.input,recipes,recipeIngredients,inventory.assumeStaples) : [];
      const currentScore = matches.find(({recipe}) => recipe === current)?.score ?? 0;
      suggestions = matches.filter(({recipe,score}) => recipe !== current && score > currentScore)
        .map(({recipe,score,missing,check}) => ({recipe,label:score + "% ingredient match · " + (missing.length + check.length) + " to get or check"}));
    } else if (priority === "protein") {
      suggestions = alternatives.map(recipe => ({recipe,grams:proteinFor(recipe,swapServings)}))
        .filter(({grams}) => grams !== null && (protein === null || grams > protein)).sort((a,b) => b.grams - a.grams)
        .map(({recipe,grams}) => ({recipe,label:grams + " g protein for this portion · est."}));
    } else {
      suggestions = alternatives.filter(recipe => recipe.time < current?.time)
        .map(recipe => ({recipe,label:duration(recipe.time) + " · " + (current.time - recipe.time) + " min faster"}));
    }
    const options = dialog.querySelector("#swap-options");
    const message = priority === "ingredients" && !inventory.input?.trim() ? "Save what you have in What can I cook? to get ingredient-based swaps." :
      priority === "protein" && protein === null ? "Protein estimate unavailable for the current meal. These options have estimates." : "";
    options.innerHTML = (message ? '<p class="planner-dialog-context">' + message + '</p>' : '') +
      (suggestions.length ? suggestions.slice(0,6).map(({recipe,label}) => `<button class="picker-result" type="button" data-preview-swap="${recipe.id}" aria-pressed="false">
        ${dishPhoto(recipe,true,"")}<span><strong>${recipe.name}</strong><small>${label}</small></span>${icon("plus",16)}</button>`).join("") :
        (message ? "" : '<p class="shelf-empty">No recipes match this priority. Try another priority or search all recipes.</p>'));
    swapPreview = null;
    dialog.dataset.draft = "false";
    dialog.querySelector("[data-draft-message]").hidden = true;
    dialog.querySelector("#swap-impact").replaceChildren();
  }

  const weekSnapshot = data => JSON.stringify([...slots.keys()].map(slot => rawMealAt(data,slot)));

  function previewSwap(id, message = "") {
    const latest = read(storageKey,{});
    const chosen = recipeIndex.get(id);
    if (!sameMeal(mealAt(latest,activeSlot),swapOriginal)) {
      openPicker(activeSlot);
      notice("This meal changed. Choose a recipe to continue.");
      return;
    }
    const revision = weekSnapshot(latest);
    const before = groceryItems(latest);
    const entry = {id,servings:swapServings};
    const {replanned} = stageCalendar(latest,[[activeSlot,entry]]);
    const changes = groceryChanges(before,groceryItems(latest));
    swapPreview = {entry,revision};
    dialog.dataset.draft = "true";
    dialog.querySelector("[data-draft-message]").hidden = true;
    for (const button of dialog.querySelectorAll("[data-preview-swap]")) button.setAttribute("aria-pressed",String(button.dataset.previewSwap === id));
    const protein = proteinFor(chosen,swapServings);
    const impact = dialog.querySelector("#swap-impact");
    impact.innerHTML = `<section class="swap-preview" aria-labelledby="swap-preview-heading">
      <h3 id="swap-preview-heading" tabindex="-1">Grocery changes for ${chosen.name}</h3>
      <p>${numberLabel(swapServings)} ${swapServings === 1 ? "serving" : "servings"} · ${duration(chosen.time)}${protein === null ? "" : " · " + protein + " g protein est."}</p>
      ${message ? '<p class="schedule-warning">' + message + '</p>' : ''}
      ${replanned ? '<p class="schedule-warning">' + replanned + (replanned === 1 ? ' linked leftover will become a separate cook.' : ' linked leftovers will become separate cooks.') + '</p>' : ''}
      ${changes.length ? '<ul class="swap-changes">' + changes.map(([a,b]) => {
        const action = !a ? "Add" : !b ? "Remove" : "Change";
        const quantity = a && b ? groceryQuantity(a,measure) + " to " + groceryQuantity(b,measure) : groceryQuantity(b ?? a,measure);
        return '<li><span>' + action + ' ' + (b ?? a).name + '</span><strong>' + quantity + '</strong></li>';
      }).join("") + '</ul>' : '<p>No ingredient quantities change for this week.</p>'}
      <button class="button dark" type="button" data-confirm-swap>Confirm swap</button></section>`;
    const heading = impact.querySelector("h3");
    heading.focus({preventScroll:true});
    heading.scrollIntoView({block:"nearest"});
  }

  function updateDestination() {
    const form = dialog.querySelector("#schedule-recipe");
    const current = mealAt(read(storageKey,{}),form.elements.day.value + "|" + form.elements.meal.value);
    const at = recipeIndex.get(current?.id);
    form.querySelector(".schedule-warning").textContent = at ? "Replaces " + at.name : "";
    form.querySelector("[type=submit]").textContent = at ? "Replace meal" : "Add to calendar";
  }

  function openSchedule(recipe) {
    plannedRecipe = recipe;
    const today = dateKey(new Date());
    const week = weekDates();
    showDialog("Plan this recipe", `<p class="planner-dialog-context">${recipe.name}</p><form id="schedule-recipe" class="schedule-recipe">
      <label>Day<select name="day">${week.map(date => `<option value="${dateKey(date)}"${dateKey(date) === today ? " selected" : ""}>${fullDate.format(date)}</option>`).join("")}</select></label>
      <label>Meal<select name="meal">${Object.entries(meals).map(([key,label]) => `<option value="${key}"${key === "dinner" ? " selected" : ""}>${label}</option>`).join("")}</select></label>
      <label>Portion${portionsMenu()}</label>
      <p class="schedule-warning" aria-live="polite"></p><button class="button dark" type="submit">Add to calendar</button></form>`);
    updateDestination();
    dialog.querySelector("select").focus();
  }

  function chosenTemplate() {
    return weeklyTemplates.find(item=>item.id === dialog.querySelector("#week-template").value);
  }

  function renderTemplatePreview() {
    const template = chosenTemplate();
    const week = weekDates();
    dialog.querySelector("#template-days").innerHTML = template.week.map((meals,index) => {
      const total = summarizeMeals(Object.values(meals),recipeIndex);
      return `<li><div><strong>${shortDay.format(week[index])} ${week[index].getDate()}</strong><span>${Math.round(total.protein)} g protein · ${Math.round(total.kcal).toLocaleString("en-US")} kcal</span></div><p>${Object.values(meals).map(entry=>recipeIndex.get(entry.id).name + (entry.servings !== 1 ? ' (' + numberLabel(entry.servings) + ' servings)' : '')).join(" · ")}</p></li>`;
    }).join("");
  }

  function openTemplates() {
    showDialog("Weekly templates", `<p class="planner-dialog-context">Preview a week with at least 160 g of protein per day. Totals are estimates per person.</p>
      <form id="apply-week-template"><label class="template-select">Daily goal <select id="week-template" name="template">${weeklyTemplates.map(t=>'<option value="'+t.id+'">'+t.name+'</option>').join("")}</select></label>
      <ul id="template-days" class="template-days"></ul><p class="schedule-warning">Applying this template replaces the meals for ${range.formatRange(start,shiftDay(start,6))}. You can undo the change.</p>
      <button class="button dark" type="submit">Replace week with template</button></form>`);
    renderTemplatePreview();
    dialog.querySelector("#week-template").focus();
  }

  function renderMatches() {
    const input = inventoryInput.value.trim();
    if (!input) {
      inventoryStatus.textContent = "";
      inventoryResults.innerHTML = '<p class="matcher-empty">Your closest recipe matches will appear here.</p>';
      return;
    }
    const list = matchInventory(input,recipes,recipeIngredients,inventoryStaples.checked);
    inventoryStatus.textContent = list.length ? list.length + (list.length === 1 ? " recipe match" : " recipe matches") : "No recipe matches yet";
    inventoryResults.innerHTML = list.length ? list.map(({recipe,have,missing,check,score}, index) => {
      const ready = missing.length + check.length === 0;
      return `<article class="match-card">
        <div class="match-card-header">${dishPhoto(recipe,true,"")}<div><a class="match-title" href="${recipeRoute(recipe)}">${recipe.name}</a><p>${have.length} of ${have.length + missing.length + check.length} on hand · ${duration(recipe.time)}</p></div><span class="match-percent${ready ? " ready" : ""}">${ready ? "Ready to cook" : score + "% match"}</span></div>
        <details${index === 0 ? " open" : ""}><summary>Ingredient breakdown</summary>
          ${have.length ? `<p><strong>On hand</strong> ${have.join(", ")}</p>` : ""}
          ${check.length ? `<p><strong>Check the type</strong> ${check.join(", ")}</p>` : ""}
          ${missing.length ? `<p><strong>Still need</strong> ${missing.join(", ")}</p>` : ""}
        </details>
        <button class="button light" type="button" data-plan-recipe="${recipe.id}">${icon("plus",15)} Add to calendar</button>
      </article>`;
    }).join("") : '<p class="matcher-empty">Try naming a specific ingredient, such as chicken thighs, tofu, or rice noodles.</p>';
  }

  function submitInventory() {
    write("inventory",{input:inventoryInput.value, assumeStaples:inventoryStaples.checked});
    renderMatches();
  }

  function clearDrag() {
    setDropTarget(null);
    dragOrigin?.classList.remove("drag-source");
    dragOrigin = null;
    clearTimeout(pointerDrag?.hold);
    pointerDrag?.ghost?.remove();
    if (pointerDrag?.frame) cancelAnimationFrame(pointerDrag.frame);
    pointerDrag = null;
    grid.closest(".planner-layout").classList.remove("dragging");
    grid.classList.remove("dragging");
    drag = null;
  }

  const slotCell = slot => grid.querySelector('[data-drop-slot="' + slot + '"]');
  function dropSlot(element) {
    const day = element?.closest("[data-drop-day]");
    const exact = element?.closest("[data-drop-slot]");
    if (!day || !grid.contains(day)) return null;
    const slot = exact?.dataset.dropSlot ?? (drag?.from ? day.dataset.dropDay + "|" + drag.from.split("|")[1] : null);
    return slot === drag?.from ? null : slot;
  }

  function setDropTarget(slot) {
    const target = slot ? slotCell(slot) : null;
    if (highlighted === target) return;
    if (highlighted) {
      highlighted.classList.remove("drop-target");
      delete highlighted.dataset.dropAction;
    }
    highlighted = target;
    if (!target) return;
    const occupied = mealAt(calendar,slot);
    target.dataset.dropAction = drag.from ? (occupied ? "Swap here" : "Move here") : (occupied ? "Replace" : "Add here");
    target.classList.add("drop-target");
  }

  function startDrag(entry, from) {
    drag = {entry,from};
    dragOrigin = from ? slotCell(from) : null;
    dragOrigin?.classList.add("drag-source");
    grid.classList.add("dragging");
    grid.closest(".planner-layout").classList.add("dragging");
  }

  function applyDrop({entry,from}, slot) {
    if (!slots.has(slot) || from === slot || !recipeIndex.has(entry.id)) return false;
    const latest = read(storageKey,{});
    if (from && !sameMeal(mealAt(latest,from),entry)) {
      renderWeek();
      notice("This meal changed in another tab");
      return false;
    }
    const target = mealAt(latest,slot);
    const changes = from ? [[from,target],[slot,entry]] : [[slot,entry]];
    if (from) {
      const moves = new Map([[from,slot],[slot,from]]);
      for (const position of slots.keys()) {
        const planned = mealAt(latest,position);
        if (moves.has(planned?.leftoverOf)) changes.push([moves.get(position) ?? position,{...planned,leftoverOf:moves.get(planned.leftoverOf)}]);
      }
    }
    const message = from ? (target ? "Meals swapped" : "Meal moved") : (target ? "Meal replaced" : "Meal added");
    return changeCalendar(changes,message);
  }

  function completeDrag(slot) {
    const movement = drag;
    clearDrag();
    if (movement && slot && applyDrop(movement,slot) && movement.from) {
      slotCell(slot)?.querySelector("[data-move-meal]")?.focus({preventScroll:true});
    }
  }

  function openMove(from, message = "") {
    moveSource = from;
    moveCalendar = read(storageKey,{});
    const entry = mealAt(moveCalendar,from);
    const name = recipeIndex.get(entry?.id)?.name;
    if (!name) {
      dialog.close();
      renderWeek();
      notice("This meal changed in another tab");
      return;
    }
    const [fromDay] = from.split("|");
    const dates = weekDates().sort((a,b) => Number(dateKey(b) === fromDay) - Number(dateKey(a) === fromDay));
    showDialog("Move meal", `<p class="planner-dialog-context"><strong>${name}</strong> · ${slots.get(from)}</p>
      <form id="move-meal" class="move-meal-form"><label>Move to
        <select name="destination" required><option value="">Choose a day and meal</option>${dates.map(day => {
          const key = dateKey(day);
          return '<optgroup label="' + fullDate.format(day) + '">' + Object.entries(meals).map(([meal,label]) => {
            const slot = key + "|" + meal;
            if (slot === from) return "";
            const occupied = recipeIndex.get(mealAt(moveCalendar,slot)?.id);
            return '<option value="' + slot + '">' + label + (occupied ? " · " + occupied.name : " · Empty") + '</option>';
          }).join("") + '</optgroup>';
        }).join("")}</select></label>
        <p class="schedule-warning" role="status">${message || "Choosing a filled slot swaps the two meals."}</p>
        <button class="button dark" type="submit" disabled>Move meal</button>
      </form>`);
    dialog.querySelector('[name="destination"]').focus();
  }

  function updateMove(form) {
    const destination = form.elements.destination.value;
    const target = recipeIndex.get(mealAt(moveCalendar,destination)?.id);
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = !destination;
    submit.textContent = target ? "Swap meals" : "Move meal";
    form.querySelector("[role=status]").textContent = target
      ? target.name + " will move to " + slots.get(moveSource) + "."
      : destination ? "Move to " + slots.get(destination) + "." : "Choosing a filled slot swaps the two meals.";
  }

  function trackPointer() {
    if (!pointerDrag?.ghost || !root.isConnected) return;
    const {x,y,ghost} = pointerDrag;
    const top = Math.max(0,document.querySelector(".top").getBoundingClientRect().bottom);
    const edge = 58;
    const speed = Math.min(edge,Math.max(0, y - (window.innerHeight - edge))) - Math.min(edge,Math.max(0, top + edge - y));
    if (speed) window.scrollBy(0,speed * .28);
    ghost.style.transform = "translate(" + (x + 12) + "px," + (y + 14) + "px)";
    setDropTarget(dropSlot(document.elementFromPoint(x,y)));
    pointerDrag.frame = requestAnimationFrame(trackPointer);
  }

  function liftMeal() {
    const {from} = pointerDrag;
    const entry = mealAt(calendar,from);
    if (!entry || !root.isConnected) return;
    startDrag(entry,from);
    const ghost = document.createElement("span");
    ghost.className = "calendar-drag-label";
    ghost.textContent = recipeIndex.get(entry.id).name;
    ghost.setAttribute("aria-hidden","true");
    root.append(ghost);
    pointerDrag.ghost = ghost;
    suppressDragClick = true;
    trackPointer();
  }

  const passedDragThreshold = ({clientX,clientY}) => Math.hypot(clientX-pointerDrag.x,clientY-pointerDrag.y) >= 7;
  root.addEventListener("pointerdown", () => { suppressDragClick = false; }, true);
  grid.addEventListener("click", event => {
    if (!suppressDragClick || !event.detail) return;
    suppressDragClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
  grid.addEventListener("pointerdown", event => {
    const cell = event.target.closest("[data-drag-meal]");
    const grip = event.target.closest("[data-move-meal]");
    if (!cell || event.button !== 0 || !event.isPrimary || (event.pointerType === "touch" && !grip)) return;
    pointerDrag = {id:event.pointerId,from:cell.dataset.dropSlot,x:event.clientX,y:event.clientY};
    event.target.setPointerCapture(event.pointerId);
  });
  grid.addEventListener("pointermove", event => {
    if (pointerDrag?.id !== event.pointerId) return;
    if (!pointerDrag.ghost && !passedDragThreshold(event)) return;
    pointerDrag.x = event.clientX;
    pointerDrag.y = event.clientY;
    if (!pointerDrag.ghost) liftMeal();
  });
  grid.addEventListener("pointerup", event => {
    if (pointerDrag?.id !== event.pointerId) return;
    if (pointerDrag.ghost) completeDrag(dropSlot(document.elementFromPoint(event.clientX,event.clientY)));
    else clearDrag();
  });
  for (const type of ["pointercancel","lostpointercapture"]) {
    grid.addEventListener(type,event => {
      if (pointerDrag?.id === event.pointerId) clearDrag();
    });
  }
  grid.addEventListener("keydown", event => {
    if (event.key === "Escape" && pointerDrag?.ghost) clearDrag();
  });
  grid.addEventListener("touchstart", event => {
    if (event.touches.length > 1) {
      if (pointerDrag) clearDrag();
      return;
    }
    const cell = event.target.closest("[data-drag-meal]");
    if (!cell || event.target.closest("[data-move-meal]")) return;
    const finger = event.changedTouches[0];
    pointerDrag = {touchId:finger.identifier,from:cell.dataset.dropSlot,x:finger.clientX,y:finger.clientY,hold:setTimeout(liftMeal,250)};
  }, {passive:true});
  grid.addEventListener("touchmove", event => {
    if (pointerDrag?.touchId === undefined) return;
    const finger = Array.from(event.changedTouches).find(touch => touch.identifier === pointerDrag.touchId);
    if (!finger) return;
    if (!pointerDrag.ghost) {
      if (passedDragThreshold(finger)) clearDrag();
      return;
    }
    event.preventDefault();
    pointerDrag.x = finger.clientX;
    pointerDrag.y = finger.clientY;
  }, {passive:false});
  grid.addEventListener("touchend", event => {
    if (pointerDrag?.touchId === undefined) return;
    const finger = Array.from(event.changedTouches).find(touch => touch.identifier === pointerDrag.touchId);
    if (!finger) return;
    if (pointerDrag.ghost) {
      event.preventDefault();
      completeDrag(dropSlot(document.elementFromPoint(finger.clientX,finger.clientY)));
    } else clearDrag();
  });
  grid.addEventListener("touchcancel", () => {
    if (pointerDrag?.touchId !== undefined) clearDrag();
  });
  grid.addEventListener("contextmenu", event => {
    if (pointerDrag?.touchId !== undefined) event.preventDefault();
  });

  root.addEventListener("dragstart", event => {
    const source = event.target.closest("[data-drag-recipe]");
    if (!source || !event.dataTransfer) return;
    const entry = {id:source.dataset.dragRecipe,servings:1};
    startDrag(entry);
    event.dataTransfer.setData("text/plain",entry.id);
    event.dataTransfer.effectAllowed = "copy";
  });
  root.addEventListener("dragend",clearDrag);
  grid.addEventListener("dragover", event => {
    if (!drag) return;
    const slot = dropSlot(event.target);
    setDropTarget(slot);
    if (!slot) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  });
  grid.addEventListener("dragleave", event => {
    if (!grid.contains(event.relatedTarget)) setDropTarget(null);
  });
  grid.addEventListener("drop", event => {
    if (!drag) return;
    const slot = dropSlot(event.target);
    if (slot) event.preventDefault();
    completeDrag(slot);
  });

  root.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (event.target === dialog || button?.hasAttribute("data-close-planner")) {
      if (event.target === dialog && dialog.dataset.draft === "true") return;
      dialog.close();
      return;
    }
    if (!button) return;
    const data = button.dataset;
    if (button === groceryButton || button.hasAttribute("data-hide-groceries")) {
      groceryPanel.hidden = !groceryPanel.hidden;
      groceryButton.setAttribute("aria-expanded",String(!groceryPanel.hidden));
      if (groceryPanel.hidden) groceryButton.focus();
      else {
        renderGroceries();
        groceryPanel.scrollIntoView({block:"start"});
        root.querySelector("#weekly-groceries-title").focus({preventScroll:true});
      }
    } else if (data.weekMove) {
      start = shiftDay(start,Number(data.weekMove));
      renderWeek();
    } else if (button.hasAttribute("data-week-today")) {
      start = weekStart(new Date());
      renderWeek();
    } else if (button === undo) {
      undoCalendar();
    } else if (button.hasAttribute("data-week-templates")) {
      openTemplates();
    } else if (button.hasAttribute("data-share-week")) {
      openShare();
    } else if (button.hasAttribute("data-copy-week")) {
      copyText(dialog.querySelector("#share-week-text"),dialog.querySelector("[data-copy-week-status]"));
    } else if (data.pickSlot) {
      openPicker(data.pickSlot);
    } else if (data.moveMeal) {
      openMove(data.moveMeal);
    } else if (button.hasAttribute("data-quick-swaps")) {
      openSwaps();
    } else if (button.hasAttribute("data-back-to-picker")) {
      openPicker(activeSlot);
      const portion = dialog.querySelector('[name="picker-servings"]');
      portion.value = String(swapServings);
      dialog.dataset.draft = String(dialogValues() !== draftBaseline);
    } else if (data.previewSwap) {
      previewSwap(data.previewSwap);
    } else if (button.hasAttribute("data-confirm-swap") && swapPreview) {
      const {entry,revision} = swapPreview;
      if (weekSnapshot(read(storageKey,{})) !== revision) {
        previewSwap(entry.id,"The week changed. Review the refreshed grocery list before confirming.");
      } else if (changeCalendar([[activeSlot,entry]],"Meal swapped for " + slots.get(activeSlot))) {
        dialog.close();
        grid.querySelector('[data-pick-slot="' + activeSlot + '"]')?.focus({preventScroll:true});
      }
    } else if (data.removeMeal) {
      changeCalendar([[data.removeMeal,null]],"Meal removed",data.removeMeal);
    } else if (data.planRecipe) {
      openSchedule(recipeIndex.get(data.planRecipe));
    } else if (data.chooseRecipe || button.hasAttribute("data-save-portion")) {
      const current = mealAt(read(storageKey,{}),activeSlot);
      const entry = data.chooseRecipe ? {id:data.chooseRecipe} : current;
      const servings = Number(dialog.querySelector('[name="picker-servings"]').value);
      if (!entry) return;
      dialog.close();
      changeCalendar([[activeSlot,{...entry,servings}]],"Recipe saved for " + slots.get(activeSlot),activeSlot);
    } else if (button.hasAttribute("data-jump-matcher")) {
      inventoryInput.focus();
    } else if (button.hasAttribute("data-inventory-example")) {
      inventoryInput.value = example;
      submitInventory();
    }
  });

  root.addEventListener("input", event => {
    if (event.target === shelfSearch) renderShelf();
    if (event.target.id === "picker-search") renderPicker();
  });
  groceryPanel.addEventListener("change", event => {
    const input = event.target;
    const item = shoppingItems.find(item=>item.key === input.dataset.weeklyItem);
    if (!item) return;
    const checked = read(groceryKey(),{});
    if (input.checked) checked[item.key] = grocerySignature(item);
    else delete checked[item.key];
    write(groceryKey(),checked);
    const completed = shoppingItems.filter(item=>checked[item.key] === grocerySignature(item)).length;
    groceryPanel.querySelector("[data-weekly-progress]").textContent = completed + " of " + shoppingItems.length + " ingredients checked";
  });
  dialog.addEventListener("change", event => {
    if (event.target.id === "swap-priority") {
      renderSwaps();
      return;
    }
    if (event.target.closest("#schedule-recipe")) updateDestination();
    if (event.target.closest("#move-meal")) updateMove(event.target.form);
    if (event.target.id === "week-template") renderTemplatePreview();
    dialog.dataset.draft = String(dialogValues() !== draftBaseline);
    dialog.querySelector("[data-draft-message]").hidden = true;
  });
  dialog.addEventListener("keydown", event => {
    if (event.key === "Enter" && event.target.id === "picker-search") {
      event.preventDefault();
      dialog.querySelector("[data-choose-recipe]")?.click();
    }
  });
  dialog.addEventListener("submit", event => {
    if (event.target.id === "move-meal") {
      event.preventDefault();
      const destination = event.target.elements.destination.value;
      if (!slots.has(destination) || destination === moveSource) return;
      const latest = read(storageKey,{});
      const entry = mealAt(moveCalendar,moveSource);
      if (!sameMeal(entry,mealAt(latest,moveSource)) || !sameMeal(mealAt(moveCalendar,destination),mealAt(latest,destination))) {
        openMove(moveSource,"The calendar changed. Pick a destination again.");
        return;
      }
      if (applyDrop({entry,from:moveSource},destination)) {
        dialog.close();
        slotCell(destination)?.querySelector("[data-move-meal]")?.focus();
      }
      return;
    }
    if (event.target.id === "plan-leftovers") {
      event.preventDefault();
      const chosen = event.target.elements.source.selectedOptions[0];
      const source = chosen.value;
      const latest = read(storageKey,{});
      const cook = mealAt(latest,source);
      const servings = Number(dialog.querySelector('[name="picker-servings"]').value);
      const entry = {id:chosen.dataset.recipe,servings,leftoverOf:source};
      if (!cook || !validSource(latest,activeSlot,entry)) {
        const message = dialog.querySelector("[data-draft-message]");
        message.textContent = "That cooking meal changed. Close and reopen this slot to choose another batch.";
        message.hidden = false;
        return;
      }
      dialog.close();
      changeCalendar([[source,cook],[activeSlot,entry]],"Leftovers linked to " + slots.get(source),activeSlot,true);
      return;
    }
    if (event.target.id === "apply-week-template") {
      event.preventDefault();
      const selected = chosenTemplate();
      const days = weekDates();
      const changes = selected.week.flatMap((day,index)=>Object.entries(day).map(([meal,entry])=>[dateKey(days[index]) + "|" + meal,entry]));
      dialog.close();
      changeCalendar(changes,"Weekly template applied",undefined,true);
      return;
    }
    if (event.target.id !== "schedule-recipe") return;
    event.preventDefault();
    const slotsForm = event.target.elements;
    const slot = slotsForm.day.value + "|" + slotsForm.meal.value;
    if (!slots.has(slot)) return;
    dialog.close();
    changeCalendar([[slot,{id:plannedRecipe.id,servings:Number(slotsForm.servings.value)}]],"Recipe saved for " + slots.get(slot));
  });
  inventoryForm.addEventListener("submit", event => {
    event.preventDefault();
    submitInventory();
  });
  inventoryInput.value = typeof savedInventory.input === "string" ? savedInventory.input : "";
  inventoryStaples.checked = savedInventory.assumeStaples ?? true;
  renderWeek();
  renderShelf();
  renderMatches();
}
