import moment from 'moment'
// import Firebase from 'utils/firebase-realtime'

import {
  always,
  assoc,
  compose,
  complement,
  dissoc,
  gt,
  identity,
  ifElse,
  is,
  isEmpty,
  map,
  prop,
  propEq,
  propOr,
  uniq,
  when
} from 'ramda'
import { call, cancel, fork, put, take } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest } from 'redux-saga'

import request from 'utils/request'
import { getItem, setItem, removeItem } from 'utils/localStorage'
import { Pad } from 'utils/string'
import { DateDifferece, AddDate } from 'utils/date'
import { transformSubmitOrderPayload, transformCoupon } from 'utils/transforms'
import { EARN_POINTS__MAPPER, calculatePricePoints, toggleOrigDiscountPrice } from 'utils/product'
import { calculateEarnPoints } from 'utils/calculation'

import {
  ERROR_CODES
} from 'utils/errorHandling'

import {
  COUPON_SUBMIT,
  COUPON_REMOVE,
  GET_BLACKLIST,
  GET_CURRENT_POINTS,
  GET_LAST_SELECTED_METHOD,
  GET_MOBILE_NUMBER,
  GET_ORDER_PRODUCT,
  GET_STORE,
  ORDER_SUBMIT
} from './constants'

import {
  setOrderProductAction,
  setMobileNumberAction,
  successOrderAction,
  setStoreAction,
  errorOrderAction,
  setBlackListAction,
  setCurrentPointsAction,
  setLastSelectedMethodAction,
  resultCouponAction
} from './actions'

import {
  API_BASE_URL,
  CURRENT_PRODUCT_KEY,
  LAST_SELECTED_METHOD,
  LOYALTY_TOKEN_KEY,
  MOBILE_NUMBERS_KEY,
  MOBILE_REGISTRATION_URL,
  ORDERED_LIST_KEY,
  STORE_LOCATIONS_KEY,
  VERIFICATION_CODE_KEY
} from 'containers/App/constants'

import {
  setMobileNumbersAction,
  setCurrentPointsAction as HeaderPointsAction
} from 'containers/Buckets/actions'

import {
  DEFAULT_STATUS_COD_PAYMENT,
  COD_PAYMENT
} from 'containers/Buckets/constants'

import {
  getAccessToken
} from 'containers/Buckets/saga'
import {switchFn} from '../../utils/logicHelper'

/**
 * // eventually we will use this to transform the data from response of the order.
 * @param {*} body
 */
function * transformResponse ({ order: { sevenConnectRefNum, transactionId, expiryDate, totalPrice, mobileNumber, paymentType, status }, orderedProduct }) {
  // some of the item doesnt have brand
  const brand = orderedProduct.get('brand') ? orderedProduct.get('brand').toJS() : {}
  const uom = orderedProduct.get('uom') ? orderedProduct.get('uom').toObject() : {}
  // we have to recode the 'PREPAID' static status
  return {
    trackingNumber: transactionId,
    dateCreated: moment().format('YYYY-MM-DD HH:mm:ss'),
    lastUpdated: moment().format('YYYY-MM-DD HH:mm:ss'),
    claimDate: '',
    cliqqCode: orderedProduct.get('cliqqCode').first(),
    currency: paymentType,
    amount: totalPrice,
    quantity: 1,
    imageUrl: orderedProduct.get('image'),
    brandLogo: orderedProduct.get('brandLogo'),
    name: orderedProduct.get('title'),
    returnPolicy: orderedProduct.get('returnPolicy'),
    returnable: orderedProduct.get('returnable'),
    // we need to mock our purchase list api
    association: [{
      parentProduct: {
        cliqqCodes: [{
          cliqqCode: orderedProduct.get('parentCliqqCode')
        }]
      }
    }],
    status: (paymentType === COD_PAYMENT) ? DEFAULT_STATUS_COD_PAYMENT : status,
    expiryDate,
    uom,
    brand,
    mobileNumber,
    sevenConnectRefNum,
    paymentType
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

export function * getLastSelectedMethod () {
  const lastMethod = yield call(getItem, LAST_SELECTED_METHOD)
  yield put(setLastSelectedMethodAction(lastMethod))
}

export function * requestLoyaltyToken () {
  const verification = yield call(getItem, VERIFICATION_CODE_KEY)
  try {
    const token = yield getAccessToken()
    const req = yield call(request, `${MOBILE_REGISTRATION_URL}/loyalty/cliqqshop/authorization`, {
      method: 'POST',
      token: token.access_token,
      body: JSON.stringify({ verification })
    })
    const getLoyaltyToken = prop('loyaltyToken')
    // the normal expiration is 2 hour
    const expiry = AddDate(120)
    const loyaltyToken = Object.assign({}, {
      token: getLoyaltyToken(req),
      expiry
    })

    yield call(setItem, LOYALTY_TOKEN_KEY, loyaltyToken)

    return loyaltyToken
  } catch (e) {
    throw new Error(ERROR_CODES.VERIFICATION_EXPIRES)
  }
}

export function * getLoyaltyToken () {
  const loyaltyToken = yield call(getItem, LOYALTY_TOKEN_KEY)
  // if we have token then we simply need to check if token is still valid
  if (!isEmpty(loyaltyToken) && loyaltyToken) {
    const { expiry } = loyaltyToken
    if (DateDifferece(moment(), expiry) <= 0) {
      return yield requestLoyaltyToken()
    }

    return loyaltyToken
  }

  return yield requestLoyaltyToken()
}

export function * requestOrderToken (mobile) {
  const mobileNumber = `0${mobile}`

  const loyaltyToken = yield getLoyaltyToken()
  const token = yield getAccessToken()

  const getOrderToken = yield call(request, `${MOBILE_REGISTRATION_URL}/loyalty/cliqqshop/auth_kong`, {
    method: 'POST',
    token: token.access_token,
    body: JSON.stringify({
      mobileNumber,
      loyaltyToken: loyaltyToken.token
    })
  })
  const getPropAccessToken = prop('accessToken')
  return getPropAccessToken(getOrderToken)
}

// Special case for promo payload
function promoPayload (orderedProduct) {
  const promoCode = orderedProduct.getIn(['promo', 'promoCode'])

  return promoCode ? {
    totalPrice: toggleOrigDiscountPrice(orderedProduct),
    promoCode
  } : {}
}

// Special case for coupon payload
function couponPayload ({ orderedProduct, couponCode }) {
  return couponCode ? {
    totalPrice: toggleOrigDiscountPrice(orderedProduct),
    couponCode
  } : {}
}

function * createPostPayload ({ orderedProduct, mobileNumber, modePayment, store, usePoints, couponCode }) {
  const loyaltyToken = yield call(getItem, LOYALTY_TOKEN_KEY)
  return transformSubmitOrderPayload({
    ...promoPayload(orderedProduct),
    ...couponPayload({ orderedProduct, couponCode }),
    epbPointsCredit: calculateEarnPoints({
      multiplier: orderedProduct.getIn(['points', 'multiplier']),
      method: orderedProduct.getIn(['points', 'method', EARN_POINTS__MAPPER[modePayment]]).toObject(),
      amount: toggleOrigDiscountPrice(orderedProduct)
    }),
    cliqqCode: orderedProduct.get('cliqqCode').first(),
    multiplier: orderedProduct.getIn(['points', 'multiplier']),
    amount: calculatePricePoints({
      product: orderedProduct,
      usePoints
    }),
    quantity: 1,
    deviceOrigin: 'PWA',
    mobileNumber: `0${mobileNumber}`,
    deliveryLocationId: Pad(store.id),
    loyaltyToken: loyaltyToken.token,
    usePoints
  })
}

export function * submitOrder (args) {
  const { payload: { orderedProduct, mobileNumber, modePayment, store, usePoints, couponCode } } = args
  const postPayload = yield * createPostPayload({ orderedProduct, mobileNumber, modePayment, store, usePoints, couponCode })
  try {
    const token = yield requestOrderToken(mobileNumber)
    const order = yield call(request, `${API_BASE_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify(postPayload(modePayment)),
      token
    })
    const isError = propOr(null, 'statusCode')

    // right now e have to emulate the response data
    // once response is success we have to pass it back so we can eventually redirect the user to the barcode page.
    if (isError(order) === null) {
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
      yield put(errorOrderAction(ERROR_CODES.EMPTY_QUANTITY))
    }
  } catch (e) {
    const exceptionHander = switchFn({
      VERIFICATION_EXPIRES: ERROR_CODES[e.message]
    })(ERROR_CODES.ERROR_SUBMISSION)

    yield put(errorOrderAction(exceptionHander(e.message)))
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

export function * getCurrentPoints () {
  const token = yield getAccessToken()
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  // we will only get the last mobileNumber used
  const mobile = Array.isArray(mobileNumbers) ? mobileNumbers.pop() : null

  const req = yield call(request, `${API_BASE_URL}/wallet-transactions/0${mobile}`, {
    method: 'GET',
    token: token.access_token
  })
  if (!isEmpty(req)) {
    const currentPoints = compose(
      when(gt(0), always(0)),
      propOr(0, 'currentPoints')
    )
    const points = parseInt(currentPoints(req))
    yield put(HeaderPointsAction(points))
    yield put(setCurrentPointsAction({ points }))
  } else {
    yield put(setCurrentPointsAction({}))
  }
}

function * couponPayloadCreator ({orderedProduct, mobileNumber, couponCode}) {
  // we remove the totalPrice that not really needed if promo code exist
  return dissoc('totalPrice', {
    ...promoPayload(orderedProduct),
    cliqqCode: orderedProduct.get('cliqqCode').first(),
    quantity: 1,
    deviceOrigin: 'PWA',
    mobileNumber: `0${mobileNumber}`,
    couponCode
  })
}

function updateOrderProductCouponPrice ({ orderedProduct, coupon }) {
  const couponPrice = compose(parseInt, propOr(0, 'PHP'))
  return assoc('couponPrice', couponPrice(coupon), { ...orderedProduct.toJS() })
}

export function * submitCoupon (args) {
  const { payload: { orderedProduct, mobileNumber, couponCode } } = args
  const isSuccess = complement(propEq('statusCode', '404'))
  const postPayload = yield couponPayloadCreator({orderedProduct, mobileNumber, couponCode})

  const token = yield getAccessToken()
  const req = yield call(request, `${API_BASE_URL}/orderValidation`, {
    method: 'POST',
    body: JSON.stringify(postPayload),
    token: token.access_token
  })

  let couponApplied = false
  let couponSuccess = false
  let couponError = false

  if (isSuccess(req)) {
    const coupon = yield transformCoupon(req)
    const updateOrderProduct = compose(
      put,
      setOrderProductAction,
      updateOrderProductCouponPrice
    )

    couponApplied = true
    couponSuccess = true
    yield updateOrderProduct({ orderedProduct, coupon })
  } else {
    couponError = ERROR_CODES.COUPON_INVALID
  }

  yield put(resultCouponAction({
    couponApplied,
    couponSuccess,
    couponError
  }))
}

export function * removeCoupon (args) {
  const { payload: { orderedProduct } } = args
  const updateOrderProduct = compose(
    put,
    setOrderProductAction,
    updateOrderProductCouponPrice
  )
  // set ordered product and make the couponPrice 0
  yield updateOrderProduct({ orderedProduct, coupon: {} })

  yield put(resultCouponAction({
    couponApplied: false,
    couponSuccess: false,
    couponError: false
  }))
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
export function * submitOrderSaga () {
  yield * takeLatest(ORDER_SUBMIT, submitOrder)
}

export function * getIsBlackListSaga () {
  yield * takeLatest(GET_BLACKLIST, getIsBlackList)
}

export function * getCurrentPointsSaga () {
  yield * takeLatest(GET_CURRENT_POINTS, getCurrentPoints)
}

export function * getLastSelectedMethodSaga () {
  yield * takeLatest(GET_LAST_SELECTED_METHOD, getLastSelectedMethod)
}

export function * submitCouponSaga () {
  yield * takeLatest(COUPON_SUBMIT, submitCoupon)
}

export function * removeCouponSaga () {
  yield * takeLatest(COUPON_REMOVE, removeCoupon)
}

export function * productReviewSagas () {
  const watcher = yield [
    fork(getOrderProductSaga),
    fork(getMobileNumberSaga),

    fork(getIsBlackListSaga),

    fork(getStoreLocationSaga),
    fork(getCurrentPointsSaga),
    fork(getLastSelectedMethodSaga),

    fork(submitCouponSaga),
    fork(removeCouponSaga),

    fork(submitOrderSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default productReviewSagas
