import { fromJS } from 'immutable'

import {
  selectProductCategories,
  selectToggle,
  selectMobileNumbers,
  selectReceiptsUpdated
} from '../selectors'

describe('Buckets Selectors', () => {
  describe('selectProductCategories', () => {
    const selectProductCategoriesSelectors = selectProductCategories()

    it('should get categories', () => {
      const categories = fromJS([1, 2, 3])
      const mockedState = fromJS({
        buckets: {
          categories
        }
      })
      expect(selectProductCategoriesSelectors(mockedState)).toEqual(categories)
    })
  })

  describe('selectToggle', () => {
    const selectToggleSelectors = selectToggle()

    it('should get toggle', () => {
      const toggle = true
      const mockedState = fromJS({
        buckets: {
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
        buckets: {
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
        buckets: {
          receiptsUpdated
        }
      })
      expect(selectReceiptsUpdatedSelectors(mockedState)).toEqual(receiptsUpdated)
    })
  })
})
