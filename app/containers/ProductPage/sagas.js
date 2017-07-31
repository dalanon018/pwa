
import { takeLatest } from 'redux-saga'
import { find, compact } from 'lodash'
import { compose, uniqBy, prop } from 'ramda'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { transformProduct } from 'utils/transforms'
import { setItem, getItem } from 'utils/localStorage'

import FakeProducts from 'fixtures/products.json'

import {
  GET_PRODUCT,
  SET_CURRENT_PRODUCT,

  GET_MOBILE_NUMBERS,
  UPDATE_MOBILE_NUMBERS
} from './constants'
import {
  setProductAction,
  setMobileNumbersAction,
  setProductSuccessAction,
  setProductErrorAction
} from './actions'

import {
  LAST_VIEWS_KEY,
  CURRENT_PRODUCT_KEY,
  MOBILE_NUMBERS_KEY
} from 'containers/App/constants'

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
  const products = yield call(getItem, LAST_VIEWS_KEY)
  const cleanProducts = compose(uniqBy(prop('barcode')), compact)
  let productsViewed = Array.isArray(products) ? products : []

  productsViewed = productsViewed.concat(payload)

  yield call(setItem, LAST_VIEWS_KEY, cleanProducts(productsViewed))
}

export function * getProduct (payload) {
  const { payload: { id } } = payload
  // const headers = new Headers()
  // const currentUser = yield select(selectCurrentUser())
  // headers.append('Content-Type', 'application/json')
  // headers.append('Accept', 'application/json')
  // headers.append('Authorization', `JWT ${currentUser.token}`)

  // const requestURL = `${API_BASE_URL}/data/sectors`
  // const req = yield call(request, requestURL, {
  //   method: 'GET',
  //   headers
  // })

  // We will emulate data
  const req = yield Promise.resolve(FakeProducts)

  if (!req.err) {
    const transform = yield req.map(transformEachEntity)
    const findData = find(transform, (prod) => prod.cliqqCode.includes(id))

    // since we have the cliqqcode of the item we can save this last viewed items.
    yield * updateLastViewedItems({
      payload: findData
    })

    yield put(setProductAction(findData))
  }
}

export function * setCurrentProduct (payload) {
  const req = yield call(setItem, CURRENT_PRODUCT_KEY, payload.payload.toJS())
  if (!req.err) {
    yield put(setProductSuccessAction(req))
    return req
  } else {
    yield put(setProductErrorAction(true))
  }
}

export function * getMobileNumbers () {
  const mobiles = yield call(getItem, MOBILE_NUMBERS_KEY)

  yield put(setMobileNumbersAction(mobiles || []))
}

export function * updateMobileNumbers (args) {
  const { payload } = args
  const mobiles = yield call(getItem, MOBILE_NUMBERS_KEY)
  let mobileRegistrations = compact(mobiles) || []

  mobileRegistrations = mobileRegistrations.concat(payload)

  yield call(setItem, MOBILE_NUMBERS_KEY, mobileRegistrations)

  yield put(setMobileNumbersAction(mobileRegistrations))
}

export function * getProductSaga () {
  yield * takeLatest(GET_PRODUCT, getProduct)
}

export function * setCurrentProductSaga () {
  yield * takeLatest(SET_CURRENT_PRODUCT, setCurrentProduct)
}

export function * getMobileNumbersSaga () {
  yield * takeLatest(GET_MOBILE_NUMBERS, getMobileNumbers)
}

export function * updateMobileNumbersSaga () {
  yield * takeLatest(UPDATE_MOBILE_NUMBERS, updateMobileNumbers)
}

// All sagas to be loaded
export function * productSagas () {
  const watcher = yield [
    fork(getProductSaga),

    fork(setCurrentProductSaga),

    // Getter and Setter for mobile numbers
    fork(getMobileNumbersSaga),
    fork(updateMobileNumbersSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  productSagas
]
