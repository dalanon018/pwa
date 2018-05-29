/*
 *
 * purchases reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_API_PURCHASES,
  GET_LOCAL_PURCHASES,
  SET_LOCAL_PURCHASES,
  SET_API_PURCHASES
} from './constants'

const initialState = fromJS({
  purchases: [],
  apiRequestLoading: false,
  localRequestLoading: false
})

function purchasesReducer (state = initialState, action) {
  switch (action.type) {
    case GET_LOCAL_PURCHASES:
      return state.set('localRequestLoading', true)
    case GET_API_PURCHASES:
      return state.set('apiRequestLoading', true)
    case SET_LOCAL_PURCHASES:
      return state
          .set('purchases', fromJS(action.payload))
          .set('localRequestLoading', false)
    case SET_API_PURCHASES:
      return state
          .set('purchases', fromJS(action.payload))
          .set('apiRequestLoading', false)

    default:
      return state
  }
}

export default purchasesReducer
