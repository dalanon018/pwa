
import loginPageReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setMobileNumbersAction,
  setMarkDownAction,
  requestMobileRegistrationAction,
  successMobileRegistrationAction
} from '../actions'

describe('LoginPage Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      mobileNumbers: [],
      submissionLoader: false, // this will simply check if we are submitting through api
      markdown: '',
      loadingMarkdown: false,
      mobileRegistrationSuccess: false,
      mobileRegistrationError: null,
      verificationCode: false,
      verificationCodeSuccess: false,
      verificationCodeError: null,
      recaptchaValidationSuccess: null,
      recaptchaValidationError: null
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(loginPageReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update the mobile number', () => {
    const payload = [1, 2, 3]
    const expectedResult = state.set('mobileNumbers', fromJS(payload))

    expect(loginPageReducer(undefined, setMobileNumbersAction(payload))).toEqual(expectedResult)
  })

  it('should update the markdown instance', () => {
    const payload = 'html'
    const expectedResult = state.set('markdown', fromJS(payload))

    expect(loginPageReducer(undefined, setMarkDownAction(payload))).toEqual(expectedResult)
  })

  it('should update submissionLoader to true if requestMobileRegistrationAction', () => {
    const payload = '123456789'
    const expectedResult = state.set('submissionLoader', true)

    expect(loginPageReducer(undefined, requestMobileRegistrationAction(payload))).toEqual(expectedResult)
  })

  it('should update submissionLoader to false if successMobileRegistrationAction', () => {
    const expectedResult = state
    .set('submissionLoader', false)
    .set('mobileRegistrationSuccess', true)

    expect(loginPageReducer(undefined, successMobileRegistrationAction())).toEqual(expectedResult)
  })
})
