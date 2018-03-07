/*
 *
 * BrandPage actions
 *
 */

import {
  GET_PRODUCTS_BRANDS,
  SET_PRODUCTS_BRANDS,
  SET_PRODUCTS_COUNT,
  RESET_PRODUCTS_BRANDS,

  GET_FILTER_CATEGORIES,
  SET_FILTER_CATEGORIES
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

export function getFilterCategoriesAction (payload) {
  return {
    type: GET_FILTER_CATEGORIES,
    payload
  }
}

export function setFilterCategoriesAction (payload) {
  return {
    type: SET_FILTER_CATEGORIES,
    payload
  }
}
