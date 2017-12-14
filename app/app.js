/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill'
// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import FontFaceObserver from 'fontfaceobserver'
import createHistory from 'history/createBrowserHistory'

import '../semantic/dist/semantic.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Import root app
import App from 'containers/App'

// Error Tracking
import ErrorTracking from 'utils/errorTracking'

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider'

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico'
// we need to add also the icon for our manifest
import '!file-loader?name=[name].[ext]!./manifest.json'
import 'file-loader?name=[name]!./.htaccess' // eslint-disable-line import/extensions
import 'file-loader?name=[name]!./_redirects.sample' // eslint-disable-line import/extensions

// we need to add also the icon for our manifest
import '!file-loader?name=[name].[ext]!./images/manifest-icon/icon-48.png'
import '!file-loader?name=[name].[ext]!./images/manifest-icon/icon-96.png'
import '!file-loader?name=[name].[ext]!./images/manifest-icon/icon-144.png'
import '!file-loader?name=[name].[ext]!./images/manifest-icon/icon-192.png'
import '!file-loader?name=[name].[ext]!./images/manifest-icon/icon-256.png'
import '!file-loader?name=[name].[ext]!./images/manifest-icon/icon-384.png'
import '!file-loader?name=[name].[ext]!./images/manifest-icon/icon-512.png'

// import load testing txt file
import '!file-loader?name=[name].[ext]!./loaderio-8a4215aa19b3214d900927c755c2551d.txt'
/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './configureStore'

// Import i18n messages
import { translationMessages } from './i18n'

// Import CSS reset and Global Styles
import './global-styles'

// We need to install our sentryJS
ErrorTracking.install()

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const robotoObserver = new FontFaceObserver('Roboto', {})
const cabinObserver = new FontFaceObserver('Cabin', {})

cabinObserver.load().then(() => {
  document.body.classList.add('cabinLoaded')
}, () => {
  document.body.classList.remove('cabinLoaded')
})
robotoObserver.load()

// Create redux store with history
const initialState = {}
const history = createHistory()
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('app')

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  )
}

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'))
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/de.js')
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err
    })
} else {
  render(translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  const Notification = require('utils/firebase-notification').default
  Notification.install()

  require('offline-plugin/runtime').install() // eslint-disable-line global-require
}
