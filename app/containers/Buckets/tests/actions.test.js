
import {
  setRouteNameAction,

  getPageTitleAction,
  setPageTitleAction,

  getShowSearchIconAction,
  setShowSearchIconAction,

  getShowActivityIconAction,
  setShowActivityIconAction,

  getProductCategoriesAction,
  setProductCategoriesAction,

  getBrandsAction,
  setBrandsAction,

  getMobileNumbersAction,
  setMobileNumbersAction,

  getUpdatedReceiptsAction,
  setUpdatedReceiptsAction,

  setNetworkErrorAction,

  registerPushAction,
  getRegisteredPushAction,
  setRegisteredPushAction,

  getLoyaltyTokenAction,
  setLoyaltyTokenAction,
  removeLoyaltyTokenAction,

  getCurrentPointsAction,
  setCurrentPointsAction,

  storeLocatorAction,
  recentStoreLocationAction
} from '../actions'

import {
  SET_ROUTE_NAME,

  GET_PAGE_TITLE,
  SET_PAGE_TITLE,

  GET_SHOW_SEARCH_ICON,
  SET_SHOW_SEARCH_ICON,

  GET_SHOW_ACTIVITY_ICON,
  SET_SHOW_ACTIVITY_ICON,

  GET_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES,

  GET_BRANDS,
  SET_BRANDS,

  GET_MOBILE_NUMBERS,
  SET_MOBILE_NUMBERS,

  GET_RECEIPT_UPDATED,
  SET_RECEIPT_UPDATED,

  SET_NETWORK_ERROR,

  REGISTER_PUSH,
  GET_REGISTED_PUSH,
  SET_REGISTED_PUSH,

  GET_LOYALTY_TOKEN,
  SET_LOYALTY_TOKEN,
  REMOVE_LOYALTY_TOKEN,

  GET_CURRENT_POINTS,
  SET_CURRENT_POINTS,

  STORE_LOCATOR,
  RECENT_STORE_LOCATION
} from '../constants'

describe('Buckets actions', () => {
  describe('setRouteNameAction', () => {
    it('has type of SET_ROUTE_NAME', () => {
      const payload = 'homePage'
      const expectedResult = {
        type: SET_ROUTE_NAME,
        payload
      }
      expect(setRouteNameAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getPageTitleAction', () => {
    it('has type of GET_PAGE_TITLE', () => {
      const expectedResult = {
        type: GET_PAGE_TITLE
      }
      expect(getPageTitleAction()).toEqual(expectedResult)
    })
  })

  describe('setPageTitleAction', () => {
    it('it should have SET_PAGE_TITLE', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: SET_PAGE_TITLE,
        payload
      }

      expect(setPageTitleAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getShowSearchIconAction', () => {
    it('has type of GET_SHOW_SEARCH_ICON', () => {
      const expectedResult = {
        type: GET_SHOW_SEARCH_ICON
      }
      expect(getShowSearchIconAction()).toEqual(expectedResult)
    })
  })

  describe('setShowSearchIconAction', () => {
    it('it should have SET_SHOW_SEARCH_ICON', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: SET_SHOW_SEARCH_ICON,
        payload
      }

      expect(setShowSearchIconAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getShowActivityIconAction', () => {
    it('has type of GET_SHOW_ACTIVITY_ICON', () => {
      const expectedResult = {
        type: GET_SHOW_ACTIVITY_ICON
      }
      expect(getShowActivityIconAction()).toEqual(expectedResult)
    })
  })

  describe('setShowActivityIconAction', () => {
    it('it should have SET_SHOW_ACTIVITY_ICON', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: SET_SHOW_ACTIVITY_ICON,
        payload
      }

      expect(setShowActivityIconAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getCategories', () => {
    it('has type of GET CATEGORIES', () => {
      const expectedResult = {
        type: GET_PRODUCT_CATEGORIES
      }
      expect(getProductCategoriesAction()).toEqual(expectedResult)
    })
  })

  describe('SetCategories', () => {
    it('categories should have payload', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: SET_PRODUCT_CATEGORIES,
        payload
      }

      expect(setProductCategoriesAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getBrandsAction', () => {
    it('has type of GET_BRANDS', () => {
      const expectedResult = {
        type: GET_BRANDS
      }
      expect(getBrandsAction()).toEqual(expectedResult)
    })
  })

  describe('setBrandsAction', () => {
    it('has type of SET_BRANDS', () => {
      const payload = ['brand1', 'brand2', 'brand3']
      const expectedResult = {
        type: SET_BRANDS,
        payload
      }

      expect(setBrandsAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getMobileNumbers', () => {
    it('should request mobile numbers', () => {
      const expectedResult = {
        type: GET_MOBILE_NUMBERS
      }

      expect(getMobileNumbersAction()).toEqual(expectedResult)
    })
  })

  describe('setMobileNumbers', () => {
    it('should request mobile numbers', () => {
      const payload = ['99999999', '8888888', '77777777']
      const expectedResult = {
        type: SET_MOBILE_NUMBERS,
        payload
      }

      expect(setMobileNumbersAction(payload)).toEqual(expectedResult)
    })
  })

  describe('getUpdatedReceiptsAction', () => {
    it('should request updated reciepts', () => {
      const expectedResult = {
        type: GET_RECEIPT_UPDATED
      }

      expect(getUpdatedReceiptsAction()).toEqual(expectedResult)
    })
  })

  describe('setUpdatedReceiptsAction', () => {
    it('should request updated reciepts', () => {
      const payload = [
        { trackingNumber: '12345678', status: 'CONFIRMED' },
        { trackingNumber: '87654321', status: 'IN-TRANSIT' }
      ]
      const expectedResult = {
        type: SET_RECEIPT_UPDATED,
        payload
      }

      expect(setUpdatedReceiptsAction(payload)).toEqual(expectedResult)
    })
  })

  describe('setNetworkErrorAction', () => {
    it('should set Error Message', () => {
      const payload = 'Error'

      const expectedResult = {
        type: SET_NETWORK_ERROR,
        payload
      }

      expect(setNetworkErrorAction(payload)).toEqual(expectedResult)
    })
  })

  describe('PushNotification Actions', () => {
    it('it should call registerPushAction', () => {
      const payload = {
        mobileNumber: 123456,
        token: 1234567
      }
      const expectedResult = {
        type: REGISTER_PUSH,
        payload
      }

      expect(registerPushAction(payload)).toEqual(expectedResult)
    })

    it('it should call GET_REGISTED_PUSH', () => {
      const expectedResult = {
        type: GET_REGISTED_PUSH
      }

      expect(getRegisteredPushAction()).toEqual(expectedResult)
    })

    it('it should call SET_REGISTED_PUSH', () => {
      const payload = false
      const expectedResult = {
        type: SET_REGISTED_PUSH,
        payload
      }

      expect(setRegisteredPushAction(payload)).toEqual(expectedResult)
    })
  })

  describe('Loyalty Token', () => {
    it('should get loyaltyToken', () => {
      const expectedResult = {
        type: GET_LOYALTY_TOKEN
      }

      expect(getLoyaltyTokenAction()).toEqual(expectedResult)
    })

    it('should set loyaltyToken', () => {
      const payload = '123312323-12123213213'
      const expectedResult = {
        type: SET_LOYALTY_TOKEN,
        payload
      }

      expect(setLoyaltyTokenAction(payload)).toEqual(expectedResult)
    })

    it('should set loyaltyToken to null', () => {
      const expectedResult = {
        type: REMOVE_LOYALTY_TOKEN
      }

      expect(removeLoyaltyTokenAction()).toEqual(expectedResult)
    })
  })

  describe('CurrenPoints', () => {
    it('should get currentPoints', () => {
      const expectedResult = {
        type: GET_CURRENT_POINTS
      }

      expect(getCurrentPointsAction()).toEqual(expectedResult)
    })

    it('should set currentPoints', () => {
      const payload = 0
      const expectedResult = {
        type: SET_CURRENT_POINTS,
        payload
      }

      expect(setCurrentPointsAction(payload)).toEqual(expectedResult)
    })
  })

  describe('storeLocatorAction', () => {
    const payload = {
      location: 'test'
    }

    it('redirect map services', () => {
      const expectedResult = {
        type: STORE_LOCATOR,
        payload
      }

      expect(storeLocatorAction(payload)).toEqual(expectedResult)
    })
  })

  describe('recentStoreLocationAction', () => {
    const payload = {
      type: 'COD'
    }

    it('handling map services', () => {
      const expectedResult = {
        type: RECENT_STORE_LOCATION,
        payload
      }

      expect(recentStoreLocationAction(payload)).toEqual(expectedResult)
    })
  })
})
