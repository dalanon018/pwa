/*
 *
 * Bucket actions
 *
 */

import {
  GET_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES
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
