/*
 *
 * Bucket reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SET_ROUTE_NAME,

  SET_PAGE_TITLE,

  SET_SHOW_SEARCH_ICON,

  SET_SHOW_ACTIVITY_ICON,

  SET_MOBILE_NUMBERS,

  SET_PRODUCT_CATEGORIES,

  GET_BRANDS,

  SET_BRANDS,

  SET_RECEIPT_UPDATED,

  SET_NETWORK_ERROR,

  SET_TOGGLE,

  GET_PRODUCT_CATEGORIES,

  SET_REGISTED_PUSH,

  SET_LOYALTY_TOKEN,
  SET_HEADER_FULL_SCREEN
} from './constants'

const initialState = fromJS({
  categories: [],
  brands: [],
  mobileNumbers: [],
  receiptsUpdated: [],
  toggle: false,
  toggleError: false,
  toggleMessage: null,
  loader: false,
  brandLoader: false,
  routeName: null,
  pageTitle: null,
  headerMenuFullScreen: false,
  searchIconShow: false,
  activityIconShow: false,
  isRegisteredPush: false,
  loyaltyToken: null
})

function bucketsReducer (state = initialState, action) {
  switch (action.type) {
    case SET_ROUTE_NAME:
      return state.set('routeName', action.payload)

    case SET_PAGE_TITLE:
      return state.set('pageTitle', action.payload)

    case SET_HEADER_FULL_SCREEN:
      return state.set('headerMenuFullScreen', action.payload)

    case SET_SHOW_SEARCH_ICON:
      return state.set('searchIconShow', action.payload)

    case SET_SHOW_ACTIVITY_ICON:
      return state.set('activityIconShow', action.payload)

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

    case GET_BRANDS:
      return state.set('brandLoader', true)

    case SET_BRANDS:
      return state
        .set('brands', fromJS(action.payload))
        .set('brandLoader', false)

    case SET_RECEIPT_UPDATED:
      return state.set('receiptsUpdated', fromJS(action.payload))

    case SET_NETWORK_ERROR: {
      const toggle = action.payload || false
      return state
        .set('toggleMessage', action.payload)
        .set('toggleError', Boolean(toggle))
    }

    case SET_REGISTED_PUSH:
      return state
        .set('isRegisteredPush', action.payload)

    case SET_LOYALTY_TOKEN:
      return state
        .set('loyaltyToken', action.payload)

    default:
      return state
  }
}

export default bucketsReducer
