import {
  call,
  fork,
  put,
  select
} from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga'
import { isEmpty } from 'lodash'
import {
  always,
  compose,
  ifElse,
  map,
  partial,
  propOr
} from 'ramda'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'
import { flattenChildrenArray } from 'utils/array'
import { transformProduct, transformCategory, transformBrand } from 'utils/transforms'
import { getItem, setItem } from 'utils/localStorage'

import {
  GET_PRODUCTS_CATEGORY,
  GET_PRODUCTS_VIEWED,
  GET_FILTER_CATEGORIES,
  GET_FILTER_BRANDS,

  GET_OVER18,
  SET_OVER18,
  SUBMIT_OVER18
} from './constants'
import {
  setProductsByCategoryAction,
  setProductsViewedAction,
  setProductsCountsAction,
  setFilterCategoriesAction,
  setFilterBrandsAction,

  setOver18Action
} from './actions'

// import {
//   selectFilterCategories
// } from './selectors'

import {
  API_BASE_URL,

  LAST_VIEWS_KEY
} from 'containers/App/constants'

import {
  setNetworkErrorAction
} from 'containers/Buckets/actions'

import {
  getAccessToken,
  getCategories
} from 'containers/Buckets/saga'

import {
  selectProductCategories
} from 'containers/Buckets/selectors'

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
  const { payload: { offset, limit, id, brands } } = args
  let products = []
  let count = 0

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/categories/${id}?offset=${offset}&limit=${limit}&brands=${brands || ''}`, {
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

function * getCategory ({ data, category }) {
  // we need to fetch categories to make sure categories are loaded
  yield * getCategories()
  const categories = yield (select(selectProductCategories()))
  const flattenCategories = flattenChildrenArray(categories.toJS())
  const foundCategory = flattenCategories.find(({ id }) => id === category)
  const passEntity = ifElse(
    isEmpty,
    () => [],
    (data) => [data]
  )

  const dataPass = ifElse(
    isEmpty,
    partial(passEntity, [foundCategory]),
    always(data)
  )
  return dataPass(data)
}

export function * getFilterCategories (args) {
  const { payload: { category } } = args
  let categories = []

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/categories?parent=${category || ''}`, {
    method: 'GET',
    token: token.access_token
  })
  if (!isEmpty(req)) {
    const transform = compose(
      map(partial(transformEachEntity, [transformCategory])),
      propOr([], 'categoryList')
    )
    categories = yield transform(req)
    categories = yield getCategory({ data: categories, category })
  } else {
    yield put(setNetworkErrorAction(500))
  }
  yield put(setFilterCategoriesAction(categories))
}

export function * getFilterBrands (args) {
  const { payload: { category } } = args
  let brands = []

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/brands?category=${category || ''}`, {
    method: 'GET',
    token: token.access_token
  })
  if (!isEmpty(req)) {
    const transform = compose(
      map(partial(transformEachEntity, [transformBrand])),
      propOr([], 'brandList')
    )

    brands = yield transform(req)
  } else {
    yield put(setNetworkErrorAction(500))
  }

  yield put(setFilterBrandsAction(brands))
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

export function * getFilterBrandsSaga () {
  yield * takeLatest(GET_FILTER_BRANDS, getFilterBrands)
}

// Individual exports for testing
export function * productsCategorySagas () {
  yield * [
    fork(getOver18Saga),
    fork(setOver18Saga),

    fork(getProductByCategorySaga),

    fork(getProductsViewedSaga),

    fork(getFilterCategoriesSaga),
    fork(getFilterBrandsSaga)
  ]
}

// All sagas to be loaded
export default productsCategorySagas
