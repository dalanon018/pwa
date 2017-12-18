import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { compose, propOr } from 'ramda'

import { fnQueryObject } from 'utils/http'

export const defaultProps = {
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => {
    const { location: { search } } = ownProps
    const queryString = compose(
      propOr('/', 'redirect'),
      fnQueryObject
    )

    return queryString(search) || '/'
  }
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
