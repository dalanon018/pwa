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
import { getItem } from 'utils/localStorage'

import {
  GET_ORDER_PRODUCT
} from './constants'
import {
  setOrderProductAction
} from './actions'
// import FakeCategories from 'fixtures/products.json'

// Individual exports for testing
export function * defaultSaga () {
  // See example in containers/HomePage/sagas.js
}

export function * getOrderProduct () {
  const req = yield call(getItem, 'currentProduct')
  if (!req.err) {
    yield put(setOrderProductAction(req))
  }
}

export function * getOrderProductSaga () {
  yield * takeLatest(GET_ORDER_PRODUCT, getOrderProduct)
}

export function * productReviewSagas () {
  const watcher = yield [
    fork(getOrderProductSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default [
  productReviewSagas
]
