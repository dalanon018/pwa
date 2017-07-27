import { fromJS } from 'immutable'

import {
  selectReceipt
} from '../selectors'

describe('Receipt Selectors', () => {
  describe('selectReceipt', () => {
    const selectReceiptSelectors = selectReceipt()

    it('should get sector', () => {
      const receipt = fromJS({
        trackingNumber: 123456
      })
      const mockedState = fromJS({
        receiptPage: {
          receipt
        }
      })
      expect(selectReceiptSelectors(mockedState)).toEqual(receipt)
    })
  })
})
