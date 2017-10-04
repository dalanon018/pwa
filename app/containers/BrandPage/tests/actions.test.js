
import {
  getProductsByBrandsAction,
  setProductsByBrandsAction,
  resetProductsByBrandsAction,

  getFeaturedProductsAction,
  setFeaturedProductsAction
} from '../actions'

import {
  GET_PRODUCTS_BRANDS,
  SET_PRODUCTS_BRANDS,
  RESET_PRODUCTS_BRANDS,

  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS
} from '../constants'

describe('Brands actions', () => {
  describe('Products Brands', () => {
    it('has a type of GET_PRODUCTS_BRANDS', () => {
      const payload = { id: 1 }
      const expected = {
        type: GET_PRODUCTS_BRANDS,
        payload
      }
      expect(getProductsByBrandsAction(payload)).toEqual(expected)
    })

    it('has a type of SET_PRODUCTS_BRANDS', () => {
      const payload = [ 1, 2, 3 ]
      const expected = {
        type: SET_PRODUCTS_BRANDS,
        payload
      }
      expect(setProductsByBrandsAction(payload)).toEqual(expected)
    })

    it('has a type of RESET_PRODUCTS_BRANDS', () => {
      const payload = []
      const expected = {
        type: RESET_PRODUCTS_BRANDS,
        payload
      }
      expect(resetProductsByBrandsAction(payload)).toEqual(expected)
    })
  })

  describe('Products get Features', () => {
    it('has a type of GET_FEATURED_PRODUCTS', () => {
      const expected = {
        type: GET_FEATURED_PRODUCTS
      }
      expect(getFeaturedProductsAction()).toEqual(expected)
    })

    it('has a type of SET_FEATURED_PRODUCTS', () => {
      const payload = [ 1, 2, 3 ]
      const expected = {
        type: SET_FEATURED_PRODUCTS,
        payload
      }
      expect(setFeaturedProductsAction(payload)).toEqual(expected)
    })
  })
})
