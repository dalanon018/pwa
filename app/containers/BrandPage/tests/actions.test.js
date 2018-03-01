
import {
  getProductsByBrandsAction,
  setProductsByBrandsAction,
  resetProductsByBrandsAction,
  setProductsCountsAction
} from '../actions'

import {
  GET_PRODUCTS_BRANDS,
  SET_PRODUCTS_BRANDS,
  RESET_PRODUCTS_BRANDS,
  SET_PRODUCTS_COUNT
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

    it('has a type of SET_PRODUCTS_COUNT', () => {
      const payload = 0
      const expected = {
        type: SET_PRODUCTS_COUNT,
        payload
      }
      expect(setProductsCountsAction(payload)).toEqual(expected)
    })
  })
})
