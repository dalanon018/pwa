
import { takeLatest } from 'redux-saga'
import { isEmpty, compact } from 'lodash'
import {
  compose,
  ifElse,
  partial,
  prop,
  reverse,
  slice,
  uniqBy
} from 'ramda'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import xhr from 'utils/xhr'

import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'
import { AddDate } from 'utils/date'
import { transformProduct } from 'utils/transforms'
import { setItem, getItem } from 'utils/localStorage'

import {
  GET_PRODUCT,
  SET_CURRENT_PRODUCT,

  GET_MOBILE_NUMBERS,
  UPDATE_MOBILE_NUMBERS,
  GET_MARKDOWN,
  REQUEST_MOBILE_REGISTRATION,
  REQUEST_VERIFICATION_CODE,
  REQUEST_RECAPTCHA_VALIDATION
} from './constants'
import {
  setProductAction,
  setMobileNumbersAction,
  setProductSuccessAction,
  setProductErrorAction,
  setMarkDownAction,
  successMobileRegistrationAction,
  errorMobileRegistrationAction,
  successVerificationCodeAction,
  errorVerificationCodeAction,
  successRecaptchaValidationAction,
  errorRecaptchaValidationAction
} from './actions'

import {
  API_BASE_URL,
  MOBILE_REGISTRATION_URL,
  LOYALTY_TOKEN_KEY,
  LAST_VIEWS_KEY,
  CURRENT_PRODUCT_KEY,
  MOBILE_NUMBERS_KEY
} from 'containers/App/constants'

import {
  setNetworkErrorAction,
  setLoyaltyTokenAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
} from 'containers/Buckets/sagas'

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
    const transform = yield transformEachEntity(req)

    // since we have the cliqqcode of the item we can save this last viewed items.
    yield * updateLastViewedItems({
      payload: transform
    })

    yield put(setProductAction(transform))
  } else {
    yield put(setNetworkErrorAction('No cache data'))
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

export function * getMarkDown () {
  const headers = new Headers()
  headers.append('Content-Type', 'binary/octet-stream')

  const url = 'https://s3-ap-southeast-1.amazonaws.com/cliqq.shop/docs/terms.md'
  const req = yield call(xhr, url, {
    method: 'GET',
    headers
  })
  if (!req.err) {
    yield put(setMarkDownAction(req))
  }
}

export function * registerMobileNumber (args) {
  const { payload } = args
  const mobileNumber = `0${payload}`
  try {
    const token = yield getAccessToken()
    yield call(request, `${MOBILE_REGISTRATION_URL}/loyalty/cliqqshop/activation`, {
      method: 'POST',
      token: token.access_token,
      body: JSON.stringify({ mobileNumber })
    })
    yield put(successMobileRegistrationAction())
  } catch (e) {
    yield put(errorMobileRegistrationAction(e.message))
  }
}

export function * verificationCode (args) {
  const { payload: { mobileNumber, code } } = args
  const base64 = btoa(`0${mobileNumber}:${code}`)
  const verification = `Basic ${base64}`

  try {
    const token = yield getAccessToken()
    const req = yield call(request, `${MOBILE_REGISTRATION_URL}/loyalty/cliqqshop/authorization`, {
      method: 'POST',
      token: token.access_token,
      body: JSON.stringify({ verification })
    })
    const getLoyaltyToken = prop('loyaltyToken')
    const expiry = AddDate(1, 'years')
    const loyaltyToken = Object.assign({}, {
      token: getLoyaltyToken(req),
      expiry
    })

    yield call(setItem, LOYALTY_TOKEN_KEY, loyaltyToken)
    yield put(successVerificationCodeAction())
    yield put(setLoyaltyTokenAction(getLoyaltyToken(req)))
  } catch (e) {
    yield put(errorVerificationCodeAction('Please check if you input the verification code correctly.'))
  }
}

export function * recaptchaValidation (args) {
  const { payload } = args
  try {
    const token = yield getAccessToken()
    const req = yield call(request, `${API_BASE_URL}/validateRecaptcha/${payload}`, {
      method: 'POST',
      token: token.access_token
    })
    const isValidated = prop('validated')
    const successOrError = ifElse(
      isValidated,
      partial(successRecaptchaValidationAction, [true]),
      partial(errorRecaptchaValidationAction, ['Error on validation. Please try again.'])
    )

    yield put(successOrError(req))
  } catch (e) {
    yield put(errorRecaptchaValidationAction(e.message))
  }
}

export function * recaptchaValidationSaga () {
  yield * takeLatest(REQUEST_RECAPTCHA_VALIDATION, recaptchaValidation)
}

export function * mobileRegistrationSaga () {
  yield * takeLatest(REQUEST_MOBILE_REGISTRATION, registerMobileNumber)
}

export function * verificationCodeSaga () {
  yield * takeLatest(REQUEST_VERIFICATION_CODE, verificationCode)
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

export function * getMarkDownSaga () {
  yield * takeLatest(GET_MARKDOWN, getMarkDown)
}

// All sagas to be loaded
export function * productSagas () {
  const watcher = yield [
    fork(getProductSaga),

    fork(setCurrentProductSaga),

    // Getter and Setter for mobile numbers
    fork(getMobileNumbersSaga),
    fork(updateMobileNumbersSaga),
    fork(getMarkDownSaga),

    fork(recaptchaValidationSaga),
    fork(mobileRegistrationSaga),
    fork(verificationCodeSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  productSagas
]
