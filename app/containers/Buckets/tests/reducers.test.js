
import bucketsReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setProductCategoriesAction
} from '../actions'

describe('Buckets Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      categories: []
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
})
