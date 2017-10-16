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

  install (cb) {
    this._messaging = this._Firebase.messaging()
    this._messaging.onMessage((payload) => {
      console.log('Message received. ', payload)
      // ...
    })

    // On load register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        // we will only register the 1st one since thats our service worker
        this._messaging.useServiceWorker(registrations[0])
      })
      .then(() => this._messaging.requestPermission())
      .then(() => this._messaging.getToken()) // get token
      .then((token) => {
        console.log('TOKEN', token)
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed: ', err)
      })
    }
  }
}

export default new Notification(Firebase)
