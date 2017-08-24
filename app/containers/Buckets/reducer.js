/*
 *
 * Bucket reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SET_MOBILE_NUMBERS,

  SET_PRODUCT_CATEGORIES,

  SET_RECEIPT_UPDATED,

  SET_NETWORK_ERROR,

  SET_TOGGLE,

  GET_PRODUCT_CATEGORIES
} from './constants'

const initialState = fromJS({
  categories: [],
  mobileNumbers: [],
  receiptsUpdated: [],
  toggle: false,
  toggleError: false,
  toggleMessage: null,
  loader: false
})

function bucketsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_CATEGORIES:
      return state.set('loader', true)

    case SET_MOBILE_NUMBERS:
      return state.set('mobileNumbers', fromJS(action.payload))

    case SET_TOGGLE:
      return state.set('toggle', !state.get('toggle'))

    case SET_PRODUCT_CATEGORIES:
      return state
        .set('categories', fromJS(action.payload))
        .set('toggle', false)
        .set('loader', false)

    case SET_RECEIPT_UPDATED:
      return state.set('receiptsUpdated', fromJS(action.payload))

    case SET_NETWORK_ERROR: {
      const toggle = action.payload || false
      return state
        .set('toggleMessage', action.payload)
        .set('toggleError', Boolean(toggle))
    }
    default:
      return state
  }
}

export default bucketsReducer
