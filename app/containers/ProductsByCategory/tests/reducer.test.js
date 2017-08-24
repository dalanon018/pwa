import { fromJS } from 'immutable'
import productsByCategoryReducer from '../reducer'

import {
  setProductsByCategoryAction
} from '../actions'

describe('productsByCategoryReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      productsByCategory: [],
      productsViewed: [],
      loading: false,
      lazyload: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productsByCategoryReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update productsByCategory', () => {
    const payload = ['cat1', 'cat2']
    const currentState = state.get('productsByCategory').toJS()
    const mergeState = currentState.concat(payload)
    const expectedResult = state
                            .set('productsByCategory', fromJS(mergeState))
                            .set('lazyload', true)

    expect(productsByCategoryReducer(state, setProductsByCategoryAction(payload))).toEqual(expectedResult)
  })
})
