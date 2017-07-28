/*
 *
 * ProductReview actions
 *
 */

import {
  DEFAULT_ACTION,

  GET_ORDER_PRODUCT,
  SET_ORDER_PRODUCT,

  GET_MOBILE_NUMBER,
  SET_MOBILE_NUMBER
} from './constants'

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  }
}

export function getOrderProductAction (payload) {
  return {
    type: GET_ORDER_PRODUCT,
    payload
  }
}

export function setOrderProductAction (payload) {
  return {
    type: SET_ORDER_PRODUCT,
    payload
  }
}

export function getMobileNumberAction (payload) {
  return {
    type: GET_MOBILE_NUMBER,
    payload
  }
}

export function setMobileNumberAction (payload) {
  return {
    type: SET_MOBILE_NUMBER,
    payload
  }
}
