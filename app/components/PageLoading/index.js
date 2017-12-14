/**
*
* PageLoading
*
*/

import React from 'react'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

const Wrapper = styled.div`
  height: 30px;
  left: 50%;
  margin-right: -50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  z-index: 2;
`

function PageLoading () {
  return (
    <Wrapper>
      <FormattedMessage {...messages.header} />
    </Wrapper>
  )
}

export default PageLoading
