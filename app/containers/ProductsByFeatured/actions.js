/*
 *
 * ProductsByFeaturedtegory actions
 *
 */

import {
  GET_PRODUCTS_FEATURED,
  SET_PRODUCTS_FEATURED,
  RESET_PRODUCTS_FEATURED,

  GET_PRODUCTS_VIEWED,
  SET_PRODUCTS_VIEWED,

  SET_PRODUCTS_COUNT
} from './constants'

export function getProductsByFeaturedAction (payload) {
  return {
    type: GET_PRODUCTS_FEATURED,
    payload
  }
}

export function setProductsByFeaturedAction (payload) {
  return {
    type: SET_PRODUCTS_FEATURED,
    payload
  }
}

export function resetProductsByFeaturedAction (payload) {
  return {
    type: RESET_PRODUCTS_FEATURED,
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

export function setProductsCountsAction (payload) {
  return {
    type: SET_PRODUCTS_COUNT,
    payload
  }
}
