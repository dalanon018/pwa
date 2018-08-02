/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SET_MOBILE_NUMBERS,

  SET_PRODUCT_HANDLER_DEFAULT,

  GET_MARKDOWN,
  SET_MARKDOWN,

  SUCCESS_MOBILE_REGISTRATION,
  ERROR_MOBILE_REGISTRATION,

  REQUEST_MOBILE_REGISTRATION,
  REQUEST_VERIFICATION_CODE,

  SUCCESS_VERIFICATION_CODE,
  ERROR_VERIFICATION_CODE,

  REQUEST_RECAPTCHA_VALIDATION,
  SUCCESS_RECAPTCHA_VALIDATION,
  ERROR_RECAPTCHA_VALIDATION,

  RESET_SUBMISSION
} from './constants'

const initialState = fromJS({
  mobileNumbers: [],
  submissionLoader: false, // this will simply check if we are submitting through api
  markdown: '',
  loadingMarkdown: false,
  mobileRegistrationSuccess: false,
  mobileRegistrationError: null,
  verificationCode: false,
  verificationCodeSuccess: false,
  verificationCodeError: null,
  recaptchaValidationSuccess: null,
  recaptchaValidationError: null
})

function loginPageReducer (state = initialState, action) {
  switch (action.type) {
    case SET_MOBILE_NUMBERS:
      return state
        .set('mobileNumbers', fromJS(action.payload))

    case GET_MARKDOWN:
      return state
        .set('loadingMarkdown', true)

    case SET_MARKDOWN:
      return state
        .set('markdown', action.payload)
        .set('loadingMarkdown', false)

    case SET_PRODUCT_HANDLER_DEFAULT:
      return state
        .set('requestProductSuccess', false)
        .set('requestProductError', false)

    case REQUEST_MOBILE_REGISTRATION:
      return state
        .set('mobileRegistrationSuccess', false)
        .set('mobileRegistrationError', null)
        .set('submissionLoader', true)

    case SUCCESS_MOBILE_REGISTRATION:
      return state
        .set('mobileRegistrationSuccess', true)
        .set('mobileRegistrationError', null)
        .set('submissionLoader', false)

    case ERROR_MOBILE_REGISTRATION:
      return state
        .set('mobileRegistrationError', action.payload)
        .set('mobileRegistrationSuccess', false)
        .set('submissionLoader', false)

    case SUCCESS_VERIFICATION_CODE:
      return state
        .set('verificationCodeSuccess', true)
        .set('verificationCodeError', null)
        .set('submissionLoader', false)

    case ERROR_VERIFICATION_CODE:
      return state
        .set('verificationCodeSuccess', false)
        .set('verificationCodeError', action.payload)
        .set('submissionLoader', false)

    case REQUEST_VERIFICATION_CODE:
      return state
        .set('verificationCode', action.payload)
        .set('submissionLoader', true)

    case RESET_SUBMISSION:
      return state
        .set('mobileRegistrationSuccess', false)
        .set('mobileRegistrationError', null)
        .set('verificationCode', false)
        .set('verificationCodeSuccess', false)
        .set('verificationCodeError', null)
        .set('recaptchaValidationSuccess', null)
        .set('recaptchaValidationError', null)
        .set('submissionLoader', false)

    case REQUEST_RECAPTCHA_VALIDATION:
      return state
        .set('submissionLoader', true)

    case SUCCESS_RECAPTCHA_VALIDATION:
      return state
        .set('recaptchaValidationSuccess', true)
        .set('recaptchaValidationError', null)
        .set('submissionLoader', false)

    case ERROR_RECAPTCHA_VALIDATION:
      return state
        .set('recaptchaValidationSuccess', null)
        .set('recaptchaValidationError', action.payload)
        .set('submissionLoader', false)

    default:
      return state
  }
}

export default loginPageReducer
