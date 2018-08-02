/**
*
* PackageStatus
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RESERVED from 'images/status/reserved.svg'
import CONFIRMED from 'images/status/paid.svg'
import INTRANSIT from 'images/status/intransit.svg'
import DELIVERED from 'images/status/delivered.svg'

import RESERVEDDONE from 'images/status/reserve-done.svg'
import CONFIRMEDDONE from 'images/status/paid-done.svg'
import INTRANSITDONE from 'images/status/intransit-done.svg'
import DELIVEREDDONE from 'images/status/delivered-done.svg'

const StatusImg = styled.img`
  max-width: 40px;
  min-width: 34px;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 70px
    width: 100%;
  }
`
const StatusColumnWrapper = styled.div`
  flex-grow: 0;
  opacity: ${({ isDone, current }) => (isDone || current) ? '1' : '0.3'};
`

const StatusColumnConnectorWrapper = styled.div`
  flex-grow: 2;
  opacity: ${({ isDone }) => (isDone) ? '1' : '0.3'};

  @media (min-width: 400px) {
    flex-grow: 4;
  }

  @media (min-width: 490px) {
    flex-grow: 8;
  }

  @media (min-width: 768px) {
    flex-grow: 4;
    width: 20%;
  }
`

const StatusConnecter = styled.div`
  border-top: 2px dotted ${({ isDone }) => isDone ? '#8DC641' : '#5B5B5B'};
  height: 1px;
  width: 100%;
  min-width: 10px;
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
`

const IS_RESERVED_DONE = ['CONFIRMED', 'INTRANSIT', 'DELIVERED']
const IS_CONFIRMED_DONE = ['INTRANSIT', 'DELIVERED']
const IS_INTRANSIT_DONE = ['DELIVERED']
const IS_DELIVERY_DONE = []

/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
const identifyActiveImage = images => image => key =>
  key in images ? images[key] : image

const Connector = ({ current, isDone }) => {
  return (
    <StatusColumnConnectorWrapper isDone={isDone} >
      <StatusConnecter isDone={isDone} />
    </StatusColumnConnectorWrapper>
  )
}

const ReservationStatus = ({ status, current }) => {
  const isDone = IS_RESERVED_DONE.includes(status)
  const BANNER = identifyActiveImage({
    true: RESERVEDDONE,
    false: RESERVED
  })(true)(isDone)

  return (
    <StatusColumnWrapper isDone={isDone} current={current} >
      <StatusImg src={BANNER} />
    </StatusColumnWrapper>
  )
}

const PaidStatus = ({ status, current }) => {
  const isDone = IS_CONFIRMED_DONE.includes(status)
  const BANNER = identifyActiveImage({
    true: CONFIRMEDDONE,
    false: CONFIRMED
  })(true)(isDone)

  return (
    <StatusColumnWrapper isDone={isDone} current={current} >
      <StatusImg src={BANNER} />
    </StatusColumnWrapper>
  )
}

const InTransitStatus = ({ status, current }) => {
  const isDone = IS_INTRANSIT_DONE.includes(status)
  const BANNER = identifyActiveImage({
    true: INTRANSITDONE,
    false: INTRANSIT
  })(true)(isDone)

  return (
    <StatusColumnWrapper isDone={isDone} current={current} >
      <StatusImg src={BANNER} />
    </StatusColumnWrapper>
  )
}

const DeliveredStatus = ({ status, current }) => {
  const isDone = IS_DELIVERY_DONE.includes(status)
  const BANNER = identifyActiveImage({
    true: DELIVEREDDONE,
    false: DELIVERED
  })(true)(isDone)

  return (
    <StatusColumnWrapper isDone={isDone} current={current} >
      <StatusImg src={BANNER} />
    </StatusColumnWrapper>
  )
}

function PackageStatus ({ status }) {
  return (

    <Wrapper>
      <ReservationStatus {...{ status, current: (status === 'RESERVED') }} />
      <Connector {...{
        current: (status === 'RESERVED'),
        isDone: (IS_RESERVED_DONE.includes(status))
      }}
      />
      <PaidStatus {...{ status, current: (status === 'CONFIRMED') }} />
      <Connector {...{
        current: (status === 'CONFIRMED'),
        isDone: (IS_CONFIRMED_DONE.includes(status))
      }}
      />
      <InTransitStatus {...{ status, current: (status === 'INTRANSIT') }} />
      <Connector {...{
        current: (status === 'DELIVERED'),
        isDone: (IS_INTRANSIT_DONE.includes(status))
      }}
      />
      <DeliveredStatus {...{ status, current: (status === 'DELIVERED') }} />
    </Wrapper>
  )
}

PackageStatus.propTypes = {
  status: PropTypes.string.isRequired
}

export default PackageStatus
