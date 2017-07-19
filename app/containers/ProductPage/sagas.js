
import { takeLatest } from 'redux-saga'
import { find } from 'lodash'
import { take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'

import FakeProducts from 'fixtures/products.json'

import {
  GET_PRODUCT
} from './constants'
import {
  setProductAction
} from './actions'

function * sleep (ms) {
  yield new Promise(resolve => setTimeout(resolve, ms))
}

export function * getProduct (payload) {
  const { payload: { id } } = payload
  // const headers = new Headers()
  // const currentUser = yield select(selectCurrentUser())
  // headers.append('Content-Type', 'application/json')
  // headers.append('Accept', 'application/json')
  // headers.append('Authorization', `JWT ${currentUser.token}`)

  // const requestURL = `${API_BASE_URL}/data/sectors`
  // const req = yield call(request, requestURL, {
  //   method: 'GET',
  //   headers
  // })

  // We will emulate data
  const req = yield Promise.resolve(find(FakeProducts, { product_id: id }))
  yield sleep(5000)
  if (!req.err) {
    yield put(setProductAction(req))
  }
}

export function * getProductSaga () {
  yield * takeLatest(GET_PRODUCT, getProduct)
}

// All sagas to be loaded
export function * productSagas () {
  const watcher = yield [
    fork(getProductSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  productSagas
]
