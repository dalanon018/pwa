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

  SET_PRODUCT_HANDLER_DEFAULT
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

export function setProductHandlersDefaultAction () {
  return {
    type: SET_PRODUCT_HANDLER_DEFAULT
  }
}
