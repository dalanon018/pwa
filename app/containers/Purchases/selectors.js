import { createSelector } from 'reselect'

/**
 * Direct selector to the barcodeLists state domain
 */
const selectBarcodeListsDomain = () => (state) => state.get('purchases')

/**
 * Other specific selectors
 */

/**
 * Default selector used by BarcodeLists
 */

const selectLoader = () => createSelector(
  selectBarcodeListsDomain(),
  (substate) => substate.get('loading')
)

const selectPurchases = () => createSelector(
  selectBarcodeListsDomain(),
  (substate) => substate.get('purchases')
)

export {
  selectPurchases,
  selectLoader
}
