/*
 *
 * ProductReview actions
 *
 */

import {
  GET_ORDER_PRODUCT,
  SET_ORDER_PRODUCT,

  GET_MOBILE_NUMBER,
  SET_MOBILE_NUMBER,

  ORDER_SUBMIT,
  ORDER_SUCCESS,
  ORDER_ERROR,

  GET_STORE,
  SET_STORE,

  GET_CURRENT_POINTS,
  SET_CURRENT_POINTS,

  SET_ORDER_HANDLER_DEFAULT,

  GET_BLACKLIST,
  SET_BLACKLIST,

  GET_LAST_SELECTED_METHOD,
  SET_LAST_SELECTED_METHOD,

  COUPON_SUBMIT,
  COUPON_RESULT
  // COUPON_SUCCESS,
  // COUPON_ERROR,
} from './constants'

export function getOrderProductAction () {
  return {
    type: GET_ORDER_PRODUCT
  }
}

export function setOrderProductAction (payload) {
  return {
    type: SET_ORDER_PRODUCT,
    payload
  }
}

export function getMobileNumberAction () {
  return {
    type: GET_MOBILE_NUMBER
  }
}

export function setMobileNumberAction (payload) {
  return {
    type: SET_MOBILE_NUMBER,
    payload
  }
}

export function submitOrderAction (payload) {
  return {
    type: ORDER_SUBMIT,
    payload
  }
}

export function successOrderAction (payload) {
  return {
    type: ORDER_SUCCESS,
    payload
  }
}

export function errorOrderAction (payload) {
  return {
    type: ORDER_ERROR,
    payload
  }
}

export function setOrderHandlersDefaultAction () {
  return {
    type: SET_ORDER_HANDLER_DEFAULT
  }
}

export function getStoreAction () {
  return {
    type: GET_STORE
  }
}

export function setStoreAction (payload) {
  return {
    type: SET_STORE,
    payload
  }
}

export function getLastSelectedMethodAction () {
  return {
    type: GET_LAST_SELECTED_METHOD
  }
}

export function setLastSelectedMethodAction (payload) {
  return {
    type: SET_LAST_SELECTED_METHOD,
    payload
  }
}

export function getCurrentPointsAction () {
  return {
    type: GET_CURRENT_POINTS
  }
}

export function setCurrentPointsAction (payload) {
  return {
    type: SET_CURRENT_POINTS,
    payload
  }
}

export function getBlackListAction () {
  return {
    type: GET_BLACKLIST
  }
}

export function setBlackListAction (payload) {
  return {
    type: SET_BLACKLIST,
    payload
  }
}

export function submitCouponAction (payload) {
  return {
    type: COUPON_SUBMIT,
    payload
  }
}

export function resultCouponAction (payload) {
  return {
    type: COUPON_RESULT,
    payload
  }
}

// export function successCouponAction (payload) {
//   return {
//     type: COUPON_SUCCESS,
//     payload
//   }
// }

// export function errorCouponAction (payload) {
//   return {
//     type: COUPON_ERROR,
//     payload
//   }
// }
