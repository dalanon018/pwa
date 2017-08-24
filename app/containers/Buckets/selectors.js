import { createSelector } from 'reselect'

/**
 * Direct selector to the bucket state domain
 */
const selectBucketDomain = () => (state) => state.get('buckets')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Bucket
 */

const selectProductCategories = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('categories')
)

const selectToggle = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('toggle')
)

const selectMobileNumbers = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('mobileNumbers')
)

const selectReceiptsUpdated = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('receiptsUpdated')
)

const selectToggleError = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('toggleError')
)

const selectToggleMessage = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('toggleMessage')
)

const selectLoader = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.get('loader')
)

export {
  selectBucketDomain,
  selectToggle,
  selectProductCategories,
  selectMobileNumbers,
  selectReceiptsUpdated,
  selectToggleError,
  selectToggleMessage,
  selectLoader
}
