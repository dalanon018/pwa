import { fromJS } from 'immutable'
import {
  selectProductsByCategory,
  selectProductsViewed,
  selectLazyload,
  selectFeaturedProducts
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

  describe('selectLazyload', () => {
    const selector = selectLazyload()

    it('should get lazyload', () => {
      const lazyload = false
      const mockedState = fromJS({
        productsByCategory: {
          lazyload
        }
      })
      expect(selector(mockedState)).toEqual(lazyload)
    })
  })

  describe('selectFeaturedProducts', () => {
    const selector = selectFeaturedProducts()

    it('should get productsFeatured', () => {
      const productsFeatured = fromJS([1, 2, 3])
      const mockedState = fromJS({
        productsByCategory: {
          productsFeatured
        }
      })
      expect(selector(mockedState)).toEqual(productsFeatured)
    })
  })
})
