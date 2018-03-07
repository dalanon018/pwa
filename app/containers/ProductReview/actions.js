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
  STORE_LOCATOR,

  GET_VISITED_STORES,
  SET_VISITED_STORES,

  SET_ORDER_HANDLER_DEFAULT,

  GET_BLACKLIST,
  SET_BLACKLIST
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

export function getVisitedStoresAction () {
  return {
    type: GET_VISITED_STORES
  }
}

export function setVisitedStoresAction (payload) {
  return {
    type: SET_VISITED_STORES,
    payload
  }
}

export function storeLocatorAction (payload) {
  return {
    type: STORE_LOCATOR,
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
