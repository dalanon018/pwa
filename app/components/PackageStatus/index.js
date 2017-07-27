/**
*
* PackageStatus
*
*/

import React, { PropTypes } from 'react'
import styled from 'styled-components'

import {
  Grid
} from 'semantic-ui-react'

import RESERVED from 'images/status/reserved.svg'
import CONFIRMED from 'images/status/paid.svg'
import INTRANSIT from 'images/status/intransit.svg'
import DELIVERED from 'images/status/delivered.svg'

import RESERVEDDONE from 'images/status/reserve-done.svg'
import CONFIRMEDDONE from 'images/status/paid-done.svg'
import INTRANSITDONE from 'images/status/intransit-done.svg'
import DELIVEREDDONE from 'images/status/delivered-done.svg'

const StatusWrapper = styled(Grid)`
  width: 100%
`
const StatusImg = styled.img`
  max-width: 50px;
`
const StatusColumnWrapper = styled.div`
  opacity: ${({ isDone, current }) => (isDone || current) ? '1' : '0.3'};
`

const StatusColumnConnectorWrapper = styled.div`
  opacity: ${({ isDone }) => (isDone) ? '1' : '0.3'};
`

const StatusConnecter = styled.div`
  height: 1px;
  width: 100%;
  border-top: 2px dotted ${({ isDone }) => isDone ? '#8DC641' : '#5B5B5B'};
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
    <Grid.Column className='padding__none' verticalAlign='middle'>
      <StatusColumnConnectorWrapper isDone={isDone} >
        <StatusConnecter isDone={isDone} />
      </StatusColumnConnectorWrapper>
    </Grid.Column>
  )
}

const ReservationStatus = ({ status, current }) => {
  const isDone = IS_RESERVED_DONE.includes(status)
  const BANNER = identifyActiveImage({
    true: RESERVEDDONE,
    false: RESERVED
  })(true)(isDone)

  return (
    <Grid.Column className='padding__none'>
      <StatusColumnWrapper isDone={isDone} current={current} >
        <StatusImg src={BANNER} />
      </StatusColumnWrapper>
    </Grid.Column>
  )
}

const PaidStatus = ({ status, current }) => {
  const isDone = IS_CONFIRMED_DONE.includes(status)
  const BANNER = identifyActiveImage({
    true: CONFIRMEDDONE,
    false: CONFIRMED
  })(true)(isDone)

  return (
    <Grid.Column className='padding__none'>
      <StatusColumnWrapper isDone={isDone} current={current} >
        <StatusImg src={BANNER} />
      </StatusColumnWrapper>
    </Grid.Column>
  )
}

const InTransitStatus = ({ status, current }) => {
  const isDone = IS_INTRANSIT_DONE.includes(status)
  const BANNER = identifyActiveImage({
    true: INTRANSITDONE,
    false: INTRANSIT
  })(true)(isDone)

  return (
    <Grid.Column className='padding__none'>
      <StatusColumnWrapper isDone={isDone} current={current} >
        <StatusImg src={BANNER} />
      </StatusColumnWrapper>
    </Grid.Column>
  )
}

const DeliveredStatus = ({ status, current }) => {
  const isDone = IS_DELIVERY_DONE.includes(status)
  const BANNER = identifyActiveImage({
    true: DELIVEREDDONE,
    false: DELIVERED
  })(true)(isDone)

  return (
    <Grid.Column className='padding__none'>
      <StatusColumnWrapper isDone={isDone} current={current} >
        <StatusImg src={BANNER} />
      </StatusColumnWrapper>
    </Grid.Column>
  )
}

function PackageStatus ({ status }) {
  return (
    <StatusWrapper padded columns={7}>
      <Grid.Row>
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
      </Grid.Row>
    </StatusWrapper>
  )
}

PackageStatus.propTypes = {
  status: PropTypes.string.isRequired
}

export default PackageStatus
