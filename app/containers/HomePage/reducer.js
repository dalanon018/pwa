/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS,

  GET_FEATURED_CATEGORIES,
  SET_FEATURED_CATEGORIES,

  GET_FEATURED_BRANDS,
  SET_FEATURED_BRANDS
} from './constants'

const initialState = fromJS({
  featuredProducts: [],
  productsLoading: false,

  featuredCategories: [],
  categoriesLoading: false,

  featuredBrands: [],
  brandsLoading: false
})

function homePageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_PRODUCTS:
      return state.set('productsLoading', true)
    case SET_FEATURED_PRODUCTS:
      return state
        .set('featuredProducts', fromJS(action.payload))
        .set('productsLoading', false)

    case GET_FEATURED_CATEGORIES:
      return state.set('categoriesLoading', true)
    case SET_FEATURED_CATEGORIES:
      return state
        .set('featuredCategories', fromJS(action.payload))
        .set('categoriesLoading', false)

    case GET_FEATURED_BRANDS:
      return state.set('brandsLoading', true)
    case SET_FEATURED_BRANDS:
      return state
        .set('featuredBrands', fromJS(action.payload))
        .set('brandsLoading', false)

    default:
      return state
  }
}

export default homePageReducer
