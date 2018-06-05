/**
*
* RibbonWrapper
*
*/

import React from 'react'
import styled from 'styled-components'
import { Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import WindowWidth from 'components/Shared/WindowWidth'

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

    @media (min-width: 1024px) {
      height: 44px;
      width: 44px;
    }
  }
`

class RibbonWrapper extends React.PureComponent {
  static PropTypes = {
    rightSpace: PropTypes.bool
  }

  // TODO: Ask chino why named offsetRight where he match is offsetLeft?
  state = {
    offsetRight: ''
  }

  _handleMarginComputation = () => {
    const image = document.getElementsByClassName('slick-image-handler')[0]
    // offsetLeft since image doesnt have offsetRight
    this.setState({ offsetRight: image ? image.offsetLeft : 0 })
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
    const { rightSpace, percentage, windowWidth } = this.props
    const { offsetRight } = this.state

    const isDesktop = windowWidth >= 1024

    return (
      <Wrapper offsetRight={rightSpace && offsetRight}>
        <div className='ribbon-tag background__gold'>
          <Label as='b' className={`color__white padding__none text__weight--${isDesktop ? '700' : '500'}`} basic size={`${isDesktop ? 'large' : 'small'}`}>
            {!isEmpty(percentage) && percentage.get('type') === 'PERCENTAGE' ? '' : <FormattedMessage {...messages.peso} />}
            {!isEmpty(percentage) && percentage.get('amount')}
            {!isEmpty(percentage) && percentage.get('type') === 'PERCENTAGE' ? '%' : ''}
          </Label>
          <Label as='p' className={`color__white margin__top-negative--2 margin__bottom--none padding__none text__weight--${isDesktop ? '700' : '500'}`} basic size={`${isDesktop ? 'small' : 'mini'}`}>
            <FormattedMessage {...messages.off} />
          </Label>
        </div>
      </Wrapper>
    )
  }
}

export default WindowWidth(RibbonWrapper)
