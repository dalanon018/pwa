import { fromJS } from 'immutable'

import {
  selectProductCategories,
  selectBrands,
  selectToggle,
  selectMobileNumbers,
  selectReceiptsUpdated,
  selectToggleError,
  selectToggleMessage,
  selectPageTitle,
  selectShowSearchIcon,
  selectShowActivityIcon
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

  describe('selectBrands', () => {
    const selectBrandsSelectors = selectBrands()

    it('should get brands', () => {
      const brands = fromJS([1, 2, 3])
      const mockedState = fromJS({
        buckets: {
          brands
        }
      })
      expect(selectBrandsSelectors(mockedState)).toEqual(brands)
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

  describe('selectToggleError', () => {
    const selectToggleErrorSelectors = selectToggleError()

    it('should get updated toggleError', () => {
      const toggleError = true
      const mockedState = fromJS({
        buckets: {
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
        buckets: {
          toggleMessage
        }
      })
      expect(selectToggleMessageSelectors(mockedState)).toEqual(toggleMessage)
    })
  })

  describe('selectPageTitle', () => {
    const selectPageTitleSelectors = selectPageTitle()

    it('should get updated pageTitle', () => {
      const pageTitle = 'Admin'
      const mockedState = fromJS({
        buckets: {
          pageTitle
        }
      })
      expect(selectPageTitleSelectors(mockedState)).toEqual(pageTitle)
    })
  })

  describe('selectShowSearchIcon', () => {
    const selectShowSearchIconSelectors = selectShowSearchIcon()

    it('should get updated searchIconShow', () => {
      const searchIconShow = false
      const mockedState = fromJS({
        buckets: {
          searchIconShow
        }
      })
      expect(selectShowSearchIconSelectors(mockedState)).toEqual(searchIconShow)
    })
  })

  describe('selectShowActivityIcon', () => {
    const selectShowActivityIconSelectors = selectShowActivityIcon()

    it('should get updated activityIconShow', () => {
      const activityIconShow = false
      const mockedState = fromJS({
        buckets: {
          activityIconShow
        }
      })
      expect(selectShowActivityIconSelectors(mockedState)).toEqual(activityIconShow)
    })
  })
})
