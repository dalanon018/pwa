
import receiptReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setReceiptAction
} from '../actions'

describe('Receipt Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      receipt: {},
      loading: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(receiptReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update receipt', () => {
    const payload = fromJS({
      trackingNumber: 123456
    })

    const expectedResult = state.set('receipt', payload)

    expect(receiptReducer(state, setReceiptAction(payload))).toEqual(expectedResult)
  })
})
