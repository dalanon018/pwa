import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'
import { Label } from 'semantic-ui-react'

// import PackageStatus from 'components/PackageStatus'

import messages from './messages'

const Timer = styled.div`
  font-size: 25px;
  font-weight: 700;
`

const HeaderOrder = styled.div`
  ${''}
  font-size: 11px;
`

const TimerWrapper = styled.div`
  padding: 0 50px;
`

const ShowHeaderStatus = ({currentStatus, timer}) => {
  if (timer === '00:00:00' && (currentStatus === 'RESERVED')) {
    return (
      <FormattedMessage {...messages.RESERVEDEXPIRED} />
    )
  }

  return (
    <FormattedMessage {...messages[currentStatus]} />
  )
}
const PurchaseOrder = ({ status, receipt, timer }) => {
  const currentStatus = status || 'unknownStatus'
  return (
    <TimerWrapper>
      <Label className='text__roboto--light color__secondary' as='p' basic size='medium'>
        <ShowHeaderStatus {...{ currentStatus, timer }} />
      </Label>
      <HeaderOrder {...{ status }} >
        {
          (status === 'RESERVED') &&
          <Timer>
            <p className='color__secondary'> { timer || '00:00:00'} </p>
          </Timer>
        }
      </HeaderOrder>
      {/* <PackageStatus {...{ status }} /> */}
    </TimerWrapper>
  )
}

PurchaseOrder.propTypes = {
  status: PropTypes.string.isRequired,
  receipt: PropTypes.object.isRequired
}

export default PurchaseOrder
