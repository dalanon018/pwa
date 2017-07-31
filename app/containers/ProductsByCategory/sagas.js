import {
  call,
  cancel,
  fork,
  put,
  take
} from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'
import { takeLatest } from 'redux-saga'

import {
  GET_PRODUCTS_CATEGORY
} from './constants'
import {
  setProductsByCategoryAction
} from './actions'

import { transformProduct } from 'utils/transforms'
import FakeProducts from 'fixtures/accessories.json'

function * sleep (ms) {
  yield new Promise(resolve => setTimeout(resolve, ms))
}

function * transformEachEntity (entity) {
  const response = yield call(transformProduct, entity)
  return response
}

export function * initializeAppGlobals () {
  // code block
}

export function * getProduct () {
  const req = yield Promise.resolve(FakeProducts)
  console.log(req)
  yield sleep(1500)
  if (!req.err) {
    const transform = yield req.map(transformEachEntity)

    yield put(setProductsByCategoryAction(transform))
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
  yield * takeLatest(GET_PRODUCTS_CATEGORY, getProduct)
}

// Individual exports for testing
export function * productsCategorySagas () {
  const watcher = yield [
    fork(getProductSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default [
  productsCategorySagas
]
