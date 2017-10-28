import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'

import LoadingIndicator from 'components/LoadingIndicator'

export const locationHelper = locationHelperBuilder({})

export const defaultProps = {
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  AuthenticatingComponent: LoadingIndicator
}

export const userIsAuthenticated = connectedRouterRedirect({
  ...defaultProps,
  // Determine if the user is authenticated or not
  authenticatedSelector: (state) => state.getIn(['global', 'session']) !== null,
  // The url to redirect user to if they fail
  redirectPath: '/login',
 // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'

})

export const userIsNotAuthenticated = connectedRouterRedirect({
  ...defaultProps,
  // Determine if the user is authenticated or not
  authenticatedSelector: (state) => state.getIn(['global', 'session']) === null,
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated'
})
