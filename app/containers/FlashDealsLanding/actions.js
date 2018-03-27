/*
 *
 * FlashDealsLanding actions
 *
 */

import {
  GET_PROMOS,
  SET_PROMOS
} from './constants'

export function getPromosAction (payload) {
  return {
    type: GET_PROMOS,
    payload
  }
}

export function setPromosAction (payload) {
  return {
    type: SET_PROMOS,
    payload
  }
}
