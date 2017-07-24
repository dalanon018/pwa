/*
 *
 * Bucket reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SET_PRODUCT_CATEGORIES,
  SET_TOGGLE
} from './constants'

const initialState = fromJS({
  categories: [],
  toggle: false
})

function bucketsReducer (state = initialState, action) {
  switch (action.type) {
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
