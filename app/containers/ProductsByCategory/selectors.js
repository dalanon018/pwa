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

const selectFeaturedProducts = () => createSelector(
  selectProductsByCategoryDomain(),
  subState => subState.get('productsFeatured')
)

export {
  selectProductsByCategoryDomain,
  selectProductsByCategory,
  selectProductsViewed,
  selectLoading,
  selectLazyload,
  selectFeaturedProducts
}
