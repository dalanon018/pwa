
import {
  getProductAction,
  setProductAction,
  setProductHandlersDefaultAction,
  getLoyaltyTokenAction,
  setLoyaltyTokenAction
} from '../actions'
import {
  GET_PRODUCT,
  SET_PRODUCT,
  SET_PRODUCT_HANDLER_DEFAULT,

  GET_LOYALTY_TOKEN,
  SET_LOYALTY_TOKEN
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

  describe('Loyalty Token', () => {
    it('should get loyaltyToken', () => {
      const expectedResult = {
        type: GET_LOYALTY_TOKEN
      }

      expect(getLoyaltyTokenAction()).toEqual(expectedResult)
    })

    it('should set loyaltyToken', () => {
      const payload = '123312323-12123213213'
      const expectedResult = {
        type: SET_LOYALTY_TOKEN,
        payload
      }

      expect(setLoyaltyTokenAction(payload)).toEqual(expectedResult)
    })
  })
})
