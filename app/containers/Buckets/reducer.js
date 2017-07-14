/*
 *
 * Bucket reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SET_PRODUCT_CATEGORIES
} from './constants'

const initialState = fromJS({
  categories: []
})

function bucketsReducer (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT_CATEGORIES:
      return state.set('categories', fromJS(action.payload))
    default:
      return state
  }
}

export default bucketsReducer
