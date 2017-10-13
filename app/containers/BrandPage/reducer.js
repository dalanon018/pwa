/*
 *
 * BrandPage reducer
 *
 */

import { fromJS } from 'immutable'
import { compact, isEmpty } from 'lodash'
import {
  GET_PRODUCTS_BRANDS,
  SET_PRODUCTS_BRANDS,
  RESET_PRODUCTS_BRANDS
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
      // TODO:
      // we have find a way to concat 2 immutable object since converting is expensive
      const currentState = state.get('productsByBrands').toJS()
      const mergeState = currentState.concat(action.payload)
      return state
        .set('productsByBrands', fromJS(compact(mergeState)))
        .set('loading', false)
        .set('lazyload', !isEmpty(action.payload))
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
