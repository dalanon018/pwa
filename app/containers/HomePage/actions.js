/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS,
  CLEAR_FEATURED_PRODUCTS,

  SET_PRODUCTS_COUNT,

  GET_PROMOS,
  SET_PROMOS,
  SET_PROMOS_COUNT,

  GET_BANNERS,
  SET_BANNERS
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

export function clearFeaturedProductsAction () {
  return {
    type: CLEAR_FEATURED_PRODUCTS
  }
}

export function setProductsCountsAction (payload) {
  return {
    type: SET_PRODUCTS_COUNT,
    payload
  }
}

export function getPromosAction (payload) {
  return {
    type: GET_PROMOS,
    payload
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

export function getBannersAction () {
  return {
    type: GET_BANNERS
  }
}

export function setBannersAction (payload) {
  return {
    type: SET_BANNERS,
    payload
  }
}
