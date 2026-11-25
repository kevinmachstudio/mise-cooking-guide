const prefix = "mise-";
const mealSlot = /^\d{4}-\d{2}-\d{2}\|(?:breakfast|lunch|dinner)$/;
const isRecord = value => value !== null && typeof value === "object" && !Array.isArray(value);
const entriesMatch = (value, match) => isRecord(value) && Object.entries(value).every(([key,item]) => match(key,item));
export const recipeNoteKey = recipe => "recipe-note-" + recipe.id;
export const favoriteRecipesKey = "favorite-recipes";

function backupKey(key) {
  return key === favoriteRecipesKey || /^(?:week|portions|sauce-portions|inventory|meal-calendar|grocery-grouping|recipe-note-[a-z0-9-]+|weekly-grocery-\d{4}-\d{2}-\d{2}|groceries-[a-z0-9-]+-[1-8])$/.test(key);
}

export function makeBackup(storage) {
  const data = {};
  for (let index = 0; index < storage.length; index++) {
    const fullKey = storage.key(index);
    const key = fullKey?.slice(prefix.length);
    if (fullKey?.startsWith(prefix) && backupKey(key)) data[key] = JSON.parse(storage.getItem(fullKey));
  }
  return {format:"mise-kitchen", version:1, data};
}

export function parseBackup(text, recipes, storedMeal) {
  const {format,version,data} = JSON.parse(text) ?? {};
  const byId = new Map(recipes.map(recipe => [recipe.id,recipe]));
  const valid = (key,value) => {
    if (!backupKey(key)) return false;
    if (key === favoriteRecipesKey) return Array.isArray(value) && value.every(id => byId.has(id));
    if (key === "grocery-grouping") return value === "aisle" || value === "cuisine";
    if (key === "week") return entriesMatch(value,(day,id) => /^[0-4]$/.test(day) && byId.get(id)?.day === Number(day));
    if (key === "portions" || key === "sauce-portions") return Number.isInteger(value) && value >= 1 && value <= (key === "portions" ? 8 : 12);
    if (key === "inventory") return isRecord(value) && typeof value.input === "string" && typeof value.assumeStaples === "boolean";
    if (key === "meal-calendar") return entriesMatch(value,(slot,item) => {
      const meal = storedMeal(item);
      return mealSlot.test(slot) && (item === null || (byId.has(meal?.id) && (meal.leftoverOf === undefined || (typeof meal.leftoverOf === "string" && mealSlot.test(meal.leftoverOf)))));
    });
    if (key.startsWith("recipe-note-")) return byId.has(key.slice("recipe-note-".length)) && typeof value === "string";
    if (key.startsWith("weekly-grocery-")) return entriesMatch(value,(ingredient,signature) => /^[a-z0-9 ]+$/.test(ingredient) && typeof signature === "string");
    return Array.isArray(value) && value.every(item => typeof item === "string");
  };
  if (format !== "mise-kitchen" || version !== 1 || !entriesMatch(data,valid)) throw new Error("Invalid Mise backup");
  return data;
}

export function restoreBackup(storage, data) {
  const changes = Object.entries(data).map(([key,value]) => {
    const fullKey = prefix + key;
    const before = storage.getItem(fullKey);
    const merge = key === "week" || key === "meal-calendar";
    const after = JSON.stringify(merge ? {...JSON.parse(before), ...value} : value);
    return {fullKey,before,after};
  }).filter(({before,after}) => before !== after);
  const written = [];
  try {
    for (const change of changes) {
      storage.setItem(change.fullKey,change.after);
      written.push(change);
    }
  } catch (error) {
    for (const {fullKey} of written) storage.removeItem(fullKey);
    for (const {fullKey,before} of written) if (before !== null) storage.setItem(fullKey,before);
    throw error;
  }
}

export function mountKitchenData({read, recipes, storedMeal, icon, copyText, onRestore}) {
  const dialog = document.createElement("dialog");
  dialog.id = "kitchen-data-dialog";
  dialog.setAttribute("aria-labelledby","kitchen-data-title");
  document.body.append(dialog);
  let importData;
  let selectedFile;
  const notes = () => recipes.map(recipe => [recipe.name,read(recipeNoteKey(recipe),"")])
    .filter(([,note]) => note.trim()).sort(([a],[b]) => a.localeCompare(b));
  const open = () => {
    importData = selectedFile = undefined;
    dialog.dataset.draft = "false";
    const count = notes().length;
    dialog.innerHTML = `<div class="dialog-head"><h2 id="kitchen-data-title">Kitchen data</h2><button class="icon-button" type="button" aria-label="Close kitchen data" data-close-kitchen>${icon("x",18)}</button></div>
      <p class="draft-message" role="status" data-draft-message hidden>Restore the selected backup or close this dialog to cancel.</p>
      <section class="transfer-section"><h3>Recipe notes</h3><p>${count ? count + (count === 1 ? " recipe with notes." : " recipes with notes.") : "Notes you save in recipes will appear here for copying."}</p>
        <button type="button" class="button light" data-copy-all-notes${count ? "" : " disabled"}>${icon("copy",16)} Copy all notes</button>
        <textarea class="transfer-text" rows="5" aria-label="All recipe notes" data-copy-notes-text readonly hidden></textarea><p role="status" data-bulk-copy-status></p>
      </section>
      <section class="transfer-section"><h3>Backup and restore</h3><p>Save your notes, favorites, calendar edits, ingredient list, grocery checks, and settings in a file you can restore in another browser.</p>
        <button class="button light" type="button" data-download-backup>Download backup</button>
        <label class="backup-file">Choose a Mise backup <input type="file" accept=".json,application/json" data-backup-file></label>
        <p role="status" data-backup-status></p><button class="button dark" type="button" data-restore-backup hidden>Restore backup</button>
      </section>`;
    dialog.showModal();
  };
  document.addEventListener("click", event => {
    if (event.target.closest("[data-kitchen-data]")) open();
  });
  dialog.addEventListener("change", async event => {
    if (!event.target.matches("[data-backup-file]")) return;
    const file = event.target.files[0];
    selectedFile = file;
    importData = undefined;
    dialog.dataset.draft = "false";
    dialog.querySelector("[data-draft-message]").hidden = true;
    const restore = dialog.querySelector("[data-restore-backup]");
    restore.hidden = true;
    const status = dialog.querySelector("[data-backup-status]");
    status.textContent = file ? "Checking backup…" : "";
    if (!file) return;
    try {
      const text = await file.text();
      if (selectedFile !== file || !dialog.open) return;
      importData = parseBackup(text,recipes,storedMeal);
      dialog.dataset.draft = "true";
      status.textContent = "Ready to restore. Settings, notes, favorites, checklists, and meal slots included in this file take priority over matching items in this browser.";
      restore.hidden = false;
    } catch {
      if (selectedFile === file && dialog.open) status.textContent = "This file is not a valid Mise backup.";
    }
  });
  dialog.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (button?.hasAttribute("data-close-kitchen") || (event.target === dialog && dialog.dataset.draft !== "true")) dialog.close();
    if (button?.hasAttribute("data-copy-all-notes")) {
      const text = notes().map(([name,note]) => name + "\n" + note).join("\n\n");
      const field = dialog.querySelector("[data-copy-notes-text]");
      field.value = text;
      copyText(field,dialog.querySelector("[data-bulk-copy-status]"));
    }
    if (button?.hasAttribute("data-download-backup")) {
      const status = dialog.querySelector("[data-backup-status]");
      try {
        const data = makeBackup(localStorage);
        const url = URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));
        const link = document.createElement("a");
        link.href = url;
        link.download = "mise-backup-" + new Date().toISOString().slice(0,10) + ".json";
        link.click();
        setTimeout(() => URL.revokeObjectURL(url),1000);
        status.textContent = "Backup download started.";
      } catch { status.textContent = "Couldn’t download a backup from this browser."; }
    }
    if (button?.hasAttribute("data-restore-backup") && importData) {
      const status = dialog.querySelector("[data-backup-status]");
      try { restoreBackup(localStorage,importData); }
      catch {
        status.textContent = "Couldn’t restore the backup. Check your browser’s available storage and try again.";
        return;
      }
      importData = selectedFile = undefined;
      dialog.dataset.draft = "false";
      dialog.close();
      onRestore();
    }
  });
}
