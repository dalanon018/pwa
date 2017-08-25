import {
  call,
  cancel,
  fork,
  put,
  take
} from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest, takeEvery } from 'redux-saga'
import { isEmpty } from 'lodash'
import {
  compose,
  map,
  filter,
  prop,
  propOr,
  toUpper
} from 'ramda'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'

import { transformProduct } from 'utils/transforms'
import { getItem } from 'utils/localStorage'

import {
  GET_PRODUCTS_CATEGORY,
  GET_TAGS_PRODUCTS,
  GET_PRODUCTS_VIEWED,
  GET_FEATURED_PRODUCTS
} from './constants'
import {
  setProductsByCategoryAction,
  setProductsViewedAction,
  setFeaturedProductsAction,
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
} from 'containers/Buckets/sagas'

// function * sleep (ms) {
//   yield new Promise(resolve => setTimeout(resolve, ms))
// }

function * transformEachEntity (entity) {
  const response = yield call(transformProduct, entity)
  return response
}

function * getLastViewedItems () {
  const products = yield call(getItem, LAST_VIEWS_KEY)

  return products ? products.reverse() : []
}

function getProductsCategory (response) {
  const count = propOr(0, 'totalCount')
  return count(response)
}

export function * getProductByCategory (args) {
  const { payload: { offset, limit, id } } = args
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
    const products = yield transform(req)
    const count = yield getProductsCategory(req)

    yield put(setProductsByCategoryAction(products))
    yield put(setProductsCountsAction(count))
  } else {
    yield put(setNetworkErrorAction('No cache data'))
  }
}

export function * getProductByTags (args) {
  const { payload: { offset, limit, id } } = args

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/tags/${toUpper(id)}?deviceOrigin=PWA&offset=${offset}&limit=${limit}`, {
    method: 'GET',
    token: token.access_token
  })

  if (!req.err) {
    const transform = compose(
      map(transformEachEntity),
      filter(prop('cliqqCodes')),
      propOr([], 'productList')
    )
    const products = yield transform(req)
    const count = yield getProductsCategory(req)

    yield put(setProductsByCategoryAction(products))
    yield put(setProductsCountsAction(count))
  }
}

export function * getProductByFeaturedCategory (args) {
  const { payload } = args
  const token = yield getAccessToken()
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
    const products = yield transform(req)
    yield put(setFeaturedProductsAction(products))
  } else {
    yield put(setNetworkErrorAction('No cache data'))
  }
}

export function * getProductsViewed () {
  const response = yield * getLastViewedItems()

  yield put(setProductsViewedAction(response))
}

export function * getProductByCategorySaga () {
  yield * takeEvery(GET_PRODUCTS_CATEGORY, getProductByCategory)
}

export function * getProductByTagsSaga () {
  yield * takeEvery(GET_TAGS_PRODUCTS, getProductByTags)
}

export function * getProductByFeaturedCategorySaga () {
  yield * takeEvery(GET_FEATURED_PRODUCTS, getProductByFeaturedCategory)
}

export function * getProductsViewedSaga () {
  yield * takeLatest(GET_PRODUCTS_VIEWED, getProductsViewed)
}

// Individual exports for testing
export function * productsCategorySagas () {
  const watcher = yield [
    fork(getProductByCategorySaga),

    fork(getProductByTagsSaga),

    fork(getProductByFeaturedCategorySaga),

    fork(getProductsViewedSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default [
  productsCategorySagas
]
