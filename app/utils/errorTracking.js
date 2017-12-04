import Raven from 'raven-js'

class ErrorTracking {
  _raven

  constructor () {
    this._raven = Raven
    this._raven
      .config('https://73c5abbb04fe44de96353aa51e8bb6ee@sentry.io/248260')
  }

  install () {
    this._raven.install()
  }

  exception (error = '') {
    this._raven.captureException(error)
  }
}

export default new ErrorTracking()
