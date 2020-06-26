const cacheFiles = [
    '/index.html',
    '/app.js'
];


var cacheName = 'static';

// Cache our known resources during install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(cacheFiles))
    );
});

self.addEventListener('activate', function (event) {
        console.log('[Service Worker] Activating Service Worker ...', event);

        event.waitUntil(
            // Get all the cache keys (cacheName)
            caches.keys().then(function (cacheNames) {
                return Promise.all(cacheNames.map(function (thisCacheName) {

                    // If a cached item is saved under a previous cacheName
                    if (thisCacheName !== cacheName) {

                        // Delete that cached file
                        console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
                        return caches.delete(thisCacheName);
                    }
                }));
            })
        ); // end e.waitUntil
    }
);

self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Check in cache for the request being made
        caches.match(event.request)
            .then(function (response) {
                // If the request is in the cache
                if (response) {
                    console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                    // Return the cached version
                    return response;
                }

                // If the request is NOT in the cache, fetch and cache
                var requestClone = event.request.clone();
                fetch(requestClone)
                    .then(function (response) {
                        if (!response) {
                            console.log("[ServiceWorker] No response from fetch ")
                            return response;
                        }
                        var responseClone = response.clone();
                        //  Open the cache
                        caches.open(cacheName).then(function (cache) {
                            // Put the fetched response in the cache
                            cache.put(event.request, responseClone);
                            console.log('[ServiceWorker] New Data Cached', e.request.url);
                            // Return the response
                            return response;
                        }); // end caches.open
                    })
                    .catch(function (error) {
                        console.log('[ServiceWorker] Error Fetching & Caching New Data', error);
                    });
            }) // end caches.match(e.request)
    ); // end e.respondWith
});