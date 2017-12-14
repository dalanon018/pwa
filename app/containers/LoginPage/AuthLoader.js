import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LoadingIndicator from 'components/LoadingIndicator'

import {
  ifElse,
  identity
} from 'ramda'

const LoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function AuthLoader (WrapperComponent) {
  class HOCComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
      authenticating: PropTypes.bool.isRequired,
      isLogin: PropTypes.func.isRequired,
      setAuthenticating: PropTypes.func.isRequired
    }

    loadingComponent = () => (
      <LoaderWrapper>
        <LoadingIndicator />
          Authenticating...
      </LoaderWrapper>
    )

    loginComponent = () => (
      <WrapperComponent {...this.props} />
    )

    componentWillMount () {
      const { isLogin, setAuthenticating } = this.props
      // we need to let them know that we are authenticating
      setAuthenticating(true)
      /**
       * we will check if the user is login
       * and if login we need to redirect them.
       */
      isLogin()
    }

    render () {
      const { authenticating } = this.props
      const toggleLoginComponent = ifElse(
        identity,
        this.loadingComponent,
        this.loginComponent
      )

      return toggleLoginComponent(authenticating)
    }
  }

  return HOCComponent
}
