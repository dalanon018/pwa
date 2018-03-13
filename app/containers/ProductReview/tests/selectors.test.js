import { fromJS } from 'immutable'

import {
  selectOrderProduct,
  selectMobileNumber,
  selectStoreLocation,
  selectBlackListed,
  selectCurrentPoints,
  selectCurrentPointsLoading
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

  describe('selectCurrentPoints', () => {
    const selectCurrentPointsSelectors = selectCurrentPoints()

    it('should get currentPoints', () => {
      const currentPoints = fromJS({ points: 1 })
      const mockedState = fromJS({
        productReview: {
          currentPoints
        }
      })
      expect(selectCurrentPointsSelectors(mockedState)).toEqual(currentPoints)
    })
  })

  describe('selectCurrentPointsLoading', () => {
    const selectCurrentPointsLoadingSelectors = selectCurrentPointsLoading()

    it('should get currentPointsLoading', () => {
      const currentPointsLoading = true
      const mockedState = fromJS({
        productReview: {
          currentPointsLoading
        }
      })
      expect(selectCurrentPointsLoadingSelectors(mockedState)).toEqual(currentPointsLoading)
    })
  })
})
