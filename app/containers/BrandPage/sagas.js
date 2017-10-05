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
  filter,
  prop,
  propOr
} from 'ramda'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'
import { transformProduct } from 'utils/transforms'

import {
  GET_PRODUCTS_BRANDS,
  GET_FEATURED_PRODUCTS
} from './constants'
import {
  setProductsByBrandsAction,
  setFeaturedProductsAction
} from './actions'

import {
  API_BASE_URL
} from 'containers/App/constants'

import {
  setNetworkErrorAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
} from 'containers/Buckets/sagas'

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
  const req = yield call(getRequestData, `${API_BASE_URL}/categories/${id}/enabled?offset=${offset}&limit=${limit}`, {
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
    yield put(setNetworkErrorAction('No cache data'))
  }

  yield put(setProductsByBrandsAction(products))
}

export function * getProductByFeaturedBrands (args) {
  const { payload } = args
  let products = []

  const token = yield getAccessToken()

  // TODO: we need to change this to the correct url
  const req = yield call(getRequestData, `${API_BASE_URL}/categories/${payload}/enabled/FEATURED?offset=0&limit=4`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const transform = compose(
      map(transformEachEntity),
      filter(prop('cliqqCodes')),
      propOr([], 'productList')
    )
    products = yield transform(req)
  } else {
    yield put(setNetworkErrorAction('No cache data'))
  }

  yield put(setFeaturedProductsAction(products))
}

export function * getProductByBrandsSaga () {
  yield * takeEvery(GET_PRODUCTS_BRANDS, getProductByBrands)
}

export function * getProductByFeaturedBrandsSaga () {
  yield * takeEvery(GET_FEATURED_PRODUCTS, getProductByFeaturedBrands)
}

// Individual exports for testing
export function * productsCategorySagas () {
  const watcher = yield [
    fork(getProductByBrandsSaga),

    fork(getProductByFeaturedBrandsSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default [
  productsCategorySagas
]
