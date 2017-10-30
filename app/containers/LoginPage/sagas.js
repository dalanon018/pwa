
import { takeLatest } from 'redux-saga'
import { noop, compact } from 'lodash'
import {
  compose,
  equals,
  ifElse,
  partial,
  prop
} from 'ramda'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import xhr from 'utils/xhr'

import request from 'utils/request'
import { AddDate } from 'utils/date'
import { setItem, getItem } from 'utils/localStorage'

import {
  IS_LOGIN,
  GET_MOBILE_NUMBERS,
  GET_MARKDOWN,
  REQUEST_MOBILE_REGISTRATION,
  REQUEST_VERIFICATION_CODE,
  REQUEST_RECAPTCHA_VALIDATION
} from './constants'
import {
  setMobileNumbersAction,
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
  MOBILE_NUMBERS_KEY
} from 'containers/App/constants'

import {
  setCurrentSessionAction,
  setAuthenticatingAction
} from 'containers/App/actions'

import {
  setLoyaltyTokenAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
} from 'containers/Buckets/sagas'

export function * isLogin () {
  const token = yield call(getItem, LOYALTY_TOKEN_KEY)

  const shouldSetSession = ifElse(
    equals(null), noop,
    compose(
      put,
      setCurrentSessionAction
    )
  )

  yield shouldSetSession(token)
  yield put(setAuthenticatingAction(false))
}

export function * getMobileNumbers () {
  const mobiles = yield call(getItem, MOBILE_NUMBERS_KEY)

  yield put(setMobileNumbersAction(mobiles || []))
}

export function * updateMobileNumbers (payload) {
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

    yield * updateMobileNumbers(mobileNumber)
    yield call(setItem, LOYALTY_TOKEN_KEY, loyaltyToken)
    yield put(successVerificationCodeAction())
    yield put(setLoyaltyTokenAction(getLoyaltyToken(req)))
    // set up a login
    yield put(setCurrentSessionAction(getLoyaltyToken(req)))
  } catch (e) {
    yield put(errorVerificationCodeAction('Please check if you input the verification code correctly.'))
  }
}

export function * isLoginSaga () {
  yield takeLatest(IS_LOGIN, isLogin)
}

export function * getMobileNumbersSaga () {
  yield * takeLatest(GET_MOBILE_NUMBERS, getMobileNumbers)
}

export function * getMarkDownSaga () {
  yield * takeLatest(GET_MARKDOWN, getMarkDown)
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

// All sagas to be loaded
export function * loginPageSagas () {
  const watcher = yield [
    fork(isLoginSaga),

    // Getter and Setter for mobile numbers
    fork(getMobileNumbersSaga),

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
  loginPageSagas
]
