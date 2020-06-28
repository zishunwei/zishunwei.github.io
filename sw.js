const cacheFiles = [
    '/',
    '/index.html',
    '/app.js',
    'images/leaflet-logo.png',
    'css/sb-admin-2.css',
    'js/sb-admin-2.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.4.1.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js',
    'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js',

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
            .catch(function (error) {
                console.log("Caching failed", error);
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