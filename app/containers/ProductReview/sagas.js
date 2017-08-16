import moment from 'moment'
import Firebase from 'utils/firebase-realtime'

import { compose, is, ifElse, identity, uniq } from 'ramda'
import { call, cancel, fork, put, take } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest } from 'redux-saga'

import request from 'utils/request'
import { getItem, setItem, removeItem } from 'utils/localStorage'

import {
  GET_ORDER_PRODUCT,
  GET_MOBILE_NUMBER,
  ORDER_SUBMIT
} from './constants'

import {
  setOrderProductAction,
  setMobileNumberAction,
  successOrderAction,
  errorOrderAction
} from './actions'

import {
  API_BASE_URL,
  CURRENT_PRODUCT_KEY,
  MOBILE_NUMBERS_KEY,
  ORDERED_LIST_KEY
} from 'containers/App/constants'

import {
  setMobileNumbersAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
} from 'containers/Buckets/sagas'

/**
 * // eventually we will use this to transform the data from response of the order.
 * @param {*} body
 */
function * transformResponse ({ order: { transactionId, expiryDate, totalPrice, status }, mobileNumber, orderedProduct, modePayment }) {
  return {
    trackingNumber: transactionId,
    claimExpiry: expiryDate,
    dateCreated: moment().format('YYYY-MM-DD HH:mm:ss'),
    cliqqCode: orderedProduct.get('cliqqCode').first(),
    currency: modePayment,
    amount: totalPrice,
    quantity: 1,
    imageUrl: orderedProduct.get('image'),
    brandLogo: orderedProduct.get('brandLogo'),
    name: orderedProduct.get('title'),
    mobileNumber,
    status
  }
}

function * getOrderList () {
  const orders = yield call(getItem, ORDERED_LIST_KEY)
  return orders || []
}

function * setOrderList (order) {
  const orders = yield getOrderList()

  let setOrders = orders.concat(order)

  return yield call(setItem, ORDERED_LIST_KEY, setOrders)
}

/**
 * Here we will save the transactions to firebase with the main key of mobile numbers
 * <mobile>: {transactionID: "status"}
 */
function * updateFirebase ({ orderResponse: { trackingNumber, status }, mobileNumber }) {
  try {
    yield Firebase.login()
    yield Firebase.update(mobileNumber, {
      [trackingNumber]: status
    })
  } catch (e) {
    console.log('error on firebase', e)
  }
}

export function * getOrderProduct () {
  const orderProduct = yield call(getItem, CURRENT_PRODUCT_KEY)
  yield put(setOrderProductAction(orderProduct || {}))
}

export function * getMobileNumber () {
  const convertToArray = ifElse(is(Object), identity, (entity) => [entity])
  const updateBucket = compose(uniq, convertToArray)

  // first we have to update our bucket list of what number we already have
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  yield put(setMobileNumbersAction(updateBucket(mobileNumbers)))

  const mobile = Array.isArray(mobileNumbers) ? mobileNumbers.pop() : null
  yield put(setMobileNumberAction(mobile))
}

export function * submitOrder (args) {
  const { payload: { orderedProduct, mobileNumber, modePayment } } = args
  const token = yield getAccessToken()
  const order = yield call(request, `${API_BASE_URL}/orders`, {
    method: 'POST',
    token: token.access_token,
    body: JSON.stringify({
      cliqqCode: orderedProduct.get('cliqqCode').first(),
      quantity: 1,
      deviceOrigin: 'PWA',
      mobileNumber
    })
  })

  // right now e have to emulate the response data
  // once response is success we have to pass it back so we can eventually redirect the user to the barcode page.
  if (order) {
    // make our transformer here that should be the same as getting purchase list.
    const orderResponse = yield transformResponse({ order, orderedProduct, mobileNumber, modePayment })
    // here we have to save it first to our storage.
    yield setOrderList(orderResponse)
    // we have to remove the current product since we already done with it.
    yield call(removeItem, CURRENT_PRODUCT_KEY)
    // we have to update the firebase
    yield updateFirebase({ orderResponse, mobileNumber })

    yield put(successOrderAction(orderResponse))
  } else {
    yield put(errorOrderAction(order))
  }
}

export function * getOrderProductSaga () {
  yield * takeLatest(GET_ORDER_PRODUCT, getOrderProduct)
}

export function * getMobileNumberSaga () {
  yield * takeLatest(GET_MOBILE_NUMBER, getMobileNumber)
}

export function * submitOrderSaga () {
  yield * takeLatest(ORDER_SUBMIT, submitOrder)
}

export function * productReviewSagas () {
  const watcher = yield [
    fork(getOrderProductSaga),
    fork(getMobileNumberSaga),

    fork(submitOrderSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default [
  productReviewSagas
]
