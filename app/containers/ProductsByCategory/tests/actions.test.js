
import {
  getProductsByCategoryAction,
  setProductsByCategoryAction
} from '../actions'
import {
  GET_PRODUCTS_CATEGORY,
  SET_PRODUCTS_CATEGORY
} from '../constants'

describe('ProductsByCategory actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_PRODUCTS_CATEGORY', () => {
      const expected = {
        type: GET_PRODUCTS_CATEGORY
      }
      expect(getProductsByCategoryAction()).toEqual(expected)
    })

    it('has a type of SET_PRODUCTS_CATEGORY', () => {
      const expected = {
        type: SET_PRODUCTS_CATEGORY
      }
      expect(setProductsByCategoryAction()).toEqual(expected)
    })
  })
})
