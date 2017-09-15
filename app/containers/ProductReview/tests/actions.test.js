
import {
 getOrderProductAction,
 setOrderProductAction,
 getMobileNumberAction,
 setMobileNumberAction,
 submitOrderAction,
 successOrderAction,
 errorOrderAction,
 getStoreAction,
 setStoreAction,
 storeLocatorAction
} from '../actions'

import {
  GET_ORDER_PRODUCT,
  SET_ORDER_PRODUCT,

  GET_MOBILE_NUMBER,
  SET_MOBILE_NUMBER,

  ORDER_SUBMIT,
  ORDER_SUCCESS,
  ORDER_ERROR,

  GET_STORE,
  SET_STORE,
  STORE_LOCATOR
} from '../constants'

describe('ProductsReview actions', () => {
  describe('getOrderProductAction', () => {
    it('should get product', () => {
      const expectedResult = {
        type: GET_ORDER_PRODUCT
      }
      expect(getOrderProductAction()).toEqual(expectedResult)
    })
  })

  describe('setOrderProductAction', () => {
    it('should set product', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: SET_ORDER_PRODUCT,
        payload
      }

      expect(setOrderProductAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getMobileNumberAction', () => {
    it('should get mobile numbers', () => {
      const expectedResult = {
        type: GET_MOBILE_NUMBER
      }
      expect(getMobileNumberAction()).toEqual(expectedResult)
    })
  })

  describe('setMobileNumberAction', () => {
    it('should set product', () => {
      const payload = '99999999'
      const expectedResult = {
        type: SET_MOBILE_NUMBER,
        payload
      }

      expect(setMobileNumberAction(payload)).toEqual(expectedResult)
    })
  })

  describe('submitOrderAction', () => {
    it('should submit order', () => {
      const payload = {
        product: {
          id: '00001'
        },
        mobileNumber: '999999999',
        modePayment: 'COD'
      }
      const expectedResult = {
        type: ORDER_SUBMIT,
        payload
      }

      expect(submitOrderAction(payload)).toEqual(expectedResult)
    })
  })

  describe('successOrderAction', () => {
    it('successfully submitted action', () => {
      const payload = {
        currency: 'COD',
        amount: 400,
        quantity: 1,
        status: 'DELIVERED TO WAREHOUSE',
        name: 'test',
        mobileNumber: 9999999
      }
      const expectedResult = {
        type: ORDER_SUCCESS,
        payload
      }

      expect(successOrderAction(payload)).toEqual(expectedResult)
    })
  })

  describe('errorOrderAction', () => {
    it('fail submission action', () => {
      const payload = {
        error: true
      }
      const expectedResult = {
        type: ORDER_ERROR,
        payload
      }

      expect(errorOrderAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getStoreAction', () => {
    it('get Previous Store', () => {
      const expectedResult = {
        type: GET_STORE
      }

      expect(getStoreAction()).toEqual(expectedResult)
    })
  })

  describe('setStoreAction', () => {
    const payload = {
      storeLocation: 1000
    }

    it('get Previous Store', () => {
      const expectedResult = {
        type: SET_STORE,
        payload
      }

      expect(setStoreAction(payload)).toEqual(expectedResult)
    })
  })

  describe('storeLocatorAction', () => {
    const payload = {
      location: 'test'
    }

    it('get Previous Store', () => {
      const expectedResult = {
        type: STORE_LOCATOR,
        payload
      }

      expect(storeLocatorAction(payload)).toEqual(expectedResult)
    })
  })
})
