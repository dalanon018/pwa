import { isEmpty } from 'lodash'
import {
  call,
  cancel,
  fork,
  put,
  take
} from 'redux-saga/effects'
import { compose, map, filter, prop, propOr, partialRight } from 'ramda'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest } from 'redux-saga'

// import request from 'utils/request'

// import { getRequestData } from 'utils/offline-request'
import { transformProduct } from 'utils/transforms'

// TEST DATA
import ProductsV2 from 'fixtures/products-v2.json'

import Accessories from 'images/test-images/v2/Accessories.jpg'
import Apparel from 'images/test-images/v2/Apparel.jpg'
import SkinCare from 'images/test-images/v2/SkinCare.jpg'
import HomeLiving from 'images/test-images/v2/HomeLiving.jpg'

import Bench from 'images/test-images/v2/Bench.jpg'
import Calbee from 'images/test-images/v2/Calbee.jpg'
import Palmolive from 'images/test-images/v2/Palmolive.jpg'
import Sony from 'images/test-images/v2/Sony.jpg'
import Penshoppe from 'images/test-images/v2/Penshoppe.jpg'
import Samsung from 'images/test-images/v2/Samsung.jpg'
// TEST

import {
  GET_FEATURED_PRODUCTS,
  GET_FEATURED_CATEGORIES,
  GET_FEATURED_BRANDS
} from './constants'

import {
  setFeaturedProductsAction,
  setFeaturedCategoriesAction,
  setFeaturedBrandsAction
} from './actions'

// import {
//   API_BASE_URL
// } from 'containers/App/constants'

import {
  setNetworkErrorAction
} from 'containers/Container/actions'

// import {
//   getAccessToken
// } from 'containers/Container/saga'

// function * sleep (ms) {
//   yield new Promise(resolve => setTimeout(resolve, ms))
// }

// TEST
const CategoriesData = [
  Apparel,
  HomeLiving,
  Accessories,
  SkinCare
]

const BrandsData = [
  Bench,
  Calbee,
  Palmolive,
  Sony,
  Penshoppe,
  Samsung
]
// TEST

function * transformEachEntity (entity, transfomer) {
  const response = yield call(transfomer, entity)
  return response
}

// LIVE wiht API Mock with TESt
export function * getProduct (data) {
  // const token = yield getAccessToken()
  // const req = yield call(getRequestData, `${API_BASE_URL}/tags/FEATURED?deviceOrigin=PWA&offset=0&limit=5`, {
  //   method: 'GET',
  //   token: token.access_token
  // })
  const req = Object.assign({}, {
    productList: ProductsV2
  })
  if (!isEmpty(req)) {
    const transform = compose(
      map(partialRight(transformEachEntity, [transformProduct])),
      filter(prop('cliqqCodes')),
      propOr([], 'productList')
    )
    const products = yield transform(req)
    yield put(setFeaturedProductsAction(products))
  } else {
    yield put(setNetworkErrorAction('No cache data'))
  }
}

// LIVE wiht API Mock with TESt
export function * getCategories (data) {
  // const token = yield getAccessToken()
  // const req = yield call(getRequestData, `${API_BASE_URL}/tags/FEATURED?deviceOrigin=PWA&offset=0&limit=5`, {
  //   method: 'GET',
  //   token: token.access_token
  // })
  const req = CategoriesData
  if (!isEmpty(req)) {
    yield put(setFeaturedCategoriesAction(req))
  } else {
    yield put(setNetworkErrorAction('No cache data'))
  }
}

// LIVE wiht API Mock with TESt
export function * getBrands (data) {
  // const token = yield getAccessToken()
  // const req = yield call(getRequestData, `${API_BASE_URL}/tags/FEATURED?deviceOrigin=PWA&offset=0&limit=5`, {
  //   method: 'GET',
  //   token: token.access_token
  // })
  const req = BrandsData
  if (!isEmpty(req)) {
    yield put(setFeaturedBrandsAction(req))
  } else {
    yield put(setNetworkErrorAction('No cache data'))
  }
}

export function * getProductSaga () {
  yield * takeLatest(GET_FEATURED_PRODUCTS, getProduct)
}

export function * getCategoriesSaga () {
  yield * takeLatest(GET_FEATURED_CATEGORIES, getCategories)
}

export function * getBrandsSaga () {
  yield * takeLatest(GET_FEATURED_BRANDS, getBrands)
}

// Individual exports for testing
export function * homePageSagas () {
  const watcher = yield [
    fork(getProductSaga),
    fork(getCategoriesSaga),
    fork(getBrandsSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default homePageSagas
