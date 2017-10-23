import { fromJS } from 'immutable'

import {
  selectProduct,
  selectProductSuccess,
  selectProductError,
  selectLoyaltyToken
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

  describe('selectLoyaltyToken', () => {
    const selectLoyaltyTokenSelectors = selectLoyaltyToken()

    it('should get error submission', () => {
      const loyaltyToken = '12313-123123213-1231321-12321'
      const mockedState = fromJS({
        productPage: {
          loyaltyToken
        }
      })
      expect(selectLoyaltyTokenSelectors(mockedState)).toEqual(loyaltyToken)
    })
  })
})
