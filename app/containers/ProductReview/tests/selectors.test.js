import { fromJS } from 'immutable'

import {
  selectOrderProduct,
  selectMobileNumber,
  selectStoreLocation,
  selectBlackListed,
  selectVisitedStores,
  selectVisitedStoresLoading
} from '../selectors'

describe('ProductReview Selectors', () => {
  describe('selectOrderProduct', () => {
    const selectOrderProductSelectors = selectOrderProduct()

    it('should get product', () => {
      const orderProduct = fromJS({
        title: 'title1',
        description: 'lorem ipsum'
      })
      const mockedState = fromJS({
        productReview: {
          orderProduct
        }
      })
      expect(selectOrderProductSelectors(mockedState)).toEqual(orderProduct)
    })
  })

  describe('selectMobileNumber', () => {
    const selectMobileNumberSelectors = selectMobileNumber()

    it('should get success submission', () => {
      const mobileNumber = '99999999'
      const mockedState = fromJS({
        productReview: {
          mobileNumber
        }
      })
      expect(selectMobileNumberSelectors(mockedState)).toEqual(mobileNumber)
    })
  })

  describe('selectStoreLocation', () => {
    const selectStoreLocationSelectors = selectStoreLocation()

    it('should get success submission', () => {
      const storeLocation = '1'
      const mockedState = fromJS({
        productReview: {
          storeLocation
        }
      })
      expect(selectStoreLocationSelectors(mockedState)).toEqual(storeLocation)
    })
  })

  describe('selectBlackListed', () => {
    const selectBlackListedSelectors = selectBlackListed()

    it('should get success submission', () => {
      const isBlackListed = true
      const mockedState = fromJS({
        productReview: {
          isBlackListed
        }
      })
      expect(selectBlackListedSelectors(mockedState)).toEqual(isBlackListed)
    })
  })

  describe('selectVisitedStores', () => {
    const selectVisitedStoresSelectors = selectVisitedStores()

    it('should get success submission', () => {
      const visitedStores = true
      const mockedState = fromJS({
        productReview: {
          visitedStores
        }
      })
      expect(selectVisitedStoresSelectors(mockedState)).toEqual(visitedStores)
    })
  })

  describe('selectVisitedStoresLoading', () => {
    const selectVisitedStoresLoadingSelectors = selectVisitedStoresLoading()

    it('should get success submission', () => {
      const visitedStoresLoading = true
      const mockedState = fromJS({
        productReview: {
          visitedStoresLoading
        }
      })
      expect(selectVisitedStoresLoadingSelectors(mockedState)).toEqual(visitedStoresLoading)
    })
  })
})
