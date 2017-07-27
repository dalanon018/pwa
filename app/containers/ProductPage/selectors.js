import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

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
  (substate) => substate ? substate.get('product') : fromJS({})
)

export {
  selectLoader,
  selectProduct
}
