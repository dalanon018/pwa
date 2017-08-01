
import {
  getProductCategoriesAction,
  setProductCategoriesAction,

  getMobileNumbersAction,
  setMobileNumbersAction
} from '../actions'

import {
  GET_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES,

  GET_MOBILE_NUMBERS,
  SET_MOBILE_NUMBERS
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

  describe('getMobileNumbers', () => {
    it('should request mobile numbers', () => {
      const expectedResult = {
        type: GET_MOBILE_NUMBERS
      }

      expect(getMobileNumbersAction()).toEqual(expectedResult)
    })
  })

  describe('setMobileNumbers', () => {
    it('should request mobile numbers', () => {
      const payload = ['99999999', '8888888', '77777777']
      const expectedResult = {
        type: SET_MOBILE_NUMBERS,
        payload
      }

      expect(setMobileNumbersAction(payload)).toEqual(expectedResult)
    })
  })
})
