/**
*
* TimerWrapper
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Label } from 'semantic-ui-react'

import { FormattedMessage } from 'react-intl'

import Timer from 'components/Shared/CountDownTimer'

import messages from './messages'

const Wrapper = styled.div`
  min-width: 180px;
  padding: 5px 10px;

  ${
    props => props.centered
    ? `
      border-radius: 3px;
      display: flex;
      justify-content: center;
      margin: 20px auto;
      width: 240px;
    `
    : `
    border-radius: 3px 0 0 3px;
    bottom: 12px;
    position: absolute;
    right: 0;
    z-index: 1;
    `
  }
`

const ContentWrapper = styled.div`
  align-items: center;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
`

const LabelWrapper = styled.div`
  width: 70px;

  span.label {
    line-height: 12px;
  }
`

function TimerWrapper ({ promo, centered }) {
  return (
    <Wrapper className='background__primary' centered={centered}>
      <ContentWrapper>
        <LabelWrapper>
          <Label as='span' size='mini' className='color__white text__weight--400'>
            <FormattedMessage {...messages.endsIn} />
          </Label>
        </LabelWrapper>
        <Label as='span' size='massive' className='color__white text__weight--500'>
          <Timer endDate={promo.get('thruDate')} />
        </Label>
      </ContentWrapper>
    </Wrapper>
  )
}

TimerWrapper.propTypes = {
  promo: PropTypes.object.isRequired
}

export default TimerWrapper
