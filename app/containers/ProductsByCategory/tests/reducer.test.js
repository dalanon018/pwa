
import { fromJS } from 'immutable'
import productsByCategoryReducer from '../reducer'

describe('productsByCategoryReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      productsByCategory: [],
      loading: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productsByCategoryReducer(undefined, {})).toEqual(expectedResult)
  })
})
