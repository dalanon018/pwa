import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'

import PackageStatus from 'components/PackageStatus'

import messages from './messages'

const HeaderBase = styled.div`
  font-family: 'helveticabold';
  text-align: center;
`

const Timer = styled.div`
  font-size: 60px;
  margin: 0 0 20px;

  @media (min-width: 1200px) {
    font-size: 100px;
  }
`

const HeaderOrder = styled(HeaderBase)`
  text-transform: uppercase;
  font-size: ${({ status }) => (status === 'RESERVED') ? '14px' : '18px'};

  @media(min-width: 370px) {
    span {
      font-size: 17px;
    }
  }

  @media (min-width: 768px) {
    padding: 0 60px;
  }
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
      <HeaderOrder>
        <ShowHeaderStatus {...{ currentStatus, timer }} />
      </HeaderOrder>
      <HeaderOrder {...{ status }} >
        {
          (status === 'RESERVED') &&
          <Timer>
            <p> { timer || '00:00:00'} </p>
          </Timer>
        }
      </HeaderOrder>
      <PackageStatus {...{ status }} />
    </div>
  )
}

PurchaseOrder.propTypes = {
  status: PropTypes.string.isRequired,
  receipt: PropTypes.object.isRequired
}

export default PurchaseOrder
