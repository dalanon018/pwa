import React from 'react'
import PropTypes from 'prop-types'
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
  padding: 0 45px;
`

const ShowHeaderStatus = ({currentStatus, status, storeName, timer}) => {
  if (timer === '00:00:00' && (status === 'RESERVED')) {
    return (
      <FormattedMessage {...messages.CASHRESERVEDEXPIRED} />
    )
  }

  return (
    <FormattedMessage
      {...messages[currentStatus]}
      values={{ storeName }}
    />
  )
}
const PurchaseOrder = ({ status, modePayment, storeName, receipt, timer }) => {
  const currentStatus = status ? `${modePayment}${status}` : 'unknownStatus'
  return (
    <TimerWrapper>
      <Label className='text__roboto--light color__secondary' as='p' basic size='medium'>
        <ShowHeaderStatus {...{ currentStatus, status, storeName, timer }} />
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
  modePayment: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  storeName: PropTypes.string,
  receipt: PropTypes.object.isRequired
}

export default PurchaseOrder
