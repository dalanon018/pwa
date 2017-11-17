import moment from 'moment'
import { takeLatest } from 'redux-saga'
import { isEmpty, compact } from 'lodash'
import {
  assoc,
  compose,
  either,
  ifElse,
  find,
  isNil,
  map,
  partial,
  prop,
  propOr,
  propEq,
  sort,
  uniqBy
} from 'ramda'

import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'

import { getItem, setItem } from 'utils/localStorage'
import { transformOrder } from 'utils/transforms'

import {
  GET_API_PURCHASES,
  GET_LOCAL_PURCHASES
} from './constants'

import {
  setPurchasesAction
} from './actions'

import {
  API_BASE_URL,

  ORDERED_LIST_KEY,
  MOBILE_NUMBERS_KEY
} from 'containers/App/constants'

import {
  setNetworkErrorAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
} from 'containers/Buckets/sagas'

function * transformEachEntity (entity) {
  const response = yield call(transformOrder, entity)
  return response
}

function * sortOrdersbyDate (orders) {
  const m = (d) => moment(d).valueOf()
  const convertDateSortable = (a, b) => m(b.dateCreated) - m(a.dateCreated)

  return orders ? sort(convertDateSortable, orders) : []
}

function * getOrderList () {
  const orders = yield call(getItem, ORDERED_LIST_KEY)
  const sorted = yield * sortOrdersbyDate(orders)
  return sorted || []
}

/**
 * TODO:
 * REFACTOR OUT PLEASE MAKE USE RAMDA BETTER
 * things to update :
 * sevenConnectRefNum, facilityName, status, brand, lastUpdated
 * @param {*} apiOrders
 */
function * findAndUpdateReceiptDetails (apiOrders) {
  const orders = yield getOrderList()
  // create new object
  const updatedOrders = apiOrders.slice()
  const updateLocalReceiptsDetails = (newReceipts, oldReceipt) => {
    const trackingNumber = prop('trackingNumber', oldReceipt)
    const findReceipt = find(propEq('trackingNumber', trackingNumber))
    const updateOldReceipt = (data) => compose(
      assoc('claimDate', prop('claimDate', data)),
      assoc('lastUpdated', prop('lastUpdated', data)),
      assoc('status', prop('status', data)),
      assoc('brand', propOr({}, 'brand', data)),
      assoc('sevenConnectRefNum', prop('sevenConnectRefNum', data)),
      assoc('facilityName', prop('facilityName', data))
    )(oldReceipt)

    const shouldUpdateOldReceipt = ifElse(
      isNil,
      () => {},
      updateOldReceipt
    )

    const found = compose(
      shouldUpdateOldReceipt,
      findReceipt
    )

    return found(newReceipts)
  }

  const updateReceiptList = compose(
    map(partial(updateLocalReceiptsDetails, [updatedOrders]))
  )

  return updateReceiptList(orders)
}

function * setOrderList (apiOrders) {
  const orders = yield findAndUpdateReceiptDetails(apiOrders)
  const cleanOrders = compose(uniqBy(prop('trackingNumber')), compact)

  let currentOrders = Array.isArray(orders) ? orders : []
  let setOrders = currentOrders.concat(apiOrders)

  yield call(setItem, ORDERED_LIST_KEY, cleanOrders(setOrders))
}

export function * getApiPurchases () {
  const token = yield getAccessToken()
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  // we will only get the last mobileNumber used
  const mobile = Array.isArray(mobileNumbers) ? mobileNumbers.pop() : null
  const req = yield call(getRequestData, `${API_BASE_URL}/purchases/0${mobile}?deviceOrigin=PWA&offset=0&limit=100`, {
    method: 'GET',
    token: token.access_token
  })
  const shouldUpdateApi = either(!isEmpty(req), isNil(mobile))

  if (shouldUpdateApi) {
    const getOrderListProp = propOr([], 'salesOrderList')
    const orderLists = getOrderListProp(req)

    yield * setOrderList(orderLists)
    const allOrders = yield * getOrderList()

    const transform = yield allOrders.map(transformEachEntity)

    yield put(setPurchasesAction(transform))
  } else {
    yield put(setNetworkErrorAction('No cache data'))
  }
}

export function * getLocalPurchases () {
  const response = yield * getOrderList()
  const transform = yield response.map(transformEachEntity)
  yield put(setPurchasesAction(transform))
}

export function * getApiPurchasesSaga () {
  yield * takeLatest(GET_API_PURCHASES, getApiPurchases)
}

export function * getLocalPurchasesSaga () {
  yield * takeLatest(GET_LOCAL_PURCHASES, getLocalPurchases)
}

// All sagas to be loaded
export function * purchasesSagas () {
  const watcher = yield [
    fork(getApiPurchasesSaga),
    fork(getLocalPurchasesSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  purchasesSagas
]
