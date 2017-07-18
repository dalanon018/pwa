import { createSelector } from 'reselect'

/**
 * Direct selector to the barcodeLists state domain
 */
const selectBarcodeListsDomain = () => (state) => state.get('barcodeLists')

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

const selectBarcodes = () => createSelector(
  selectBarcodeListsDomain(),
  (substate) => substate.get('barcodes')
)

export {
  selectBarcodes,
  selectLoader
}
