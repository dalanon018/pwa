import moment from 'moment'
import { takeLatest } from 'redux-saga'
import { isEmpty, compact } from 'lodash'
import {
  assoc,
  compose,
  either,
  identity,
  ifElse,
  is,
  find,
  isNil,
  map,
  partial,
  prop,
  propOr,
  propEq,
  sort,
  uniq,
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
  GET_LOCAL_PURCHASES,

  GET_MODAL_TOGGLE,

  SET_MOBILE_NUMBER
} from './constants'

import {
  setPurchasesAction,

  setModalToggleAction
} from './actions'

import {
  API_BASE_URL,

  ORDERED_LIST_KEY,
  MOBILE_NUMBERS_KEY
} from 'containers/App/constants'

import {
  setMobileNumbersAction,
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
 * sevenConnectRefNum, facilityName, status
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
      assoc('status', prop('status', data)),
      assoc('sevenConnectRefNum', prop('sevenConnectRefNum', data)),
      assoc('facilityName', prop('facilityName', data))
    )(oldReceipt)

    const found = compose(
      updateOldReceipt,
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
  const req = yield call(getRequestData, `${API_BASE_URL}/purchases/0${mobile}?deviceOrigin=PWA`, {
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

  yield put(setPurchasesAction(response))
}

export function * getModalToggle () {
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  const modalToggle = !mobileNumbers
  // if we have mobile numbers then we dont have to show our modal else we have to show it.
  yield put(setModalToggleAction(modalToggle))
}

export function * setMobileNumber (payload) {
  const { payload: { value } } = payload
  const convertToArray = ifElse(is(Object), identity, (entity) => [entity])
  const updateBucket = compose(uniq, convertToArray)
  const mobiles = yield call(getItem, MOBILE_NUMBERS_KEY)

  let mobileRegistrations = compact(mobiles) || []

  mobileRegistrations = mobileRegistrations.concat(value)

  yield call(setItem, MOBILE_NUMBERS_KEY, mobileRegistrations)
  // update the buckets to listen
  yield put(setMobileNumbersAction(updateBucket(mobileRegistrations)))
  // update the modal
  yield getModalToggle()
  // update the receipts
  yield getApiPurchases()
}

export function * getApiPurchasesSaga () {
  yield * takeLatest(GET_API_PURCHASES, getApiPurchases)
}

export function * getLocalPurchasesSaga () {
  yield * takeLatest(GET_LOCAL_PURCHASES, getLocalPurchases)
}

export function * getModalToggleSaga () {
  yield * takeLatest(GET_MODAL_TOGGLE, getModalToggle)
}

export function * setMobileNumberSaga () {
  yield * takeLatest(SET_MOBILE_NUMBER, setMobileNumber)
}

// All sagas to be loaded
export function * purchasesSagas () {
  const watcher = yield [
    fork(getApiPurchasesSaga),
    fork(getLocalPurchasesSaga),

    fork(getModalToggleSaga),

    fork(setMobileNumberSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  purchasesSagas
]
