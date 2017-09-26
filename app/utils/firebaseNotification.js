import Firebase from './firebase-install'

class Notification {
  /**
   * handler for messaging
   */
  _messaging

  _Firebase

  constructor (FirebaseInit) {
    this._Firebase = FirebaseInit
  }

  install () {
    this._messaging = this._Firebase.messaging()
    this._messaging.onMessage((payload) => {
      console.log('Message received. ', payload)
      // ...
    })

    // On load register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((registration) => {
          // Successfully registers service worker
          console.log('ServiceWorker registration successful with scope: ', registration.scope)
          this._messaging.useServiceWorker(registration)
        })
        .then(() => this._messaging.requestPermission())
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

export default new Notification(Firebase)
