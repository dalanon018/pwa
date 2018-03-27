/*
 *
 * RecentStorePage actions
 *
 */

import {
  GET_VISITED_STORES,
  SET_VISITED_STORES,
  STORE_LOCATOR
} from './constants'

export function getVisitedStoresAction () {
  return {
    type: GET_VISITED_STORES
  }
}

export function setVisitedStoresAction (payload) {
  return {
    type: SET_VISITED_STORES,
    payload
  }
}

export function storeLocatorAction (payload) {
  return {
    type: STORE_LOCATOR,
    payload
  }
}
