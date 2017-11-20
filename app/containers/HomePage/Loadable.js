/**
 *
 * Asynchronously loads the component for HomePage
 *
 */
import React from 'react'
import Loadable from 'react-loadable'
import LoadingIndicator from 'components/LoadingIndicator'
import {
  HOME_NAME
} from 'containers/App/constants'

const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator
})

function Component (props) {
  return (
    <LoadableComponent routeName={HOME_NAME} {...props} />
  )
}

export default Component
