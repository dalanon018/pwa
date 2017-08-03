import { fromJS } from 'immutable'
import {
  selectProductsByCategory,
  selectProductsViewed
} from '../selectors'

describe('makeSelectProductsByCategoryDomain', () => {
  describe('selectProductsByCategory', () => {
    const selector = selectProductsByCategory()

    it('should get products by categories', () => {
      const productsByCategory = fromJS([1, 2, 3, 4])
      const mockedState = fromJS({
        productsByCategory: {
          productsByCategory
        }
      })
      expect(selector(mockedState)).toEqual(productsByCategory)
    })
  })

  describe('selectProductsViewed', () => {
    const selector = selectProductsViewed()

    it('should get products last viewed', () => {
      const productsViewed = fromJS([1, 2, 3, 4])
      const mockedState = fromJS({
        productsByCategory: {
          productsViewed
        }
      })
      expect(selector(mockedState)).toEqual(productsViewed)
    })
  })
})
