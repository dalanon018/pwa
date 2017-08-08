
import { fromJS } from 'immutable'
import faqPageReducer from '../reducer'
import { GET_MARKDOWN } from './../constants'

describe('faqPageReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      markdown: '',
      loading: true
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(faqPageReducer(undefined, {
      type: GET_MARKDOWN,
      payload: fromJS([
        {test: 'passed'}
      ])
    })).toEqual(expectedResult)
  })
})
