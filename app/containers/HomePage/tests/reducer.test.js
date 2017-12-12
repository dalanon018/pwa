
import { fromJS } from 'immutable'
import homePageReducer from '../reducer'
import { GET_FEATURED_PRODUCTS } from './../constants'

describe('homePageReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      product: {},
      loading: true,
      totalCount: 0
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(homePageReducer(undefined, {
      type: GET_FEATURED_PRODUCTS,
      payload: fromJS([
        {test: 'passed'}
      ])
    })).toEqual(expectedResult)
  })
})
