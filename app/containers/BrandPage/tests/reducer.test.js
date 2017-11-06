import { fromJS } from 'immutable'
import productsByBrandsReducer from '../reducer'

import {
  setProductsByBrandsAction
} from '../actions'

describe('productsByBrandsReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      productsByBrands: [],
      loading: false,
      lazyload: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productsByBrandsReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update productsByBrands', () => {
    const payload = ['brand1', 'brand2']
    const currentState = state.get('productsByBrands').toJS()
    const mergeState = currentState.concat(payload)
    const expectedResult = state
                            .set('productsByBrands', fromJS(mergeState))
                            .set('lazyload', false)

    expect(productsByBrandsReducer(state, setProductsByBrandsAction(payload))).toEqual(expectedResult)
  })
})
