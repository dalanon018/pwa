import { fromJS } from 'immutable'

import {
  selectSearchProductLoading,
  selectSearchProduct
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
})
