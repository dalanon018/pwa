import { fromJS } from 'immutable'

import {
  selectMobileNumbers,

  selectMarkdown,
  selectLoadingMarkdown,

  selectMobileRegistrationSuccess,
  selectMobileRegistrationError,

  selectVerificationCodeSuccess,
  selectVerificationCodeError,

  selectRecaptchaValidationSuccess,
  selectRecaptchaValidationError,

  selectSubmissionLoader
} from '../selectors'

describe('LoginPage Selectors', () => {
  describe('selectMobileNumbers', () => {
    const selectMobileNumbersSelectors = selectMobileNumbers()

    it('should get mobile numbers', () => {
      const mobileNumbers = fromJS([1, 2, 3])
      const mockedState = fromJS({
        loginPage: {
          mobileNumbers
        }
      })
      expect(selectMobileNumbersSelectors(mockedState)).toEqual(mobileNumbers)
    })
  })

  describe('selectMarkdown', () => {
    const selectMarkdownSelectors = selectMarkdown()

    it('should get markdown', () => {
      const markdown = 'html'
      const mockedState = fromJS({
        loginPage: {
          markdown
        }
      })
      expect(selectMarkdownSelectors(mockedState)).toEqual(markdown)
    })
  })

  describe('selectLoadingMarkdown', () => {
    const selectLoadingMarkdownSelectors = selectLoadingMarkdown()

    it('should get loading markdown', () => {
      const loadingMarkdown = false
      const mockedState = fromJS({
        loginPage: {
          loadingMarkdown
        }
      })
      expect(selectLoadingMarkdownSelectors(mockedState)).toEqual(loadingMarkdown)
    })
  })

  describe('selectMobileRegistrationSuccess', () => {
    const selectMobileRegistrationSuccessSelectors = selectMobileRegistrationSuccess()

    it('should get mobileRegistrationSuccess', () => {
      const mobileRegistrationSuccess = false
      const mockedState = fromJS({
        loginPage: {
          mobileRegistrationSuccess
        }
      })
      expect(selectMobileRegistrationSuccessSelectors(mockedState)).toEqual(mobileRegistrationSuccess)
    })
  })

  describe('selectMobileRegistrationError', () => {
    const selectMobileRegistrationErrorSelectors = selectMobileRegistrationError()

    it('should get mobileRegistrationError', () => {
      const mobileRegistrationError = false
      const mockedState = fromJS({
        loginPage: {
          mobileRegistrationError
        }
      })
      expect(selectMobileRegistrationErrorSelectors(mockedState)).toEqual(mobileRegistrationError)
    })
  })

  describe('selectVerificationCodeSuccess', () => {
    const selectVerificationCodeSuccessSelectors = selectVerificationCodeSuccess()

    it('should get loading verificationCodeSuccess', () => {
      const verificationCodeSuccess = false
      const mockedState = fromJS({
        loginPage: {
          verificationCodeSuccess
        }
      })
      expect(selectVerificationCodeSuccessSelectors(mockedState)).toEqual(verificationCodeSuccess)
    })
  })

  describe('selectVerificationCodeError', () => {
    const selectVerificationCodeErrorSelectors = selectVerificationCodeError()

    it('should get loading verificationCodeError', () => {
      const verificationCodeError = false
      const mockedState = fromJS({
        loginPage: {
          verificationCodeError
        }
      })
      expect(selectVerificationCodeErrorSelectors(mockedState)).toEqual(verificationCodeError)
    })
  })

  describe('selectRecaptchaValidationSuccess', () => {
    const selectRecaptchaValidationSuccessSelectors = selectRecaptchaValidationSuccess()

    it('should get loading recaptchaValidationSuccess', () => {
      const recaptchaValidationSuccess = false
      const mockedState = fromJS({
        loginPage: {
          recaptchaValidationSuccess
        }
      })
      expect(selectRecaptchaValidationSuccessSelectors(mockedState)).toEqual(recaptchaValidationSuccess)
    })
  })

  describe('selectRecaptchaValidationError', () => {
    const selectRecaptchaValidationErrorSelectors = selectRecaptchaValidationError()

    it('should get loading recaptchaValidationError', () => {
      const recaptchaValidationError = false
      const mockedState = fromJS({
        loginPage: {
          recaptchaValidationError
        }
      })
      expect(selectRecaptchaValidationErrorSelectors(mockedState)).toEqual(recaptchaValidationError)
    })
  })

  describe('selectSubmissionLoader', () => {
    const selectSubmissionLoaderSelectors = selectSubmissionLoader()

    it('should get loading submissionLoader', () => {
      const submissionLoader = false
      const mockedState = fromJS({
        loginPage: {
          submissionLoader
        }
      })
      expect(selectSubmissionLoaderSelectors(mockedState)).toEqual(submissionLoader)
    })
  })
})
