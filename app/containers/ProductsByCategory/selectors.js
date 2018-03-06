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

const selectProductsByCategory = () => createSelector(
  selectProductsByCategoryDomain(),
  (substate) => substate.get('productsByCategory')
)

const selectProductsByCategoryItems = () => createSelector(
  selectProductsByCategory(),
  (substate) => substate.filter((sub) => !sub.get('isFeatured'))
)

const selectProductsByCategoryFeatured = () => createSelector(
  selectProductsByCategory(),
  (substate) => substate.filter((sub) => sub.get('isFeatured'))
)

const selectProductsViewed = () => createSelector(
  selectProductsByCategoryDomain(),
  (substate) => substate.get('productsViewed')
)

const selectLoading = () => createSelector(
  selectProductsByCategoryDomain(),
  subState => subState.get('loading')
)

const selectLazyload = () => createSelector(
  selectProductsByCategoryDomain(),
  subState => subState.get('lazyload')
)

const selectTotalCount = () => createSelector(
  selectProductsByCategoryDomain(),
  subState => subState.get('totalCount')
)

const selectOver18 = () => createSelector(
  selectProductsByCategoryDomain(),
  subState => subState.get('isOver18')
)

export {
  selectProductsByCategoryDomain,
  selectProductsByCategory,
  selectProductsByCategoryItems,
  selectProductsByCategoryFeatured,
  selectProductsViewed,
  selectLoading,
  selectLazyload,
  selectTotalCount,
  selectOver18
}
