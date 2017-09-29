import { fromJS } from 'immutable'

import {
  selectFeaturedProducts,
  selectProductsLoading,

  selectFeaturedCategories,
  selectCategoriesLoading,

  selectFeaturedBrands,
  selectBrandsLoading
} from '../selectors'

describe('Home Selectors', () => {
  describe('selectFeaturedProducts', () => {
    const selectFeaturedProductsSelectors = selectFeaturedProducts()

    it('should get products', () => {
      const featuredProducts = fromJS(['product1', 'product2', 'product3'])
      const mockedState = fromJS({
        homePage: {
          featuredProducts
        }
      })
      expect(selectFeaturedProductsSelectors(mockedState)).toEqual(featuredProducts)
    })
  })

  describe('selectProductsLoading', () => {
    const selectProductsLoadingSelectors = selectProductsLoading()

    it('should get product loader', () => {
      const productsLoading = true
      const mockedState = fromJS({
        homePage: {
          productsLoading
        }
      })
      expect(selectProductsLoadingSelectors(mockedState)).toEqual(productsLoading)
    })
  })

  describe('selectFeaturedCategories', () => {
    const selectFeaturedCategoriesSelectors = selectFeaturedCategories()

    it('should get updated reciepts', () => {
      const featuredCategories = fromJS(['category1', 'category2', 'category3'])
      const mockedState = fromJS({
        homePage: {
          featuredCategories
        }
      })
      expect(selectFeaturedCategoriesSelectors(mockedState)).toEqual(featuredCategories)
    })
  })

  describe('selectCategoriesLoading', () => {
    const selectCategoriesLoadingSelectors = selectCategoriesLoading()

    it('should get updated toggleError', () => {
      const categoriesLoading = true
      const mockedState = fromJS({
        homePage: {
          categoriesLoading
        }
      })
      expect(selectCategoriesLoadingSelectors(mockedState)).toEqual(categoriesLoading)
    })
  })

  describe('selectFeaturedBrands', () => {
    const selectFeaturedBrandsSelectors = selectFeaturedBrands()

    it('should get updated toggleMessage', () => {
      const featuredBrands = fromJS(['brand1', 'brand2', 'brand3'])
      const mockedState = fromJS({
        homePage: {
          featuredBrands
        }
      })
      expect(selectFeaturedBrandsSelectors(mockedState)).toEqual(featuredBrands)
    })
  })

  describe('selectBrandsLoading', () => {
    const selectBrandsLoadingSelectors = selectBrandsLoading()

    it('should get updated toggleError', () => {
      const brandsLoading = true
      const mockedState = fromJS({
        homePage: {
          brandsLoading
        }
      })
      expect(selectBrandsLoadingSelectors(mockedState)).toEqual(brandsLoading)
    })
  })
})
