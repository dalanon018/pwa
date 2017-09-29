
import containerReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setMobileNumbersAction,
  setNetworkErrorAction
} from '../actions'

describe('Container Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      mobileNumbers: [],
      receiptsUpdated: [],
      toggle: false,
      toggleError: false,
      toggleMessage: null,
      loader: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(containerReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update mobile numbers', () => {
    const payload = fromJS(['999999999', '88888888', '77777777'])

    const expectedResult = state.set('mobileNumbers', payload)

    expect(containerReducer(state, setMobileNumbersAction(payload))).toEqual(expectedResult)
  })

  it('should toggleError true', () => {
    const payload = 'Error'

    const expectedResult = state.set('toggleMessage', payload).set('toggleError', true)

    expect(containerReducer(state, setNetworkErrorAction(payload))).toEqual(expectedResult)
  })
})
