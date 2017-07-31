import { createSelector } from 'reselect'

/**
 * Direct selector to the browseCategories state domain
 */
const selectBrowseCategoriesDomain = () => (state) => state.get('browseCategories')

/**
 * Other specific selectors
 */

/**
 * Default selector used by BrowseCategories
 */

const selectCategories = () => createSelector(
  selectBrowseCategoriesDomain(),
  (substate) => substate.get('categories')
)

const selectLoading = () => createSelector(
  selectBrowseCategoriesDomain(),
  subState => subState.get('loading')
)

export {
  selectCategories,
  selectLoading
}
