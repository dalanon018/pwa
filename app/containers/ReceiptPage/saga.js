
import { takeLatest } from 'redux-saga'
import { find } from 'lodash'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

// import request from 'utils/request'

import { transformOrder } from 'utils/transforms'
import { getItem } from 'utils/localStorage'

import {
  GET_RECEIPT,
  REPURCHASE_ITEM_REQUEST
} from './constants'

import {
  setReceiptAction
  // successReceiptAction,
  // errorReceiptAction
} from './actions'

import {
  ORDERED_LIST_KEY
} from 'containers/App/constants'

function * getOrderList () {
  const orders = yield call(getItem, ORDERED_LIST_KEY)
  return orders || []
}

export function * requestRepurchaseItem (payload) {
  // const { payload: { receipt } } = payload
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
  // const req = yield Promise.resolve(find(FakeOrders, { trackingNumber }))
  // if (!req.err) {
  //   yield put(setReceiptAction(req))
  // }
}

export function * getReceipt (payload) {
  const { payload: { trackingNumber } } = payload
  const orders = yield getOrderList()
  // We will emulate data
  const req = yield find(orders, { trackingNumber })
  let response = {}

  if (req) {
    response = yield call(transformOrder, req)
  }

  yield put(setReceiptAction(response))
}

export function * getReceiptSaga () {
  yield * takeLatest(GET_RECEIPT, getReceipt)
}

export function * requestRepurchaseItemSaga () {
  yield * takeLatest(REPURCHASE_ITEM_REQUEST, requestRepurchaseItem)
}

// All sagas to be loaded
export function * receiptSagas () {
  const watcher = yield [
    fork(getReceiptSaga),

    fork(requestRepurchaseItemSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default receiptSagas
