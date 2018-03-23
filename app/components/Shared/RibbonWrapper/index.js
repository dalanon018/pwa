/**
*
* RibbonWrapper
*
*/

import React from 'react'
import styled from 'styled-components'
import { Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

const Wrapper = styled.div`
  position: absolute;
  right: ${props => props.offsetRight ? props.offsetRight + 'px' : 0};
  top: 10px;
  z-index: 3;

  .ribbon-tag {
    align-items: middle;
    border-radius: 3px 0 0 3px;
    display: flex;
    flex-wrap: wrap;
    font-size: 11px;
    font-weight: 700;
    height: 38px;
    justify-content: center;
    line-height: 14px;
    padding: 4px;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 40px;

    span {
      line-height: 8px;
      margin-top: -5px;
    }
  }
`

class RibbonWrapper extends React.PureComponent {
  static PropTypes = {
    rightSpace: PropTypes.bool
  }

  state = {
    offsetRight: ''
  }

  _handleMarginComputation = () => {
    const image = document.getElementsByClassName('slick-image-handler')[0]
    this.setState({ offsetRight: image.offsetLeft })
  }

  componentDidMount () {
    this._handleMarginComputation()
    window.addEventListener('resize', this._handleMarginComputation)
  }

  componentDidUpdate () {
    this._handleMarginComputation()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._handleMarginComputation)
  }

  render () {
    const { rightSpace } = this.props
    const { offsetRight } = this.state

    return (
      <Wrapper offsetRight={rightSpace && offsetRight}>
        <div className='ribbon-tag background__gold'>
          <Label as='b' className='color__white padding__none text__weight--500' basic size='small'>20%</Label>
          <Label as='span' className='color__white padding__none text__weight--500' basic size='mini'>
            <FormattedMessage {...messages.off} />
          </Label>
        </div>
      </Wrapper>
    )
  }
}

export default RibbonWrapper
