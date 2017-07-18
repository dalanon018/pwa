
import { takeLatest } from 'redux-saga'
import { take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'

import FakeBarcodes from 'fixtures/orders.json'

import {
  GET_BARCODES
} from './constants'
import {
  setBarcodesAction
} from './actions'

export function * getBarcodes () {
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
  const req = yield Promise.resolve(FakeBarcodes)
  if (!req.err) {
    yield put(setBarcodesAction(req))
  }
}

export function * getBarcodesSaga () {
  yield * takeLatest(GET_BARCODES, getBarcodes)
}

// All sagas to be loaded
export function * barcodesSagas () {
  const watcher = yield [
    fork(getBarcodesSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  barcodesSagas
]
