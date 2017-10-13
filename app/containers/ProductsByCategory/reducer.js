/*
 *
 * ProductsByCategory reducer
 *
 */

import { fromJS } from 'immutable'
import { compact, isEmpty } from 'lodash'
import {
  GET_PRODUCTS_CATEGORY,
  SET_PRODUCTS_CATEGORY,
  RESET_PRODUCTS_CATEGORY,

  SET_PRODUCTS_COUNT,

  GET_PRODUCTS_VIEWED,
  SET_PRODUCTS_VIEWED
} from './constants'

const initialState = fromJS({
  productsByCategory: [],
  productsViewed: [],
  totalCount: 0,
  loading: false,
  lazyload: false
})

function productsByCategoryReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_CATEGORY: {
      const productsByCategory = state.get('productsByCategory')
      return productsByCategory.size === 0 ? state.set('loading', true) : state
    }
    case SET_PRODUCTS_CATEGORY: {
      // TODO:
      // we have find a way to concat 2 immutable object since converting is expensive
      const currentState = state.get('productsByCategory').toJS()
      const mergeState = currentState.concat(action.payload)
      return state
        .set('productsByCategory', fromJS(compact(mergeState)))
        .set('loading', false)
        .set('lazyload', !isEmpty(action.payload))
    }
    case RESET_PRODUCTS_CATEGORY:
      return state
        .set('productsByCategory', fromJS([]))
        .set('totalCount', 0)
        .set('loading', false)

    case SET_PRODUCTS_COUNT:
      return state.set('totalCount', fromJS(action.payload))

    case GET_PRODUCTS_VIEWED:
      return state.set('loading', true)
    case SET_PRODUCTS_VIEWED:
      return state
        .set('productsViewed', fromJS(action.payload))
        .set('loading', false)

    default:
      return state
  }
}

export default productsByCategoryReducer
