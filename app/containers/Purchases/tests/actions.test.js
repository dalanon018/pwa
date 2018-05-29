
import {
  getApiPurchasesAction,
  setLocalPurchasesAction,
  setApiPurchasesAction,
  getStoragePurchasesAction
} from '../actions'
import {
  GET_API_PURCHASES,
  GET_LOCAL_PURCHASES,
  SET_LOCAL_PURCHASES,
  SET_API_PURCHASES
} from '../constants'

describe('Purchases actions', () => {
  describe('getApiPurchasesAction', () => {
    it('it should get API purchase', () => {
      const payload = {
        mobile: '99'
      }
      const expectedResult = {
        type: GET_API_PURCHASES,
        payload
      }
      expect(getApiPurchasesAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getStoragePurchasesAction', () => {
    it('it should get local purchase', () => {
      const expectedResult = {
        type: GET_LOCAL_PURCHASES
      }
      expect(getStoragePurchasesAction()).toEqual(expectedResult)
    })
  })

  describe('setLocalPurchasesAction', () => {
    it('it should return purchases for local request', () => {
      const payload = ['order1', 'order2', 'order3']
      const expectedResult = {
        type: SET_LOCAL_PURCHASES,
        payload
      }

      expect(setLocalPurchasesAction(payload)).toEqual(expectedResult)
    })
  })

  describe('setApiPurchasesAction', () => {
    it('it should return purchases for local request', () => {
      const payload = ['order1', 'order2', 'order3']
      const expectedResult = {
        type: SET_API_PURCHASES,
        payload
      }

      expect(setApiPurchasesAction(payload)).toEqual(expectedResult)
    })
  })
})
