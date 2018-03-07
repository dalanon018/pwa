
import { fromJS } from 'immutable'
import productReviewReducer from '../reducer'

import {
  setOrderProductAction,
  setMobileNumberAction
} from '../actions'

describe('productReviewReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      orderProduct: {},
      submitting: false,
      submissionSuccess: {},
      submissionError: {},
      productLoading: false,
      mobileNumber: null,
      mobileLoading: false,
      storeLocation: {},
      visitedStores: [],
      visitedStoresLoading: false,
      isBlackListed: true
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productReviewReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update orderProduct', () => {
    const payload = fromJS({
      id: '00001',
      name: 'test1'
    })
    const expectedResult = state
                            .set('orderProduct', payload)

    expect(productReviewReducer(state, setOrderProductAction(payload))).toEqual(expectedResult)
  })

  it('should update mobileNumber', () => {
    const payload = '999999999'
    const expectedResult = state
                            .set('mobileNumber', payload)

    expect(productReviewReducer(state, setMobileNumberAction(payload))).toEqual(expectedResult)
  })
})
