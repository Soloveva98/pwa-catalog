const doCache = true;

const CACHE_NAME = 'pwa-v1';
const urlsToCache = ["index.html", "offline.html"];

self.addEventListener('install', (event) => {
	if (doCache) {
		event.waitUntil(
			caches.open(CACHE_NAME).then((cache) => {
				console.log('Opened Cache');
				return cache.addAll(urlsToCache);
			})
		)
	}
});

self.addEventListener('fetch', (event) => {
	if (doCache) {
		event.respondWith(
			caches.match(event.request).then((response) => {
				return fetch(event.request).catch(() => caches.match('offline.html'))
			})
		);
	}
});

self.addEventListener("activate", (event) => {
	const cacheWhiteList = [CACHE_NAME];
	event.waitUntil(caches.keys().then((cacheNames) => Promise.all(
		cacheNames.map((cacheName) => {
			if (!cacheWhiteList.includes(cacheName)) {
				return caches.delete(cacheName);
			}
		})
	)))
});

// self.addEventListener('install', (event) => {
// 	if (doCache) {
// 		event.waitUntil(
// 			caches.open(CACHE_NAME)
// 				.then((cache) => {
// 					fetch("asset-manifest.json")
// 						.then(response => {
// 							response.json()
// 						})
// 						.then(assets => {
// 							const urlsToCache = [
// 								"/",
// 								assets["main.js"]
// 							]
// 							cache.addAll(urlsToCache)
// 							console.log('cached');
// 						})
// 				})
// 		);
// 	}
// });


// self.addEventListener("activate", event => {
// 	const cacheWhitelist = [CACHE_NAME];
// 	event.waitUntil(
// 		caches.keys()
// 			.then(keyList =>
// 				Promise.all(keyList.map(key => {
// 					if (!cacheWhitelist.includes(key)) {
// 						console.log('Deleting cache: ' + key)
// 						return caches.delete(key);
// 					}
// 				}))
// 			)
// 	);
// });



// self.addEventListener('fetch', function (event) {
// 	if (doCache) {
// 		event.respondWith(
// 			caches.match(event.request).then(function (response) {
// 				return response || fetch(event.request);
// 			})
// 		);
// 	}
// });