import { fromJS } from 'immutable'

import {
  selectPurchases
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
})
