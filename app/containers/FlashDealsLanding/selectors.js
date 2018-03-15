import { createSelector } from 'reselect'

/**
 * Direct selector to the flashDealsLanding state domain
 */
const selectFlashDealsLandingDomain = (state) => state.get('flashDealsLanding')

/**
 * Other specific selectors
 */

/**
 * Default selector used by FlashDealsLanding
 */

const makeSelectFlashDealsLanding = () => createSelector(
  selectFlashDealsLandingDomain,
  (substate) => substate.toJS()
)

export default makeSelectFlashDealsLanding
export {
  selectFlashDealsLandingDomain
}
