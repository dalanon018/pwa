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

  SET_TOGGLE
} from './constants'

const initialState = fromJS({
  categories: [],
  mobileNumbers: [],
  receiptsUpdated: [],
  toggle: false,
  toggleError: false,
  toggleMessage: null
})

function bucketsReducer (state = initialState, action) {
  switch (action.type) {
    case SET_MOBILE_NUMBERS:
      return state.set('mobileNumbers', fromJS(action.payload))

    case SET_TOGGLE:
      return state.set('toggle', !state.get('toggle'))

    case SET_PRODUCT_CATEGORIES:
      return state
        .set('categories', fromJS(action.payload))
        .set('toggle', false)

    case SET_RECEIPT_UPDATED:
      return state.set('receiptsUpdated', fromJS(action.payload))

    case SET_NETWORK_ERROR:
      return state
        .set('toggleMessage', action.payload)
        .set('toggleError', !state.get('toggleError'))

    default:
      return state
  }
}

export default bucketsReducer
