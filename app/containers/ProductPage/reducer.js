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

  SET_MOBILE_NUMBERS,

  SET_PRODUCT_HANDLER_DEFAULT,

  SET_MARKDOWN,

  SUCCESS_MOBILE_REGISTRATION,
  ERROR_MOBILE_REGISTRATION,

  SET_VERIFICATION_CODE,

  REQUEST_MOBILE_REGISTRATION,
  SUCCESS_VERIFICATION_CODE,
  ERROR_VERIFICATION_CODE,

  RESET_SUBMISSION,

  SET_LOYALTY_TOKEN
} from './constants'

const initialState = fromJS({
  product: {},
  loading: false,
  mobileNumbers: [],
  requestProductSuccess: false,
  requestProductError: false,
  currentProduct: {},
  markdown: '',
  loadingMarkdown: false,
  loyaltyToken: null,
  mobileRegistrationSuccess: false,
  mobileRegistrationError: null,
  verificationCode: false,
  verificationCodeSuccess: false,
  verificationCodeError: null
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

    case SET_MOBILE_NUMBERS:
      return state
          .set('mobileNumbers', fromJS(action.payload))

    case SET_MARKDOWN:
      return state
        .set('markdown', action.payload)

    case SET_PRODUCT_HANDLER_DEFAULT:
      return state
        .set('requestProductSuccess', false)
        .set('requestProductError', false)

    case REQUEST_MOBILE_REGISTRATION:
      return state
        .set('mobileRegistrationSuccess', false)
        .set('mobileRegistrationError', null)

    case SUCCESS_MOBILE_REGISTRATION:
      return state
        .set('mobileRegistrationSuccess', true)
        .set('mobileRegistrationError', null)
    case ERROR_MOBILE_REGISTRATION:
      return state
        .set('mobileRegistrationError', action.payload)
        .set('mobileRegistrationSuccess', false)

    case SUCCESS_VERIFICATION_CODE:
      return state
        .set('verificationCodeSuccess', true)
        .set('verificationCodeError', null)

    case ERROR_VERIFICATION_CODE:
      return state
        .set('verificationCodeSuccess', false)
        .set('verificationCodeError', action.payload)

    case SET_VERIFICATION_CODE:
      return state
        .set('verificationCode', action.payload)

    case RESET_SUBMISSION:
      return state
        .set('mobileRegistrationSuccess', false)
        .set('mobileRegistrationError', null)
        .set('verificationCode', false)
        .set('verificationCodeSuccess', false)
        .set('verificationCodeError', null)

    case SET_LOYALTY_TOKEN:
      return state
      .set('loyaltyToken', action.payload)

    default:
      return state
  }
}

export default productPageReducer
