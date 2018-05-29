import { fromJS } from 'immutable'

import {
  selectPurchases,
  selectLocalLoader,
  selectApiLoader
} from '../selectors'

describe('Purchases Selectors', () => {
  describe('selectPurchases', () => {
    const selectPurchasesSelectors = selectPurchases()

    it('should get sector', () => {
      const purchases = fromJS([1, 2, 3])
      const mockedState = fromJS({
        purchases: {
          purchases
        }
      })
      expect(selectPurchasesSelectors(mockedState)).toEqual(purchases)
    })
  })

  describe('selectLocalLoader', () => {
    const selectLocalLoaderSelectors = selectLocalLoader()

    it('should get sector', () => {
      const localRequestLoading = false
      const mockedState = fromJS({
        purchases: {
          localRequestLoading
        }
      })
      expect(selectLocalLoaderSelectors(mockedState)).toEqual(localRequestLoading)
    })
  })

  describe('selectApiLoader', () => {
    const selectApiLoaderSelectors = selectApiLoader()

    it('should get sector', () => {
      const apiRequestLoading = false
      const mockedState = fromJS({
        purchases: {
          apiRequestLoading
        }
      })
      expect(selectApiLoaderSelectors(mockedState)).toEqual(apiRequestLoading)
    })
  })
})
