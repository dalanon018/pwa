import { createSelector } from 'reselect'

/**
 * Direct selector to the receiptPage state domain
 */
const selectPurchaseEntityDomain = () => (state) => state.get('receiptPage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by receiptPage
 */

const selectLoading = () => createSelector(
  selectPurchaseEntityDomain(),
  (substate) => substate.get('loading')
)

const selectReceipt = () => createSelector(
  selectPurchaseEntityDomain(),
  (substate) => substate.get('receipt')
)

const selectRepurchase = () => createSelector(
  selectPurchaseEntityDomain(),
  (substate) => substate.get('repurchase')
)

const selectRepurchaseSuccess = () => createSelector(
  selectPurchaseEntityDomain(),
  (substate) => substate.get('repurchaseSuccess')
)

const selectRepurchaseError = () => createSelector(
  selectPurchaseEntityDomain(),
  (substate) => substate.get('repurchaseError')
)

export {
  selectPurchaseEntityDomain,
  selectReceipt,
  selectLoading,
  selectRepurchase,
  selectRepurchaseSuccess,
  selectRepurchaseError
}
