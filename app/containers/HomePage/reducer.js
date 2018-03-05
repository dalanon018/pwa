/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS,

  SET_PRODUCTS_COUNT,

  GET_PROMOS,
  SET_PROMOS,
  SET_PROMOS_COUNT
} from './constants'

const initialState = fromJS({
  product: {},
  loading: false,
  totalCount: 0,

  promos: [],
  promosCount: 0,
  promosLoading: false
})

function homePageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_PRODUCTS:
      return state.set('loading', true)
    case SET_FEATURED_PRODUCTS:
      return state
        .set('product', fromJS(action.payload))
        .set('loading', false)

    case SET_PRODUCTS_COUNT:
      return state.set('totalCount', fromJS(action.payload))

    case GET_PROMOS:
      return state.set('promosLoading', true)

    case SET_PROMOS:
      return state
        .set('promos', fromJS(action.payload))
        .set('promosLoading', false)

    case SET_PROMOS_COUNT:
      return state.set('promosCount', fromJS(action.payload))

    default:
      return state
  }
}

export default homePageReducer
