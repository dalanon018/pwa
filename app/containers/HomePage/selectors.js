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

// const makeSelectHomePage = () => createSelector(
//   selectHomePageDomain(),
//   (substate) => substate.toJS()
// )

const selectFeaturedProducts = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('product')
)

const selectLoading = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('loading')
)

const selectTotalCount = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('totalCount')
)

const selectPromos = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('promos')
)

const selectPromosLoading = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('promosLoading')
)

const selectPromosCount = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('promosCount')
)

export {
  selectHomePageDomain,
  selectFeaturedProducts,
  selectLoading,
  selectTotalCount,
  selectPromos,
  selectPromosLoading,
  selectPromosCount
}
