/*
 *
 * BarcodeLists actions
 *
 */

import {
  GET_BARCODES,
  SET_BARCODES
} from './constants'

export function getBarcodesAction () {
  return {
    type: GET_BARCODES
  }
}

export function setBarcodesAction (payload) {
  return {
    type: SET_BARCODES,
    payload
  }
}
