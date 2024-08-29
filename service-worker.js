const CACHE_NAME = 'muath-resume-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
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
