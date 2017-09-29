
import {
  getFeaturedProductsAction,
  setFeaturedProductsAction,

  getFeaturedCategoriesAction,
  setFeaturedCategoriesAction,

  getFeaturedBrandsAction,
  setFeaturedBrandsAction
} from '../actions'

import {
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS,

  GET_FEATURED_CATEGORIES,
  SET_FEATURED_CATEGORIES,

  GET_FEATURED_BRANDS,
  SET_FEATURED_BRANDS
} from '../constants'

describe('Home actions', () => {
  describe('getFeaturedProductsAction', () => {
    it('should get feature products', () => {
      const expectedResult = {
        type: GET_FEATURED_PRODUCTS
      }

      expect(getFeaturedProductsAction()).toEqual(expectedResult)
    })
  })

  describe('setFeaturedProductsAction', () => {
    it('should get feature products', () => {
      const payload = ['product1', 'product2', 'product3']
      const expectedResult = {
        type: SET_FEATURED_PRODUCTS,
        payload
      }

      expect(setFeaturedProductsAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getFeaturedCategoriesAction', () => {
    it('should get featured categories', () => {
      const expectedResult = {
        type: GET_FEATURED_CATEGORIES
      }

      expect(getFeaturedCategoriesAction()).toEqual(expectedResult)
    })
  })

  describe('setFeaturedCategoriesAction', () => {
    it('should update featured categories', () => {
      const payload = ['category1', 'category2', 'category3']
      const expectedResult = {
        type: SET_FEATURED_CATEGORIES,
        payload
      }

      expect(setFeaturedCategoriesAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getFeaturedBrandsAction', () => {
    it('should update featured brands', () => {
      const expectedResult = {
        type: GET_FEATURED_BRANDS
      }

      expect(getFeaturedBrandsAction()).toEqual(expectedResult)
    })
  })

  describe('setFeaturedBrandsAction', () => {
    it('should update featured brands', () => {
      const payload = ['brands1', 'brands2', 'brands3']
      const expectedResult = {
        type: SET_FEATURED_BRANDS,
        payload
      }

      expect(setFeaturedBrandsAction(payload)).toEqual(expectedResult)
    })
  })
})
