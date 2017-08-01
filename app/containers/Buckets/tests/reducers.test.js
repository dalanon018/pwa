
import bucketsReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setProductCategoriesAction,
  setMobileNumbersAction
} from '../actions'

describe('Buckets Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      categories: [],
      mobileNumbers: [],
      toggle: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(bucketsReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update categories', () => {
    const payload = fromJS(['category1', 'category2', 'category3'])

    const expectedResult = state.set('categories', payload)

    expect(bucketsReducer(state, setProductCategoriesAction(payload))).toEqual(expectedResult)
  })

  it('should update mobile numbers', () => {
    const payload = fromJS(['999999999', '88888888', '77777777'])

    const expectedResult = state.set('mobileNumbers', payload)

    expect(bucketsReducer(state, setMobileNumbersAction(payload))).toEqual(expectedResult)
  })
})
