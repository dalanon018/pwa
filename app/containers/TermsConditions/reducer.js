/*
 *
 * TermsConditions reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SET_MARKDOWN
} from './constants'

const initialState = fromJS({
  markdown: ''
})

function termsConditionsReducer (state = initialState, action) {
  switch (action.type) {
    case SET_MARKDOWN:
      return state.set('markdown', action.payload)
    default:
      return state
  }
}

export default termsConditionsReducer
