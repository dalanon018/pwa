
import barcodesReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setBarcodesAction
} from '../actions'

describe('BarcodesList Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      barcodes: [],
      loading: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(barcodesReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update barcodes', () => {
    const payload = fromJS(['category1', 'category2', 'category3'])

    const expectedResult = state.set('barcodes', payload)

    expect(barcodesReducer(state, setBarcodesAction(payload))).toEqual(expectedResult)
  })
})
