/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS,

  SET_PRODUCTS_COUNT
} from './constants'

const initialState = fromJS({
  product: {},
  loading: false,
  totalCount: 0
})

function homePageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_PRODUCTS:
      return state.set('loading', true)
    case SET_FEATURED_PRODUCTS:
      return state
        .set('product', fromJS(action.payload))
        .set('loading', false)

    case SET_PRODUCTS_COUNT:
      return state.set('totalCount', fromJS(action.payload))
    default:
      return state
  }
}

export default homePageReducer
