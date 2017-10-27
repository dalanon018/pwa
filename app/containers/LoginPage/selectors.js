import { createSelector } from 'reselect'

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = () => (state) => state.get('loginPage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const selectMobileNumbers = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('mobileNumbers')
)

const selectMarkdown = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('markdown')
)

const selectLoadingMarkdown = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('loadingMarkdown')
)

const selectMobileRegistrationSuccess = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('mobileRegistrationSuccess')
)

const selectMobileRegistrationError = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('mobileRegistrationError')
)

const selectVerificationCodeSuccess = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('verificationCodeSuccess')
)

const selectVerificationCodeError = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('verificationCodeError')
)

const selectRecaptchaValidationSuccess = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('recaptchaValidationSuccess')
)

const selectRecaptchaValidationError = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('recaptchaValidationError')
)

const selectSubmissionLoader = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('submissionLoader')
)

export {
  selectLoginPageDomain,
  selectMobileNumbers,
  selectMarkdown,
  selectLoadingMarkdown,
  selectMobileRegistrationSuccess,
  selectMobileRegistrationError,
  selectVerificationCodeSuccess,
  selectVerificationCodeError,
  selectRecaptchaValidationSuccess,
  selectRecaptchaValidationError,
  selectSubmissionLoader
}
