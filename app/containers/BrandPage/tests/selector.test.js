import { fromJS } from 'immutable'
import {
  selectProductsByBrands,
  selectFeaturedProducts,
  selectLazyload
} from '../selectors'

describe('productsByBrandsDomain', () => {
  describe('selectProductsByBrands', () => {
    const selector = selectProductsByBrands()

    it('should get products by categories', () => {
      const productsByBrands = fromJS([1, 2, 3, 4])
      const mockedState = fromJS({
        brandPage: {
          productsByBrands
        }
      })
      expect(selector(mockedState)).toEqual(productsByBrands)
    })
  })

  describe('selectLazyload', () => {
    const selector = selectLazyload()

    it('should get lazyload', () => {
      const lazyload = false
      const mockedState = fromJS({
        brandPage: {
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
        brandPage: {
          productsFeatured
        }
      })
      expect(selector(mockedState)).toEqual(productsFeatured)
    })
  })
})
