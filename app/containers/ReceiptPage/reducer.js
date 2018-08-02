/*
 *
 * PurchaseEntity reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_RECEIPT,
  SET_RECEIPT,

  REPURCHASE_ITEM_REQUEST,
  REPURCHASE_ITEM_SUCCESS,
  REPURCHASE_ITEM_ERROR
} from './constants'

const initialState = fromJS({
  receipt: {},
  loading: false,
  repurchase: {},
  repurchaseSuccess: false,
  repurchaseError: null
})

function receiptPageReducer (state = initialState, action) {
  switch (action.type) {
    case REPURCHASE_ITEM_REQUEST:
      return state.set('loading', true)
    case REPURCHASE_ITEM_SUCCESS:
      return state
        .set('repurchase', fromJS(action.payload))
        .set('repurchaseSuccess', true)
        .set('repurchaseError', null)
        .set('loading', false)
    case REPURCHASE_ITEM_ERROR:
      return state
        .set('repurchase', fromJS({}))
        .set('repurchaseSuccess', false)
        .set('repurchaseError', fromJS(action.payload))
        .set('loading', false)
    case GET_RECEIPT:
      return state.set('loading', true)
    case SET_RECEIPT:
      return state
        .set('receipt', fromJS(action.payload))
        .set('loading', false)

    default:
      return state
  }
}

export default receiptPageReducer
