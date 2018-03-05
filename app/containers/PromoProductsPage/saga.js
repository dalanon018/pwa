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
  omit,
  propOr
} from 'ramda'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'
import { transformPromo } from 'utils/transforms'

import {
  GET_PROMO
} from './constants'
import {
  setPromoAction,
  setPromoProductsAction,
  setPromoProductsCountsAction
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
  const response = yield call(transformPromo, entity)
  return response
}

export function * getPromoProducts (args) {
  const { payload: { offset, limit, id } } = args
  let promo = {}
  let products = []
  let count = 0

  // TODO: we need to change this to the correct url
  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/promos/${id}?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const promoClean = yield transformEachEntity(req)
    console.log(promoClean)
    const promoEntity = omit(['productList', 'totalCount'])
    const productsEntity = propOr([], 'productList')
    const countEntity = propOr(0, 'totalCount')

    promo = promoEntity(promoClean)
    products = productsEntity(promoClean)
    count = countEntity(promoClean)
  } else {
    yield put(setNetworkErrorAction(500))
  }

  yield put(setPromoAction(promo))
  yield put(setPromoProductsAction(products))
  yield put(setPromoProductsCountsAction(count))
}

export function * getPromoProductsSaga () {
  yield * takeEvery(GET_PROMO, getPromoProducts)
}

// Individual exports for testing
export function * promoProductsPageSagas () {
  const watcher = yield [
    fork(getPromoProductsSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default promoProductsPageSagas
