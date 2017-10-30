
import {
  getProductAction,
  setProductAction,
  setProductHandlersDefaultAction
} from '../actions'
import {
  GET_PRODUCT,
  SET_PRODUCT,
  SET_PRODUCT_HANDLER_DEFAULT
} from '../constants'

describe('Products actions', () => {
  describe('getProductAction', () => {
    it('has type of GET CATEGORIES', () => {
      const payload = {
        id: '0001'
      }
      const expectedResult = {
        type: GET_PRODUCT,
        payload
      }
      expect(getProductAction(payload)).toEqual(expectedResult)
    })
  })

  describe('setProductAction', () => {
    it('categories should have payload', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: SET_PRODUCT,
        payload
      }

      expect(setProductAction(payload)).toEqual(expectedResult)
    })
  })

  describe('setProductHandlersDefaultAction', () => {
    it('should have handler default payload', () => {
      const expectedResult = {
        type: SET_PRODUCT_HANDLER_DEFAULT
      }

      expect(setProductHandlersDefaultAction()).toEqual(expectedResult)
    })
  })
})
