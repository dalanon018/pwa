import { fromJS } from 'immutable'

import {
  selectProductCategories,
  selectToggle,
  selectMobileNumbers
} from '../selectors'

describe('Buckets Selectors', () => {
  describe('selectProductCategories', () => {
    const selectProductCategoriesSelectors = selectProductCategories()

    it('should get sector', () => {
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

    it('should get sector', () => {
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

    it('should get sector', () => {
      const mobileNumbers = fromJS(['999999999', '88888888', '77777777'])
      const mockedState = fromJS({
        buckets: {
          mobileNumbers
        }
      })
      expect(selectMobileNumbersSelectors(mockedState)).toEqual(mobileNumbers)
    })
  })
})
