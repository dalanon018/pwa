/*
 *
 * ProductPage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_PRODUCT,
  SET_PRODUCT,

  SET_PRODUCT_SUCCESS,
  SET_PRODUCT_ERROR,

  GET_MOBILE_NUMBERS,
  SET_MOBILE_NUMBERS,

  SET_PRODUCT_HANDLER_DEFAULT
} from './constants'

const initialState = fromJS({
  product: {},
  loading: false,
  mobileNumbers: [],
  requestProductSuccess: false,
  requestProductError: false,
  currentProduct: {}
})

function productPageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return state.set('loading', true)

    case SET_PRODUCT_SUCCESS:
      return state
        .set('requestProductSuccess', true)
        .set('requestProductError', false)

    case SET_PRODUCT_ERROR:
      return state
        .set('requestProductSuccess', false)
        .set('requestProductError', fromJS(action.payload))

    case SET_PRODUCT:
      return state
          .set('product', fromJS(action.payload))
          .set('loading', false)

    case GET_MOBILE_NUMBERS:
      return state.set('loading', true)

    case SET_MOBILE_NUMBERS:
      return state
          .set('mobileNumbers', fromJS(action.payload))
          .set('loading', false)

    case SET_PRODUCT_HANDLER_DEFAULT:
      return state
        .set('requestProductSuccess', false)
        .set('requestProductError', false)
    default:
      return state
  }
}

export default productPageReducer
