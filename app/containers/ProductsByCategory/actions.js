/*
 *
 * ProductsByCategory actions
 *
 */

import {
  GET_PRODUCTS_CATEGORY,
  SET_PRODUCTS_CATEGORY,
  RESET_PRODUCTS_CATEGORY,

  GET_FILTER_CATEGORIES,
  SET_FILTER_CATEGORIES,

  GET_PRODUCTS_VIEWED,
  SET_PRODUCTS_VIEWED,

  SET_PRODUCTS_COUNT,

  GET_OVER18,
  SET_OVER18,
  SUBMIT_OVER18
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

export function resetProductsByCategoryAction (payload) {
  return {
    type: RESET_PRODUCTS_CATEGORY,
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

export function getOver18Action () {
  return {
    type: GET_OVER18
  }
}

export function setOver18Action (payload) {
  return {
    type: SET_OVER18,
    payload
  }
}

export function submitOver18Action (payload) {
  return {
    type: SUBMIT_OVER18,
    payload
  }
}
