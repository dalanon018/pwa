
import { takeLatest } from 'redux-saga'
import { find } from 'lodash'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

import request from 'utils/request'

import { transformOrder } from 'utils/transforms'
import { getItem, setItem } from 'utils/localStorage'
import { getBrowserInfo } from 'utils/http'

import {
  GET_RECEIPT,
  REPURCHASE_ITEM_REQUEST,
  REGISTER_PUSH,
  GET_REGISTED_PUSH
} from './constants'

import {
  setReceiptAction,
  setRegisteredPushAction
  // successReceiptAction,
  // errorReceiptAction
} from './actions'

import {
  API_BASE_URL,
  ORDERED_LIST_KEY,
  REGISTERED_PUSH
} from 'containers/App/constants'

import {
  setNetworkErrorAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
} from 'containers/Buckets/sagas'

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

export function * getIsRegisteredPush () {
  const isRegistered = yield call(getItem, REGISTERED_PUSH)

  yield put(setRegisteredPushAction(isRegistered || false))
}

export function * registerPushNotification (payload) {
  const { payload: { mobileNumber, token } } = payload
  const authToken = yield getAccessToken()
  const { name } = getBrowserInfo()

  try {
    yield call(request, `${API_BASE_URL}/browserToken`, {
      method: 'POST',
      token: authToken.access_token,
      body: JSON.stringify({
        browser: name,
        mobileNumber,
        token
      })
    })

    // we will set the registered to true
    yield call(setItem, REGISTERED_PUSH, true)
    yield put(setRegisteredPushAction(true))
  } catch (e) {
    yield put(setNetworkErrorAction('Please make sure you have internet connection to order a product.'))
    yield put(setRegisteredPushAction(false))
  }
}

export function * getReceiptSaga () {
  yield * takeLatest(GET_RECEIPT, getReceipt)
}

export function * requestRepurchaseItemSaga () {
  yield * takeLatest(REPURCHASE_ITEM_REQUEST, requestRepurchaseItem)
}

export function * getIsRegisteredPushSaga () {
  yield * takeLatest(GET_REGISTED_PUSH, getIsRegisteredPush)
}

export function * registerPushNotificationSaga () {
  yield * takeLatest(REGISTER_PUSH, registerPushNotification)
}

// All sagas to be loaded
export function * receiptSagas () {
  const watcher = yield [
    fork(getReceiptSaga),

    fork(requestRepurchaseItemSaga),

    fork(getIsRegisteredPushSaga),
    fork(registerPushNotificationSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  receiptSagas
]
