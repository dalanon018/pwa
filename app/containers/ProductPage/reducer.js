/*
 *
 * ProductPage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_PRODUCT,
  SET_PRODUCT
} from './constants'

const initialState = fromJS({
  product: {},
  loading: false,
  success: false,
  error: false
})

function productPageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return state.set('loading', true)
    case SET_PRODUCT:
      return state
          .set('product', fromJS(action.payload))
          .set('loading', false)
    default:
      return state
  }
}

export default productPageReducer
