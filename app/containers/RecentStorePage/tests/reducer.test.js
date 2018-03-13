
import { fromJS } from 'immutable'
import recentStorePageReducer from '../reducer'

describe('recentStorePageReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      visitedStores: [],
      visitedStoresLoading: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(recentStorePageReducer(undefined, {})).toEqual(expectedResult)
  })
})
