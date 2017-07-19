import { fromJS } from 'immutable'

import {
  selectProduct
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
})
