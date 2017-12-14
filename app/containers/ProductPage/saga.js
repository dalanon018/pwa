
import { takeLatest } from 'redux-saga'
import { isEmpty, compact } from 'lodash'
import {
  compose,
  prop,
  reverse,
  slice,
  uniqBy
} from 'ramda'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

import { getRequestData } from 'utils/offline-request'
import { transformProduct } from 'utils/transforms'
import { setItem, getItem } from 'utils/localStorage'

import {
  GET_PRODUCT,
  SET_CURRENT_PRODUCT

} from './constants'
import {
  setProductAction,
  setProductSuccessAction,
  setProductErrorAction
} from './actions'

import {
  API_BASE_URL,
  LAST_VIEWS_KEY,
  CURRENT_PRODUCT_KEY
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

/**
 * function that will simply update the last viewed items
 * we call this automatically after getting the product page.
 * @param {*} args
 */
export function * updateLastViewedItems (args) {
  const { payload } = args
  const NUMBER_VIEW_ITEMS = 4
  const products = yield call(getItem, LAST_VIEWS_KEY)

  const cleanProducts = compose(
    slice(0, NUMBER_VIEW_ITEMS),
    reverse,
    uniqBy(prop('barcode')),
    compact
  )

  let productsViewed = Array.isArray(products) ? reverse(products) : []

  productsViewed = productsViewed.concat(payload)

  yield call(setItem, LAST_VIEWS_KEY, cleanProducts(productsViewed))
}

export function * getProduct (payload) {
  const { payload: { id } } = payload
  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/products/${id}?deviceOrigin=PWA`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    // we will use the txt file we got
    const transform = yield transformEachEntity(req)
    // since we have the cliqqcode of the item we can save this last viewed items.
    yield * updateLastViewedItems({
      payload: transform
    })

    yield put(setProductAction(transform))
  } else {
    yield put(setNetworkErrorAction(500))
  }
}

export function * setCurrentProduct (args) {
  const { payload } = args
  try {
    yield call(setItem, CURRENT_PRODUCT_KEY, payload.toJS())
    yield put(setProductSuccessAction(true))
  } catch (e) {
    yield put(setProductErrorAction(true))
  }
}

export function * getProductSaga () {
  yield * takeLatest(GET_PRODUCT, getProduct)
}

export function * setCurrentProductSaga () {
  yield * takeLatest(SET_CURRENT_PRODUCT, setCurrentProduct)
}

// All sagas to be loaded
export function * productSagas () {
  const watcher = yield [
    fork(getProductSaga),

    fork(setCurrentProductSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default productSagas
