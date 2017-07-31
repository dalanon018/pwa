/*
 *
 * ProductsByCategory reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_PRODUCTS_CATEGORY,
  SET_PRODUCTS_CATEGORY
} from './constants'

const initialState = fromJS({
  productsByCategory: [],
  loading: false
})

function productsByCategoryReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_CATEGORY:
      return state.set('loading', true)
    case SET_PRODUCTS_CATEGORY:
      return state
        .set('productsByCategory', fromJS(action.payload))
        .set('loading', false)
    default:
      return state
  }
}

export default productsByCategoryReducer
