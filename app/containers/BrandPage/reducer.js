/*
 *
 * BrandPage reducer
 *
 */

import { fromJS } from 'immutable'
import { isEmpty } from 'lodash'
import {
  GET_PRODUCTS_BRANDS,
  SET_PRODUCTS_BRANDS,
  RESET_PRODUCTS_BRANDS,

  LIMIT_ITEMS
} from './constants'

const initialState = fromJS({
  productsByBrands: [],
  loading: false,
  lazyload: false
})

function brandPageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_BRANDS: {
      const productsByBrands = state.get('productsByBrands')
      return productsByBrands.size === 0 ? state.set('loading', true) : state
    }
    case SET_PRODUCTS_BRANDS: {
      const concatState = state.get('productsByBrands').concat(fromJS(action.payload))
      return state
        .set('productsByBrands', concatState)
        .set('loading', false)
        // we will toggle to true lazyload if only items are not empty and payload is greater that the limit
        .set('lazyload', (!isEmpty(action.payload) && LIMIT_ITEMS <= action.payload.length))
    }
    case RESET_PRODUCTS_BRANDS:
      return state
        .set('productsByBrands', fromJS([]))
        .set('loading', false)

    default:
      return state
  }
}

export default brandPageReducer
