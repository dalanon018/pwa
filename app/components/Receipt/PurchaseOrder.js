import React, { PropTypes } from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { FormattedMessage } from 'react-intl'

import Countdown from 'components/Countdown'
import PackageStatus from 'components/PackageStatus'

import messages from './messages'

const PurchaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const HeaderBase = styled.div`
  font-family: 'helveticabold';
  text-align: center;
`

const Timer = styled.div`
  font-size: 60px;
`

const HeaderOrder = styled(HeaderBase)`
  font-size: ${({ status }) => (status === 'RESERVED') ? '14px' : '18px'};
`

const PurchaseOrder = ({ status }) => {
  const currentStatus = status || 'unknownStatus'

  return (
    <PurchaseWrapper>
      <HeaderOrder {...{ status }} >
        <FormattedMessage {...messages[currentStatus]} />
        {
          (status === 'RESERVED') &&
          <Timer>
            <Countdown endDate={(moment().add(1, 'hours').valueOf() / 1000)} />
          </Timer>
        }
      </HeaderOrder>
      <PackageStatus {...{ status }} />
    </PurchaseWrapper>
  )
}

PurchaseOrder.propTypes = {
  status: PropTypes.string.isRequired
}

export default PurchaseOrder
