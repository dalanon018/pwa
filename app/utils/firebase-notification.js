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
    this.refreshToken = this.refreshToken.bind(this)
  }

  refreshToken (cb, currentToken) {
    this._Firebase.messaging().getToken()
    .then((token) => {
      return currentToken !== token ? cb(null, token) : cb(new Error('Same Token'))
    })
    .catch((e) => {
      console.log('error refresh token', e)
      return cb(e)
    })
  }

  requestPermission (cb) {
    this._Firebase.messaging().requestPermission()
    .then(() => this.refreshToken(cb))
    .catch((e) => {
      console.log('error permission', e)
      return cb(e)
    })
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
