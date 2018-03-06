import { createSelector } from 'reselect'

/**
 * Direct selector to the ProductsByFeatured state domain
 */
const selectProductsByFeaturedDomain = () => (state) => state.get('productsByFeatured')

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductsByFeatured
 */

const selectProducts = () => createSelector(
  selectProductsByFeaturedDomain(),
  (substate) => substate.get('products')
)

const selectProductsViewed = () => createSelector(
  selectProductsByFeaturedDomain(),
  (substate) => substate.get('productsViewed')
)

const selectLoading = () => createSelector(
  selectProductsByFeaturedDomain(),
  subState => subState.get('loading')
)

const selectLazyload = () => createSelector(
  selectProductsByFeaturedDomain(),
  subState => subState.get('lazyload')
)

const selectTotalCount = () => createSelector(
  selectProductsByFeaturedDomain(),
  subState => subState.get('totalCount')
)

export {
  selectProductsByFeaturedDomain,
  selectProducts,
  selectProductsViewed,
  selectLoading,
  selectLazyload,
  selectTotalCount
}
