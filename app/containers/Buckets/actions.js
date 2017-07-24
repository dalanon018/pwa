/*
 *
 * Bucket actions
 *
 */

import {
  GET_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES,
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

export function setToggleAction (payload) {
  return {
    type: SET_TOGGLE,
    payload
  }
}
