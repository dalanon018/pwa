
import {
  getProductsByCategoryAction,
  setProductsByCategoryAction,
  resetProductsByCategoryAction,

  getProductsViewedAction,
  setProductsViewedAction,

  setProductsCountsAction,

  getFilterCategoryAction,
  setFilterCategoryAction
} from '../actions'

import {
  GET_PRODUCTS_CATEGORY,
  SET_PRODUCTS_CATEGORY,
  RESET_PRODUCTS_CATEGORY,

  GET_PRODUCTS_VIEWED,
  SET_PRODUCTS_VIEWED,

  SET_PRODUCTS_COUNT,

  GET_FILTER_CATEGORY,
  SET_FILTER_CATEGORY
} from '../constants'

describe('ProductsByCategory actions', () => {
  describe('Products category', () => {
    it('has a type of GET_PRODUCTS_CATEGORY', () => {
      const payload = { code: 1 }
      const expected = {
        type: GET_PRODUCTS_CATEGORY,
        payload
      }
      expect(getProductsByCategoryAction(payload)).toEqual(expected)
    })

    it('has a type of SET_PRODUCTS_CATEGORY', () => {
      const payload = [ 1, 2, 3 ]
      const expected = {
        type: SET_PRODUCTS_CATEGORY,
        payload
      }
      expect(setProductsByCategoryAction(payload)).toEqual(expected)
    })

    it('has a type of RESET_PRODUCTS_CATEGORY', () => {
      const payload = []
      const expected = {
        type: RESET_PRODUCTS_CATEGORY,
        payload
      }
      expect(resetProductsByCategoryAction(payload)).toEqual(expected)
    })
  })

  describe('Products last viewed', () => {
    it('has a type of GET_PRODUCTS_VIEWED', () => {
      const expected = {
        type: GET_PRODUCTS_VIEWED
      }
      expect(getProductsViewedAction()).toEqual(expected)
    })

    it('has a type of SET_PRODUCTS_VIEWED', () => {
      const payload = [ 1, 2, 3 ]
      const expected = {
        type: SET_PRODUCTS_VIEWED,
        payload
      }
      expect(setProductsViewedAction(payload)).toEqual(expected)
    })
  })

  describe('Filtered Categories', () => {
    it('has a type of GET_FILTER_CATEGORY', () => {
      const payload = { id: 1 }
      const expected = {
        type: GET_FILTER_CATEGORY,
        payload
      }
      expect(getFilterCategoryAction(payload)).toEqual(expected)
    })

    it('has a type of SET_FILTER_CATEGORY', () => {
      const payload = [ 1, 2, 3 ]
      const expected = {
        type: SET_FILTER_CATEGORY,
        payload
      }
      expect(setFilterCategoryAction(payload)).toEqual(expected)
    })
  })

  describe('Product counts', () => {
    it('has a type of SET_PRODUCTS_COUNT', () => {
      const payload = 10
      const expected = {
        type: SET_PRODUCTS_COUNT,
        payload
      }
      expect(setProductsCountsAction(payload)).toEqual(expected)
    })
  })
})
