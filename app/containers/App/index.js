/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import withProgressBar from 'components/ProgressBar'

const AppWrapper = styled.div`
  display: block;
  position: relative;
`

const BodyWrapper = styled.div`
  max-width: calc(767px + 16px * 2);
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-direction: column;
`

export function App (props) {
  return (
    <AppWrapper>
      <BodyWrapper className='test'>
        <Helmet
          titleTemplate='%s - 7-Eleven CliQQ'
          defaultTitle='7-Eleven CliQQ'
        />
        {React.Children.toArray(props.children)}
      </BodyWrapper>
    </AppWrapper>
  )
}

App.propTypes = {
  children: React.PropTypes.node
}

export default withProgressBar(App)
