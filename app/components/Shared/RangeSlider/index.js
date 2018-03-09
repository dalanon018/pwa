/**
*
* RangeSlider
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components';
import Slider from 'react-rangeslider'
// To include the default styles
import 'react-rangeslider/lib/index.css'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

class RangeSlider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    const { usePoints, pointsModifier, maxPoints } = this.props
    return (
      <div>
        { usePoints }
        <Slider
          value={usePoints}
          onChange={pointsModifier}
          max={maxPoints}
        />
      </div>
    )
  }
}

RangeSlider.propTypes = {
  usePoints: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
  pointsModifier: PropTypes.func.isRequired
}

export default RangeSlider
