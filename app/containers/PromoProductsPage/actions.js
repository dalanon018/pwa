/*
 *
 * BrandPage actions
 *
 */

import {
  GET_PRODUCTS_BRANDS,
  SET_PRODUCTS_BRANDS,
  SET_PRODUCTS_COUNT,
  RESET_PRODUCTS_BRANDS
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

export function setProductsCountsAction (payload) {
  return {
    type: SET_PRODUCTS_COUNT,
    payload
  }
}
