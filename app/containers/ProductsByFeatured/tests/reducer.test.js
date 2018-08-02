import { fromJS } from 'immutable'
import productsByFeaturedReducer from '../reducer'

import {
  setProductsByFeaturedAction,
  setProductsCountsAction
} from '../actions'

describe('productsByFeaturedReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      products: [],
      productsViewed: [],
      totalCount: 0,
      loading: true,
      lazyload: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productsByFeaturedReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update products', () => {
    const payload = ['cat1', 'cat2']
    const currentState = state.get('products').toJS()
    const mergeState = currentState.concat(payload)
    const expectedResult = state
      .set('products', fromJS(mergeState))
      .set('loading', false)
      .set('lazyload', false)

    expect(productsByFeaturedReducer(state, setProductsByFeaturedAction(payload))).toEqual(expectedResult)
  })

  it('should update totalCount', () => {
    const payload = 10
    const expectedResult = state
      .set('totalCount', payload)
    expect(productsByFeaturedReducer(state, setProductsCountsAction(payload))).toEqual(expectedResult)
  })
})
