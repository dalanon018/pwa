import { createSelector } from 'reselect'

/**
 * Direct selector to the brandPage state domain
 */
const selectBrandPageDomain = () => (state) => state.get('brandPage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by BrandPage
 */

const selectProductsByBrands = () => createSelector(
  selectBrandPageDomain(),
  (substate) => substate.get('productsByBrands')
)

const selectLoading = () => createSelector(
  selectBrandPageDomain(),
  subState => subState.get('loading')
)

const selectLazyload = () => createSelector(
  selectBrandPageDomain(),
  subState => subState.get('lazyload')
)

const selectFeaturedProducts = () => createSelector(
  selectBrandPageDomain(),
  subState => subState.get('productsFeatured')
)

export {
  selectBrandPageDomain,
  selectProductsByBrands,
  selectFeaturedProducts,
  selectLoading,
  selectLazyload
}
