import { fromJS } from 'immutable'

import {
  selectVisitedStores,
  selectVisitedStoresLoading
} from '../selectors'

describe('RecentStorePage Selectors', () => {
  describe('selectVisitedStores', () => {
    const selectVisitedStoresSelectors = selectVisitedStores()

    it('should get visitedStores', () => {
      const visitedStores = fromJS([1, 2, 3])
      const mockedState = fromJS({
        recentStorePage: {
          visitedStores
        }
      })
      expect(selectVisitedStoresSelectors(mockedState)).toEqual(visitedStores)
    })
  })

  describe('selectVisitedStoresLoading', () => {
    const selectVisitedStoresLoadingSelectors = selectVisitedStoresLoading()

    it('should get visitedStoresLoading', () => {
      const visitedStoresLoading = true
      const mockedState = fromJS({
        recentStorePage: {
          visitedStoresLoading
        }
      })
      expect(selectVisitedStoresLoadingSelectors(mockedState)).toEqual(visitedStoresLoading)
    })
  })
})
