import { createSelector } from 'reselect'

/**
 * Direct selector to the brandLanding state domain
 */
const selectBrandLandingDomain = (state) => state.get('brandLanding')

/**
 * Other specific selectors
 */

/**
 * Default selector used by BrandLanding
 */

const makeSelectBrandLanding = () => createSelector(
  selectBrandLandingDomain,
  (substate) => substate.toJS()
)

export default makeSelectBrandLanding
export {
  selectBrandLandingDomain
}
