// import du script _localforage_
importScripts("https://cdn.jsdelivr.net/gh/mozilla/localForage@master/dist/localforage.js");


// événement _install_
const FILES_TO_CACHE = [
    '/',
    'app.css',
    'app.js'
];

const STATIC_CACHE_NAME = 'pages-cache-v2';

self.addEventListener('install', event => {
    console.log('Installation du Service Worker...');
    console.log('Mise en cache des ressources');
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE_NAME)
                .then(cache => {
                    return cache.addAll(FILES_TO_CACHE);
                }),
            fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
                .then(resp => resp.json())
                .then(speakers => {
                    localforage.config({storeName: 'speakers'})
                    for (key in speakers) {
                        localforage.setItem(key, speakers[key])
                    }
                })]
        )
    );
});

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');

    const cacheWhitelist = [STATIC_CACHE_NAME];

    // suppression des caches excepté le cache courant (STATIC_CACHE_NAME)
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) < 0) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    // exemple d'envoi de message à tous les clients (en local)

    self.clients.matchAll().then(function(clients) {
        clients.forEach(function(client) {
            client.postMessage({
                "command": "HELLO_LES_CLIENTS",
                "message": "Hello je suis un SW"
            });
        })
    })
});

// termine le précédent SW
// et active immédiatement un nouveau service worker
self.skipWaiting();

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);

    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(event.request.url, 'servi depuis le cache');
                return response;
            }
            console.log(event.request.url, 'servi depuis le réseau');
            return fetch(event.request)

        }).then(function (response) {

            return caches.open(STATIC_CACHE_NAME).then(cache => {

                // mise en cache des ressources qui ne contiennent pas no.cache
                if (event.request.url.indexOf('no.cache') < 0) {
                    cache.put(event.request.url, response.clone());
                }
                return response;
            });
        }).catch(error => {
            console.log("oops");
        })
    );
});

// écoute de message provenant d'un client

self.addEventListener('message', event => {
    // traitement du message (event.data)
})

