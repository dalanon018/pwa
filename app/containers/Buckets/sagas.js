import moment from 'moment'
import { takeLatest } from 'redux-saga'
import { find, isEmpty, isEqual, noop } from 'lodash'
import {
  both,
  complement,
  compose,
  contains,
  equals,
  filter,
  flatten,
  fromPairs,
  gte,
  head,
  ifElse,
  is,
  isNil,
  join,
  lensProp,
  map,
  partial,
  prop,
  propOr,
  sortBy,
  toPairs,
  uniq,
  view
} from 'ramda'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'

// FIXTURES
// import Categories from 'fixtures/categories-v2.json'
// import Brands from 'fixtures/brands.json'

import { transformCategory, transformBrand, transformOrder } from 'utils/transforms'
import { getItem, setItem, removeItem } from 'utils/localStorage'
import { DateDifferece, AddDate } from 'utils/date'
import { getBrowserInfo } from 'utils/http'

import {
  GET_PRODUCT_CATEGORIES,
  GET_BRANDS,
  GET_MOBILE_NUMBERS,
  GET_RECEIPT_UPDATED,
  STATUSES,
  REGISTER_PUSH,
  GET_REGISTED_PUSH,
  GET_LOYALTY_TOKEN,
  REMOVE_LOYALTY_TOKEN
} from './constants'

import {
  setProductCategoriesAction,
  setBrandsAction,
  setMobileNumbersAction,
  setUpdatedReceiptsAction,
  setNetworkErrorAction,
  setRegisteredPushAction,
  setLoyaltyTokenAction
} from './actions'

import {
  API_BASE_URL,

  TOKEN_URL,
  OATH_CLIENT_ID,
  OATH_CLIENT_SECRET,
  OATH_RESPONSE_TYPE,
  OATH_GRANT_TYPE,
  REGISTERED_PUSH,

  ACCESS_TOKEN_KEY,
  MOBILE_NUMBERS_KEY,
  ORDERED_LIST_KEY,
  CATEGORIES_KEY,
  BRANDS_KEY,
  LOYALTY_TOKEN_KEY
} from 'containers/App/constants'

import {
  setCurrentSessionAction
} from 'containers/App/actions'

import {
  setPurchasesAction
} from 'containers/Purchases/actions'

import {
  setReceiptAction
} from 'containers/ReceiptPage/actions'

function * transformEachEntity (transform, entity) {
  const response = yield call(transform, entity)
  return response
}

function * requestCategories () {
  const token = yield getAccessToken()
  const dbResource = yield call(getItem, CATEGORIES_KEY)
  const req = yield call(getRequestData, `${API_BASE_URL}/categories`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const getResults = propOr([], 'categoryList')
    const isObjectNotEqual = (data) => !isEqual(dbResource, data)

    const shouldUpdate = ifElse(
      isObjectNotEqual,
      updateUICategories,
      noop
    )

    yield call(setItem, CATEGORIES_KEY, getResults(req))
    yield * compose(
      shouldUpdate,
      getResults
    )(req)
  } else {
    yield put(setNetworkErrorAction('No cache data'))
  }
}

function * requestBrands () {
  const token = yield getAccessToken()
  const dbResource = yield call(getItem, BRANDS_KEY)
  const req = yield call(getRequestData, `${API_BASE_URL}/brands`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const getResults = propOr([], 'brandList')
    const isObjectNotEqual = (data) => !isEqual(dbResource, data)

    const shouldUpdate = ifElse(
      isObjectNotEqual,
      updateUIBrands,
      noop
    )

    yield call(setItem, BRANDS_KEY, getResults(req))
    yield * compose(
      shouldUpdate,
      getResults
    )(req)
  } else {
    yield put(setNetworkErrorAction('No cache data'))
  }
}

function * getCategoriesResource () {
  const categories = yield call(getItem, CATEGORIES_KEY)

  yield call(requestCategories)

  return categories
}

function * getBrandsResource () {
  const brands = yield call(getItem, BRANDS_KEY)

  yield call(requestBrands)

  return brands
}

export function * requestAccessToken () {
  const params = {
    client_id: OATH_CLIENT_ID,
    client_secret: OATH_CLIENT_SECRET,
    response_type: OATH_RESPONSE_TYPE,
    grant_type: OATH_GRANT_TYPE
  }

  const fnSearchParams = compose(
    join('&'),
    map(join('=')),
    toPairs
  )

  try {
    const req = yield call(request, TOKEN_URL, {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      body: fnSearchParams(params)
    })

    // the normal expiration is 2 hour but we will only set it to 60 mins so we can be sure that we will not encounter token expiry
    const expiry = AddDate(60)
    const token = Object.assign({}, req, { expiry })

    yield call(setItem, ACCESS_TOKEN_KEY, token)

    return token
  } catch (e) {
    yield put(setNetworkErrorAction('Please make sure you have internet connection to automatically refresh your token.'))
  }

  return {}
}

/**
 * main function for getting us the valid token
 */
export function * getAccessToken () {
  // first we will check if we have token set up
  const token = yield call(getItem, ACCESS_TOKEN_KEY)
  // if we have token then we simply need to check if token is still valid
  if (!isEmpty(token) && token) {
    const { expiry } = token
    if (DateDifferece(moment(), expiry) <= 0) {
      return yield requestAccessToken()
    }

    return token
  }

  return yield requestAccessToken()
}

export function * updateUICategories (req = Array) {
  const transform = yield req.map((data) => transformEachEntity(transformCategory, data))
  const sortAsc = sortBy(prop('name'))

  yield put(setProductCategoriesAction(sortAsc(transform)))
}

// much better to have abstraction rather than coupling items.
export function * updateUIBrands (req = Array) {
  const transform = yield req.map((data) => transformEachEntity(transformBrand, data))
  const sortAsc = sortBy(prop('name'))
  yield put(setBrandsAction(sortAsc(transform)))
}

export function * getCategories () {
  // we need to see if we need to request this since we save this anyway to the browser
  const req = yield getCategoriesResource()
  const getResults = ifElse(
    is(Array),
    updateUICategories,
    noop
  )
  yield getResults(req)
}

export function * getBrands () {
  // we need to see if we need to request this since we save this anyway to the browser
  const req = yield getBrandsResource()
  const getResults = ifElse(
    is(Array),
    updateUIBrands,
    noop
  )
  yield getResults(req)
}

export function * getMobileNumbers () {
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  const emptyArray = () => []
  const transform = (num) => `0${num}`
  const transformMobile = compose(
    map(transform),
    uniq
  )

  const cleanMobiles = ifElse(
    isNil,
    emptyArray,
    transformMobile
  )
  const mobiles = cleanMobiles(mobileNumbers)
  yield put(setMobileNumbersAction(mobiles))
}

function * updateReceiptSnapShot (orders, receiptId) {
  const trackingNumber = head(receiptId)
  const receiptKey = lensProp(trackingNumber)
  const receipt = fromPairs([receiptId])
  const { status, lastUpdated } = view(receiptKey, receipt)
  const order = find(orders, { trackingNumber }) || {}
  let updatedReceipts = []

  // we need to make sure that we will not include 'RESERVED'
  const isReservedStatus = (status) => compose(
    contains(status),
    map(head),
    filter(contains('RESERVED')),
    toPairs
  )(STATUSES)

  // we need to be very careful that status should not be empty
  if (status && (!isEmpty(order) && order.status !== status) && !isReservedStatus(status)) {
    order.status = status || order.status
    order.lastUpdated = lastUpdated || order.lastUpdated || ''
    updatedReceipts = updatedReceipts.concat(order)
    setItem(ORDERED_LIST_KEY, orders)
    // yield put(setUpdatedReceiptsAction(updatedReceipts))

    // we have to update the receipt page
    const receiptTransform = yield call(transformOrder, order)
    yield put(setReceiptAction(receiptTransform))

    // we have to update the purchase list
    const transform = yield orders.map((data) => transformEachEntity(transformOrder, data))
    yield put(setPurchasesAction(transform))
  }

  return updatedReceipts
}

export function * getUpdatedReceipts (payload) {
  const orders = yield call(getItem, ORDERED_LIST_KEY)
  const { payload: { snapshot } } = payload
  const emptyReceipts = (data) => isEmpty(data)
  // make sure that it is not null
  if (snapshot) {
    // first we have to make our snapshot to keys and find the order by the key
    const updateSnapshot = compose(
      map(partial(updateReceiptSnapShot, [orders])),
      toPairs
    )
    const updatedReceipts = yield updateSnapshot(snapshot)
    const updateReceiptRedux = compose(put, setUpdatedReceiptsAction)
    const shouldUpdateReceiptsRedux = ifElse(emptyReceipts, noop, updateReceiptRedux)
    const handleUpdateReceipt = compose(shouldUpdateReceiptsRedux, flatten)

    yield handleUpdateReceipt(updatedReceipts)
  }
}

export function * registerPushNotification (payload) {
  const { payload: { token } } = payload
  const authToken = yield getAccessToken()
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  // we will only get the last mobileNumber used
  const mobileNumber = Array.isArray(mobileNumbers) ? mobileNumbers.pop() : null
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
    yield call(setItem, REGISTERED_PUSH, token)
    yield put(setRegisteredPushAction(token))
  } catch (e) {
    yield put(setNetworkErrorAction('Please make sure you have internet connection to order a product.'))
    yield put(setRegisteredPushAction(false))
  }
}

function * getLoyaltyToken () {
  const loyaltyToken = yield call(getItem, LOYALTY_TOKEN_KEY)
  const isExpired = compose(
    complement(gte(0)),
    partial(DateDifferece, [moment()]),
    propOr(-1, 'expiry')
  )

  const retreiveToken = ifElse(
    both(complement(equals(null)), isExpired),
    prop('token'),
    () => {
      removeItem(LOYALTY_TOKEN_KEY)
      return null
    }
  )

  yield put(setLoyaltyTokenAction(retreiveToken(loyaltyToken)))
}

function * removeMobileNumbers () {
  yield call(removeItem, MOBILE_NUMBERS_KEY)
  yield put(setMobileNumbersAction([]))
}

// this will serves as our logout and we need to remove also the moble
function * removeLoyaltyToken () {
  yield call(removeItem, LOYALTY_TOKEN_KEY)
  yield put(setLoyaltyTokenAction(null))
  yield put(setCurrentSessionAction(null))

  yield * removeMobileNumbers()
}

export function * getIsRegisteredPush () {
  const isRegistered = yield call(getItem, REGISTERED_PUSH)

  yield put(setRegisteredPushAction(isRegistered || false))
}

export function * getCategoriesSaga () {
  yield * takeLatest(GET_PRODUCT_CATEGORIES, getCategories)
}

export function * getBrandsSaga () {
  yield * takeLatest(GET_BRANDS, getBrands)
}

export function * getMobileNumbersSaga () {
  yield * takeLatest(GET_MOBILE_NUMBERS, getMobileNumbers)
}

export function * getUpdatedReceiptsSaga () {
  yield * takeLatest(GET_RECEIPT_UPDATED, getUpdatedReceipts)
}

export function * registerPushNotificationSaga () {
  yield * takeLatest(REGISTER_PUSH, registerPushNotification)
}

export function * getIsRegisteredPushSaga () {
  yield * takeLatest(GET_REGISTED_PUSH, getIsRegisteredPush)
}

export function * getLoyaltyTokenSaga () {
  yield * takeLatest(GET_LOYALTY_TOKEN, getLoyaltyToken)
}

export function * removeLoyaltyTokenSaga () {
  yield * takeLatest(REMOVE_LOYALTY_TOKEN, removeLoyaltyToken)
}

// All sagas to be loaded
export function * bucketsSagas () {
  const watcher = yield [
    fork(getCategoriesSaga),
    fork(getBrandsSaga),
    fork(getMobileNumbersSaga),

    fork(getUpdatedReceiptsSaga),

    fork(registerPushNotificationSaga),

    fork(getIsRegisteredPushSaga),

    // get loyaltyToken
    fork(getLoyaltyTokenSaga),
    // remove loyaltyToken / sign out
    fork(removeLoyaltyTokenSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  bucketsSagas
]
