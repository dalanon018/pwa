/*
 *
 * ProductPage actions
 *
 */

import {
  GET_PRODUCT,
  SET_PRODUCT,

  GET_CURRENT_PRODUCT,
  SET_CURRENT_PRODUCT
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

export function getCurrentProductAction (payload) {
  return {
    type: GET_CURRENT_PRODUCT,
    payload
  }
}

export function setCurrentProductAction (payload) {
  return {
    type: SET_CURRENT_PRODUCT,
    payload
  }
}
