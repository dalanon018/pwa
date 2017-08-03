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

import FakeProducts from 'fixtures/accessories.json'

import { transformProduct } from 'utils/transforms'
import { getItem } from 'utils/localStorage'

import {
  GET_PRODUCTS_CATEGORY,
  GET_PRODUCTS_VIEWED
} from './constants'
import {
  setProductsByCategoryAction,
  setProductsViewedAction
} from './actions'

import {
  LAST_VIEWS_KEY
} from 'containers/App/constants'

function * sleep (ms) {
  yield new Promise(resolve => setTimeout(resolve, ms))
}

function * transformEachEntity (entity) {
  const response = yield call(transformProduct, entity)
  return response
}

function * getLastViewedItems () {
  const products = yield call(getItem, LAST_VIEWS_KEY)
  return products || []
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

export function * getProductsViewed () {
  const response = yield * getLastViewedItems()

  yield put(setProductsViewedAction(response))
}

export function * getProductSaga () {
  yield * takeLatest(GET_PRODUCTS_CATEGORY, getProduct)
}

export function * getProductsViewedSaga () {
  yield * takeLatest(GET_PRODUCTS_VIEWED, getProductsViewed)
}

// Individual exports for testing
export function * productsCategorySagas () {
  const watcher = yield [
    fork(getProductSaga),

    fork(getProductsViewedSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default [
  productsCategorySagas
]
