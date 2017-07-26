
import { fromJS } from 'immutable'
import productReviewReducer from '../reducer'

describe('productReviewReducer', () => {
  it('returns the initial state', () => {
    expect(productReviewReducer(undefined, {})).toEqual(fromJS({}))
  })
})
