
import { fromJS } from 'immutable'
import brandLandingReducer from '../reducer'

describe('brandLandingReducer', () => {
  it('returns the initial state', () => {
    expect(brandLandingReducer(undefined, {})).toEqual(fromJS({}))
  })
})
