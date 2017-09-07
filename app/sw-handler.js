const CACHE_NAME = '7-eleven-v0.0.0'
const API_REQUESTS_URL = [
  'https://apidemo.cliqq.net:8443'
]
// eslint-disable-line
self.addEventListener('fetch', function (e) {
  console.log('[Service Worker] Fetch', e.request.url)
  if (e.request.url.indexOf(API_REQUESTS_URL) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    // eslint-disable-line
    e.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(e.request).then(function (response) {
          cache.put(e.request.url, response.clone())
          return response
        })
      })
    )
  }
})
