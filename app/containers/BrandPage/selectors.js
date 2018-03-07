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

const selectProductsByBrandsItems = () => createSelector(
  selectProductsByBrands(),
  (substate) => substate.filter((state) => !state.get('isFeatured'))
)

const selectProductsByBrandsFeatured = () => createSelector(
  selectProductsByBrands(),
  (substate) => substate.filter((state) => state.get('isFeatured'))
)

const selectTotalCount = () => createSelector(
  selectBrandPageDomain(),
  subState => subState.get('totalCount')
)

const selectLoading = () => createSelector(
  selectBrandPageDomain(),
  subState => subState.get('loading')
)

const selectLazyload = () => createSelector(
  selectBrandPageDomain(),
  subState => subState.get('lazyload')
)

const selectFilterCategories = () => createSelector(
  selectBrandPageDomain(),
  subState => subState.get('filterCategories')
)

const selectFilterCategoriesLoading = () => createSelector(
  selectBrandPageDomain(),
  subState => subState.get('filterCategoriesLoading')
)

export {
  selectBrandPageDomain,
  selectProductsByBrands,
  selectProductsByBrandsItems,
  selectProductsByBrandsFeatured,
  selectLoading,
  selectLazyload,
  selectTotalCount,
  selectFilterCategories,
  selectFilterCategoriesLoading
}
