importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js")

var CACHE_NAME = 'wh-cache-v1';
var urlsToCache = [
  '/',
  '/js/main.js',
  '/images/icon.png',
  '/js/camera/template.js',
  '/js/camera/upload.js',
  '/css/camera/camera.css'
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response.
          var fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });

  self.addEventListener('activate', event => {
      event.waitUntil(
          caches.keys(cacheNames => {
              return Promise.all(
                  cacheNames.filter(cacheNames => {
                      return cacheNames !== urlsToCache
                  }).map(cacheNames => {
                      return caches.delete(cacheNames);
                  })
              )
          }).then(() => {
              return self.clients.claim();
          })
      )
  })