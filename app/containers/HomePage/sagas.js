import {
  call,
  cancel,
  fork,
  put,
  take
} from 'redux-saga/effects'
import { compose, map, filter, prop, propOr } from 'ramda'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest } from 'redux-saga'

// import request from 'utils/request'

import { getRequestData } from 'utils/offline-request'
import { transformProduct } from 'utils/transforms'

import {
  GET_FEATURED_PRODUCTS
} from './constants'

import {
  setFeaturedProductsAction
} from './actions'

import {
  API_BASE_URL
} from 'containers/App/constants'

import {
  getAccessToken
} from 'containers/Buckets/sagas'

// function * sleep (ms) {
//   yield new Promise(resolve => setTimeout(resolve, ms))
// }

function * transformEachEntity (entity) {
  const response = yield call(transformProduct, entity)
  return response
}

export function * initializeAppGlobals () {
  // code block
}

export function * getProduct (data) {
  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/tags/FEATURED?deviceOrigin=PWA`, {
    method: 'GET',
    token: token.access_token
  })

  if (!req.err) {
    const transform = compose(
      map(transformEachEntity),
      filter(prop('cliqqCodes')),
      propOr([], 'productList')
    )
    const products = yield transform(req)
    yield put(setFeaturedProductsAction(products))
  }
}

/**
 * Watches for Every change of locations from router
 * once this triggers we need to check all the items under `initializeAppGlobals`
 */
export function * getLocationChangeWatcher () {
  yield takeLatest(LOCATION_CHANGE, initializeAppGlobals)
}

export function * getProductSaga () {
  yield * takeLatest(GET_FEATURED_PRODUCTS, getProduct)
}

// Individual exports for testing
export function * homePageSagas () {
  const watcher = yield [
    fork(getProductSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default [
  homePageSagas
]
