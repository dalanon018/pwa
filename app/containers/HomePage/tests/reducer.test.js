
import { fromJS } from 'immutable'
import homePageReducer from '../reducer'
import { GET_SAMPLE_API } from './../constants'

describe('homePageReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      sampleApi: {}
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(homePageReducer(undefined, {
      type: GET_SAMPLE_API,
      payload: fromJS([
        {test: 'passed'}
      ])
    })).toEqual(expectedResult)
  })
})
