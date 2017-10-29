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

  SET_PRODUCT_HANDLER_DEFAULT
} from './constants'

const initialState = fromJS({
  product: {},
  loading: false,
  requestProductSuccess: false,
  requestProductError: false

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

    case SET_PRODUCT_HANDLER_DEFAULT:
      return state
        .set('requestProductSuccess', false)
        .set('requestProductError', false)

    default:
      return state
  }
}

export default productPageReducer
