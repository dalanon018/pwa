import {
  call,
  cancel,
  fork,
  put,
  take
} from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import request from 'utils/request'
import { takeLatest } from 'redux-saga'

import {
  GET_SAMPLE_API
} from './constants'

import {
  setSampleApiAction
} from './actions'

export function * initializeAppGlobals () {
  // code block
}

export function * getApiTest (data) {
  const headers = new Headers()
  const { payload: { resolve, reject } } = data
  console.log(data)

  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  // const url = `https://www.reddit.com/search.json?q=${data.payload.passData}&sort=new`
  const url = `https://jsonplaceholder.typicode.com/posts`
  const req = yield call(request, url, {
    method: 'GET',
    headers
  })

  if (!req.err) {
    yield put(setSampleApiAction(req))
    resolve()
  } else {
    const err = yield req.err.body
    const { status } = err
    reject(status)
  }
}

/**
 * Watches for Every change of locations from router
 * once this triggers we need to check all the items under `initializeAppGlobals`
 */
export function * getLocationChangeWatcher () {
  yield takeLatest(LOCATION_CHANGE, initializeAppGlobals)
}

export function * getSampleApiSaga () {
  yield * takeLatest(GET_SAMPLE_API, getApiTest)
}

// Individual exports for testing
export function * homePageSagas () {
  const watcher = yield [
    fork(getSampleApiSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default [
  homePageSagas
]
