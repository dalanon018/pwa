/*
 *
 * ProductPage actions
 *
 */

import {
  GET_PRODUCT,
  SET_PRODUCT,

  SET_CURRENT_PRODUCT,

  SET_PRODUCT_SUCCESS,
  SET_PRODUCT_ERROR,

  GET_MOBILE_NUMBERS,
  UPDATE_MOBILE_NUMBERS,
  SET_MOBILE_NUMBERS,

  SET_PRODUCT_HANDLER_DEFAULT,

  GET_MARKDOWN,
  SET_MARKDOWN
} from './constants'

export function getProductAction (payload) {
  return {
    type: GET_PRODUCT,
    payload
  }
}

export function setProductAction (payload) {
  return {
    type: SET_PRODUCT,
    payload
  }
}

export function setCurrentProductAction (payload) {
  return {
    type: SET_CURRENT_PRODUCT,
    payload
  }
}

export function setProductSuccessAction (payload) {
  return {
    type: SET_PRODUCT_SUCCESS,
    payload
  }
}

export function setProductErrorAction (payload) {
  return {
    type: SET_PRODUCT_ERROR,
    payload
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

export function setMobileNumbersAction (payload) {
  return {
    type: SET_MOBILE_NUMBERS,
    payload
  }
}

export function setProductHandlersDefaultAction () {
  return {
    type: SET_PRODUCT_HANDLER_DEFAULT
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
