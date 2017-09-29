import { fromJS } from 'immutable'

import {
  selectToggle,
  selectMobileNumbers,
  selectReceiptsUpdated,
  selectToggleError,
  selectToggleMessage
} from '../selectors'

describe('Container Selectors', () => {
  describe('selectToggle', () => {
    const selectToggleSelectors = selectToggle()

    it('should get toggle', () => {
      const toggle = true
      const mockedState = fromJS({
        container: {
          toggle
        }
      })
      expect(selectToggleSelectors(mockedState)).toEqual(toggle)
    })
  })

  describe('selectMobileNumbers', () => {
    const selectMobileNumbersSelectors = selectMobileNumbers()

    it('should get mobile numbers', () => {
      const mobileNumbers = fromJS(['999999999', '88888888', '77777777'])
      const mockedState = fromJS({
        container: {
          mobileNumbers
        }
      })
      expect(selectMobileNumbersSelectors(mockedState)).toEqual(mobileNumbers)
    })
  })

  describe('selectReceiptsUpdated', () => {
    const selectReceiptsUpdatedSelectors = selectReceiptsUpdated()

    it('should get updated reciepts', () => {
      const receiptsUpdated = fromJS([
        { trackingNumber: '12345678', status: 'CONFIRMED' },
        { trackingNumber: '87654321', status: 'IN-TRANSIT' }
      ])
      const mockedState = fromJS({
        container: {
          receiptsUpdated
        }
      })
      expect(selectReceiptsUpdatedSelectors(mockedState)).toEqual(receiptsUpdated)
    })
  })

  describe('selectToggleError', () => {
    const selectToggleErrorSelectors = selectToggleError()

    it('should get updated toggleError', () => {
      const toggleError = true
      const mockedState = fromJS({
        container: {
          toggleError
        }
      })
      expect(selectToggleErrorSelectors(mockedState)).toEqual(toggleError)
    })
  })

  describe('selectToggleMessage', () => {
    const selectToggleMessageSelectors = selectToggleMessage()

    it('should get updated toggleMessage', () => {
      const toggleMessage = 'Error message'
      const mockedState = fromJS({
        container: {
          toggleMessage
        }
      })
      expect(selectToggleMessageSelectors(mockedState)).toEqual(toggleMessage)
    })
  })
})
