/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS
} from './constants'

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  }
}

export function getFeaturedProductsAction (payload) {
  return {
    type: GET_FEATURED_PRODUCTS,
    payload
  }
}

export function setFeaturedProductsAction (payload) {
  return {
    type: SET_FEATURED_PRODUCTS,
    payload
  }
}
