
import { fromJS } from 'immutable'
import bucketsReducer from '../reducer'

describe('bucketsReducer', () => {
  it('returns the initial state', () => {
    expect(bucketsReducer(undefined, {})).toEqual(fromJS({}))
  })
})
