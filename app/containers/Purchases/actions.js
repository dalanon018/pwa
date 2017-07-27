/*
 *
 * BarcodeLists actions
 *
 */

import {
  GET_PURCHASES,
  SET_PURCHASES
} from './constants'

export function getPurchasesAction (payload) {
  return {
    type: GET_PURCHASES,
    payload
  }
}

export function setPurchasesAction (payload) {
  return {
    type: SET_PURCHASES,
    payload
  }
}
