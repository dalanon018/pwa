/*
 *
 * PurchaseEntity actions
 *
 */

import {
  GET_RECEIPT,
  SET_RECEIPT,
  REPURCHASE_ITEM_REQUEST,
  REPURCHASE_ITEM_SUCCESS,
  REPURCHASE_ITEM_ERROR
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

export function requestReceiptAction (payload) {
  return {
    type: REPURCHASE_ITEM_REQUEST,
    payload
  }
}

export function successReceiptAction (payload) {
  return {
    type: REPURCHASE_ITEM_SUCCESS,
    payload
  }
}

export function errorReceiptAction (payload) {
  return {
    type: REPURCHASE_ITEM_ERROR,
    payload
  }
}
