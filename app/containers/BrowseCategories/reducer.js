/*
 *
 * BrowseCategories reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_CATEGORIES,
  SET_CATEGORIES
} from './constants'

const initialState = fromJS({
  categories: [],
  loading: false
})

function browseCategoriesReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return state.set('loading', true)
    case SET_CATEGORIES:
      return state
        .set('categories', fromJS(action.payload))
        .set('loading', false)
    default:
      return state
  }
}

export default browseCategoriesReducer
