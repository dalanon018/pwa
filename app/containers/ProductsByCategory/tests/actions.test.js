
import {
  getProductsByCategoryAction,
  setProductsByCategoryAction,

  getProductsByTagsAction,

  getProductsViewedAction,
  setProductsViewedAction
} from '../actions'

import {
  GET_PRODUCTS_CATEGORY,
  SET_PRODUCTS_CATEGORY,

  GET_TAGS_PRODUCTS,

  GET_PRODUCTS_VIEWED,
  SET_PRODUCTS_VIEWED
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
  })

  describe('Products by Tags', () => {
    it('has a type of GET_TAGS_PRODUCTS', () => {
      const payload = 'featured'
      const expected = {
        type: GET_TAGS_PRODUCTS,
        payload
      }
      expect(getProductsByTagsAction(payload)).toEqual(expected)
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
})
