
import {
  getPurchasesAction,
  setPurchasesAction
} from '../actions'
import {
  GET_PURCHASES,
  SET_PURCHASES
} from '../constants'

describe('Purchases actions', () => {
  describe('getPurchases', () => {
    it('it should get purchase', () => {
      const expectedResult = {
        type: GET_PURCHASES
      }
      expect(getPurchasesAction()).toEqual(expectedResult)
    })
  })

  describe('setPurchases', () => {
    it('it should return purchases', () => {
      const payload = ['order1', 'order2', 'order3']
      const expectedResult = {
        type: SET_PURCHASES,
        payload
      }

      expect(setPurchasesAction(payload)).toEqual(expectedResult)
    })
  })
})
