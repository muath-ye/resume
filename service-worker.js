const CACHE_NAME = 'muath-resume-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
    'https://docs.google.com/document/d/16trp7NDznynAbLOrosEajkBLoy-CSdJoGr5JeJUtWWM/pub?embedded=true'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Update a service worker
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
