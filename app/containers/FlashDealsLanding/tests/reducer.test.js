
import { fromJS } from 'immutable'
import flashDealsLandingReducer from '../reducer'

describe('flashDealsLandingReducer', () => {
  it('returns the initial state', () => {
    expect(flashDealsLandingReducer(undefined, {})).toEqual(fromJS({}))
  })
})
