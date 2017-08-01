/*
 *
 * Bucket actions
 *
 */

import {
  GET_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES,

  GET_MOBILE_NUMBERS,
  SET_MOBILE_NUMBERS,

  SET_TOGGLE
} from './constants'

export function getProductCategoriesAction () {
  return {
    type: GET_PRODUCT_CATEGORIES
  }
}

export function setProductCategoriesAction (payload) {
  return {
    type: SET_PRODUCT_CATEGORIES,
    payload
  }
}

export function getMobileNumbersAction () {
  return {
    type: GET_MOBILE_NUMBERS
  }
}

export function setMobileNumbersAction (payload) {
  return {
    type: SET_MOBILE_NUMBERS,
    payload
  }
}

export function setToggleAction (payload) {
  return {
    type: SET_TOGGLE,
    payload
  }
}
