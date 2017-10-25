import Firebase from './firebase-install'

class FirebaseDB {
  _Firebase

  constructor (FirebaseInit) {
    this._Firebase = FirebaseInit
    // this.login = this.login.bind(this)
    this.getDB = this.getDB.bind(this)
    this.update = this.update.bind(this)
  }

  // login () {
  //   return this._Firebase.auth().signInWithEmailAndPassword(
  //     process.env.FIREBASE_USERNAME,
  //     process.env.FIREBASE_PASSWORD
  //   )
  // }

  /**
   * get the root object [transactions]
   */
  getDB () {
    return this._Firebase.database().ref().child(process.env.FIREBASE_MAIN_OBJECT)
  }

  /**
   * get the child object w/c will be the mobile number so we dont have to lister to the numbers we dont own
   */
  specificDB (model) {
    return this.getDB().child(model)
  }

  /**
   * update specific key we need to have mobile number as the key and data should be
   * {
   *   <transactionID>: <status>
   * }
   * @param {*} model
   * @param {*} data
   */
  update (model, data) {
    return this.specificDB(model).update(data)
  }

  /**
   * for efficient listeners we need to only listen to the mobile we own. nothing else.
   * @param {*} models
   * @param {*} cbFn
   */
  listen (models, cbFn) {
    // make sure we will not listen to null or any falsy values
    return models.forEach((model) => this.specificDB(model).on('value', cbFn))
  }
}

export default new FirebaseDB(Firebase)
