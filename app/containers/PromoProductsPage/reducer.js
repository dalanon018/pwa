/*
 *
 * PromoProductsPage reducer
 *
 */

import { fromJS } from 'immutable'
import { isEmpty } from 'lodash'
import {
  GET_PROMO,
  SET_PROMO,

  SET_PROMO_PRODUCTS,
  SET_PROMO_PRODUCTS_COUNT,

  RESET_PROMO_PRODUCTS,

  LIMIT_ITEMS
} from './constants'

const initialState = fromJS({
  promo: {},
  products: [],
  productsCount: 0,
  productsLoading: false,
  lazyload: false
})

function promoProductsPageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PROMO:
      return state.set('productsLoading', true)

    case SET_PROMO:
      return state.set('promo', fromJS(action.payload))

    case SET_PROMO_PRODUCTS: {
      const concatState = state.get('products').concat(fromJS(action.payload))
      return state
        .set('products', concatState)
        .set('productsLoading', false)
        // we will toggle to true lazyload if only items are not empty and payload is greater that the limit
        .set('lazyload', (!isEmpty(action.payload) && LIMIT_ITEMS <= action.payload.length))
    }

    case SET_PROMO_PRODUCTS_COUNT:
      return state.set('productsCount', action.payload)

    case RESET_PROMO_PRODUCTS:
      return state
        .set('products', fromJS([]))
        .set('productsLoading', false)
        .set('productsCount', 0)

    default:
      return state
  }
}

export default promoProductsPageReducer
