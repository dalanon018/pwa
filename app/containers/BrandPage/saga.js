import {
  call,
  cancel,
  fork,
  put,
  take
} from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import {
  // takeLatest,
  takeEvery
} from 'redux-saga'
import { isEmpty } from 'lodash'
import {
  compose,
  map,
  propOr
} from 'ramda'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'
import { transformProduct } from 'utils/transforms'

import {
  GET_PRODUCTS_BRANDS
} from './constants'
import {
  setProductsByBrandsAction
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

// function * sleep (ms) {
//   yield new Promise(resolve => setTimeout(resolve, ms))
// }

function * transformEachEntity (entity) {
  const response = yield call(transformProduct, entity)
  return response
}

export function * getProductByBrands (args) {
  const { payload: { offset, limit, id } } = args
  let products = []

  // TODO: we need to change this to the correct url
  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/brands/${id}?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const transform = compose(
      map(transformEachEntity),
      propOr([], 'productList')
    )

    products = yield transform(req)
  } else {
    yield put(setNetworkErrorAction(500))
  }

  yield put(setProductsByBrandsAction(products))
}

export function * getProductByBrandsSaga () {
  yield * takeEvery(GET_PRODUCTS_BRANDS, getProductByBrands)
}

// Individual exports for testing
export function * productsBrandsSagas () {
  const watcher = yield [
    fork(getProductByBrandsSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default productsBrandsSagas
