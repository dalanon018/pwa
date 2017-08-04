
import { fromJS } from 'immutable'
import termsConditionsReducer from '../reducer'

describe('termsConditionsReducer', () => {
  it('returns the initial state', () => {
    expect(termsConditionsReducer(undefined, {})).toEqual(fromJS({}))
  })
})
