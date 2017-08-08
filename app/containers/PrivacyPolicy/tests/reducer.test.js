import { fromJS } from 'immutable'
import privacyPolicyReducer from '../reducer'
import { GET_MARKDOWN } from './../constants'

describe('privacyPolicyReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      markdown: '',
      loading: true
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(privacyPolicyReducer(undefined, {
      type: GET_MARKDOWN,
      payload: fromJS([
        {test: 'passed'}
      ])
    })).toEqual(expectedResult)
  })
})
