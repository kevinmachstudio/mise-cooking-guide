const scope = new URL(self.registration.scope);
const cachePrefix = `mise-offline:${scope.pathname}:`;
const cacheName = cachePrefix + "__MISE_REVISION__";
const files = __MISE_ASSET_LIST__;
const precache = new Set(files.map(file => new URL(file, scope).href));
const index = new URL("index.html", scope);

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll([...precache].map(url => new Request(url, { cache: "reload" })));
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(cachePrefix) && key !== cacheName).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  const appNavigation = request.mode === "navigate" && url.origin === scope.origin &&
    (url.pathname === scope.pathname || url.pathname === index.pathname);
  const key = appNavigation ? index.href : url.href;
  if (!precache.has(key)) return;

  event.respondWith((async () => {
    const cached = await caches.match(key, { cacheName });
    return cached ?? fetch(request);
  })());
});
