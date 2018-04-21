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

const selectOrderProduct = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('orderProduct')
)

const selectProductLoader = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('productLoading')
)

const selectMobileNumber = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('mobileNumber')
)

const selectMobileLoader = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('mobileLoading')
)

const selectSubmitting = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('submitting')
)

const selectSubmissionSuccess = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('submissionSuccess')
)

const selectSubmissionError = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('submissionError')
)

const selectStoreLocation = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('storeLocation')
)

const selectLastSelectedMethod = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('lastSelectedMethod')
)

const selectBlackListed = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('isBlackListed')
)

const selectCurrentPoints = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('currentPoints')
)

const selectCurrentPointsLoading = () => createSelector(
  selectProductReviewDomain(),
  (substate) => substate.get('currentPointsLoading')
)

export {
  selectOrderProduct,
  selectMobileNumber,
  selectProductLoader,
  selectMobileLoader,
  selectSubmitting,
  selectSubmissionSuccess,
  selectSubmissionError,
  selectStoreLocation,
  selectBlackListed,
  selectCurrentPoints,
  selectCurrentPointsLoading,
  selectLastSelectedMethod
}
