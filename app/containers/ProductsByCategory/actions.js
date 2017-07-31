/*
 *
 * ProductsByCategory actions
 *
 */

import {
  GET_PRODUCTS_CATEGORY,
  SET_PRODUCTS_CATEGORY
} from './constants'

export function getProductsByCategoryAction (payload) {
  return {
    type: GET_PRODUCTS_CATEGORY,
    payload
  }
}

export function setProductsByCategoryAction (payload) {
  return {
    type: SET_PRODUCTS_CATEGORY,
    payload
  }
}
