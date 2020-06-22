var cacheName = 'staticMap';

// Cache our known resources during install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll([
                '/src/js/basicMap.js',
                '/index.html',
                'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
            ]))
    );
});

self.addEventListener('activate', function (event) {
        console.log('[Service Worker] Activating Service Worker ...', event);
        return self.clients.claim()
    }
);

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request);
                }
            })
    );
});