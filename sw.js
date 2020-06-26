const cacheFiles = [
    '/',
    '/index.html',
    '/app.js',
    'images/leaflet-logo.png'
];

const cacheName = 'static';

// Cache our known resources during install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll(cacheFiles)
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
    }
);

self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Check in cache for the request being made
        caches.match(event.request)
            .then(function (response) {
                // If the request is in the cache
                if (response) {
                    console.log("[ServiceWorker] Found in Cache", event.request.url, response);
                    // Return the cached version
                    return response;
                } else {
                    //However if we don't find it in the request, then we want to return the fetch request where we reach out or where we simply continue with the original request, so return fetch event request.
                    // So this now allows us to continue with the network request if we want to get something which is not cached but get it from the cache, well if it is in there.
                    return fetch(event.request)
                }

            }) // end caches.match(e.request)
    ); // end e.respondWith
});