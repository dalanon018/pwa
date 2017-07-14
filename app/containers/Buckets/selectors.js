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

export {
  selectBucketDomain,
  selectProductCategories
}
