/*
 *
 * PurchaseEntity actions
 *
 */

import {
  GET_RECEIPT,
  SET_RECEIPT
} from './constants'

export function getReceiptAction (payload) {
  return {
    type: GET_RECEIPT,
    payload
  }
}

export function setReceiptAction (payload) {
  return {
    type: SET_RECEIPT,
    payload
  }
}
