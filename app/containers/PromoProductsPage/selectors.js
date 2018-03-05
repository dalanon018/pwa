import { createSelector } from 'reselect'

/**
 * Direct selector to the PromoProductsPage state domain
 */
const selectPromoProductsPageDomain = () => (state) => state.get('promoProductsPage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by PromoProductsPage
 */

const selectPromo = () => createSelector(
  selectPromoProductsPageDomain(),
  (substate) => substate.get('promo')
)

const selectPromoProducts = () => createSelector(
  selectPromoProductsPageDomain(),
  (substate) => substate.get('products')
)

const selectProductsRegular = () => createSelector(
  selectPromoProducts(),
  (substate) => substate.filter((state) => !state.get('isFeatured'))
)

const selectProductsFeatured = () => createSelector(
  selectPromoProducts(),
  (substate) => substate.filter((state) => state.get('isFeatured'))
)

const selectProductsCount = () => createSelector(
  selectPromoProductsPageDomain(),
  subState => subState.get('productsCount')
)

const selectProductsLoading = () => createSelector(
  selectPromoProductsPageDomain(),
  subState => subState.get('productsLoading')
)

const selectLazyload = () => createSelector(
  selectPromoProductsPageDomain(),
  subState => subState.get('lazyload')
)

export {
  selectPromo,
  selectPromoProducts,
  selectProductsRegular,
  selectProductsFeatured,
  selectProductsCount,
  selectProductsLoading,
  selectLazyload
}
