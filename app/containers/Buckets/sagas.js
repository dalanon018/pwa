import moment from 'moment'
import { takeLatest } from 'redux-saga'
import { find, isEmpty, isEqual, noop } from 'lodash'
import { compose, flatten, filter, fromPairs, contains, join, toPairs, lensProp, map, partial, propOr, head, ifElse, is, isNil, uniq, view } from 'ramda'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'

import { transformCategory } from 'utils/transforms'
import { getItem, setItem } from 'utils/localStorage'
import { DateDifferece } from 'utils/date'

import {
  GET_PRODUCT_CATEGORIES,
  GET_MOBILE_NUMBERS,
  GET_RECEIPT_UPDATED,
  STATUSES
} from './constants'

import {
  setProductCategoriesAction,
  setMobileNumbersAction,
  setUpdatedReceiptsAction,
  setNetworkErrorAction
} from './actions'

import {
  API_BASE_URL,

  TOKEN_URL,
  OATH_CLIENT_ID,
  OATH_CLIENT_SECRET,
  OATH_RESPONSE_TYPE,
  OATH_GRANT_TYPE,

  ACCESS_TOKEN_KEY,
  MOBILE_NUMBERS_KEY,
  ORDERED_LIST_KEY,
  CATEGORIES_KEY
} from 'containers/App/constants'

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

function * getCategoriesResource () {
  const categories = yield call(getItem, CATEGORIES_KEY)

  yield call(requestCategories)

  return categories
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

    // the normal expiration is 1 hour but we will only set it to 30 mins so we can be sure that we will not encounter token expiry
    const expiry = moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss')
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

  yield put(setProductCategoriesAction(transform))
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
  const snapStatus = view(receiptKey, receipt)
  const order = find(orders, { trackingNumber }) || {}
  let updatedReceipts = []

  // we need to make sure that we will not include 'RESERVED'
  const isReservedStatus = (status) => compose(
    contains(status),
    map(head),
    filter(contains('RESERVED')),
    toPairs
  )(STATUSES)

  if ((!isEmpty(order) && order.status !== snapStatus) && !isReservedStatus(snapStatus)) {
    order.status = snapStatus
    updatedReceipts = updatedReceipts.concat(order)
    setItem(ORDERED_LIST_KEY, orders)
    // yield put(setUpdatedReceiptsAction(updatedReceipts))

    // we have to update the receipt page
    yield put(setReceiptAction(order))

    // we have to update the purchase list
    yield put(setPurchasesAction(orders))
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

export function * getCategoriesSaga () {
  yield * takeLatest(GET_PRODUCT_CATEGORIES, getCategories)
}

export function * getMobileNumbersSaga () {
  yield * takeLatest(GET_MOBILE_NUMBERS, getMobileNumbers)
}

export function * getUpdatedReceiptsSaga () {
  yield * takeLatest(GET_RECEIPT_UPDATED, getUpdatedReceipts)
}

// All sagas to be loaded
export function * bucketsSagas () {
  const watcher = yield [
    fork(getCategoriesSaga),
    fork(getMobileNumbersSaga),

    fork(getUpdatedReceiptsSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  bucketsSagas
]
