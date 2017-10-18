import Firebase from './firebase-install'

class Notification {
  /**
   * handler for messaging
   */
  _messaging

  _Firebase

  constructor (FirebaseInit) {
    this._Firebase = FirebaseInit
    this._messaging = this._Firebase.messaging()
  }

  requestPermission (cb) {
    this._messaging.requestPermission()
    .then(() => this._messaging.getToken()) // get token
    .then((token) => {
      cb(null, token)
    })
    .catch(cb)
  }

  install (cb) {
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
      .catch((e) => console.log('Registration failed error:', e))
    }
  }
}

export default new Notification(Firebase)
