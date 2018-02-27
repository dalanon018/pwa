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
  propOr
} from 'ramda'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'

import { transformProduct } from 'utils/transforms'
import { getItem, setItem } from 'utils/localStorage'

import {
  GET_PRODUCTS_CATEGORY,
  GET_TAGS_PRODUCTS,
  GET_PRODUCTS_VIEWED,

  GET_OVER18,
  SET_OVER18,
  SUBMIT_OVER18
} from './constants'
import {
  setProductsByCategoryAction,
  setProductsViewedAction,
  setProductsCountsAction,

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

function * transformEachEntity (entity) {
  const response = yield call(transformProduct, entity)
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

function * getProductsCategory (response) {
  const count = propOr(0, 'totalCount')
  return count(response)
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
      map(transformEachEntity),
      propOr([], 'productList')
    )

    products = yield transform(req)
    count = yield getProductsCategory(req)
  } else {
    yield put(setNetworkErrorAction(500))
  }

  yield put(setProductsByCategoryAction(products))
  yield put(setProductsCountsAction(count))
}

export function * getProductByTags (args) {
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
    products = yield transform(req)
    count = yield getProductsCategory(req)
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

export function * getProductByCategorySaga () {
  yield * takeEvery(GET_PRODUCTS_CATEGORY, getProductByCategory)
}

export function * getProductByTagsSaga () {
  yield * takeEvery(GET_TAGS_PRODUCTS, getProductByTags)
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

// Individual exports for testing
export function * productsCategorySagas () {
  const watcher = yield [
    fork(getOver18Saga),
    fork(setOver18Saga),

    fork(getProductByCategorySaga),

    fork(getProductByTagsSaga),

    fork(getProductsViewedSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default productsCategorySagas
