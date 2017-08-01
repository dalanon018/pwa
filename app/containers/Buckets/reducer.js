/*
 *
 * Bucket reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SET_MOBILE_NUMBERS,

  SET_PRODUCT_CATEGORIES,

  SET_TOGGLE
} from './constants'

const initialState = fromJS({
  categories: [],
  mobileNumbers: [],
  toggle: false
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
    default:
      return state
  }
}

export default bucketsReducer
