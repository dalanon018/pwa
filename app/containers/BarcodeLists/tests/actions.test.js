
import {
  getBarcodesAction,
  setBarcodesAction
} from '../actions'
import {
  GET_BARCODES,
  SET_BARCODES
} from '../constants'

describe('BarcodesList actions', () => {
  describe('getBarcodes', () => {
    it('has type of GET CATEGORIES', () => {
      const expectedResult = {
        type: GET_BARCODES
      }
      expect(getBarcodesAction()).toEqual(expectedResult)
    })
  })

  describe('setBarcodes', () => {
    it('categories should have payload', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: SET_BARCODES,
        payload
      }

      expect(setBarcodesAction(payload)).toEqual(expectedResult)
    })
  })
})
