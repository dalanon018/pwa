import { createSelector } from 'reselect'
import {
  STATUSES,
  COMPLETED,
  EXPIRED
} from 'containers/Buckets/constants'

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

const selectActivePurchases = () => createSelector(
  selectPurchases(),
  (substate) => substate.filter((state) => {
    const status = STATUSES[state.get('status')]
    return !COMPLETED.includes(status) && !EXPIRED.includes(status)
  })
)

const selectCompletedPurchases = () => createSelector(
  selectPurchases(),
  (substate) => substate.filter((state) => {
    const status = STATUSES[state.get('status')]
    return COMPLETED.includes(status)
  })
)

const selectExpiredPurchases = () => createSelector(
  selectPurchases(),
  (substate) => substate.filter((state) => {
    const status = STATUSES[state.get('status')]
    return EXPIRED.includes(status)
  })
)

export {
  selectPurchases,
  selectLoader,
  selectActivePurchases,
  selectCompletedPurchases,
  selectExpiredPurchases
}
