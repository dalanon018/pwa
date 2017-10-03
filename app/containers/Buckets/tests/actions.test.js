
import {
  getPageTitleAction,
  setPageTitleAction,

  getShowSearchIconAction,
  setShowSearchIconAction,

  getShowActivityIconAction,
  setShowActivityIconAction,

  getProductCategoriesAction,
  setProductCategoriesAction,

  getMobileNumbersAction,
  setMobileNumbersAction,

  getUpdatedReceiptsAction,
  setUpdatedReceiptsAction,

  setNetworkErrorAction
} from '../actions'

import {
  GET_PAGE_TITLE,
  SET_PAGE_TITLE,

  GET_SHOW_SEARCH_ICON,
  SET_SHOW_SEARCH_ICON,

  GET_SHOW_ACTIVITY_ICON,
  SET_SHOW_ACTIVITY_ICON,

  GET_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES,

  GET_MOBILE_NUMBERS,
  SET_MOBILE_NUMBERS,

  GET_RECEIPT_UPDATED,
  SET_RECEIPT_UPDATED,

  SET_NETWORK_ERROR
} from '../constants'

describe('Buckets actions', () => {
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
})
