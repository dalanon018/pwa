import { take, call, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest } from 'redux-saga'
import xhr from 'utils/xhr'

import {
  PRIVACY_URL
} from 'containers/Buckets/constants'

import {
  GET_MARKDOWN
} from './constants'
import {
  setMarkDownAction
} from './actions'

export function * getMarkDown () {
  const headers = new Headers()
  headers.append('Content-Type', 'binary/octet-stream')

  const url = PRIVACY_URL
  const req = yield call(xhr, url, {
    method: 'GET',
    headers
  })
  if (!req.err) {
    yield put(setMarkDownAction(req))
  }
}

export function * getMarkDownSaga () {
  yield * takeLatest(GET_MARKDOWN, getMarkDown)
}

// Individual exports for testing
export function * markDownSagas () {
  const watcher = yield [
    fork(getMarkDownSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default markDownSagas
