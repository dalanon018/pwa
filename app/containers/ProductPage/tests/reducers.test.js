
import productsReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setProductAction
} from '../actions'

describe('Products Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      product: {},
      loading: false,
      requestProductSuccess: false,
      requestProductError: false,
      currentProduct: {}
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productsReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update categories', () => {
    const payload = fromJS({
      title: 'title1',
      description: 'lorem ipsum'
    })

    const expectedResult = state.set('product', payload)

    expect(productsReducer(state, setProductAction(payload))).toEqual(expectedResult)
  })
})
