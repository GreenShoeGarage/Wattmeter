/* ============================================================
   WATTMETER service worker

   Strategy: cache-first for the small set of static assets that
   make up the app shell. The app holds all user data in
   localStorage (project state) and IndexedDB (photos), so the
   service worker is only responsible for serving the static
   shell offline.

   Cache name is tied to the build version. When WATTMETER ships
   a new version, the constant below is bumped; on next visit
   the new service worker installs alongside the old, and the
   activate phase deletes the previous cache.

   The page can detect a waiting SW via navigator.serviceWorker
   and prompt the user to refresh.
   ============================================================ */

const CACHE_VERSION = 'wattmeter-v0.22.0';
const PRECACHE_URLS = [
  './',
  './wattmeter.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './icon-180.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      // Use addAll with no-cache requests to avoid HTTP cache interference.
      // If any asset fails the install fails, which is fine: we want a
      // complete shell or none at all.
      return cache.addAll(PRECACHE_URLS.map(url => new Request(url, { cache: 'reload' })));
    })
  );
  // Don't auto-skip-waiting. We want the page to notice the waiting SW
  // and prompt the user, since reloading mid-audit could lose unsaved
  // form state.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET and same-origin requests; never intercept POSTs or
  // cross-origin requests (e.g. Google Fonts).
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Cache-first with network fallback. If we have it cached, serve it.
  // Otherwise fetch from network, and on success cache a copy.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        // Only cache successful, basic-type responses to avoid storing
        // opaque or error responses.
        if (!res || res.status !== 200 || res.type !== 'basic') return res;
        const clone = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
        return res;
      }).catch((err) => {
        // Offline and not cached: graceful failure for HTML returns
        // a tiny offline-info page. For other assets, propagate.
        if (req.destination === 'document') {
          return new Response(
            '<!doctype html><meta charset=utf-8><title>WATTMETER offline</title>'
            + '<style>body{font-family:system-ui,sans-serif;padding:2em;background:#1f2c37;color:#eee;}</style>'
            + '<h1>WATTMETER offline</h1><p>This file is not yet cached. Connect to the network and reload to download the app shell.</p>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        }
        throw err;
      });
    })
  );
});

// Message handler: the page can request immediate activation of a
// waiting service worker after the user accepts the update prompt.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
