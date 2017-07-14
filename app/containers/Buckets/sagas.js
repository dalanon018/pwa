
import { takeLatest } from 'redux-saga'
import { take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'

import FakeCategories from 'fixtures/categories.json'
import {
  GET_PRODUCT_CATEGORIES
} from './constants'
import {
  setProductCategoriesAction
} from './actions'

export function * getCategories () {
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
  const req = yield Promise.resolve(FakeCategories)
  if (!req.err) {
    yield put(setProductCategoriesAction(req))
  }
}

export function * getCategoriesSaga () {
  yield * takeLatest(GET_PRODUCT_CATEGORIES, getCategories)
}

// All sagas to be loaded
export function * bucketsSagas () {
  const watcher = yield [
    fork(getCategoriesSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  bucketsSagas
]
