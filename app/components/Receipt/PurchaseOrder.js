import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { CountdownParser } from 'utils/date'

import { FormattedMessage } from 'react-intl'

import { Grid } from 'semantic-ui-react'

import Countdown from 'components/Countdown'
import PackageStatus from 'components/PackageStatus'

import messages from './messages'

const HeaderBase = styled.div`
  font-family: 'helveticabold';
  text-align: center;
`

const Timer = styled.div`
  font-size: 60px;
  margin: 20px 0;

  @media (min-width: 992px) {
    font-size: 100px;
  }
`

const HeaderOrder = styled(HeaderBase)`
  font-size: ${({ status }) => (status === 'RESERVED') ? '14px' : '18px'};
`

const PurchaseOrder = ({ status, receipt }) => {
  const currentStatus = status || 'unknownStatus'
  return (
    <Grid.Column>
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
    </Grid.Column>
  )
}

PurchaseOrder.propTypes = {
  status: PropTypes.string.isRequired,
  receipt: PropTypes.object.isRequired
}

export default PurchaseOrder
