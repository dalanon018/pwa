/*
 *
 * ProductsByCategory actions
 *
 */

import {
  GET_PRODUCTS_CATEGORY,
  SET_PRODUCTS_CATEGORY,

  GET_TAGS_PRODUCTS,

  GET_PRODUCTS_VIEWED,
  SET_PRODUCTS_VIEWED
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

export function getProductsByTagsAction (payload) {
  return {
    type: GET_TAGS_PRODUCTS,
    payload
  }
}

export function getProductsViewedAction () {
  return {
    type: GET_PRODUCTS_VIEWED
  }
}

export function setProductsViewedAction (payload) {
  return {
    type: SET_PRODUCTS_VIEWED,
    payload
  }
}
