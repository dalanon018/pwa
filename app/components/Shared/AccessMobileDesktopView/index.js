/**
 * main component on accessing if the component should be desktop or mobile
 */

 /**
*
* Brand
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import WindowWidth from 'components/Shared/WindowWidth'

function AccessView ({ MobileView, DesktopView }) {
  const { windowWidth } = this.props

  return windowWidth >= 1024 ? <DesktopView /> : <MobileView />
}

AccessView.propTypes = {
  MobileView: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.children,
    PropTypes.string
  ]),
  DesktopView: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.children,
    PropTypes.string
  ])
}

export default WindowWidth(AccessView)
