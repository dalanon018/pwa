
import { takeLatest } from 'redux-saga'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'
import { transformOrder } from 'utils/transforms'

import FakeOrders from 'fixtures/orders.json'

import {
  GET_PURCHASES
} from './constants'
import {
  setPurchasesAction
} from './actions'

function * transformEachEntity (entity) {
  const response = yield call(transformOrder, entity)
  return response
}

export function * getPurchases () {
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
    const transform = yield req.map(transformEachEntity)
    yield put(setPurchasesAction(transform))
  }
}

export function * getPurchasesSaga () {
  yield * takeLatest(GET_PURCHASES, getPurchases)
}

// All sagas to be loaded
export function * purchasesSagas () {
  const watcher = yield [
    fork(getPurchasesSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  purchasesSagas
]
