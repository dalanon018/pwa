/*
 *
 * FlashDealsLanding reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_PROMOS,
  SET_PROMOS
} from './constants'

const initialState = fromJS({
  promos: [],
  promosCount: 0,
  promosLoading: false
})

function flashDealsLandingReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PROMOS:
      return state.set('promosLoading', true)

    case SET_PROMOS:
      return state
        .set('promos', fromJS(action.payload))
        .set('promosLoading', false)

    default:
      return state
  }
}

export default flashDealsLandingReducer
