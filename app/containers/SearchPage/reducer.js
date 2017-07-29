/*
 *
 * SearchPage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_SEARCH_PRODUCT,
  SET_SEARCH_PRODUCT,

  SET_PRODUCT_SUCCESS,
  SET_PRODUCT_ERROR,

  SET_PRODUCT_HANDLER_DEFAULT
} from './constants'

const initialState = fromJS({
  loading: false,
  product: {},
  requestProductSuccess: false,
  requestProductError: false,
  currentProduct: {}
})

function searchPageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_PRODUCT:
      return state.set('loading', true)

    case SET_SEARCH_PRODUCT:
      return state
              .set('product', fromJS(action.payload))
              .set('loading', false)
    case SET_PRODUCT_SUCCESS:
      return state
        .set('requestProductSuccess', true)
        .set('requestProductError', null)

    case SET_PRODUCT_ERROR:
      return state
        .set('requestProductSuccess', false)
        .set('requestProductError', fromJS(action.payload))

    case SET_PRODUCT_HANDLER_DEFAULT:
      return state
        .set('requestProductSuccess', false)
        .set('requestProductError', false)
    default:
      return state
  }
}

export default searchPageReducer
