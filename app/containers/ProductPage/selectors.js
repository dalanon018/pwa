import { createSelector } from 'reselect'

/**
 * Direct selector to the productPage state domain
 */
const selectProductPageDomain = () => (state) => state.get('productPage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductPage
 */

const selectLoader = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('loading')
)

const selectProduct = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('product')
)

export {
  selectLoader,
  selectProduct
}
