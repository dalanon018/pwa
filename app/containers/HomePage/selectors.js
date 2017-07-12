import { createSelector } from 'reselect'

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = () => (state) => state.get('home')

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.toJS()
)

const selectSampleApi = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('sampleApi')
)

export {
  selectHomePageDomain,
  selectSampleApi,
  makeSelectHomePage
}
