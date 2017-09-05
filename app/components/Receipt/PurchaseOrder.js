import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { CountdownParser } from 'utils/date'

import { FormattedMessage } from 'react-intl'

import Countdown from 'components/Countdown'
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
  margin-bottom: 15px;

  @media(min-width: 370px) {
    span {
      font-size: 17px;
    }
  }

  @media (min-width: 768px) {
    padding: 0 60px;
  }
`

const PurchaseOrder = ({ status, receipt }) => {
  const currentStatus = status || 'unknownStatus'
  return (
    <div>
      <HeaderOrder>
        <FormattedMessage {...messages[currentStatus]} />
      </HeaderOrder>
      <HeaderOrder {...{ status }} >
        {
          (status === 'RESERVED') &&
          <Timer>
            <Countdown endDate={CountdownParser(receipt.get('claimExpiry'))} />
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
