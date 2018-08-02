/**
*
* EmptyDataBlock
*
*/

import React, { Children } from 'react'
import styled from 'styled-components'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

const EmptyDataBlockWrapper = styled.div`
  ${props =>
    props.pageTrigger === 'productPage'
      ? `position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    left: 50%;`
      : 'position: relative;'
}

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;
`

function EmptyDataBlock ({children, productPageTrigger}) {
  const productPageName = productPageTrigger && productPageTrigger.name

  return (
    <EmptyDataBlockWrapper pageTrigger={productPageName}>
      { Children.toArray(children) }
    </EmptyDataBlockWrapper>
  )
}

EmptyDataBlock.propTypes = {

}

export default EmptyDataBlock
