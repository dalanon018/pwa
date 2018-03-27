import { createSelector } from 'reselect'

/**
 * Direct selector to the flashDealsLanding state domain
 */
const selectFlashDealsLandingDomain = () => state => state.get('flashDealsLanding')

/**
 * Other specific selectors
 */

/**
 * Default selector used by FlashDealsLanding
 */

const selectPromos = () => createSelector(
  selectFlashDealsLandingDomain(),
  substate => substate.get('promos')
)

const selectPromosLoading = () => createSelector(
  selectFlashDealsLandingDomain(),
  substate => substate.get('promosLoading')
)

// export default makeSelectFlashDealsLanding
export {
  selectPromos,
  selectPromosLoading
}
