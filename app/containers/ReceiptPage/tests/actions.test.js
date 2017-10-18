
import {
  getReceiptAction,
  setReceiptAction,

  getRegisteredPushAction,
  setRegisteredPushAction
} from '../actions'
import {
  GET_RECEIPT,
  SET_RECEIPT,

  GET_REGISTED_PUSH,
  SET_REGISTED_PUSH
} from '../constants'

describe('Receipt actions', () => {
  describe('getReceiptAction', () => {
    it('it should get purchase', () => {
      const payload = {
        id: 123456
      }
      const expectedResult = {
        type: GET_RECEIPT,
        payload
      }
      expect(getReceiptAction(payload)).toEqual(expectedResult)
    })
  })

  describe('setReceiptAction', () => {
    it('it should return purchases', () => {
      const payload = {
        trackingNumber: 123456
      }
      const expectedResult = {
        type: SET_RECEIPT,
        payload
      }

      expect(setReceiptAction(payload)).toEqual(expectedResult)
    })
  })

  describe('PushNotification Actions', () => {
    it('it should call GET_REGISTED_PUSH', () => {
      const expectedResult = {
        type: GET_REGISTED_PUSH
      }

      expect(getRegisteredPushAction()).toEqual(expectedResult)
    })

    it('it should call SET_REGISTED_PUSH', () => {
      const payload = false
      const expectedResult = {
        type: SET_REGISTED_PUSH,
        payload
      }

      expect(setRegisteredPushAction(payload)).toEqual(expectedResult)
    })
  })
})
