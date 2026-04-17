// Offline-first service worker for the CityJS picker.
//
// Safety design:
// - Versioned cache name (bump CACHE_VERSION on each deploy that needs a flush)
// - skipWaiting + clients.claim → updates take effect on next load, no stuck-tab staleness
// - Network-first for HTML → newest index.html always wins when online (deploys ship immediately)
// - Cache-first for JS/JSON → works offline, versioned via ?v=N in the <script src>
// - Only same-origin GETs are intercepted; cross-origin (CF beacon) falls through to network
// - Safe fetch errors: any failure falls back to cache, any cache miss falls back to /
//
// If this SW ever goes rogue, overwrite this file with sw-tombstone.js content. On next page
// load, every client will self-unregister and wipe caches. See also ?nosw=1 escape in index.html.

const CACHE_VERSION = "v1-2026-04-17";
const CACHE = `cityjs-${CACHE_VERSION}`;

// Precache the app shell. Keep this small; everything else gets cached lazily on first fetch.
const PRECACHE = [
  "./",
  "./index.html",
  "./data.js?v=3",
  "./details.js?v=3",
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // Use addAll but fall back to individual adds on failure — one bad URL shouldn't kill install
      Promise.allSettled(PRECACHE.map((url) => c.add(url)))
    )
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // never intercept cross-origin (CF beacon, fonts, etc.)

  const isHtml = req.mode === "navigate" || req.destination === "document" || url.pathname.endsWith(".html") || url.pathname.endsWith("/");

  if (isHtml) {
    // Network-first: newest HTML wins when online, cache only as offline fallback.
    event.respondWith(
      fetch(req)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return resp;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html") || caches.match("./")))
    );
    return;
  }

  // Cache-first for everything else (JS/JSON/MD). Update in background.
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetched = fetch(req)
        .then((resp) => {
          if (resp && resp.status === 200) {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return resp;
        })
        .catch(() => cached); // offline → serve whatever's cached (or undefined)
      return cached || fetched;
    })
  );
});

// Allow the page to trigger self-nuke without editing the file.
self.addEventListener("message", (e) => {
  if (e.data === "SW_KILL") {
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll().then((cs) => cs.forEach((c) => c.navigate(c.url))));
  }
});
