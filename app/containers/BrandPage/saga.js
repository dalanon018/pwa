import {
  call,
  fork,
  put,
  select
} from 'redux-saga/effects'
import {
  takeLatest
  // takeEvery
} from 'redux-saga'
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
import { flattenChildrenArray } from 'utils/array'
import { getRequestData } from 'utils/offline-request'
import { transformProduct, transformCategory } from 'utils/transforms'

import {
  GET_PRODUCTS_BRANDS,
  GET_FILTER_CATEGORIES
} from './constants'
import {
  setProductsByBrandsAction,
  setProductsCountsAction,
  setFilterCategoriesAction
} from './actions'

// import {
//   selectFilterCategories
// } from './selectors'

import {
  API_BASE_URL
} from 'containers/App/constants'

import {
  setNetworkErrorAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
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

export function * getProductByBrands (args) {
  const { payload: { offset, limit, id, category } } = args
  let products = []
  let count = 0

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/brands/${id}?offset=${offset}&limit=${limit}&category=${category || ''}`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const transform = compose(
      map(partial(transformEachEntity, [transformProduct])),
      propOr([], 'productList')
    )
    const totalCount = propOr(0, 'totalCount')

    products = yield transform(req)
    count = totalCount(req)
  } else {
    yield put(setNetworkErrorAction(500))
  }

  yield put(setProductsByBrandsAction(products))
  yield put(setProductsCountsAction(count))
}

function * getCategory ({ data, category }) {
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
  const { payload: { category, brand } } = args
  let categories = []

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/categories?brand=${brand || ''}&parent=${category || ''}`, {
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

export function * getProductByBrandsSaga () {
  yield * takeLatest(GET_PRODUCTS_BRANDS, getProductByBrands)
}

export function * getFilterCategoriesSaga () {
  yield * takeLatest(GET_FILTER_CATEGORIES, getFilterCategories)
}

// Individual exports for testing
export function * productsBrandsSagas () {
  yield [
    fork(getProductByBrandsSaga),
    fork(getFilterCategoriesSaga)
  ]
}

// All sagas to be loaded
export default productsBrandsSagas
