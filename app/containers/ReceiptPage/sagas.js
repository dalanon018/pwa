
import { takeLatest } from 'redux-saga'
import { find } from 'lodash'
import { take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'

import FakeOrders from 'fixtures/orders.json'

import {
  GET_RECEIPT
} from './constants'
import {
  setReceiptAction
} from './actions'

// function * sleep (ms) {
//   yield new Promise(resolve => setTimeout(resolve, ms))
// }

export function * getReceipt (payload) {
  const { payload: { trackingNumber } } = payload
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
  const req = yield Promise.resolve(find(FakeOrders, { trackingNumber }))
  if (!req.err) {
    yield put(setReceiptAction(req))
  }
}

export function * getReceiptSaga () {
  yield * takeLatest(GET_RECEIPT, getReceipt)
}

// All sagas to be loaded
export function * receiptSagas () {
  const watcher = yield [
    fork(getReceiptSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  receiptSagas
]
