
import purchasesReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setPurchasesAction
} from '../actions'

describe('Purchases Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      purchases: [],
      modalToggle: false,
      loading: false,
      markdown: '',
      loading_markdown: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(purchasesReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update barcodes', () => {
    const payload = fromJS(['order1', 'order2', 'order3'])

    const expectedResult = state.set('purchases', payload)

    expect(purchasesReducer(state, setPurchasesAction(payload))).toEqual(expectedResult)
  })
})
