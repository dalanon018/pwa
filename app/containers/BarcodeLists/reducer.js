/*
 *
 * BarcodeLists reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_BARCODES,
  SET_BARCODES
} from './constants'

const initialState = fromJS({
  barcodes: [],
  loading: false
})

function barcodeListsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_BARCODES:
      return state.set('loading', true)
    case SET_BARCODES:
      return state
          .set('barcodes', fromJS(action.payload))
          .set('loading', false)
    default:
      return state
  }
}

export default barcodeListsReducer
