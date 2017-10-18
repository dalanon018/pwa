import Firebase from './firebase-install'

class Notification {
  /**
   * handler for messaging
   */
  _messaging

  _Firebase

  constructor (FirebaseInit) {
    this._Firebase = FirebaseInit
    this.requestPermission = this.requestPermission.bind(this)
    this.install = this.install.bind(this)
  }

  requestPermission (cb) {
    this._Firebase.messaging().requestPermission()
    .then(() => this._Firebase.messaging().getToken()) // get token
    .then((token) => {
      cb(null, token)
    })
    .catch(cb)
  }

  install (cb) {
    this._Firebase.messaging().onMessage((payload) => {
      console.log('Message received. ', payload)
      // ...
    })
    // On load register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        // we will only register the 1st one since thats our service worker
        this._Firebase.messaging().useServiceWorker(registrations[0])
      })
      .catch((e) => console.log('Registration failed error:', e))
    }
  }
}

export default new Notification(Firebase)
