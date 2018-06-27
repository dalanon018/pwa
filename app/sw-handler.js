const CACHE_NAME = '7-eleven-v0.0.0'
const API_REQUESTS_URL = [
  'https://apidemo.cliqq.net:8443',
  'https://cliqqshop.imgix.net',
  'https://gw.cliqq.net:8443',
  'https://storage.googleapis.com'

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

/**
 * THIS IS FOR NOTIFICATION FIREBASE
 */

importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '771793449038' // change this to prod once ready
});

const messaging = firebase.messaging();

/**
 * We need to register the notification click
 */
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(`${event.notification.data.url}/?utm_source=push`)
  );
})

messaging.setBackgroundMessageHandler((payload) => {
  // Parses data received and sets accordingly
  const data = JSON.parse(payload.data.notification);
  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body,
    icon: 'icon-96.png',
    data: {
      url: data.data.url
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
