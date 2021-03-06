import { fromJS } from 'immutable'

import {
  selectProductCategories,
  selectBrands,
  selectFeaturedCategories,
  selectFeaturedBrandsMobile,
  selectFeaturedBrandsDesktop,
  selectToggle,
  selectMobileNumbers,
  selectReceiptsUpdated,
  selectToggleError,
  selectToggleMessage,
  selectPageTitle,
  selectShowSearchIcon,
  selectShowActivityIcon,
  selectIsRegisteredPush,
  selectLoyaltyToken,
  selectCurrentPoints,
  selectRouteName,
  selectLoader,
  selectBrandLoader
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

  describe('selectFeaturedCategories', () => {
    const selectFeaturedCategoriesSelectors = selectFeaturedCategories()

    it('should get brands', () => {
      const categories = fromJS([{ isFeatured: true, name: 1 }])
      const mockedState = fromJS({
        buckets: {
          categories
        }
      })
      expect(selectFeaturedCategoriesSelectors(mockedState)).toEqual(categories)
    })
  })

  describe('selectFeaturedBrandsMobile', () => {
    const selectFeaturedBrandsMobileSelectors = selectFeaturedBrandsMobile()

    it('should get brands', () => {
      const brands = fromJS([{ isFeatured: true, name: 1 }])
      const mockedState = fromJS({
        buckets: {
          brands
        }
      })
      expect(selectFeaturedBrandsMobileSelectors(mockedState)).toEqual(brands)
    })
  })

  describe('selectFeaturedBrandsDesktop', () => {
    const selectFeaturedBrandsDesktopSelectors = selectFeaturedBrandsDesktop()

    it('should get brands', () => {
      const brands = fromJS([{ isFeatured: true, name: 1 }])
      const mockedState = fromJS({
        buckets: {
          brands
        }
      })
      expect(selectFeaturedBrandsDesktopSelectors(mockedState)).toEqual(brands)
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

  describe('selectRouteName', () => {
    const selectRouteNameSelectors = selectRouteName()

    it('should get updated pageTitle', () => {
      const routeName = 'Admin'
      const mockedState = fromJS({
        buckets: {
          routeName
        }
      })
      expect(selectRouteNameSelectors(mockedState)).toEqual(routeName)
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

  describe('selectIsRegisteredPush', () => {
    const selectIsRegisteredPushSelectors = selectIsRegisteredPush()

    it('should get sector', () => {
      const isRegisteredPush = false
      const mockedState = fromJS({
        buckets: {
          isRegisteredPush
        }
      })
      expect(selectIsRegisteredPushSelectors(mockedState)).toEqual(isRegisteredPush)
    })
  })

  describe('selectLoyaltyToken', () => {
    const selectLoyaltyTokenSelectors = selectLoyaltyToken()

    it('should get error submission', () => {
      const loyaltyToken = '12313-123123213-1231321-12321'
      const mockedState = fromJS({
        buckets: {
          loyaltyToken
        }
      })
      expect(selectLoyaltyTokenSelectors(mockedState)).toEqual(loyaltyToken)
    })
  })

  describe('selectCurrentPoints', () => {
    const selectCurrentPointsSelectors = selectCurrentPoints()

    it('should get error submission', () => {
      const currentPoints = 0
      const mockedState = fromJS({
        buckets: {
          currentPoints
        }
      })
      expect(selectCurrentPointsSelectors(mockedState)).toEqual(currentPoints)
    })
  })

  describe('selectLoader', () => {
    const selectLoaderSelectors = selectLoader()

    it('should get loader', () => {
      const loader = false
      const mockedState = fromJS({
        buckets: {
          loader
        }
      })
      expect(selectLoaderSelectors(mockedState)).toEqual(loader)
    })
  })

  describe('selectBrandLoader', () => {
    const selectBrandLoaderSelectors = selectBrandLoader()

    it('should get brandLoader', () => {
      const brandLoader = false
      const mockedState = fromJS({
        buckets: {
          brandLoader
        }
      })
      expect(selectBrandLoaderSelectors(mockedState)).toEqual(brandLoader)
    })
  })
})
