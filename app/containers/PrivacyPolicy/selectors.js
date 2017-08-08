import { createSelector } from 'reselect'

/**
 * Direct selector to the privacyPolicy state domain
 */
const selectPrivacyPolicyDomain = () => (state) => state.get('privacyPolicy')

/**
 * Other specific selectors
 */

/**
 * Default selector used by PrivacyPolicy
 */

const makeSelectPrivacyPolicy = () => createSelector(
  selectPrivacyPolicyDomain(),
  (substate) => substate.toJS()
)

const selectMarkdown = () => createSelector(
  selectPrivacyPolicyDomain(),
  (substate) => substate.get('markdown')
)

const selectLoading = () => createSelector(
  selectPrivacyPolicyDomain(),
  (substate) => substate.get('loading')
)

export default makeSelectPrivacyPolicy
export {
  selectPrivacyPolicyDomain,
  selectMarkdown,
  selectLoading
}
