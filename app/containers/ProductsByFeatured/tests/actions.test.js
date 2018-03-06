
import {
  getProductsByFeaturedAction,
  setProductsByFeaturedAction,
  resetProductsByFeaturedAction,

  getProductsViewedAction,
  setProductsViewedAction,

  setProductsCountsAction
} from '../actions'

import {
  GET_PRODUCTS_FEATURED,
  SET_PRODUCTS_FEATURED,
  RESET_PRODUCTS_FEATURED,

  GET_PRODUCTS_VIEWED,
  SET_PRODUCTS_VIEWED,

  SET_PRODUCTS_COUNT
} from '../constants'

describe('ProductsByFeatured actions', () => {
  describe('Products category', () => {
    it('has a type of GET_PRODUCTS_FEATURED', () => {
      const payload = { code: 1 }
      const expected = {
        type: GET_PRODUCTS_FEATURED,
        payload
      }
      expect(getProductsByFeaturedAction(payload)).toEqual(expected)
    })

    it('has a type of SET_PRODUCTS_FEATURED', () => {
      const payload = [ 1, 2, 3 ]
      const expected = {
        type: SET_PRODUCTS_FEATURED,
        payload
      }
      expect(setProductsByFeaturedAction(payload)).toEqual(expected)
    })

    it('has a type of RESET_PRODUCTS_FEATURED', () => {
      const payload = []
      const expected = {
        type: RESET_PRODUCTS_FEATURED,
        payload
      }
      expect(resetProductsByFeaturedAction(payload)).toEqual(expected)
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
