
import {
  getReceiptAction,
  setReceiptAction

} from '../actions'
import {
  GET_RECEIPT,
  SET_RECEIPT
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
})
