
import {
  getProductAction,
  setProductAction,
  setProductHandlersDefaultAction,
  requestRecaptchaValidationAction,
  successRecaptchaValidationAction,
  errorRecaptchaValidationAction
} from '../actions'
import {
  GET_PRODUCT,
  SET_PRODUCT,
  SET_PRODUCT_HANDLER_DEFAULT,

  REQUEST_RECAPTCHA_VALIDATION,
  SUCCESS_RECAPTCHA_VALIDATION,
  ERROR_RECAPTCHA_VALIDATION
} from '../constants'

describe('Products actions', () => {
  describe('getProductAction', () => {
    it('has type of GET CATEGORIES', () => {
      const payload = {
        id: '0001'
      }
      const expectedResult = {
        type: GET_PRODUCT,
        payload
      }
      expect(getProductAction(payload)).toEqual(expectedResult)
    })
  })

  describe('setProductAction', () => {
    it('categories should have payload', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: SET_PRODUCT,
        payload
      }

      expect(setProductAction(payload)).toEqual(expectedResult)
    })
  })

  describe('setProductHandlersDefaultAction', () => {
    it('should have handler default payload', () => {
      const expectedResult = {
        type: SET_PRODUCT_HANDLER_DEFAULT
      }

      expect(setProductHandlersDefaultAction()).toEqual(expectedResult)
    })
  })

  describe('Recaptcha Validation Actions', () => {
    it('should Request Validation', () => {
      const expectedResult = {
        type: REQUEST_RECAPTCHA_VALIDATION
      }

      expect(requestRecaptchaValidationAction()).toEqual(expectedResult)
    })

    it('should Set Success for Recaptcha Validation', () => {
      const payload = true
      const expectedResult = {
        type: SUCCESS_RECAPTCHA_VALIDATION,
        payload
      }

      expect(successRecaptchaValidationAction(payload)).toEqual(expectedResult)
    })

    it('should Set Error for Recaptcha Validation', () => {
      const payload = 'Error on Validation'
      const expectedResult = {
        type: ERROR_RECAPTCHA_VALIDATION,
        payload
      }

      expect(errorRecaptchaValidationAction(payload)).toEqual(expectedResult)
    })
  })
})
