/*
 *
 * Bucket actions
 *
 */

import {
  GET_PAGE_TITLE,
  SET_PAGE_TITLE,

  GET_SHOW_SEARCH_ICON,
  SET_SHOW_SEARCH_ICON,

  GET_SHOW_ACTIVITY_ICON,
  SET_SHOW_ACTIVITY_ICON,

  GET_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES,

  GET_BRANDS,
  SET_BRANDS,

  GET_MOBILE_NUMBERS,
  SET_MOBILE_NUMBERS,

  GET_RECEIPT_UPDATED,
  SET_RECEIPT_UPDATED,

  SET_NETWORK_ERROR,

  SET_TOGGLE,

  REGISTER_PUSH,
  GET_REGISTED_PUSH,
  SET_REGISTED_PUSH,

  GET_LOYALTY_TOKEN,
  SET_LOYALTY_TOKEN,
  REMOVE_LOYALTY_TOKEN
} from './constants'

export function getPageTitleAction () {
  return {
    type: GET_PAGE_TITLE
  }
}

export function setPageTitleAction (payload) {
  return {
    type: SET_PAGE_TITLE,
    payload
  }
}

export function getShowSearchIconAction () {
  return {
    type: GET_SHOW_SEARCH_ICON
  }
}

export function setShowSearchIconAction (payload) {
  return {
    type: SET_SHOW_SEARCH_ICON,
    payload
  }
}

export function getShowActivityIconAction () {
  return {
    type: GET_SHOW_ACTIVITY_ICON
  }
}

export function setShowActivityIconAction (payload) {
  return {
    type: SET_SHOW_ACTIVITY_ICON,
    payload
  }
}

export function getProductCategoriesAction () {
  return {
    type: GET_PRODUCT_CATEGORIES
  }
}

export function setProductCategoriesAction (payload) {
  return {
    type: SET_PRODUCT_CATEGORIES,
    payload
  }
}

export function getBrandsAction () {
  return {
    type: GET_BRANDS
  }
}

export function setBrandsAction (payload) {
  return {
    type: SET_BRANDS,
    payload
  }
}

export function getMobileNumbersAction () {
  return {
    type: GET_MOBILE_NUMBERS
  }
}

export function setMobileNumbersAction (payload) {
  return {
    type: SET_MOBILE_NUMBERS,
    payload
  }
}

export function getUpdatedReceiptsAction (payload) {
  return {
    type: GET_RECEIPT_UPDATED,
    payload
  }
}

export function setUpdatedReceiptsAction (payload) {
  return {
    type: SET_RECEIPT_UPDATED,
    payload
  }
}

export function setToggleAction (payload) {
  return {
    type: SET_TOGGLE,
    payload
  }
}

export function setNetworkErrorAction (payload) {
  return {
    type: SET_NETWORK_ERROR,
    payload
  }
}

export function registerPushAction (payload) {
  return {
    type: REGISTER_PUSH,
    payload
  }
}

export function getRegisteredPushAction () {
  return {
    type: GET_REGISTED_PUSH
  }
}

export function setRegisteredPushAction (payload) {
  return {
    type: SET_REGISTED_PUSH,
    payload
  }
}

export function getLoyaltyTokenAction () {
  return {
    type: GET_LOYALTY_TOKEN
  }
}

export function setLoyaltyTokenAction (payload) {
  return {
    type: SET_LOYALTY_TOKEN,
    payload
  }
}

export function removeLoyaltyTokenAction () {
  return {
    type: REMOVE_LOYALTY_TOKEN
  }
}
