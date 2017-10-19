import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

/**
 * Direct selector to the productPage state domain
 */
const selectProductPageDomain = () => (state) => state.get('productPage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductPage
 */

const selectLoader = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('loading')
)

const selectProduct = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate ? substate.get('product') : fromJS({})
)

const selectProductSuccess = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('requestProductSuccess')
)

const selectProductError = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('requestProductError')
)

const selectMobileNumbers = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('mobileNumbers')
)

const selectMarkdown = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('markdown')
)

const selectLoadingMarkdown = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('loading')
)

const selectMobileRegistrationSuccess = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('mobileRegistrationSuccess')
)

const selectMobileRegistrationError = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('mobileRegistrationError')
)

const selectVerificationCodeSuccess = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('verificationCodeSuccess')
)

const selectVerificationCodeError = () => createSelector(
  selectProductPageDomain(),
  (substate) => substate.get('verificationCodeError')
)

export {
  selectLoader,
  selectProduct,
  selectMobileNumbers,
  selectProductSuccess,
  selectProductError,
  selectMarkdown,
  selectLoadingMarkdown,
  selectMobileRegistrationSuccess,
  selectMobileRegistrationError,
  selectVerificationCodeSuccess,
  selectVerificationCodeError
}
