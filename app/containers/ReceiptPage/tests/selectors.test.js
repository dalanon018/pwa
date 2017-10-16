import { fromJS } from 'immutable'

import {
  selectReceipt,
  selectIsRegisteredPush
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

  describe('selectIsRegisteredPush', () => {
    const selectIsRegisteredPushSelectors = selectIsRegisteredPush()

    it('should get sector', () => {
      const isRegisteredPush = false
      const mockedState = fromJS({
        receiptPage: {
          isRegisteredPush
        }
      })
      expect(selectIsRegisteredPushSelectors(mockedState)).toEqual(isRegisteredPush)
    })
  })
})
