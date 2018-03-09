
import { fromJS } from 'immutable'
import categoryLandingReducer from '../reducer'

describe('categoryLandingReducer', () => {
  it('returns the initial state', () => {
    expect(categoryLandingReducer(undefined, {})).toEqual(fromJS({}))
  })
})
