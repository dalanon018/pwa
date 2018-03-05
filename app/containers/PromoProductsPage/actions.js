/*
 *
 * PromoProductsPage actions
 *
 */

import {
  GET_PROMO,
  SET_PROMO,
  SET_PROMO_PRODUCTS,
  SET_PROMO_PRODUCTS_COUNT,
  RESET_PROMO_PRODUCTS
} from './constants'

export function getPromoAction (payload) {
  return {
    type: GET_PROMO,
    payload
  }
}

export function setPromoAction (payload) {
  return {
    type: SET_PROMO,
    payload
  }
}

export function setPromoProductsAction (payload) {
  return {
    type: SET_PROMO_PRODUCTS,
    payload
  }
}

export function resetPromoProductsAction (payload) {
  return {
    type: RESET_PROMO_PRODUCTS,
    payload
  }
}

export function setPromoProductsCountsAction (payload) {
  return {
    type: SET_PROMO_PRODUCTS_COUNT,
    payload
  }
}
