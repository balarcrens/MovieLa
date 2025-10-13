// A name for your cache, change the version number when you update files
const CACHE_NAME = 'moviela-cache-v1';

// A list of all the essential files your app needs to run offline
const urlsToCache = [
  '/', // The main page
  '/index.html', // The main HTML file
  // Add paths to your main CSS and JavaScript files below
  // e.g., '/css/style.css', '/js/app.js'
  '/assets/logo-192.png',
  '/assets/logo-512.png',
];

// Event: install
// This runs when the service worker is first installed.
// It opens the cache and saves all the files listed in urlsToCache.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event: fetch
// This runs for every network request made by your page.
// It checks if the requested file is in the cache and serves it from there if found.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the file is in the cache, return it.
        if (response) {
          return response;
        }
        // Otherwise, try to fetch the file from the network.
        return fetch(event.request).catch(() => {
          // If the network fetch fails (user is offline),
          // return the offline.html fallback page.
          return caches.match('/offline.html');
        });
      })
  );
});

// Event: activate
// This runs when the service worker is activated.
// It's used to clean up old caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});