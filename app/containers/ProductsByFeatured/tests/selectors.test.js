import { fromJS } from 'immutable'
import {
  selectProducts,
  selectProductsViewed,
  selectLazyload,
  selectTotalCount
} from '../selectors'

describe('selectProductsByFeaturedDomain', () => {
  describe('selectProducts', () => {
    const selector = selectProducts()

    it('should get products by features', () => {
      const products = fromJS([1, 2, 3, 4])
      const mockedState = fromJS({
        productsByFeatured: {
          products
        }
      })
      expect(selector(mockedState)).toEqual(products)
    })
  })

  describe('selectProductsViewed', () => {
    const selector = selectProductsViewed()

    it('should get products last viewed', () => {
      const productsViewed = fromJS([1, 2, 3, 4])
      const mockedState = fromJS({
        productsByFeatured: {
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
        productsByFeatured: {
          lazyload
        }
      })
      expect(selector(mockedState)).toEqual(lazyload)
    })
  })

  describe('selectTotalCount', () => {
    const selector = selectTotalCount()

    it('should get totalCount of Products', () => {
      const totalCount = 10
      const mockedState = fromJS({
        productsByFeatured: {
          totalCount
        }
      })
      expect(selector(mockedState)).toEqual(totalCount)
    })
  })
})
