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

  SET_BLACKLIST,

  SET_LAST_SELECTED_METHOD,

  COUPON_SUBMIT,
  COUPON_RESULT,
  COUPON_REMOVE,

  // for email api
  SET_EMAIL,
  GET_EMAIL,

  // for Store Delivery message
  GET_STORE_DELIVERY_MESSAGE,
  SET_STORE_DELIVERY_MESSAGE
} from './constants'

const initialState = fromJS({
  orderProduct: {},
  submitting: false,
  submissionSuccess: {},
  submissionError: {},
  productLoading: false,
  mobileNumber: null,
  mobileLoading: false,
  lastSelectedMethod: null,
  storeLocation: {},
  currentPoints: {},
  currentPointsLoading: false,
  isBlackListed: true,
  couponApplied: false,
  couponLoader: false,
  couponSuccess: false,
  couponError: false,
  emailAddress: null,
  modePayment: null,
  storeDeliveryMessageLoading: false
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
        .set('couponApplied', false)
        .set('couponLoader', false)
        .set('couponSuccess', false)
        .set('couponError', false)

    case SET_STORE:
      return state.set('storeLocation', fromJS(action.payload))

    case SET_LAST_SELECTED_METHOD:
      return state.set('lastSelectedMethod', fromJS(action.payload))

    case GET_CURRENT_POINTS:
      return state.set('currentPointsLoading', true)

    case SET_CURRENT_POINTS:
      return state
        .set('currentPoints', fromJS(action.payload))
        .set('currentPointsLoading', false)

    case SET_BLACKLIST:
      return state
        .set('isBlackListed', action.payload)

    case COUPON_SUBMIT:
      return state
        .set('couponLoader', true)
        .set('couponApplied', false)
        .set('couponSuccess', false)
        .set('couponError', false)

    case COUPON_REMOVE:
      return state
        .set('couponLoader', true)

    case COUPON_RESULT: {
      const { couponApplied, couponSuccess, couponError } = action.payload
      return state
        .set('couponLoader', false)
        .set('couponApplied', couponApplied)
        .set('couponSuccess', couponSuccess)
        .set('couponError', couponError)
    }

    // for email api
    case GET_EMAIL:
      return state.set('mobileLoading', true)
    case SET_EMAIL:
      return state
        .set('mobileNumber', fromJS(action.payload))
        .set('emailAddress', action.payload)
        .set('mobileLoading', false)

    // for email api
    case GET_STORE_DELIVERY_MESSAGE:
      return state.set('storeDeliveryMessageLoading', true)
    case SET_STORE_DELIVERY_MESSAGE:
      return state
        .set('modePayment', fromJS(action.payload))
        .set('storeDeliveryMessageLoading', false)

    default:
      return state
  }
}

export default productReviewReducer
