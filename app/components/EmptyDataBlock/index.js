/**
*
* EmptyDataBlock
*
*/

import React from 'react'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

const EmptyDataBlockWrapper = styled.div`
  position: relative;

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;
  animation-delay: 1.5s
`

function EmptyDataBlock ({children}) {
  return (
    <EmptyDataBlockWrapper>
      <Loader active />
      {children}
    </EmptyDataBlockWrapper>
  )
}

EmptyDataBlock.propTypes = {

}

export default EmptyDataBlock
