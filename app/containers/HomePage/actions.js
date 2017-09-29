/*
 *
 * HomePage actions
 *
 */

import {
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS,

  GET_FEATURED_CATEGORIES,
  SET_FEATURED_CATEGORIES,

  GET_FEATURED_BRANDS,
  SET_FEATURED_BRANDS
} from './constants'

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

export function getFeaturedCategoriesAction (payload) {
  return {
    type: GET_FEATURED_CATEGORIES,
    payload
  }
}

export function setFeaturedCategoriesAction (payload) {
  return {
    type: SET_FEATURED_CATEGORIES,
    payload
  }
}

export function getFeaturedBrandsAction (payload) {
  return {
    type: GET_FEATURED_BRANDS,
    payload
  }
}

export function setFeaturedBrandsAction (payload) {
  return {
    type: SET_FEATURED_BRANDS,
    payload
  }
}
