/*
 *
 * ProductsByCategory reducer
 *
 */

import { fromJS } from 'immutable'
import { isEmpty } from 'lodash'
import {
  GET_PRODUCTS_CATEGORY,
  SET_PRODUCTS_CATEGORY,
  RESET_PRODUCTS_CATEGORY,

  SET_PRODUCTS_COUNT,

  SET_PRODUCTS_VIEWED,

  LIMIT_ITEMS,

  SET_OVER18,
  SUBMIT_OVER18,

  GET_FILTER_CATEGORIES,
  SET_FILTER_CATEGORIES,

  GET_FILTER_BRANDS,
  SET_FILTER_BRANDS
} from './constants'

const initialState = fromJS({
  productsByCategory: [],
  productsViewed: [],
  filterCategories: [],
  filterCategoriesLoading: false,
  filterBrands: [],
  filterBrandsLoading: false,
  totalCount: 0,
  loading: true,
  lazyload: false,
  isOver18: true
})

function productsByCategoryReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_CATEGORY:
      return state.set('loading', true)

    case SET_PRODUCTS_CATEGORY: {
      const concatState = state.get('productsByCategory').concat(fromJS(action.payload))
      return state
        .set('productsByCategory', concatState)
        .set('loading', false)
         // we will toggle to true lazyload if only items are not empty and payload is greater that the limit
         .set('lazyload', (!isEmpty(action.payload) && LIMIT_ITEMS <= action.payload.length))
    }
    case RESET_PRODUCTS_CATEGORY:
      return state
        .set('productsByCategory', fromJS([]))
        .set('totalCount', 0)
        .set('loading', false)

    case SET_PRODUCTS_COUNT:
      return state.set('totalCount', fromJS(action.payload))

    case SET_PRODUCTS_VIEWED:
      return state
        .set('productsViewed', fromJS(action.payload))

    case SET_OVER18:
      return state
        .set('isOver18', action.payload)

    case SUBMIT_OVER18:
      return state
        .set('isOver18', action.payload)

    case GET_FILTER_CATEGORIES:
      return state.set('filterCategoriesLoading', true)

    case SET_FILTER_CATEGORIES:
      return state
        .set('filterCategoriesLoading', false)
        .set('filterCategories', fromJS(action.payload))

    case GET_FILTER_BRANDS:
      return state.set('filterBrandsLoading', true)

    case SET_FILTER_BRANDS:
      return state
        .set('filterBrandsLoading', false)
        .set('filterBrands', fromJS(action.payload))

    default:
      return state
  }
}

export default productsByCategoryReducer
