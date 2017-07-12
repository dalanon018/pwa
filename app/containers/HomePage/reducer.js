/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_SAMPLE_API
} from './constants'

const initialState = fromJS({
  sampleApi: {}
})

function homePageReducer (state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case SET_SAMPLE_API:
      return state.set('sampleApi', fromJS(action.payload))
    default:
      return state
  }
}

export default homePageReducer
