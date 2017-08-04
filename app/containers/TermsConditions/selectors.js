import { createSelector } from 'reselect'

/**
 * Direct selector to the termsConditions state domain
 */
const selectTermsConditionsDomain = () => (state) => state.get('termsConditions')

/**
 * Other specific selectors
 */

/**
 * Default selector used by TermsConditions
 */

const makeSelectTermsConditions = () => createSelector(
  selectTermsConditionsDomain(),
  (substate) => substate.toJS()
)

export default makeSelectTermsConditions
export {
  selectTermsConditionsDomain
}
