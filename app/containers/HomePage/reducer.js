/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS
} from './constants'

const initialState = fromJS({
  product: {},
  loading: false
})

function homePageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_PRODUCTS:
      return state.set('loading', true)
    case SET_FEATURED_PRODUCTS:
      return state
        .set('product', fromJS(action.payload))
        .set('loading', false)
    default:
      return state
  }
}

export default homePageReducer
