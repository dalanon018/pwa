/**
*
* RangeSlider
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components';
// To include the default styles
import Slider from 'react-rangeslider'

import {
  subtract
} from 'ramda'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

class RangeSlider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  _handlePointsModifier = (value) => {
    const { currentPoints, pointsModifier } = this.props
    return (subtract(currentPoints, value) >= 0)
      ? pointsModifier(value)
      : null
  }

  render () {
    const { usePoints, maxPoints } = this.props
    return (
      <Slider
        value={usePoints}
        onChange={this._handlePointsModifier}
        max={maxPoints}
      />
    )
  }
}

RangeSlider.propTypes = {
  usePoints: PropTypes.number.isRequired,
  currentPoints: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
  pointsModifier: PropTypes.func.isRequired
}

export default RangeSlider
