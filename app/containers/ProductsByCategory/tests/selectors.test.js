import { fromJS } from 'immutable'
import {
  selectProductsByCategory,
  selectProductsByCategoryItems,
  selectProductsByCategoryFeatured,
  selectProductsViewed,
  selectLazyload,
  selectTotalCount,
  selectFilterCategories,
  selectFilterCategoriesLoading,
  selectFilterBrands,
  selectFilterBrandsLoading
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

  describe('selectProductsByCategoryItems', () => {
    const selector = selectProductsByCategoryItems()

    it('should get products by categories items', () => {
      const productsByCategory = fromJS([{ name: 1 }, { name: 2 }])
      const mockedState = fromJS({
        productsByCategory: {
          productsByCategory
        }
      })
      expect(selector(mockedState)).toEqual(productsByCategory)
    })
  })

  describe('selectProductsByCategoryFeatured', () => {
    const selector = selectProductsByCategoryFeatured()

    it('should get products by categories featured', () => {
      const productsByCategory = fromJS([{ isFeatured: true }])
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

  describe('selectTotalCount', () => {
    const selector = selectTotalCount()

    it('should get totalCount of Products', () => {
      const totalCount = 10
      const mockedState = fromJS({
        productsByCategory: {
          totalCount
        }
      })
      expect(selector(mockedState)).toEqual(totalCount)
    })
  })

  describe('selectFilterCategories', () => {
    const selector = selectFilterCategories()

    it('should get filtered categories', () => {
      const filterCategories = fromJS([1, 2, 3, 4])
      const mockedState = fromJS({
        productsByCategory: {
          filterCategories
        }
      })
      expect(selector(mockedState)).toEqual(filterCategories)
    })
  })

  describe('selectFilterCategoriesLoading', () => {
    const selector = selectFilterCategoriesLoading()

    it('should get if filtering is loading', () => {
      const filterCategoriesLoading = false
      const mockedState = fromJS({
        productsByCategory: {
          filterCategoriesLoading
        }
      })
      expect(selector(mockedState)).toEqual(filterCategoriesLoading)
    })
  })

  describe('selectFilterBrands', () => {
    const selector = selectFilterBrands()

    it('should get filtered Brands', () => {
      const filterBrands = fromJS([1, 2, 3, 4])
      const mockedState = fromJS({
        productsByCategory: {
          filterBrands
        }
      })
      expect(selector(mockedState)).toEqual(filterBrands)
    })
  })

  describe('selectFilterBrandsLoading', () => {
    const selector = selectFilterBrandsLoading()

    it('should get if filtering is loading', () => {
      const filterBrandsLoading = false
      const mockedState = fromJS({
        productsByCategory: {
          filterBrandsLoading
        }
      })
      expect(selector(mockedState)).toEqual(filterBrandsLoading)
    })
  })
})
