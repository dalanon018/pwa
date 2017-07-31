import { createSelector } from 'reselect'

/**
 * Direct selector to the productsByCategory state domain
 */
const selectProductsByCategoryDomain = () => (state) => state.get('productsByCategory')

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductsByCategory
 */

const makeSelectProductsByCategory = () => createSelector(
  selectProductsByCategoryDomain(),
  (substate) => substate.toJS()
)

const selectProductsByCategory = () => createSelector(
  selectProductsByCategoryDomain(),
  (substate) => substate.get('productsByCategory')
)

const selectLoading = () => createSelector(
  selectProductsByCategoryDomain(),
  subState => subState.get('loading')
)

export default makeSelectProductsByCategory
export {
  selectProductsByCategoryDomain,
  selectProductsByCategory,
  selectLoading
}
