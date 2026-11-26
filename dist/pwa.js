const installButton = document.querySelector("#install-app");
const appAccess = document.querySelector("#app-access");
const appDialog = document.querySelector("#app-dialog");
const installSteps = appDialog.querySelector(".install-steps");
const offlineStatus = document.querySelector("#offline-status");
const standaloneMode = matchMedia("(display-mode: standalone)");
let installPrompt;
let installed = false;

function updateInstallControls() {
  const launchedAsApp = standaloneMode.matches || navigator.standalone;
  installButton.hidden = Boolean(installed || launchedAsApp);
  installSteps.hidden = Boolean(installed || launchedAsApp);
}

updateInstallControls();
standaloneMode.addEventListener("change", updateInstallControls);

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  installPrompt = event;
});

window.addEventListener("appinstalled", () => {
  installed = true;
  installPrompt = undefined;
  updateInstallControls();
});

installButton.addEventListener("click", async () => {
  if (installPrompt) {
    const prompt = installPrompt;
    installPrompt = undefined;
    try {
      await prompt.prompt();
      return;
    } catch {
      // The browser can expire the prompt before the user opens it.
    }
  }
  appDialog.showModal();
});

appAccess.hidden = false;
appAccess.addEventListener("click", () => appDialog.showModal());
appDialog.addEventListener("click", event => {
  if (event.target === appDialog || event.target.closest(".icon-button")) appDialog.close();
});

if ("serviceWorker" in navigator) {
  const worker = navigator.serviceWorker;
  const showOfflineReady = () => {
    if (worker.controller) offlineStatus.textContent = "Ready to use offline.";
  };
  showOfflineReady();
  worker.addEventListener("controllerchange", showOfflineReady);
  worker.register(new URL("./sw.js", import.meta.url), { updateViaCache: "none" }).then(registration => {
    const watchInstallation = () => {
      const installing = registration.installing;
      if (!installing) return;
      offlineStatus.textContent = worker.controller ? "Ready to use offline." : "Preparing offline access…";
      installing.addEventListener("statechange", () => {
        if (installing.state === "redundant" && !worker.controller) {
          offlineStatus.textContent = "Offline setup didn’t finish. Reload Mise while online to try again.";
        }
      });
    };
    watchInstallation();
    registration.addEventListener("updatefound", watchInstallation);
  }).catch(() => {
    if (!worker.controller) offlineStatus.textContent = "Offline access is unavailable in this browser session.";
  });
} else {
  offlineStatus.textContent = "Offline access is unavailable in this browser session.";
}
