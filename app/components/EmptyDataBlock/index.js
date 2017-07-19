/**
*
* EmptyDataBlock
*
*/

import React, { Children } from 'react'
import styled from 'styled-components'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

import Loader from 'components/LoadingIndicator'

const EmptyDataBlockWrapper = styled.div`
  position: relative;

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;
`

function EmptyDataBlock ({children}) {
  return (
    <EmptyDataBlockWrapper>
      <Loader active />
      { Children.toArray(children) }
    </EmptyDataBlockWrapper>
  )
}

EmptyDataBlock.propTypes = {

}

export default EmptyDataBlock
