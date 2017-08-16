import moment from 'moment'
import { takeLatest } from 'redux-saga'
import { compact } from 'lodash'
import { compose, identity, ifElse, is, prop, sort, uniq, uniqBy } from 'ramda'

import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'
import { getItem, setItem } from 'utils/localStorage'
import { transformOrder } from 'utils/transforms'

import FakeOrders from 'fixtures/orders.json'

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
  ORDERED_LIST_KEY,
  MOBILE_NUMBERS_KEY
} from 'containers/App/constants'

import {
  setMobileNumbersAction
} from 'containers/Buckets/actions'

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

function * setOrderList (apiOrders) {
  const orders = yield getOrderList()

  const cleanOrders = compose(uniqBy(prop('trackingNumber')), compact)
  let currentOrders = Array.isArray(orders) ? orders : []

  let setOrders = currentOrders.concat(apiOrders)

  yield call(setItem, ORDERED_LIST_KEY, cleanOrders(setOrders))
}

export function * getApiPurchases () {
  // remember we have to get the last mobile numbers used here.
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
  const req = yield Promise.resolve(FakeOrders)

  if (req) {
    yield * setOrderList(req)
    const allOrders = yield * getOrderList()

    const transform = yield allOrders.map(transformEachEntity)

    yield put(setPurchasesAction(transform))
  }
}

export function * getLocalPurchases () {
  const response = yield * getOrderList()

  yield put(setPurchasesAction(response))
}

export function * getModalToggle () {
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  const modalToggle = !mobileNumbers
  console.log('modalToggle', modalToggle)
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
