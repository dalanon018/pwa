/**
*
* RangeSlider
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Slider from 'react-rangeslider'

import { Image, Label } from 'semantic-ui-react'

import ActiveIncrementButton from 'images/icons/active-increment-point.svg'
import ActiveDecrementButton from 'images/icons/active-decrement-point.svg'
import DisabledIncrementButton from 'images/icons/disabled-increment-point.svg'
import DisabledDecrementButton from 'images/icons/disabled-decrement-point.svg'

import {
  subtract
} from 'ramda'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: -15px;
  padding: 0 10px;

   img {
     width: 35px;
   }

   .rangeslider.rangeslider-horizontal {
     margin: 20px 15px !important;
     width: 100%;
   }
`

class RangeSlider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  _handlePointsModifier = (value) => {
    const { currentPoints, pointsModifier } = this.props
    return (subtract(currentPoints, value) >= 0)
      ? pointsModifier(value)
      : null
  }

  _handleDecrementButton = () => {
    const { usePoints } = this.props
    const enable = !!(usePoints > 0)
    return {
      image: enable ? ActiveDecrementButton : DisabledDecrementButton,
      fn: enable ? () => this._handlePointsModifier(usePoints - 1) : () => {}
    }
  }

  _handleIncrementButton = () => {
    const { usePoints, maxPoints } = this.props
    const enable = !!(usePoints < maxPoints)
    return {
      image: enable ? ActiveIncrementButton : DisabledIncrementButton,
      fn: enable ? () => this._handlePointsModifier(usePoints + 1) : () => {}
    }
  }

  render () {
    const { usePoints, maxPoints } = this.props
    const DecrementButton = this._handleDecrementButton()
    const IncrementButton = this._handleIncrementButton()

    return (
      <div>
        <Label className='color__teal text__weight--700 text__align--center margin__vertical--10' as='p' basic size='massive'>
          { usePoints }
        </Label>
        <Wrapper>
          <Image src={DecrementButton.image} alt='CLiQQ' onClick={() => DecrementButton.fn()} />
          <Slider
            value={usePoints}
            onChange={this._handlePointsModifier}
            max={maxPoints}
          />
          <Image src={IncrementButton.image} alt='CLiQQ' onClick={() => IncrementButton.fn()} />
        </Wrapper>
      </div>
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
