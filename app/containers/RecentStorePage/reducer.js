/*
 *
 * RecentStorePage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_VISITED_STORES,
  SET_VISITED_STORES
} from './constants'

const initialState = fromJS({
  visitedStores: [],
  visitedStoresLoading: false
})

function recentStorePageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_VISITED_STORES:
      return state.set('visitedStoresLoading', true)

    case SET_VISITED_STORES:
      return state
        .set('visitedStores', fromJS(action.payload))
        .set('visitedStoresLoading', false)
    default:
      return state
  }
}

export default recentStorePageReducer
