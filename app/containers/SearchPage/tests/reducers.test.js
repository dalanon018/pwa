
import productSearchReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setSearchProductAction
} from '../actions'

describe('Buckets Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      loading: false,
      product: {}
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productSearchReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update categories', () => {
    const payload = fromJS({
      name: 'Testproduct',
      product_id: '0001'
    })

    const expectedResult = state.set('product', payload)

    expect(productSearchReducer(state, setSearchProductAction(payload))).toEqual(expectedResult)
  })
})
