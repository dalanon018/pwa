import { createSelector } from 'reselect'

/**
 * Direct selector to the searchPage state domain
 */
const selectSearchPageDomain = () => (state) => state.get('searchPage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchPage
 */

const selectSearchProductLoading = () => createSelector(
  selectSearchPageDomain(),
  (substate) => substate.get('loading')
)

const selectSearchProduct = () => createSelector(
  selectSearchPageDomain(),
  (substate) => substate.get('product')
)

export {
  selectSearchPageDomain,
  selectSearchProductLoading,
  selectSearchProduct
}
