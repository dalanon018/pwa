/*
 *
 * FaqPage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_MARKDOWN,
  SET_MARKDOWN
} from './constants'

const initialState = fromJS({
  markdown: '',
  loading: false
})

function faqPageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_MARKDOWN:
      return state.set('loading', true)
    case SET_MARKDOWN:
      return state
        .set('markdown', action.payload)
        .set('loading', false)
    default:
      return state
  }
}

export default faqPageReducer
