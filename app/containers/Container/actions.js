/*
 *
 * Containers actions
 *
 */

import {

  GET_MOBILE_NUMBERS,
  SET_MOBILE_NUMBERS,

  GET_RECEIPT_UPDATED,
  SET_RECEIPT_UPDATED,

  SET_NETWORK_ERROR,

  SET_TOGGLE
} from './constants'

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
