
import purchasesReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setLocalPurchasesAction,
  setApiPurchasesAction
} from '../actions'

describe('Purchases Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      purchases: [],
      apiRequestLoading: false,
      localRequestLoading: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(purchasesReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update local purchases', () => {
    const payload = fromJS(['order1', 'order2', 'order3'])

    const expectedResult = state.set('purchases', payload)

    expect(purchasesReducer(state, setLocalPurchasesAction(payload))).toEqual(expectedResult)
  })

  it('should update api  purchases', () => {
    const payload = fromJS(['order1', 'order2', 'order3'])

    const expectedResult = state.set('purchases', payload)

    expect(purchasesReducer(state, setApiPurchasesAction(payload))).toEqual(expectedResult)
  })
})
