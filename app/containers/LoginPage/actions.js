/*
 *
 * LoginPage actions
 *
 */

import {
  IS_LOGIN,

  GET_MOBILE_NUMBERS,
  UPDATE_MOBILE_NUMBERS,
  SET_MOBILE_NUMBERS,

  GET_MARKDOWN,
  SET_MARKDOWN,

  REQUEST_MOBILE_REGISTRATION,
  SUCCESS_MOBILE_REGISTRATION,
  ERROR_MOBILE_REGISTRATION,

  SET_VERIFICATION_CODE,

  REQUEST_VERIFICATION_CODE,
  SUCCESS_VERIFICATION_CODE,
  ERROR_VERIFICATION_CODE,

  REQUEST_RECAPTCHA_VALIDATION,
  SUCCESS_RECAPTCHA_VALIDATION,
  ERROR_RECAPTCHA_VALIDATION,

  RESET_SUBMISSION
} from './constants'

export function isLoginAction () {
  return {
    type: IS_LOGIN
  }
}

export function resetSubmissionAction () {
  return {
    type: RESET_SUBMISSION
  }
}

export function getMobileNumbersAction () {
  return {
    type: GET_MOBILE_NUMBERS
  }
}

export function updateMobileNumbersAction (payload) {
  return {
    type: UPDATE_MOBILE_NUMBERS,
    payload
  }
}

export function setVerificationCodeAction (payload) {
  return {
    type: SET_VERIFICATION_CODE,
    payload
  }
}

export function requestMobileRegistrationAction (payload) {
  return {
    type: REQUEST_MOBILE_REGISTRATION,
    payload
  }
}

export function successMobileRegistrationAction () {
  return {
    type: SUCCESS_MOBILE_REGISTRATION
  }
}

export function errorMobileRegistrationAction (payload) {
  return {
    type: ERROR_MOBILE_REGISTRATION,
    payload
  }
}

export function setMobileNumbersAction (payload) {
  return {
    type: SET_MOBILE_NUMBERS,
    payload
  }
}

export function getMarkDownAction () {
  return {
    type: GET_MARKDOWN
  }
}

export function setMarkDownAction (payload) {
  return {
    type: SET_MARKDOWN,
    payload
  }
}

export function requestVerificationCodeAction (payload) {
  return {
    type: REQUEST_VERIFICATION_CODE,
    payload
  }
}

export function successVerificationCodeAction (payload) {
  return {
    type: SUCCESS_VERIFICATION_CODE,
    payload
  }
}

export function errorVerificationCodeAction (payload) {
  return {
    type: ERROR_VERIFICATION_CODE,
    payload
  }
}

export function requestRecaptchaValidationAction (payload) {
  return {
    type: REQUEST_RECAPTCHA_VALIDATION,
    payload
  }
}

export function successRecaptchaValidationAction (payload) {
  return {
    type: SUCCESS_RECAPTCHA_VALIDATION,
    payload
  }
}

export function errorRecaptchaValidationAction (payload) {
  return {
    type: ERROR_RECAPTCHA_VALIDATION,
    payload
  }
}
