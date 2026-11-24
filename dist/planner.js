import { matchInventory, matchesText } from "./ingredient-match.js";
import { summarizeMeals, weeklyTemplates } from "./meal-templates.js";
import { groceryTotals, grocerySignature, renderWeeklyGroceries } from "./weekly-groceries.js";

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
      <button type="button" class="button planner-match-link" data-jump-matcher>${icon("basket",19)} Cook from my ingredients</button>
    </div>
  </section>
  <section class="wrap planner-body" aria-label="Weekly meal planner">
    <div class="calendar-toolbar">
      <div><h2 id="calendar-range" aria-live="polite"></h2><p id="calendar-count"></p></div>
      <div class="calendar-nav">
        <button class="button light" type="button" aria-controls="weekly-groceries" aria-expanded="false" data-show-groceries>${icon("basket",17)} Groceries</button>
        <button class="button light" type="button" data-week-templates>Weekly templates</button>
        <button class="button light" type="button" data-plan-undo hidden>Undo</button>
        <button class="icon-button" type="button" data-week-move="-7" aria-label="Previous week">${icon("chevron-left",17)}</button>
        <button class="button light" type="button" data-week-today>Today</button>
        <button class="icon-button" type="button" data-week-move="7" aria-label="Next week">${icon("chevron-right",17)}</button>
      </div>
    </div>
    <div class="planner-layout">
      <div><div id="calendar-grid" class="calendar-grid"></div><p class="calendar-note">Weekday lunches start with your <a href="#lunches">5-day lunch plan</a>. Calendar edits are saved in this browser.</p></div>
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

export function mountPlanner(root, recipes, {icon, read, write, notice, recipeIngredients, recipeRoute, dishPhoto, duration, recipeContext, weekRecipes, numberLabel, measure}) {
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
  let activeSlot;
  let plannedRecipe;
  let draftBaseline = "";

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
      return `<article class="calendar-day${isToday ? ' current-day' : ''}" aria-label="${fullDate.format(day)}">
        <h3><span class="calendar-weekday">${shortDay.format(day)}</span><time datetime="${key}"${isToday ? ' aria-current="date"' : ''}>${day.getDate()}</time></h3>
        ${Object.entries(meals).map(([meal, label]) => {
          const slot = key + "|" + meal;
          const entry = mealAt(calendar,slot);
          const recipe = recipeIndex.get(entry?.id);
          const extra = batchSizes.get(slot) ?? 0;
          if (recipe) count++;
          return `<div class="calendar-cell" data-drop-slot="${slot}">
            <div class="slot-label"><span>${label}</span>${recipe ? `<button class="slot-remove" data-remove-meal="${slot}" type="button" aria-label="Remove ${recipe.name} from ${slots.get(slot)}">${icon("x",14)}</button>` : ""}</div>
            ${recipe ? `<a class="planned-meal" href="${recipeRoute(recipe)}" draggable="true" data-drag-recipe="${recipe.id}" data-from-slot="${slot}" data-recipe-portion="${entry.servings+extra}">${recipe.name}</a>${entry.leftoverOf ? '<small class="batch-note" title="From ' + slots.get(entry.leftoverOf) + '">Leftovers · ' + numberLabel(entry.servings) + (entry.servings === 1 ? ' serving' : ' servings') + '</small>' : extra ? '<small class="batch-note">Cook ' + numberLabel(entry.servings+extra) + ' servings</small>' : entry.servings !== 1 ? '<small class="planned-portion">' + numberLabel(entry.servings) + ' servings</small>' : ''}` : ""}
            <button class="slot-picker${recipe ? ' occupied' : ''}" data-pick-slot="${slot}" type="button" aria-label="${recipe ? "Change" : "Add recipe to"} ${slots.get(slot)}">${recipe ? "Change" : icon("plus",14) + " Add"}</button>
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
    const cooks = new Map();
    for (const slot of slots.keys()) {
      const entry = mealAt(calendar,slot);
      if (!entry) continue;
      const source = entry.leftoverOf || slot;
      const batch = cooks.get(source) ?? {id:entry.id,servings:0};
      batch.servings += entry.servings;
      cooks.set(source,batch);
    }
    shoppingItems = groceryTotals(cooks.values(),recipeIndex,recipeIngredients);
    root.querySelector("#weekly-groceries-range").textContent = range.formatRange(start,shiftDay(start,6));
    root.querySelector("#weekly-grocery-items").innerHTML = renderWeeklyGroceries(shoppingItems,read(groceryKey(),{}),measure);
  }

  function changeCalendar(changes, message, focusSlot, recordDefaults = false) {
    const latest = read(storageKey, {});
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
    if (updates.size) {
      lastChange = [...updates.values()];
      write(storageKey,latest);
      notice(message + (replanned ? " · " + replanned + (replanned === 1 ? " leftover became a separate cook" : " leftovers became separate cooks") : ""));
    }
    renderWeek(focusSlot);
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
    dialog.showModal();
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
      <div class="picker-portion"><label>Portion ${portionsMenu(entry?.servings,"picker-servings")}</label>${existing ? '<button type="button" class="button light" data-save-portion>Save portion</button>' : ''}</div>
      ${options ? `<details class="leftover-picker"${entry?.leftoverOf ? ' open' : ''}><summary>Use leftovers</summary><form id="plan-leftovers"><label>Cooked earlier this week <select name="source" required><option value="">Choose the cooking meal</option>${options}</select></label><p>The source batch grows by the portion above. Refrigerate promptly and freeze anything you’ll keep longer than 3–4 days. <a href="https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts">FoodSafety.gov storage chart</a></p><button class="button light" type="submit">Save leftovers</button></form></details>` : ''}
      <div id="picker-results" class="picker-results"></div>`);
    renderPicker();
    dialog.querySelector("#picker-search").focus();
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
    highlighted?.classList.remove("drop-target");
    highlighted = null;
    grid.classList.remove("dragging");
    drag = null;
  }

  root.addEventListener("dragstart", event => {
    const source = event.target.closest("[data-drag-recipe]");
    if (!source || !event.dataTransfer) return;
    const from = source.dataset.fromSlot;
    const entry = from ? mealAt(calendar,from) : {id:source.dataset.dragRecipe,servings:1};
    drag = {entry,from};
    event.dataTransfer.setData("text/plain",entry.id);
    event.dataTransfer.effectAllowed = drag.from ? "move" : "copy";
    grid.classList.add("dragging");
  });
  root.addEventListener("dragend",clearDrag);
  grid.addEventListener("dragover", event => {
    const target = event.target.closest("[data-drop-slot]");
    if (!drag || !target) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = drag.from ? "move" : "copy";
    if (highlighted !== target) {
      highlighted?.classList.remove("drop-target");
      target.classList.add("drop-target");
      highlighted = target;
    }
  });
  grid.addEventListener("dragleave", event => {
    if (highlighted && !highlighted.contains(event.relatedTarget)) {
      highlighted.classList.remove("drop-target");
      highlighted = null;
    }
  });
  grid.addEventListener("drop", event => {
    const slot = event.target.closest("[data-drop-slot]")?.dataset.dropSlot;
    if (!drag || !slots.has(slot)) return;
    event.preventDefault();
    const {entry,from} = drag;
    clearDrag();
    if (from === slot || !recipeIndex.has(entry.id)) return;
    const latest = read(storageKey,{});
    if (from && !sameMeal(mealAt(latest,from),entry)) {
      renderWeek();
      notice("This meal changed in another tab");
      return;
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
    changeCalendar(changes,message);
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
    } else if (data.pickSlot) {
      openPicker(data.pickSlot);
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
    if (event.target.closest("#schedule-recipe")) updateDestination();
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
