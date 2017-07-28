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
  GET_FEATURED_PRODUCTS
} from './constants'
import {
  setFeaturedProductsAction
} from './actions'

import { transformProduct } from 'utils/transforms'
import FakeProducts from 'fixtures/products.json'

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

export function * getProduct (data) {
  // const headers = new Headers()
  // const { payload: { resolve, reject } } = data
  // console.log(data)

  // headers.append('Content-Type', 'application/json')
  // headers.append('Accept', 'application/json')

  // // const url = `https://www.reddit.com/search.json?q=${data.payload.passData}&sort=new`
  // const url = `https://jsonplaceholder.typicode.com/posts`
  // const req = yield call(request, url, {
  //   method: 'GET',
  //   headers
  // })

  // if (!req.err) {
  //   yield put(setFeaturedProductsAction(req))
  //   resolve()
  // } else {
  //   const err = yield req.err.body
  //   const { status } = err
  //   reject(status)
  // }

  const req = yield Promise.resolve(FakeProducts)
  yield sleep(1500)
  if (!req.err) {
    const transform = yield req.map(transformEachEntity)

    yield put(setFeaturedProductsAction(transform))
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
