
import { takeLatest } from 'redux-saga'
import { find } from 'lodash'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'
import { transformProduct } from 'utils/transforms'

import FakeProducts from 'fixtures/products.json'

import {
  GET_SEARCH_PRODUCT
} from './constants'

import {
  setSearchProductAction
} from './actions'

function * transformEachEntity (entity) {
  const response = yield call(transformProduct, entity)
  return response
}

export function * getProductSearch (payload) {
  const { payload: { id } } = payload
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
  const req = yield Promise.resolve(FakeProducts)
  if (!req.err) {
    const transform = yield req.map(transformEachEntity)
    const findData = find(transform, (prod) => prod.cliqqCode.includes(id))
    yield put(setSearchProductAction(findData))
  }
}

export function * getSearchProductSaga () {
  yield * takeLatest(GET_SEARCH_PRODUCT, getProductSearch)
}

// All sagas to be loaded
export function * searchPageSagas () {
  const watcher = yield [
    fork(getSearchProductSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  searchPageSagas
]
