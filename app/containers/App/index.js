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
import { Switch } from 'react-router-dom'

import HocRoute from 'components/HocRoute'
import Buckets from 'containers/Buckets/Loadable'
import NotFound from 'containers/NotFoundPage/Loadable'

import {
  BUCKETS_NAME,
  NOTFOUND_NAME
} from './constants'

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

@media (min-width: 1024px) {
  max-width: none;
}
`

export default function App () {
  return (
    <AppWrapper>
      <BodyWrapper>
        <Helmet
          titleTemplate='%s - 7-Eleven CLiQQ'
          defaultTitle='7-Eleven CLiQQ'
        >
          <meta name='description' content='7-11 CLiQQ e-commerce website' />
        </Helmet>
        <Switch>
          <HocRoute routeName={BUCKETS_NAME} path='/' component={Buckets} />
          <HocRoute routeName={NOTFOUND_NAME} path='' component={NotFound} />
        </Switch>
      </BodyWrapper>
    </AppWrapper>
  )
}
