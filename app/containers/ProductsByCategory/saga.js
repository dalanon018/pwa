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
  partial,
  propOr
} from 'ramda'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'

import { transformProduct, transformCategory } from 'utils/transforms'
import { getItem, setItem } from 'utils/localStorage'

import {
  GET_PRODUCTS_CATEGORY,
  GET_PRODUCTS_VIEWED,
  GET_FILTER_CATEGORIES,

  GET_OVER18,
  SET_OVER18,
  SUBMIT_OVER18
} from './constants'
import {
  setProductsByCategoryAction,
  setProductsViewedAction,
  setProductsCountsAction,
  setFilterCategoriesAction,

  setOver18Action
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

function * transformEachEntity (transform, entity) {
  const response = yield call(transform, entity)
  return response
}

function * getOver18 () {
  const over18 = yield call(getItem, SET_OVER18)

  return over18
}

function * setOver18 (payload) {
  const over18 = yield call(setItem, SET_OVER18, payload)

  return over18
}

function * getLastViewedItems () {
  const products = yield call(getItem, LAST_VIEWS_KEY)

  return products || []
}

export function * getProductByCategory (args) {
  const { payload: { offset, limit, id } } = args
  let products = []
  let count = 0

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/categories/${id}?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    token: token.access_token
  })
  if (!isEmpty(req)) {
    const transform = compose(
      map(partial(transformEachEntity, [transformProduct])),
      propOr([], 'productList')
    )
    const countEntity = propOr(0, 'totalCount')

    products = yield transform(req)
    count = countEntity(req)
  } else {
    yield put(setNetworkErrorAction(500))
  }

  yield put(setProductsByCategoryAction(products))
  yield put(setProductsCountsAction(count))
}

export function * getOver18Item () {
  const response = yield * getOver18()

  yield put(setOver18Action(response))
}

export function * setOver18Item (args) {
  const { payload } = args

  const response = yield * setOver18(payload)

  yield put(setOver18Action(response))
}

export function * getProductsViewed () {
  const response = yield * getLastViewedItems()

  yield put(setProductsViewedAction(response))
}

export function * getFilterCategories (args) {
  const { payload: { id } } = args
  let categories = []

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/categories?parent=${id}`, {
    method: 'GET',
    token: token.access_token
  })
  if (!isEmpty(req)) {
    const transform = compose(
      map(partial(transformEachEntity, [transformCategory])),
      propOr([], 'categoryList')
    )

    categories = yield transform(req)
  } else {
    yield put(setNetworkErrorAction(500))
  }

  yield put(setFilterCategoriesAction(categories))
}

export function * getProductByCategorySaga () {
  yield * takeEvery(GET_PRODUCTS_CATEGORY, getProductByCategory)
}

export function * getProductsViewedSaga () {
  yield * takeLatest(GET_PRODUCTS_VIEWED, getProductsViewed)
}

export function * getOver18Saga () {
  yield * takeEvery(GET_OVER18, getOver18Item)
}

export function * setOver18Saga () {
  yield * takeEvery(SUBMIT_OVER18, setOver18Item)
}

export function * getFilterCategoriesSaga () {
  yield * takeLatest(GET_FILTER_CATEGORIES, getFilterCategories)
}

// Individual exports for testing
export function * productsCategorySagas () {
  yield * [
    fork(getOver18Saga),
    fork(setOver18Saga),

    fork(getProductByCategorySaga),

    fork(getProductsViewedSaga),

    fork(getFilterCategoriesSaga)
  ]
}

// All sagas to be loaded
export default productsCategorySagas
