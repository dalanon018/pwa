/*
 *
 * PurchaseEntity reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_RECEIPT,
  SET_RECEIPT
} from './constants'

const initialState = fromJS({
  receipt: {},
  loading: false
})

function receiptPageReducer (state = initialState, action) {
  switch (action.type) {
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
