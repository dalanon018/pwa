/**
*
* LoadingBlock
*
*/

import React from 'react'
import styled from 'styled-components'
import {
  Image
} from 'semantic-ui-react'

import EmptyDataBlock from 'components/EmptyDataBlock'
import EmptyImage from 'images/broken-image.jpg'
import ParagraphCenter from 'images/empty-center-text.png'
import ParagraphLeft from 'images/empty-left-text.png'

const LoadingParagraph = styled.div`
  margin: 20px 0;
`
export const LoadingStateImage = ({ children, loading }) => {
  if (loading) {
    return (
      <EmptyDataBlock>
        <Image src={EmptyImage} width='100%' />
      </EmptyDataBlock>
    )
  }

  return children
}

export const LoadingStateInfo = ({ children, loading, center }) => {
  const image = center ? ParagraphCenter : ParagraphLeft
  if (loading) {
    return (
      <EmptyDataBlock>
        <LoadingParagraph>
          <Image src={image} width='100%' />
        </LoadingParagraph>
      </EmptyDataBlock>
    )
  }

  return (
    <div>
      {children}
    </div>
  )
}
