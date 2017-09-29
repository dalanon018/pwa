import { createSelector } from 'reselect'

/**
 * Direct selector to the bucket state domain
 */
const selectContainerDomain = () => (state) => state.get('container')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Bucket
 */

const selectToggle = () => createSelector(
  selectContainerDomain(),
  (substate) => substate.get('toggle')
)

const selectMobileNumbers = () => createSelector(
  selectContainerDomain(),
  (substate) => substate.get('mobileNumbers')
)

const selectReceiptsUpdated = () => createSelector(
  selectContainerDomain(),
  (substate) => substate.get('receiptsUpdated')
)

const selectToggleError = () => createSelector(
  selectContainerDomain(),
  (substate) => substate.get('toggleError')
)

const selectToggleMessage = () => createSelector(
  selectContainerDomain(),
  (substate) => substate.get('toggleMessage')
)

const selectLoader = () => createSelector(
  selectContainerDomain(),
  (substate) => substate.get('loader')
)

export {
  selectContainerDomain,
  selectToggle,
  selectMobileNumbers,
  selectReceiptsUpdated,
  selectToggleError,
  selectToggleMessage,
  selectLoader
}
