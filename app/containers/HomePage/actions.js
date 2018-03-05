/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS,

  SET_PRODUCTS_COUNT,

  GET_PROMOS,
  SET_PROMOS,
  SET_PROMOS_COUNT
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

export function setProductsCountsAction (payload) {
  return {
    type: SET_PRODUCTS_COUNT,
    payload
  }
}

export function getPromosAction () {
  return {
    type: GET_PROMOS
  }
}

export function setPromosAction (payload) {
  return {
    type: SET_PROMOS,
    payload
  }
}

export function setPromosCountAction (payload) {
  return {
    type: SET_PROMOS_COUNT,
    payload
  }
}
