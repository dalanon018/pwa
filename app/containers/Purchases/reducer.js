/*
 *
 * purchases reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_API_PURCHASES,
  GET_LOCAL_PURCHASES,
  SET_PURCHASES,

  SET_MODAL_TOGGLE,

  SET_MOBILE_NUMBER,

  GET_MARKDOWN,
  SET_MARKDOWN
} from './constants'

const initialState = fromJS({
  purchases: [],
  modalToggle: false,
  loading: false,
  markdown: '',
  loading_markdown: false
})

function purchasesReducer (state = initialState, action) {
  switch (action.type) {
    case GET_LOCAL_PURCHASES:
      return state.set('loading', true)
    case GET_API_PURCHASES:
      return state.set('loading', true)
    case SET_PURCHASES:
      return state
          .set('purchases', fromJS(action.payload))
          .set('loading', false)

    case SET_MODAL_TOGGLE:
      return state
          .set('modalToggle', action.payload)

    case SET_MOBILE_NUMBER:
      return state.set('loading', true)

    case GET_MARKDOWN:
      return state
        .set('loading', true)

    case SET_MARKDOWN:
      return state
        .set('markdown', action.payload)
        .set('loading', false)

    default:
      return state
  }
}

export default purchasesReducer
