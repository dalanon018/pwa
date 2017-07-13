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

const makeSelectBuckets = () => createSelector(
  selectBucketDomain(),
  (substate) => substate.toJS()
)

export default makeSelectBuckets
export {
  selectBucketDomain
}
