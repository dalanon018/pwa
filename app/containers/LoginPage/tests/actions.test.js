
import {
  isLoginAction,

  resetSubmissionAction,

  getMobileNumbersAction,
  updateMobileNumbersAction,
  setMobileNumbersAction,

  requestMobileRegistrationAction,
  successMobileRegistrationAction,
  errorMobileRegistrationAction,

  getMarkDownAction,
  setMarkDownAction,

  requestVerificationCodeAction,
  successVerificationCodeAction,
  errorVerificationCodeAction,
  setVerificationCodeAction,

  requestRecaptchaValidationAction,
  successRecaptchaValidationAction,
  errorRecaptchaValidationAction
} from '../actions'
import {
  IS_LOGIN,

  GET_MOBILE_NUMBERS,
  UPDATE_MOBILE_NUMBERS,
  SET_MOBILE_NUMBERS,

  GET_MARKDOWN,
  SET_MARKDOWN,

  REQUEST_MOBILE_REGISTRATION,
  SUCCESS_MOBILE_REGISTRATION,
  ERROR_MOBILE_REGISTRATION,

  SET_VERIFICATION_CODE,

  REQUEST_VERIFICATION_CODE,
  SUCCESS_VERIFICATION_CODE,
  ERROR_VERIFICATION_CODE,

  REQUEST_RECAPTCHA_VALIDATION,
  SUCCESS_RECAPTCHA_VALIDATION,
  ERROR_RECAPTCHA_VALIDATION,

  RESET_SUBMISSION
} from '../constants'

describe('LoginPage Actions', () => {
  describe('isLoginAction', () => {
    it('should check if Login', () => {
      const expectedResult = {
        type: IS_LOGIN
      }
      expect(isLoginAction()).toEqual(expectedResult)
    })
  })

  describe('resetSubmissionAction', () => {
    it('should Reset Submission', () => {
      const expectedResult = {
        type: RESET_SUBMISSION
      }

      expect(resetSubmissionAction()).toEqual(expectedResult)
    })
  })

  describe('Mobile Number Actions', () => {
    it('should get mobile numbers', () => {
      const expectedResult = {
        type: GET_MOBILE_NUMBERS
      }

      expect(getMobileNumbersAction()).toEqual(expectedResult)
    })

    it('should update mobile numbers', () => {
      const payload = '123456789'
      const expectedResult = {
        type: UPDATE_MOBILE_NUMBERS,
        payload
      }

      expect(updateMobileNumbersAction(payload)).toEqual(expectedResult)
    })

    it('should set mobile numbers', () => {
      const payload = '123456789'
      const expectedResult = {
        type: SET_MOBILE_NUMBERS,
        payload
      }

      expect(setMobileNumbersAction(payload)).toEqual(expectedResult)
    })
  })

  describe('Mobile Registration Actions', () => {
    it('should request mobile registration', () => {
      const payload = '123456789'
      const expectedResult = {
        type: REQUEST_MOBILE_REGISTRATION,
        payload
      }

      expect(requestMobileRegistrationAction(payload)).toEqual(expectedResult)
    })

    it('should set successfully on mobile registration', () => {
      const expectedResult = {
        type: SUCCESS_MOBILE_REGISTRATION
      }

      expect(successMobileRegistrationAction()).toEqual(expectedResult)
    })

    it('should set error on mobile registration', () => {
      const payload = 'error'
      const expectedResult = {
        type: ERROR_MOBILE_REGISTRATION,
        payload
      }

      expect(errorMobileRegistrationAction(payload)).toEqual(expectedResult)
    })
  })

  describe('Markdown Actions', () => {
    it('should get markdown', () => {
      const expectedResult = {
        type: GET_MARKDOWN
      }

      expect(getMarkDownAction()).toEqual(expectedResult)
    })

    it('should set markdown', () => {
      const payload = 'html'
      const expectedResult = {
        type: SET_MARKDOWN,
        payload
      }

      expect(setMarkDownAction(payload)).toEqual(expectedResult)
    })
  })

  describe('Verification Code  Actions', () => {
    it('should request verification code', () => {
      const payload = '123456789'
      const expectedResult = {
        type: REQUEST_VERIFICATION_CODE,
        payload
      }

      expect(requestVerificationCodeAction(payload)).toEqual(expectedResult)
    })

    it('should set successfully on verification code', () => {
      const expectedResult = {
        type: SUCCESS_VERIFICATION_CODE
      }

      expect(successVerificationCodeAction()).toEqual(expectedResult)
    })

    it('should set error on verification code', () => {
      const payload = 'error'
      const expectedResult = {
        type: ERROR_VERIFICATION_CODE,
        payload
      }

      expect(errorVerificationCodeAction(payload)).toEqual(expectedResult)
    })

    it('should set verification code', () => {
      const payload = '1234'
      const expectedResult = {
        type: SET_VERIFICATION_CODE,
        payload
      }

      expect(setVerificationCodeAction(payload)).toEqual(expectedResult)
    })
  })

  describe('Recaptcha  Actions', () => {
    it('should request recaptcha', () => {
      const payload = '123456789'
      const expectedResult = {
        type: REQUEST_RECAPTCHA_VALIDATION,
        payload
      }

      expect(requestRecaptchaValidationAction(payload)).toEqual(expectedResult)
    })

    it('should set successfully on recaptcha', () => {
      const payload = 'success'
      const expectedResult = {
        type: SUCCESS_RECAPTCHA_VALIDATION,
        payload
      }

      expect(successRecaptchaValidationAction(payload)).toEqual(expectedResult)
    })

    it('should set error on recaptcha', () => {
      const payload = 'error'
      const expectedResult = {
        type: ERROR_RECAPTCHA_VALIDATION,
        payload
      }

      expect(errorRecaptchaValidationAction(payload)).toEqual(expectedResult)
    })
  })
})
