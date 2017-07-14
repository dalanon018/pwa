
import {
  getProductCategoriesAction,
  setProductCategoriesAction
} from '../actions'
import {
  GET_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES
} from '../constants'

describe('Buckets actions', () => {
  describe('getCategories', () => {
    it('has type of GET CATEGORIES', () => {
      const expectedResult = {
        type: GET_PRODUCT_CATEGORIES
      }
      expect(getProductCategoriesAction()).toEqual(expectedResult)
    })
  })

  describe('SetCategories', () => {
    it('categories should have payload', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: SET_PRODUCT_CATEGORIES,
        payload
      }

      expect(setProductCategoriesAction(payload)).toEqual(expectedResult)
    })
  })
})
