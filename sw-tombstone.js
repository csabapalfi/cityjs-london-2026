// EMERGENCY TOMBSTONE — if sw.js ever goes rogue, overwrite sw.js with this file's content
// and deploy. Every client that loads the page will self-unregister the SW and wipe caches
// on next visit, restoring normal (non-SW) behaviour. No user action required.

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll().then((cs) => cs.forEach((c) => c.navigate(c.url))))
  );
});
self.addEventListener("fetch", () => { /* pass-through */ });
