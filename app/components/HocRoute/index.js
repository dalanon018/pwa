/**
*
* Hocroute
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

function HocRoute ({ routeName, component, ...props }) {
  const HOCComponent = (Component) => (props) => (
    <Component
      routeName={routeName}
      {...props}
    />
  )

  return (
    <Route
      component={HOCComponent(component)}
      {...props}
    />
  )
}

HocRoute.propTypes = {
  routeName: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
}

export default HocRoute
