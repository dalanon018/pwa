/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import HomePage from 'containers/HomePage/Loadable'
import FeaturePage from 'containers/FeaturePage/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'

import HeaderMenu from 'components/HeaderMenu'
import Footer from 'components/Footer'

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`

export default function App () {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate='%s - 7-Eleven CliQQ'
        defaultTitle='7-Eleven CliQQ'
      >
        <meta name='description' content='7-11 CliQQ e-commerce website' />
      </Helmet>
      <HeaderMenu showBack hideSearch hideBarcode={false} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/menu' component={FeaturePage} />
        <Route path='/activities' component={FeaturePage} />
        <Route path='/tags/:id' component={FeaturePage} />

        <Route path='/products/:id' component={FeaturePage} />
        <Route path='/categories/:id' component={FeaturePage} />
        <Route path='/brands/:id' component={FeaturePage} />

        <Route path='/faq' component={FeaturePage} />
        <Route path='/terms' component={FeaturePage} />
        <Route path='/privacy' component={FeaturePage} />
        <Route path='' component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  )
}
