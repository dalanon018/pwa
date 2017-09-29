import { createSelector } from 'reselect'

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = () => (state) => state.get('homePage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const selectFeaturedProducts = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('featuredProducts')
)

const selectProductsLoading = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('productsLoading')
)

const selectFeaturedCategories = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('featuredCategories')
)

const selectCategoriesLoading = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('categoriesLoading')
)

const selectFeaturedBrands = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('featuredBrands')
)

const selectBrandsLoading = () => createSelector(
  selectHomePageDomain(),
  subState => subState.get('brandsLoading')
)

export {
  selectHomePageDomain,
  selectFeaturedProducts,
  selectProductsLoading,

  selectFeaturedCategories,
  selectCategoriesLoading,

  selectFeaturedBrands,
  selectBrandsLoading
}
