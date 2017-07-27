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

export {
  selectPurchaseEntityDomain,
  selectReceipt,
  selectLoading
}
