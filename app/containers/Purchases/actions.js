/*
 *
 * BarcodeLists actions
 *
 */

import {
  GET_API_PURCHASES,
  GET_LOCAL_PURCHASES,
  SET_LOCAL_PURCHASES,
  SET_API_PURCHASES
} from './constants'

export function getApiPurchasesAction (payload) {
  return {
    type: GET_API_PURCHASES,
    payload
  }
}

export function getStoragePurchasesAction () {
  return {
    type: GET_LOCAL_PURCHASES,
  }
}

export function setLocalPurchasesAction (payload) {
  return {
    type: SET_LOCAL_PURCHASES,
    payload
  }
}

export function setApiPurchasesAction (payload) {
  return {
    type: SET_API_PURCHASES,
    payload
  }
}
