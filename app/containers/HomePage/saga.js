import { isEmpty } from 'lodash'
import {
  call,
  fork,
  put
} from 'redux-saga/effects'
import { compose, map, filter, prop, propOr } from 'ramda'
import { takeLatest } from 'redux-saga'

// import request from 'utils/request'

import { getRequestData } from 'utils/offline-request'
import { transformProduct } from 'utils/transforms'

import {
  GET_FEATURED_PRODUCTS
} from './constants'

import {
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
} from 'containers/Buckets/saga'

// function * sleep (ms) {
//   yield new Promise(resolve => setTimeout(resolve, ms))
// }

function * transformEachEntity (entity) {
  const response = yield call(transformProduct, entity)
  return response
}

export function * getProduct (data) {
  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/productList/featured?offset=0&limit=5`, {
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

export function * getProductSaga () {
  yield * takeLatest(GET_FEATURED_PRODUCTS, getProduct)
}

// Individual exports for testing
export function * homePageSagas () {
  yield [
    fork(getProductSaga)
  ]
}

// All sagas to be loaded
export default homePageSagas
