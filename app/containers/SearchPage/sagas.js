
import { takeLatest } from 'redux-saga'
import { find } from 'lodash'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'
import { setItem, getItem } from 'utils/localStorage'
import { transformProduct } from 'utils/transforms'

import FakeProducts from 'fixtures/products.json'

import {
  GET_SEARCH_PRODUCT,
  SET_CURRENT_PRODUCT,
  SET_MOBILE_NUMBERS
} from './constants'

import {
  setSearchProductAction,

  setProductSuccessAction,
  setProductErrorAction
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

export function * setCurrentProduct (payload) {
  const req = yield call(setItem, 'currentProduct', payload.payload.toJS())

  if (!req.err) {
    yield put(setProductSuccessAction(req))
    return req
  } else {
    yield put(setProductErrorAction(true))
  }
}

export function * setMobileNumbers (args) {
  const { payload } = args
  const mobiles = yield call(getItem, 'mobileNumbers')
  const mobileRegistrations = mobiles || []

  mobileRegistrations.push(payload)

  const req = yield call(setItem, 'mobileNumbers', mobileRegistrations)
  if (!req.err) {
    return req
  }
}

export function * getSearchProductSaga () {
  yield * takeLatest(GET_SEARCH_PRODUCT, getProductSearch)
}

export function * setCurrentProductSaga () {
  yield * takeLatest(SET_CURRENT_PRODUCT, setCurrentProduct)
}

export function * setMobileNumbersSaga () {
  yield * takeLatest(SET_MOBILE_NUMBERS, setMobileNumbers)
}

// All sagas to be loaded
export function * searchPageSagas () {
  const watcher = yield [
    fork(getSearchProductSaga),
    fork(setCurrentProductSaga),
    fork(setMobileNumbersSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  searchPageSagas
]
