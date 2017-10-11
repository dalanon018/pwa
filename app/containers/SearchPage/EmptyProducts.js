import React from 'react'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'

import messages from './messages'

export const EmptyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`

export const EmptyWrapperText = styled.p`
  font-size: 21px;
  letter-spacing: 1px;
  line-height: 1.5;
  text-align: center;
`

const EmptyProducts = () => (
  <EmptyWrapper>
    <EmptyWrapperText className='color__light-grey'>
      <FormattedMessage {...messages.emptyMessage} />
    </EmptyWrapperText>
  </EmptyWrapper>
)

export default EmptyProducts
