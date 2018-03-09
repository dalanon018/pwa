import { createSelector } from 'reselect'

/**
 * Direct selector to the categoryLanding state domain
 */
const selectCategoryLandingDomain = (state) => state.get('categoryLanding')

/**
 * Other specific selectors
 */

/**
 * Default selector used by CategoryLanding
 */

const makeSelectCategoryLanding = () => createSelector(
  selectCategoryLandingDomain,
  (substate) => substate.toJS()
)

export default makeSelectCategoryLanding
export {
  selectCategoryLandingDomain
}
