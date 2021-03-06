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
import xhr from 'utils/xhr'

import { getRequestData } from 'utils/offline-request'
import { transformProduct, transformPromo } from 'utils/transforms'

import {
  GET_FEATURED_PRODUCTS,
  GET_PROMOS,
  GET_BANNERS
} from './constants'

import {
  setFeaturedProductsAction,
  setProductsCountsAction,

  setPromosAction,
  setPromosCountAction,

  setBannersAction
} from './actions'

import {
  API_BASE_URL,
  GOOGLE_APIS_URL
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

export function * getPromos (args) {
  const { payload: {tabletColumnCount} } = args
  let promos = []
  let count = 0

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/promos/?offset=0&limit=1&productOffset=0&productLimit=${tabletColumnCount}`, {
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

export function * getBanners () {
  const req = yield call(xhr, `${GOOGLE_APIS_URL}/config/banners.json`, {
    method: 'GET',
    content: 'application/json'
  })

  if (!isEmpty(req)) {
    // still need to parse it since its returning {[]}
    const data = req.replace(/{|}/g, '')

    yield put(setBannersAction(JSON.parse(data)))
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

export function * getBannersSaga () {
  yield * takeLatest(GET_BANNERS, getBanners)
}

// Individual exports for testing
export function * homePageSagas () {
  const watcher = yield [
    fork(getProductSaga),
    fork(getPromosSaga),
    fork(getBannersSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default homePageSagas
