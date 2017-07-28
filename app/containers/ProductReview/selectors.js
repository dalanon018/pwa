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

const selectOrderProduct = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('orderProduct')
)

const selectLoader = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('loading')
)

const selectMobileNumber = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('mobileNumber')
)

export default makeSelectProductReview
export {
  makeSelectProductReview,
  selectOrderProduct,
  selectMobileNumber,
  selectLoader
}
