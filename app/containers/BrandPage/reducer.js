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
  SET_PRODUCTS_COUNT,

  RESET_PRODUCTS_BRANDS,

  GET_FILTER_CATEGORIES,
  SET_FILTER_CATEGORIES,

  LIMIT_ITEMS
} from './constants'

const initialState = fromJS({
  productsByBrands: [],
  totalCount: 0,
  loading: false,
  lazyload: false,

  filterCategories: [],
  filterCategoriesLoading: false
})

function brandPageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_BRANDS: {
      return state.set('loading', true)
    }
    case SET_PRODUCTS_BRANDS: {
      const concatState = state.get('productsByBrands').concat(fromJS(action.payload))
      return state
        .set('productsByBrands', concatState)
        .set('loading', false)
        // we will toggle to true lazyload if only items are not empty and payload is greater that the limit
        .set('lazyload', (!isEmpty(action.payload) && LIMIT_ITEMS <= action.payload.length))
    }

    case SET_PRODUCTS_COUNT:
      return state.set('totalCount', action.payload)

    case RESET_PRODUCTS_BRANDS:
      return state
        .set('productsByBrands', fromJS([]))
        .set('totalCount', 0)
        .set('loading', false)

    case GET_FILTER_CATEGORIES:
      return state.set('filterCategoriesLoading', true)

    case SET_FILTER_CATEGORIES:
      return state
        .set('filterCategoriesLoading', false)
        .set('filterCategories', fromJS(action.payload))

    default:
      return state
  }
}

export default brandPageReducer
