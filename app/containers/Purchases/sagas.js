import moment from 'moment'
import { takeLatest } from 'redux-saga'
import { compact } from 'lodash'
import { compose, uniqBy, prop, sort } from 'ramda'

import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'
import { getItem, setItem } from 'utils/localStorage'
import { transformOrder } from 'utils/transforms'

import FakeOrders from 'fixtures/orders.json'

import {
  GET_API_PURCHASES,
  GET_LOCAL_PURCHASES
} from './constants'

import {
  setPurchasesAction
} from './actions'

import {
  ORDERED_LIST_KEY
} from 'containers/App/constants'

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

  let setOrders = orders.concat(currentOrders)

  yield call(setItem, ORDERED_LIST_KEY, cleanOrders(setOrders))
}

export function * getApiPurchases () {
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
  if (!req.err) {
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
