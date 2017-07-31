// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga'
import { take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'

import FakeCategories from 'fixtures/categories.json'

import {
  GET_CATEGORIES
} from './constants'

import {
  setCategoriesAction
} from './actions'

export function * getCategories () {
  const req = yield Promise.resolve(FakeCategories)
  if (!req.err) {
    yield put(setCategoriesAction(req))
  }
}

export function * getCategoriesSaga () {
  yield * takeLatest(GET_CATEGORIES, getCategories)
}

// All sagas to be loaded
export function * categoriesSagas () {
  const watcher = yield [
    fork(getCategoriesSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  categoriesSagas
]
