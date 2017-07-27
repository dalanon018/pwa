/*
 *
 * purchases reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_PURCHASES,
  SET_PURCHASES
} from './constants'

const initialState = fromJS({
  purchases: [],
  loading: false
})

function purchasesReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PURCHASES:
      return state.set('loading', true)
    case SET_PURCHASES:
      return state
          .set('purchases', fromJS(action.payload))
          .set('loading', false)
    default:
      return state
  }
}

export default purchasesReducer
