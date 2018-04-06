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

  SET_STORE,

  GET_CURRENT_POINTS,
  SET_CURRENT_POINTS,

  SET_ORDER_HANDLER_DEFAULT,

  SET_BLACKLIST
} from './constants'

const initialState = fromJS({
  orderProduct: {},
  submitting: false,
  submissionSuccess: {},
  submissionError: {},
  productLoading: false,
  mobileNumber: null,
  mobileLoading: false,
  storeLocation: {},
  currentPoints: {},
  currentPointsLoading: false,
  isBlackListed: true
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
        .set('orderProduct', fromJS({}))
        .set('submissionSuccess', fromJS({}))
        .set('submissionError', fromJS({}))

    case SET_STORE:
      return state.set('storeLocation', fromJS(action.payload))

    case GET_CURRENT_POINTS:
      return state.set('currentPointsLoading', true)

    case SET_CURRENT_POINTS:
      return state
          .set('currentPoints', fromJS(action.payload))
          .set('currentPointsLoading', false)

    case SET_BLACKLIST:
      return state
        .set('isBlackListed', action.payload)

    default:
      return state
  }
}

export default productReviewReducer
