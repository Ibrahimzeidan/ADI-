// ADI Lebanon Service Worker
// What this caches:
//   - Static assets: JS, CSS, fonts, images from _next/static (immutable, long-lived)
//   - Pages the user has already visited (cache-then-network strategy)
// What this does NOT cache:
//   - API routes (/api/*) — always need fresh data
//   - Admin pages (/admin/*) — must be fresh for security
//   - Checkout — must be fresh so cart state is accurate
// Offline behavior: previously visited pages render from cache; unvisited pages show browser offline page.

const CACHE_NAME = "adi-v1";
const STATIC_CACHE = "adi-static-v1";

const STATIC_PATTERNS = [
  /^\/_next\/static\//,   // Next.js JS/CSS chunks (immutable)
  /^\/images\//,          // Product and brand images
  /\.woff2?$/,            // Web fonts
];

const SKIP_PATTERNS = [
  /^\/api\//,             // API routes — always live
  /^\/admin/,             // Admin — always live for security
  /^\/.*\/checkout/,      // Checkout — must reflect current cart
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(["/images/adi-logo.png"])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME && k !== STATIC_CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const { url, method } = e.request;
  if (method !== "GET") return;

  const path = new URL(url).pathname;

  // Never cache these
  if (SKIP_PATTERNS.some((p) => p.test(path))) return;

  // Static assets: cache-first (they're content-hashed, safe to serve stale)
  if (STATIC_PATTERNS.some((p) => p.test(path))) {
    e.respondWith(
      caches.match(e.request).then((hit) => hit ?? fetchAndCache(STATIC_CACHE, e.request))
    );
    return;
  }

  // Pages: network-first, fall back to cache for offline browsing
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

async function fetchAndCache(cacheName, request) {
  const res = await fetch(request);
  if (res.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, res.clone());
  }
  return res;
}
