var cacheName = 'staticMap';

// Cache our known resources during install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll([
                '/index.html',
                '/app.js',
                '/src/js/basicMap.js',
                '/src/images/leaflet-logo.png',
                'https://unpkg.com/leaflet@1.1.0/dist/leaflet.css',
                'https://unpkg.com/leaflet@1.1.0/dist/leaflet.js',
                'https://code.jquery.com/jquery-3.4.1.min.js'
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