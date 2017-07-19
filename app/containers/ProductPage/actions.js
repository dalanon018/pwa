/*
 *
 * ProductPage actions
 *
 */

import {
  GET_PRODUCT,
  SET_PRODUCT
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
