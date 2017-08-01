
import { takeLatest } from 'redux-saga'
import { uniq } from 'lodash'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { getItem } from 'utils/localStorage'
// import request from 'utils/request'

import FakeCategories from 'fixtures/categories.json'

import {
  GET_PRODUCT_CATEGORIES,
  GET_MOBILE_NUMBERS
} from './constants'

import {
  setProductCategoriesAction,
  setMobileNumbersAction
} from './actions'

import {
  MOBILE_NUMBERS_KEY
} from 'containers/App/constants'

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

export function * getMobileNumbers () {
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  const mobiles = uniq(mobileNumbers) || []

  yield put(setMobileNumbersAction(mobiles))
}

export function * getCategoriesSaga () {
  yield * takeLatest(GET_PRODUCT_CATEGORIES, getCategories)
}

export function * getMobileNumbersSaga () {
  yield * takeLatest(GET_MOBILE_NUMBERS, getMobileNumbers)
}

// All sagas to be loaded
export function * bucketsSagas () {
  const watcher = yield [
    fork(getCategoriesSaga),
    fork(getMobileNumbersSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  bucketsSagas
]
