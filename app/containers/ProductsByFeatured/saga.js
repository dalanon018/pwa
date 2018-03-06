import {
  call,
  fork,
  put
} from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga'
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
import { getItem } from 'utils/localStorage'

import {
  GET_PRODUCTS_FEATURED,
  GET_PRODUCTS_VIEWED
} from './constants'
import {
  setProductsByFeaturedAction,
  setProductsViewedAction,
  setProductsCountsAction
} from './actions'

import {
  API_BASE_URL,

  LAST_VIEWS_KEY
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

function * getLastViewedItems () {
  const products = yield call(getItem, LAST_VIEWS_KEY)

  return products || []
}

export function * getProductByFeatured (args) {
  const { payload: { offset, limit } } = args
  let products = []
  let count = 0

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/productList/featured?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const transform = compose(
      map(transformEachEntity),
      filter(prop('cliqqCodes')),
      propOr([], 'productList')
    )
    const countEntity = propOr(0, 'totalCount')
    products = yield transform(req)
    count = countEntity(req)
  } else {
    yield put(setNetworkErrorAction(500))
  }

  yield put(setProductsByFeaturedAction(products))
  yield put(setProductsCountsAction(count))
}

export function * getProductsViewed () {
  const response = yield * getLastViewedItems()

  yield put(setProductsViewedAction(response))
}

export function * getProductByFeaturedSaga () {
  yield * takeEvery(GET_PRODUCTS_FEATURED, getProductByFeatured)
}

export function * getProductsViewedSaga () {
  yield * takeLatest(GET_PRODUCTS_VIEWED, getProductsViewed)
}

// Individual exports for testing
export function * productsFeaturedSagas () {
  yield * [
    fork(getProductByFeaturedSaga),

    fork(getProductsViewedSaga)
  ]
}

// All sagas to be loaded
export default productsFeaturedSagas
