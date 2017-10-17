import moment from 'moment'
// import Firebase from 'utils/firebase-realtime'

import { compose, is, ifElse, identity, map, uniq, isEmpty, propOr } from 'ramda'
import { call, cancel, fork, put, take, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest } from 'redux-saga'

import request from 'utils/request'
import { getItem, setItem, removeItem } from 'utils/localStorage'
import { fnSearchParams } from 'utils/http'
import { transformSubmitOrderPayload } from 'utils/transforms'

import {
  GET_ORDER_PRODUCT,
  GET_MOBILE_NUMBER,
  ORDER_SUBMIT,
  GET_STORE,
  STORE_LOCATOR,
  GET_BLACKLIST
} from './constants'

import {
  setOrderProductAction,
  setMobileNumberAction,
  successOrderAction,
  setStoreAction,
  errorOrderAction,
  setBlackListAction
} from './actions'

import {
  selectMobileNumber
} from './selectors'

import {
  API_BASE_URL,
  APP_BASE_URL,
  STORE_LOCATOR_URL,
  CURRENT_PRODUCT_KEY,
  MOBILE_NUMBERS_KEY,
  ORDERED_LIST_KEY,
  STORE_LOCATIONS_KEY
} from 'containers/App/constants'

import {
  setMobileNumbersAction,
  setNetworkErrorAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
} from 'containers/Buckets/sagas'

/**
 * // eventually we will use this to transform the data from response of the order.
 * @param {*} body
 */
function * transformResponse ({ order: { sevenConnectRefNum, transactionId, expiryDate, totalPrice, mobileNumber, paymentType, status }, orderedProduct }) {
  return {
    trackingNumber: transactionId,
    claimExpiry: expiryDate,
    dateCreated: moment().format('YYYY-MM-DD HH:mm:ss'),
    cliqqCode: orderedProduct.get('cliqqCode').first(),
    currency: paymentType,
    amount: totalPrice,
    quantity: 1,
    imageUrl: orderedProduct.get('image'),
    brandLogo: orderedProduct.get('brandLogo'),
    name: orderedProduct.get('title'),
    mobileNumber,
    sevenConnectRefNum,
    paymentType,
    status
  }
}

function * getOrderList () {
  const orders = yield call(getItem, ORDERED_LIST_KEY)
  return orders || []
}

function * getStore () {
  const store = yield call(getItem, STORE_LOCATIONS_KEY)
  return store || {}
}

function * setOrderList (order) {
  const orders = yield getOrderList()

  let setOrders = orders.concat(order)

  return yield call(setItem, ORDERED_LIST_KEY, setOrders)
}

export function * storeLocator () {
  const mobileNumber = yield select(selectMobileNumber())
  // ${fnSearchParams({ type: 'cod' })}`)
  const params = {
    callbackUrl: encodeURI(`${APP_BASE_URL}/review`),
    callbackMethod: 'GET',
    mobileNumber: `0${mobileNumber}`
  }

  yield window.location.replace(`${STORE_LOCATOR_URL}${fnSearchParams(params)}`)
}

/**
 * Here we will save the transactions to firebase with the main key of mobile numbers
 * <mobile>: {transactionID: "status"}
 */
// function * updateFirebase ({ orderResponse: { trackingNumber, status }, completeMobile }) {
//   try {
//     yield Firebase.login()
//     yield Firebase.update(completeMobile, {
//       [trackingNumber]: status
//     })
//   } catch (e) {
//     console.log('error on firebase', e)
//   }
// }

/**
 * Here we will handle the store we visited
 */
function * updateStoreLocations ({ store }) {
  if (!isEmpty(store)) {
    yield call(setItem, STORE_LOCATIONS_KEY, store)
    yield put(setStoreAction(store))
  }
}

export function * getStoreLocation () {
  const store = yield getStore()
  yield put(setStoreAction(store))
}

export function * getOrderProduct () {
  const orderProduct = yield call(getItem, CURRENT_PRODUCT_KEY)
  yield put(setOrderProductAction(orderProduct || {}))
}

export function * getMobileNumber () {
  const convertToArray = ifElse(is(Object), identity, (entity) => [entity])
  const transformMobile = (num) => `0${num}`
  const updateBucket = compose(
    setMobileNumbersAction,
    map(transformMobile),
    uniq,
    convertToArray
  )

  // first we have to update our bucket list of what number we already have
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  yield put(updateBucket(mobileNumbers))

  const mobile = Array.isArray(mobileNumbers) ? mobileNumbers.pop() : null
  yield put(setMobileNumberAction(mobile))
}

export function * submitOrder (args) {
  const { payload: { orderedProduct, mobileNumber, modePayment, store } } = args
  const completeMobile = `0${mobileNumber}`
  const token = yield getAccessToken()
  const postPayload = transformSubmitOrderPayload({
    cliqqCode: orderedProduct.get('cliqqCode').first(),
    quantity: 1,
    deviceOrigin: 'PWA',
    mobileNumber: completeMobile
  })

  try {
    const order = yield call(request, `${API_BASE_URL}/orders`, {
      method: 'POST',
      token: token.access_token,
      body: JSON.stringify(postPayload(modePayment))
    })

    // right now e have to emulate the response data
    // once response is success we have to pass it back so we can eventually redirect the user to the barcode page.
    if (order) {
      // make our transformer here that should be the same as getting purchase list.
      const orderResponse = yield transformResponse({ order, orderedProduct })
      // here we have to save it first to our storage.
      yield setOrderList(orderResponse)
      // we have to remove the current product since we already done with it.
      yield call(removeItem, CURRENT_PRODUCT_KEY)

      // we have to update the firebase
      // yield updateFirebase({ orderResponse, completeMobile })

      // update store locations
      yield updateStoreLocations({ store })

      yield put(successOrderAction(orderResponse))
    } else {
      yield put(errorOrderAction(order))
    }
  } catch (e) {
    yield put(setNetworkErrorAction('Please make sure you have internet connection to order a product.'))
    yield put(errorOrderAction({}))
  }
}

export function * getIsBlackList () {
  const token = yield getAccessToken()
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  // we will only get the last mobileNumber used
  const mobile = Array.isArray(mobileNumbers) ? mobileNumbers.pop() : null

  try {
    const req = yield call(request, `${API_BASE_URL}/customers/0${mobile}`, {
      method: 'GET',
      token: token.access_token
    })
    const isBlackListedProp = propOr(false, 'blacklisted')
    const isBlackListed = isBlackListedProp(req)
    yield (put(setBlackListAction(isBlackListed)))
  } catch (e) {
    // means offline and we need to black list it for safety
    yield (put(setBlackListAction(true)))
  }
}

export function * getOrderProductSaga () {
  yield * takeLatest(GET_ORDER_PRODUCT, getOrderProduct)
}

export function * getMobileNumberSaga () {
  yield * takeLatest(GET_MOBILE_NUMBER, getMobileNumber)
}

export function * getStoreLocationSaga () {
  yield * takeLatest(GET_STORE, getStoreLocation)
}

export function * storeLocatorSaga () {
  yield * takeLatest(STORE_LOCATOR, storeLocator)
}

export function * submitOrderSaga () {
  yield * takeLatest(ORDER_SUBMIT, submitOrder)
}

export function * getIsBlackListSaga () {
  yield * takeLatest(GET_BLACKLIST, getIsBlackList)
}

export function * productReviewSagas () {
  const watcher = yield [
    fork(getOrderProductSaga),
    fork(getMobileNumberSaga),

    fork(getIsBlackListSaga),

    fork(getStoreLocationSaga),
    fork(storeLocatorSaga),

    fork(submitOrderSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default [
  productReviewSagas
]
