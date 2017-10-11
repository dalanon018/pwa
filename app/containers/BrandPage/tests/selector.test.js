import { fromJS } from 'immutable'
import {
  selectProductsByBrands,
  selectFeaturedProducts,
  selectProductsByBrandsItems,
  selectProductsByBrandsFeatured,
  selectLazyload
} from '../selectors'

describe('productsByBrandsDomain', () => {
  describe('selectProductsByBrands', () => {
    const selector = selectProductsByBrands()

    it('should get products by brands', () => {
      const productsByBrands = fromJS([1, 2, 3, 4])
      const mockedState = fromJS({
        brandPage: {
          productsByBrands
        }
      })
      expect(selector(mockedState)).toEqual(productsByBrands)
    })
  })

  describe('selectProductsByBrandsItems', () => {
    const selector = selectProductsByBrandsItems()

    it('should get products by brands items', () => {
      const productsByBrands = fromJS([{ name: 1 }, { name: 2 }])
      const mockedState = fromJS({
        brandPage: {
          productsByBrands
        }
      })
      expect(selector(mockedState)).toEqual(productsByBrands)
    })
  })

  describe('selectProductsByBrandsFeatured', () => {
    const selector = selectProductsByBrandsFeatured()

    it('should get products by brands featured', () => {
      const productsByBrands = fromJS([{isFeatured: true}])
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
