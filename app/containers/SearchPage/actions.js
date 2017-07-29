
import {
  GET_SEARCH_PRODUCT,
  SET_SEARCH_PRODUCT,

  SET_CURRENT_PRODUCT,

  SET_PRODUCT_SUCCESS,
  SET_PRODUCT_ERROR,

  SET_MOBILE_NUMBERS,

  SET_PRODUCT_HANDLER_DEFAULT
} from './constants'

export function getSearchProductAction (payload) {
  return {
    type: GET_SEARCH_PRODUCT,
    payload
  }
}

export function setSearchProductAction (payload) {
  return {
    type: SET_SEARCH_PRODUCT,
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
