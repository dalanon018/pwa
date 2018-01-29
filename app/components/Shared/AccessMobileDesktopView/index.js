/**
 * main component on accessing if the component should be desktop or mobile
 */
/**
*
* Identifier if we need to load desktop or mobile
*
*/

import PropTypes from 'prop-types'
import WindowWidth from 'components/Shared/WindowWidth'

function AccessView ({ mobileView, desktopView, windowWidth }) {
  return windowWidth >= 1024 ? desktopView : mobileView
}

AccessView.propTypes = {
  mobileView: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.string
  ]),
  desktopView: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.string
  ])
}

export default WindowWidth(AccessView)
