/*
 *
 * ProductReview reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  GET_ORDER_PRODUCT,
  SET_ORDER_PRODUCT
} from './constants'

const initialState = fromJS({
  orderProduct: {},
  loading: false
})

function productReviewReducer (state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case GET_ORDER_PRODUCT:
      return state.set('loading', true)
    case SET_ORDER_PRODUCT:
      return state
        .set('orderProduct', fromJS(action.payload))
        .set('loading', false)
    default:
      return state
  }
}

export default productReviewReducer
