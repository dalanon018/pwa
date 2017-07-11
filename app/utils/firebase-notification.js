import Firebase from 'firebase'

export default class Notification {
  /**
   * handler for messaging
   */
  _messaging

  constructor () {
    var config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    }

    Firebase.initializeApp(config)
  }

  install () {
    this._messaging = Firebase.messaging()
    this._messaging.onMessage((payload) => {
      console.log('Message received. ', payload)
      // ...
    })

    // On load register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('firebase-messaging-sw.js').then((registration) => {
          // Successfully registers service worker
          console.log('ServiceWorker registration successful with scope: ', registration.scope)
          this._messaging.useServiceWorker(registration)
        })
        .then(() => this._messaging.requestPermission()) // request browser permission
        .then(() => this._messaging.getToken()) // get token
        .then((token) => {
          console.log('TOKEN', token)
        })
        .catch((err) => {
          console.log('ServiceWorker registration failed: ', err)
        })
      })
    }
  }
}
