/* Pro Universe service worker — app-shell caching + silent OTA updates */
const CACHE = "pro-universe-v1";
const SHELL = ["/", "/onboarding", "/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;
  // Never cache API calls — always fresh
  if (url.pathname.startsWith("/api/")) return;
  // Navigations: network first, fallback to cache (fresh HTML, offline shell)
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          const copy = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return r;
        })
        .catch(() => caches.match(e.request).then((m) => m || caches.match("/")))
    );
    return;
  }
  // Static assets: cache first
  e.respondWith(
    caches.match(e.request).then(
      (m) =>
        m ||
        fetch(e.request).then((r) => {
          const copy = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return r;
        })
    )
  );
});
