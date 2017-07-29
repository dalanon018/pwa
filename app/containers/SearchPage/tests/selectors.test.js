import { fromJS } from 'immutable'

import {
  selectSearchProductLoading,
  selectSearchProduct,
  selectProductSuccess,
  selectProductError
} from '../selectors'

describe('Buckets Selectors', () => {
  describe('selectSearchProductLoading', () => {
    const selectSearchProductLoadingSelectors = selectSearchProductLoading()

    it('should be loading', () => {
      const loading = true
      const mockedState = fromJS({
        searchPage: {
          loading
        }
      })
      expect(selectSearchProductLoadingSelectors(mockedState)).toEqual(loading)
    })
  })

  describe('selectSearchProduct', () => {
    const selectSearchProductSelectors = selectSearchProduct()

    it('should select product', () => {
      const product = fromJS({
        name: 'Test 1',
        product_id: '0001'
      })

      const mockedState = fromJS({
        searchPage: {
          product
        }
      })
      expect(selectSearchProductSelectors(mockedState)).toEqual(product)
    })
  })

  describe('selectProductSuccess', () => {
    const selectProductSuccessSelectors = selectProductSuccess()

    it('should get success submission', () => {
      const requestProductSuccess = true
      const mockedState = fromJS({
        searchPage: {
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
        searchPage: {
          requestProductError
        }
      })
      expect(selectProductErrorSelectors(mockedState)).toEqual(requestProductError)
    })
  })
})
