
import { fromJS } from 'immutable'
import termsConditionsReducer from '../reducer'
import { GET_MARKDOWN } from './../constants'

describe('termsConditionsReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      markdown: '',
      loading: true
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(termsConditionsReducer(undefined, {
      type: GET_MARKDOWN,
      payload: fromJS([
        {test: 'passed'}
      ])
    })).toEqual(expectedResult)
  })
})
