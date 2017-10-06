import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'
import { Label } from 'semantic-ui-react'

// import PackageStatus from 'components/PackageStatus'

import messages from './messages'

const Timer = styled.div`
  font-size: 25px;
`

const HeaderOrder = styled.div`
  ${''}
  font-size: 11px;
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
    <div>
      <Label className='text__roboto--light' as='p' basic size='large'>
        <ShowHeaderStatus {...{ currentStatus, timer }} />
      </Label>
      <HeaderOrder {...{ status }} >
        {
          (status === 'RESERVED') &&
          <Timer>
            <p> { timer || '00:00:00'} </p>
          </Timer>
        }
      </HeaderOrder>
      {/* <PackageStatus {...{ status }} /> */}
    </div>
  )
}

PurchaseOrder.propTypes = {
  status: PropTypes.string.isRequired,
  receipt: PropTypes.object.isRequired
}

export default PurchaseOrder
