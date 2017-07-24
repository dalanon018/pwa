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

export {
  selectBucketDomain,
  selectToggle,
  selectProductCategories
}
