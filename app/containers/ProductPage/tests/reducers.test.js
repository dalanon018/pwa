
import productsReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setProductAction,
  setProductHandlersDefaultAction
} from '../actions'

describe('Products Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      product: {},
      loading: false,
      mobileNumbers: [],
      requestProductSuccess: false,
      requestProductError: false,
      currentProduct: {},
      markdown: '',
      loadingMarkdown: false,
      mobileRegistrationSuccess: false,
      mobileRegistrationError: null,
      verificationCode: false,
      verificationCodeSuccess: false,
      verificationCodeError: null,
      toggle: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productsReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update categories', () => {
    const payload = fromJS({
      title: 'title1',
      description: 'lorem ipsum'
    })

    const expectedResult = state.set('product', payload)

    expect(productsReducer(state, setProductAction(payload))).toEqual(expectedResult)
  })

  it('should reset the handlers to default success = false, error = false', () => {
    const expectedResult = state
                            .set('requestProductSuccess', false)
                            .set('requestProductError', false)

    expect(productsReducer(state, setProductHandlersDefaultAction())).toEqual(expectedResult)
  })
})
