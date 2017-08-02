import moment from 'moment'
import Firebase from 'utils/firebase-realtime'

import { compose, is, ifElse, identity, uniq } from 'ramda'
import { call, cancel, fork, put, take } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'
import { takeLatest } from 'redux-saga'
import { getItem, setItem, removeItem } from 'utils/localStorage'
import { calculateProductPrice } from 'utils/promo'

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
  CURRENT_PRODUCT_KEY,
  MOBILE_NUMBERS_KEY,
  ORDERED_LIST_KEY
} from 'containers/App/constants'

import {
  setMobileNumbersAction
} from 'containers/Buckets/actions'
/**
 * we will create the fake response here.
 * @param {*} body
 */
function * fakeResponse ({ mobileNumber, orderedProduct, modePayment }) {
  return {
    trackingNumber: String(Math.random() * 1000000000000000000, 19),
    claimExpiry: moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    dateCreated: moment().format('YYYY-MM-DD HH:mm:ss'),
    cliqqCode: orderedProduct.get('cliqqCode').first(),
    currency: modePayment,
    amount: String(calculateProductPrice(orderedProduct)),
    quantity: 1,
    status: 'CREATED',
    imageUrl: orderedProduct.get('image'),
    brandLogo: orderedProduct.get('image'),
    name: orderedProduct.get('title'),
    mobileNumber
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
function * updateFirebase ({ order: { trackingNumber }, mobileNumber }) {
  try {
    yield Firebase.login()
    yield Firebase.update(mobileNumber, {
      [trackingNumber]: 'CREATED'
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

export function * submitOrder (payload) {
  const { payload: { orderedProduct, mobileNumber, modePayment } } = payload

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

  // const bodyPayload = {
  //   cliqqCode: orderedProduct.get('cliqqCode').first(),
  //   quantity: 1,
  //   deliveryLocationsId: '0001',
  //   deviceOrigin: 'PWA',
  //   mobileNumber
  // }

  // right now e have to emulate the response data
  const order = yield fakeResponse({orderedProduct, mobileNumber, modePayment})
  // once response is success we have to pass it back so we can eventually redirect the user to the barcode page.
  if (order) {
    // here we have to save it first to our storage.
    yield setOrderList(order)
    // we have to remove the current product since we already done with it.
    yield call(removeItem, CURRENT_PRODUCT_KEY)
    // we have to update the firebase
    yield updateFirebase({ order, mobileNumber })

    yield put(successOrderAction(order))
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
