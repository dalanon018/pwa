import { isEmpty } from 'lodash'
import {
  call,
  cancel,
  fork,
  put,
  take
} from 'redux-saga/effects'
import { compose, map, filter, partial, prop, propOr } from 'ramda'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest } from 'redux-saga'

// import request from 'utils/request'

import { getRequestData } from 'utils/offline-request'
import { transformProduct, transformPromo } from 'utils/transforms'

import {
  GET_FEATURED_PRODUCTS,
  GET_PROMOS
} from './constants'

import {
  setFeaturedProductsAction,
  setProductsCountsAction,

  setPromosAction,
  setPromosCountAction
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

function * transformEachEntity (transform, entity) {
  const response = yield call(transform, entity)
  return response
}

export function * initializeAppGlobals () {
  // code block
}

export function * getProduct (args) {
  const { payload: { offset, limit } } = args
  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/productList/featured?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const transform = compose(
      map(partial(transformEachEntity, [transformProduct])),
      filter(prop('cliqqCodes')),
      propOr([], 'productList')
    )
    const products = yield transform(req)
    const count = propOr(0, 'totalCount', req)
    yield put(setFeaturedProductsAction(products))
    yield put(setProductsCountsAction(count))
  } else {
    yield put(setNetworkErrorAction(500))
  }
}

export function * getPromos () {
  let promos = []
  let count = 0

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/promos/?offset=0&limit=3&productOffset=0&productLimit=3`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const transform = compose(
      map(partial(transformEachEntity, [transformPromo])),
      propOr([], 'promoList')
    )
    const totalCount = propOr(0, 'totalCount')

    promos = yield transform(req)
    count = totalCount(req)

    yield put(setPromosAction(promos))
    yield put(setPromosCountAction(count))
  } else {
    yield put(setNetworkErrorAction(500))
  }
}

/**
 * Watches for Every change of locations from router
 * once this triggers we need to check all the items under `initializeAppGlobals`
 */
export function * getLocationChangeWatcher () {
  yield takeLatest(LOCATION_CHANGE, initializeAppGlobals)
}

export function * getProductSaga () {
  yield * takeLatest(GET_FEATURED_PRODUCTS, getProduct)
}

export function * getPromosSaga () {
  yield * takeLatest(GET_PROMOS, getPromos)
}

// Individual exports for testing
export function * homePageSagas () {
  const watcher = yield [
    fork(getProductSaga),
    fork(getPromosSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default homePageSagas
