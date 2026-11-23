import { matchInventory, matchesText } from "./ingredient-match.js";

const meals = {breakfast:"Breakfast", lunch:"Lunch", dinner:"Dinner"};
const shortDay = new Intl.DateTimeFormat("en-US", {weekday:"short"});
const fullDate = new Intl.DateTimeFormat("en-US", {weekday:"long", month:"short", day:"numeric"});
const storageKey = "meal-calendar";
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
        <button class="button light" type="button" data-plan-undo hidden>Undo</button>
        <button class="icon-button" type="button" data-week-move="-7" aria-label="Previous week">${icon("chevron-left",17)}</button>
        <button class="button light" type="button" data-week-today>Today</button>
        <button class="icon-button" type="button" data-week-move="7" aria-label="Next week">${icon("chevron-right",17)}</button>
      </div>
    </div>
    <div class="planner-layout">
      <div><div id="calendar-grid" class="calendar-grid"></div><p class="calendar-note">Meals are saved in this browser.</p></div>
      <aside class="recipe-shelf" aria-labelledby="shelf-title">
        <h2 id="shelf-title">Recipe shelf</h2><p>Drag a recipe onto the calendar, or select it to pick a day.</p>
        <label class="field-search">${icon("search",17)}<input type="search" id="shelf-search" placeholder="Find a recipe" aria-label="Search the recipe shelf" autocomplete="off"></label>
        <div id="shelf-results" class="shelf-results"></div>
      </aside>
    </div>
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

export function mountPlanner(root, recipes, {icon, read, write, notice, recipeIngredients, recipeRoute, dishPhoto, duration, recipeContext}) {
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
  const recipeIndex = new Map(recipes.map(recipe => [recipe.id,recipe]));
  const cookingOrder = [...recipes].sort((a,b) => a.time - b.time || a.name.localeCompare(b.name));
  const searchIndex = new Map(recipes.map(recipe => [recipe.id, [recipe.name, recipeContext(recipe), recipe.cuisine, recipe.animal,
    ...recipeIngredients(recipe).map(([, ,name]) => name)].join(" ")]));
  const findRecipes = query => cookingOrder.filter(recipe => matchesText(query,searchIndex.get(recipe.id)));
  const savedInventory = read("inventory", {});
  const slots = new Map();
  let start = weekStart(new Date());
  let calendar = read(storageKey, {});
  let lastChange = [];
  let drag;
  let highlighted;
  let activeSlot;
  let plannedRecipe;

  function renderWeek(focusSlot) {
    calendar = read(storageKey, {});
    slots.clear();
    const today = dateKey(new Date());
    const week = Array.from({length:7}, (_, index) => shiftDay(start,index));
    const formatter = new Intl.DateTimeFormat("en-US", {month:"short", day:"numeric", year:"numeric"});
    root.querySelector("#calendar-range").textContent = formatter.formatRange(start,week[6]);
    let count = 0;
    grid.innerHTML = week.map(day => {
      const key = dateKey(day);
      const isToday = key === today;
      return `<article class="calendar-day${isToday ? ' current-day' : ''}" aria-label="${fullDate.format(day)}">
        <h3><span class="calendar-weekday">${shortDay.format(day)}</span><time datetime="${key}"${isToday ? ' aria-current="date"' : ''}>${day.getDate()}</time></h3>
        ${Object.entries(meals).map(([meal, label]) => {
          const slot = key + "|" + meal;
          slots.set(slot,label + " · " + fullDate.format(day));
          const recipe = recipeIndex.get(calendar[slot]);
          if (recipe) count++;
          return `<div class="calendar-cell" data-drop-slot="${slot}">
            <div class="slot-label"><span>${label}</span>${recipe ? `<button class="slot-remove" data-remove-meal="${slot}" type="button" aria-label="Remove ${recipe.name} from ${slots.get(slot)}">${icon("x",14)}</button>` : ""}</div>
            ${recipe ? `<a class="planned-meal" href="${recipeRoute(recipe)}" draggable="true" data-drag-recipe="${recipe.id}" data-from-slot="${slot}">${recipe.name}</a>` : ""}
            <button class="slot-picker${recipe ? ' occupied' : ''}" data-pick-slot="${slot}" type="button" aria-label="${recipe ? "Change" : "Add recipe to"} ${slots.get(slot)}">${recipe ? "Change" : icon("plus",14) + " Add"}</button>
          </div>`;
        }).join("")}
      </article>`;
    }).join("");
    root.querySelector("#calendar-count").textContent = count + (count === 1 ? " meal planned" : " meals planned");
    undo.hidden = lastChange.length === 0;
    if (focusSlot) grid.querySelector('[data-pick-slot="' + focusSlot + '"]')?.focus({preventScroll:true});
  }

  function changeCalendar(changes, message, focusSlot) {
    const latest = read(storageKey, {});
    lastChange = [];
    for (const [slot,next] of changes) {
      const previous = latest[slot];
      if (previous === next) continue;
      lastChange.push({slot, previous, next});
      if (next) latest[slot] = next; else delete latest[slot];
    }
    if (lastChange.length) write(storageKey,latest);
    renderWeek(focusSlot);
    if (lastChange.length) notice(message);
  }

  function undoCalendar() {
    const latest = read(storageKey, {});
    const changedElsewhere = lastChange.some(({slot,next}) => latest[slot] !== next);
    if (!changedElsewhere) {
      for (const {slot,previous} of lastChange) {
        if (previous) latest[slot] = previous; else delete latest[slot];
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
    dialog.innerHTML = `<div class="dialog-head"><h2 id="planner-dialog-title">${title}</h2><button class="icon-button" type="button" aria-label="Close planner dialog" data-close-planner>${icon("x",18)}</button></div>${body}`;
    dialog.showModal();
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
    const existing = recipeIndex.get(calendar[slot]);
    showDialog(existing ? "Change recipe" : "Add a recipe", `<p class="planner-dialog-context">${slots.get(slot)}${existing ? " · Replacing " + existing.name : ""}</p>
      <label class="field-search">${icon("search",18)}<input type="search" id="picker-search" aria-label="Search recipes to add" placeholder="Try galbi, shrimp, or tofu" autocomplete="off"></label>
      <div id="picker-results" class="picker-results"></div>`);
    renderPicker();
    dialog.querySelector("#picker-search").focus();
  }

  function updateDestination() {
    const form = dialog.querySelector("#schedule-recipe");
    const at = recipeIndex.get(read(storageKey,{})[form.elements.day.value + "|" + form.elements.meal.value]);
    form.querySelector(".schedule-warning").textContent = at ? "Replaces " + at.name : "";
    form.querySelector("[type=submit]").textContent = at ? "Replace meal" : "Add to calendar";
  }

  function openSchedule(recipe) {
    plannedRecipe = recipe;
    const today = dateKey(new Date());
    const week = Array.from({length:7}, (_, index) => shiftDay(start,index));
    showDialog("Plan this recipe", `<p class="planner-dialog-context">${recipe.name}</p><form id="schedule-recipe" class="schedule-recipe">
      <label>Day<select name="day">${week.map(date => `<option value="${dateKey(date)}"${dateKey(date) === today ? " selected" : ""}>${fullDate.format(date)}</option>`).join("")}</select></label>
      <label>Meal<select name="meal">${Object.entries(meals).map(([key,label]) => `<option value="${key}"${key === "dinner" ? " selected" : ""}>${label}</option>`).join("")}</select></label>
      <p class="schedule-warning" aria-live="polite"></p><button class="button dark" type="submit">Add to calendar</button></form>`);
    updateDestination();
    dialog.querySelector("select").focus();
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
    drag = {id:source.dataset.dragRecipe, from:source.dataset.fromSlot};
    event.dataTransfer.setData("text/plain",drag.id);
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
    const {id,from} = drag;
    clearDrag();
    if (from === slot || !recipeIndex.has(id)) return;
    const latest = read(storageKey,{});
    if (from && latest[from] !== id) {
      renderWeek();
      notice("This meal changed in another tab");
      return;
    }
    const changes = from ? [[from,latest[slot]],[slot,id]] : [[slot,id]];
    const message = from ? (latest[slot] ? "Meals swapped" : "Meal moved") : (latest[slot] ? "Meal replaced" : "Meal added");
    changeCalendar(changes,message);
  });

  root.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (event.target === dialog || button?.hasAttribute("data-close-planner")) {
      dialog.close();
      return;
    }
    if (!button) return;
    const data = button.dataset;
    if (data.weekMove) {
      start = shiftDay(start,Number(data.weekMove));
      renderWeek();
    } else if (button.hasAttribute("data-week-today")) {
      start = weekStart(new Date());
      renderWeek();
    } else if (button === undo) {
      undoCalendar();
    } else if (data.pickSlot) {
      openPicker(data.pickSlot);
    } else if (data.removeMeal) {
      changeCalendar([[data.removeMeal,undefined]],"Meal removed",data.removeMeal);
    } else if (data.planRecipe) {
      openSchedule(recipeIndex.get(data.planRecipe));
    } else if (data.chooseRecipe) {
      dialog.close();
      changeCalendar([[activeSlot,data.chooseRecipe]],"Recipe added to " + slots.get(activeSlot),activeSlot);
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
  dialog.addEventListener("change", event => {
    if (event.target.closest("#schedule-recipe")) updateDestination();
  });
  dialog.addEventListener("keydown", event => {
    if (event.key === "Enter" && event.target.id === "picker-search") {
      event.preventDefault();
      dialog.querySelector("[data-choose-recipe]")?.click();
    }
  });
  dialog.addEventListener("submit", event => {
    if (event.target.id !== "schedule-recipe") return;
    event.preventDefault();
    const slotsForm = event.target.elements;
    const slot = slotsForm.day.value + "|" + slotsForm.meal.value;
    if (!slots.has(slot)) return;
    dialog.close();
    changeCalendar([[slot,plannedRecipe.id]],"Recipe added to " + slots.get(slot));
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
