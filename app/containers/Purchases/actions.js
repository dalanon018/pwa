/*
 *
 * BarcodeLists actions
 *
 */

import {
  GET_API_PURCHASES,
  GET_LOCAL_PURCHASES,
  SET_PURCHASES,

  GET_MODAL_TOGGLE,
  SET_MODAL_TOGGLE,

  SET_MOBILE_NUMBER
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

export function getModalToggleAction () {
  return {
    type: GET_MODAL_TOGGLE
  }
}

export function setModalToggleAction (payload) {
  return {
    type: SET_MODAL_TOGGLE,
    payload
  }
}

export function setMobileNumberAction (payload) {
  return {
    type: SET_MOBILE_NUMBER,
    payload
  }
}
