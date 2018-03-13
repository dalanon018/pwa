/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable'
import { isEmpty } from 'lodash'
import {
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS,

  SET_PRODUCTS_COUNT,

  GET_PROMOS,
  SET_PROMOS,
  SET_PROMOS_COUNT,

  GET_BANNERS,
  SET_BANNERS,

  LIMIT_ITEMS
} from './constants'

const initialState = fromJS({
  product: [],
  loading: false,
  totalCount: 0,
  lazyload: false,

  promos: [],
  promosCount: 0,
  promosLoading: false,

  banners: [],
  bannersCount: 0,
  bannersLoading: false
})

function homePageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_PRODUCTS:
      return state.set('loading', true)

    case SET_FEATURED_PRODUCTS: {
      const concatState = state.get('product').concat(fromJS(action.payload))
      return state
        .set('product', concatState)
        .set('loading', false)
        // we will toggle to true lazyload if only items are not empty and payload is greater that the limit
        .set('lazyload', (!isEmpty(action.payload) && LIMIT_ITEMS <= action.payload.length))
    }

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

    case GET_BANNERS :
      return state.set('bannersLoading', true)

    case SET_BANNERS :
      return state
        .set('banners', fromJS(action.payload))
        .set('bannersLoading', false)

    default:
      return state
  }
}

export default homePageReducer
