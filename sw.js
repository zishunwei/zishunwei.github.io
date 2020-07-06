const cacheFiles = [
    '/',
    '/index.html',
    '/app.js',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.css',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet-src.js',
    '/images/icons/app-icon-144x144.png',
    '/countries-raster/0/0/0.png',
    '/countries-raster/1/0/0.png',
    '/countries-raster/1/0/1.png',
    '/countries-raster/1/1/0.png',
    '/countries-raster/1/1/1.png',
    '/countries-raster/2/0/0.png',
    '/countries-raster/2/0/1.png',
    '/countries-raster/2/0/2.png',
    '/countries-raster/2/0/3.png',
    '/countries-raster/2/1/0.png',
    '/countries-raster/2/1/1.png',
    '/countries-raster/2/1/2.png',
    '/countries-raster/2/1/3.png',
    '/countries-raster/2/2/0.png',
    '/countries-raster/2/2/1.png',
    '/countries-raster/2/2/2.png',
    '/countries-raster/2/2/3.png',
    '/countries-raster/2/3/0.png',
    '/countries-raster/2/3/1.png',
    '/countries-raster/2/3/2.png',
    '/countries-raster/2/3/3.png',
    '/countries-raster/3/0/0.png',
    '/countries-raster/3/0/1.png',
    '/countries-raster/3/0/2.png',
    '/countries-raster/3/0/3.png',
    '/countries-raster/3/0/4.png',
    '/countries-raster/3/0/5.png',
    '/countries-raster/3/0/6.png',
    '/countries-raster/3/0/7.png',
    '/countries-raster/3/1/0.png',
    '/countries-raster/3/1/1.png',
    '/countries-raster/3/1/2.png',
    '/countries-raster/3/1/3.png',
    '/countries-raster/3/1/4.png',
    '/countries-raster/3/1/5.png',
    '/countries-raster/3/1/6.png',
    '/countries-raster/3/1/7.png',
    '/countries-raster/3/2/0.png',
    '/countries-raster/3/2/1.png',
    '/countries-raster/3/2/2.png',
    '/countries-raster/3/2/3.png',
    '/countries-raster/3/2/4.png',
    '/countries-raster/3/2/5.png',
    '/countries-raster/3/2/6.png',
    '/countries-raster/3/2/7.png',
    '/countries-raster/3/3/0.png',
    '/countries-raster/3/3/1.png',
    '/countries-raster/3/3/2.png',
    '/countries-raster/3/3/3.png',
    '/countries-raster/3/3/4.png',
    '/countries-raster/3/3/5.png',
    '/countries-raster/3/3/6.png',
    '/countries-raster/3/3/7.png',
    '/countries-raster/3/4/0.png',
    '/countries-raster/3/4/1.png',
    '/countries-raster/3/4/2.png',
    '/countries-raster/3/4/3.png',
    '/countries-raster/3/4/4.png',
    '/countries-raster/3/4/5.png',
    '/countries-raster/3/4/6.png',
    '/countries-raster/3/4/7.png',
    '/countries-raster/3/5/0.png',
    '/countries-raster/3/5/1.png',
    '/countries-raster/3/5/2.png',
    '/countries-raster/3/5/3.png',
    '/countries-raster/3/5/4.png',
    '/countries-raster/3/5/5.png',
    '/countries-raster/3/5/6.png',
    '/countries-raster/3/5/7.png',
    '/countries-raster/3/6/0.png',
    '/countries-raster/3/6/1.png',
    '/countries-raster/3/6/2.png',
    '/countries-raster/3/6/3.png',
    '/countries-raster/3/6/4.png',
    '/countries-raster/3/6/5.png',
    '/countries-raster/3/6/6.png',
    '/countries-raster/3/6/7.png',
    '/countries-raster/3/7/0.png',
    '/countries-raster/3/7/1.png',
    '/countries-raster/3/7/2.png',
    '/countries-raster/3/7/3.png',
    '/countries-raster/3/7/4.png',
    '/countries-raster/3/7/5.png',
    '/countries-raster/3/7/6.png',
    '/countries-raster/3/7/7.png'
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