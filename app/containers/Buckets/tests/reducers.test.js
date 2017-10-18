
import bucketsReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setProductCategoriesAction,
  setMobileNumbersAction,
  setNetworkErrorAction
} from '../actions'

describe('Buckets Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      categories: [],
      brands: [],
      mobileNumbers: [],
      receiptsUpdated: [],
      toggle: false,
      toggleError: false,
      toggleMessage: null,
      loader: false,
      pageTitle: null,
      searchIconShow: false,
      activityIconShow: false,
      isRegisteredPush: false
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

  it('should toggleError true', () => {
    const payload = 'Error'

    const expectedResult = state.set('toggleMessage', payload).set('toggleError', true)

    expect(bucketsReducer(state, setNetworkErrorAction(payload))).toEqual(expectedResult)
  })
})
