/*
 *
 * RecentStorePage actions
 *
 */

import {
  GET_VISITED_STORES,
  SET_VISITED_STORES
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
