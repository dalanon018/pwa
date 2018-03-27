
import { fromJS } from 'immutable'
import flashDealsLandingReducer from '../reducer'

describe('flashDealsLandingReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      promos: [],
      promosCount: 0,
      promosLoading: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(flashDealsLandingReducer(undefined, {})).toEqual(expectedResult)
  })
})
