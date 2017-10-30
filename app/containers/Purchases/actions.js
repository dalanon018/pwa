/*
 *
 * BarcodeLists actions
 *
 */

import {
  GET_API_PURCHASES,
  GET_LOCAL_PURCHASES,
  SET_PURCHASES

} from './constants'

export function getApiPurchasesAction (payload) {
  return {
    type: GET_API_PURCHASES,
    payload
  }
}

export function getStoragePurchasesAction () {
  return {
    type: GET_LOCAL_PURCHASES
  }
}

export function setPurchasesAction (payload) {
  return {
    type: SET_PURCHASES,
    payload
  }
}
