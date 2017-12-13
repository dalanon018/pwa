
import { takeLatest } from 'redux-saga'
import { isEmpty } from 'lodash'
import { compose, map, filter, prop, propOr } from 'ramda'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'

import { setItem, getItem } from 'utils/localStorage'
import { transformProduct } from 'utils/transforms'

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

import {
  API_BASE_URL
} from 'containers/App/constants'

import {
  setNetworkErrorAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
} from 'containers/Buckets/saga'

function * transformEachEntity (entity) {
  const response = yield call(transformProduct, entity)
  return response
}

export function * getProductSearch (payload) {
  const { payload: { id } } = payload
  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/search/${id}?deviceOrigin=PWA`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const transform = compose(
      map(transformEachEntity),
      filter(prop('cliqqCodes')),
      propOr([], 'productList')
    )
    const products = yield transform(req)

    yield put(setSearchProductAction(products))
  } else {
    yield put(setNetworkErrorAction(500))
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
export default searchPageSagas
