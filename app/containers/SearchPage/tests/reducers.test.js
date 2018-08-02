
import productSearchReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setSearchProductAction,
  setProductHandlersDefaultAction
} from '../actions'

describe('Buckets Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      loading: false,
      product: {},
      requestProductSuccess: false,
      requestProductError: false,
      currentProduct: {}
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productSearchReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update Product info', () => {
    const payload = fromJS({
      name: 'Testproduct',
      product_id: '0001'
    })

    const expectedResult = state.set('product', payload)

    expect(productSearchReducer(state, setSearchProductAction(payload))).toEqual(expectedResult)
  })

  it('should reset the handlers to default success = false, error = false', () => {
    const expectedResult = state
      .set('requestProductSuccess', false)
      .set('requestProductError', false)

    expect(productSearchReducer(state, setProductHandlersDefaultAction())).toEqual(expectedResult)
  })
})
