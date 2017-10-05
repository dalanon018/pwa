/*
 *
 * BrandPage actions
 *
 */

import {
  GET_PRODUCTS_BRANDS,
  SET_PRODUCTS_BRANDS,
  RESET_PRODUCTS_BRANDS,

  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS
} from './constants'

export function getProductsByBrandsAction (payload) {
  return {
    type: GET_PRODUCTS_BRANDS,
    payload
  }
}

export function setProductsByBrandsAction (payload) {
  return {
    type: SET_PRODUCTS_BRANDS,
    payload
  }
}

export function resetProductsByBrandsAction (payload) {
  return {
    type: RESET_PRODUCTS_BRANDS,
    payload
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
