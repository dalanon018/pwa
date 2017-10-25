import { fromJS } from 'immutable'

import {
  selectProduct,
  selectProductSuccess,
  selectProductError,
  selectRecaptchaValidationSuccess,
  selectRecaptchaValidationError,
  selectSubmissionLoader
} from '../selectors'

describe('Product Selectors', () => {
  describe('selectProduct', () => {
    const selectProductSelectors = selectProduct()

    it('should get product', () => {
      const product = fromJS({
        title: 'title1',
        description: 'lorem ipsum'
      })
      const mockedState = fromJS({
        productPage: {
          product
        }
      })
      expect(selectProductSelectors(mockedState)).toEqual(product)
    })
  })

  describe('selectProductSuccess', () => {
    const selectProductSuccessSelectors = selectProductSuccess()

    it('should get success submission', () => {
      const requestProductSuccess = true
      const mockedState = fromJS({
        productPage: {
          requestProductSuccess
        }
      })
      expect(selectProductSuccessSelectors(mockedState)).toEqual(requestProductSuccess)
    })
  })

  describe('selectProductError', () => {
    const selectProductErrorSelectors = selectProductError()

    it('should get error submission', () => {
      const requestProductError = false
      const mockedState = fromJS({
        productPage: {
          requestProductError
        }
      })
      expect(selectProductErrorSelectors(mockedState)).toEqual(requestProductError)
    })
  })

  describe('selectRecaptchaValidationSuccess', () => {
    const selectRecaptchaValidationSuccessSelectors = selectRecaptchaValidationSuccess()

    it('should get error submission', () => {
      const recaptchaValidationSuccess = true
      const mockedState = fromJS({
        productPage: {
          recaptchaValidationSuccess
        }
      })
      expect(selectRecaptchaValidationSuccessSelectors(mockedState)).toEqual(recaptchaValidationSuccess)
    })
  })

  describe('selectRecaptchaValidationError', () => {
    const selectRecaptchaValidationErrorSelectors = selectRecaptchaValidationError()

    it('should get error submission', () => {
      const recaptchaValidationError = 'Error on validation'
      const mockedState = fromJS({
        productPage: {
          recaptchaValidationError
        }
      })
      expect(selectRecaptchaValidationErrorSelectors(mockedState)).toEqual(recaptchaValidationError)
    })
  })

  describe('selectSubmissionLoader', () => {
    const selectSubmissionLoaderSelectors = selectSubmissionLoader()

    it('should get error submission', () => {
      const submissionLoader = false
      const mockedState = fromJS({
        productPage: {
          submissionLoader
        }
      })
      expect(selectSubmissionLoaderSelectors(mockedState)).toEqual(submissionLoader)
    })
  })
})
