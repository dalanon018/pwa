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
import DesktopHeader from 'components/DesktopHeader'
import DesktopFooter from 'components/DesktopFooter'

const AppWrapper = styled.div`
  display: block;
  position: relative;
`

const BodyWrapper = styled.div`
  max-width: calc(1200px + 16px * 2);
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-direction: column;
`

export function App (props) {
  return (
    <AppWrapper>
      <DesktopHeader />
      <BodyWrapper>
        <Helmet
          titleTemplate='%s - 7-Eleven CliQQ'
          defaultTitle='7-Eleven CliQQ'
          meta={[
            { name: 'description', content: 'A 7-Eleven CliQQ application' }
          ]}
          link={[
            { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' }
          ]}
        />
        {React.Children.toArray(props.children)}
      </BodyWrapper>
      <DesktopFooter />
    </AppWrapper>
  )
}

App.propTypes = {
  children: React.PropTypes.node
}

export default withProgressBar(App)
