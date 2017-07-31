
import { fromJS } from 'immutable'
import browseCategoriesReducer from '../reducer'
import { GET_CATEGORIES } from './../constants'

describe('browseCategoriesReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      categories: [],
      loading: true
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(browseCategoriesReducer(undefined, {
      type: GET_CATEGORIES,
      payload: fromJS([
        {test: 'passed'}
      ])
    })).toEqual(expectedResult)
  })
})
