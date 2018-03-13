import { createSelector } from 'reselect'

/**
 * Direct selector to the RecentStorePage state domain
 */
const selectRecentStorePageDomain = (state) => state.get('recentStorePage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by RecentStorePage
 */

const selectVisitedStores = () => createSelector(
  selectRecentStorePageDomain,
  (substate) => substate.get('visitedStores')
)

const selectVisitedStoresLoading = () => createSelector(
  selectRecentStorePageDomain,
  (substate) => substate.get('visitedStoresLoading')
)

export {
  selectVisitedStores,
  selectVisitedStoresLoading
}
