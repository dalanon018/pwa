import { createSelector } from 'reselect'

/**
 * Direct selector to the faqPage state domain
 */
const selectFaqPageDomain = () => (state) => state.get('faqPage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by FaqPage
 */

const makeSelectFaqPage = () => createSelector(
  selectFaqPageDomain(),
  (substate) => substate.toJS()
)

const selectMarkdown = () => createSelector(
  selectFaqPageDomain(),
  (substate) => substate.get('markdown')
)

const selectLoading = () => createSelector(
  selectFaqPageDomain(),
  (substate) => substate.get('loading')
)

export default makeSelectFaqPage
export {
  selectFaqPageDomain,
  selectMarkdown,
  selectLoading
}
