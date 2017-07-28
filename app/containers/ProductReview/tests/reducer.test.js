
import { fromJS } from 'immutable'
import productReviewReducer from '../reducer'

describe('productReviewReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      orderProduct: {},
      loading: false,
      mobileNumber: []
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productReviewReducer(undefined, {})).toEqual(expectedResult)
  })
})
