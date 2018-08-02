import { fromJS } from 'immutable'
import promoProductsPageReducer from '../reducer'

import {
  setPromoProductsAction
} from '../actions'

describe('promoProductsPageReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      promo: {},
      products: [],
      productsCount: 0,
      productsLoading: false,
      lazyload: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(promoProductsPageReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update products', () => {
    const payload = ['product1', 'product2']
    const currentState = state.get('products')
    const mergeState = currentState.concat(fromJS(payload))
    const expectedResult = state
      .set('products', mergeState)
      .set('lazyload', false)

    expect(promoProductsPageReducer(state, setPromoProductsAction(payload))).toEqual(expectedResult)
  })
})
