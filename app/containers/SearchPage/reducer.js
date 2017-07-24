/*
 *
 * SearchPage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_SEARCH_PRODUCT,
  SET_SEARCH_PRODUCT
} from './constants'

const initialState = fromJS({
  loading: false,
  product: {}
})

function searchPageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_PRODUCT:
      return state.set('loading', true)
    case SET_SEARCH_PRODUCT:
      return state
              .set('product', fromJS(action.payload))
              .set('loading', false)
    default:
      return state
  }
}

export default searchPageReducer
