/*
 *
 * ProductsByFeatured reducer
 *
 */

import { fromJS } from 'immutable'
import { isEmpty } from 'lodash'
import {
  GET_PRODUCTS_FEATURED,
  SET_PRODUCTS_FEATURED,
  RESET_PRODUCTS_FEATURED,

  SET_PRODUCTS_COUNT,

  SET_PRODUCTS_VIEWED,

  LIMIT_ITEMS
} from './constants'

const initialState = fromJS({
  products: [],
  productsViewed: [],
  totalCount: 0,
  loading: true,
  lazyload: false
})

function productsByFeaturedReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_FEATURED:
      return state.set('loading', true)

    case SET_PRODUCTS_FEATURED: {
      const concatState = state.get('products').concat(fromJS(action.payload))
      return state
        .set('products', concatState)
        .set('loading', false)
      // we will toggle to true lazyload if only items are not empty and payload is greater that the limit
        .set('lazyload', (!isEmpty(action.payload) && LIMIT_ITEMS <= action.payload.length))
    }
    case RESET_PRODUCTS_FEATURED:
      return state
        .set('products', fromJS([]))
        .set('totalCount', 0)
        .set('loading', false)

    case SET_PRODUCTS_COUNT:
      return state.set('totalCount', fromJS(action.payload))

    case SET_PRODUCTS_VIEWED:
      return state
        .set('productsViewed', fromJS(action.payload))

    default:
      return state
  }
}

export default productsByFeaturedReducer
