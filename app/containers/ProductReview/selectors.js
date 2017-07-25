import { createSelector } from 'reselect'

/**
 * Direct selector to the productReview state domain
 */
const selectProductReviewDomain = () => (state) => state.get('productReview')

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductReview
 */

const makeSelectProductReview = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.toJS()
)

export default makeSelectProductReview
export {
  selectProductReviewDomain
}
