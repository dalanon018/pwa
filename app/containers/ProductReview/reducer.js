/*
 *
 * ProductReview reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_ORDER_PRODUCT,
  SET_ORDER_PRODUCT,

  GET_MOBILE_NUMBER,
  SET_MOBILE_NUMBER,

  ORDER_SUBMIT,
  ORDER_SUCCESS,
  ORDER_ERROR,

  SET_ORDER_HANDLER_DEFAULT
} from './constants'

const initialState = fromJS({
  orderProduct: {},
  submitting: false,
  submissionSuccess: {},
  submissionError: {},
  productLoading: false,
  mobileNumber: null,
  mobileLoading: false
})

function productReviewReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_PRODUCT:
      return state.set('productLoading', true)
    case SET_ORDER_PRODUCT:
      return state
        .set('orderProduct', fromJS(action.payload))
        .set('productLoading', false)

    case GET_MOBILE_NUMBER:
      return state.set('mobileLoading', true)
    case SET_MOBILE_NUMBER:
      return state
        .set('mobileNumber', fromJS(action.payload))
        .set('mobileLoading', false)

    case ORDER_SUBMIT:
      return state.set('submitting', true)
    case ORDER_SUCCESS:
      return state
        .set('submissionSuccess', fromJS(action.payload))
        .set('submissionError', fromJS({}))
        .set('submitting', false)
    case ORDER_ERROR:
      return state
        .set('submissionError', fromJS(action.payload))
        .set('submissionSuccess', fromJS({}))
        .set('submitting', false)

    case SET_ORDER_HANDLER_DEFAULT:
      return state
        .set('submissionSuccess', fromJS({}))
        .set('submissionError', fromJS({}))

    default:
      return state
  }
}

export default productReviewReducer
