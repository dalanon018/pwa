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

import { imageStock } from 'utils/image-stock'

import EmptyDataBlock from 'components/EmptyDataBlock'
import ParagraphCenter from 'images/empty-center-text.png'
import ParagraphLeft from 'images/empty-left-text.png'
import { range } from 'lodash'

const LoadingParagraph = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`
const imgixOptions = {
  w: 414,
  h: 246,
  fit: 'fill',
  auto: 'compress',
  q: 35,
  lossless: 0
}

export const LoadingStateImage = ({ children, loading }) => {
  if (loading) {
    return (
      <EmptyDataBlock>
        <Image src={imageStock('Slider-Default.jpg', imgixOptions)} width='100%' />
      </EmptyDataBlock>
    )
  }

  return children
}

export const LoadingStateInfo = ({ children, loading, center, count }) => {
  const image = center ? ParagraphCenter : ParagraphLeft
  const width = center ? '90%' : '100%'

  if (loading) {
    return (
      <div>
        {
          range(count ? 4 : 1).map((_, index) => (
            <EmptyDataBlock key={index}>
              <LoadingParagraph>
                <Image src={image} width={width} />
              </LoadingParagraph>
            </EmptyDataBlock>
          ))
        }
      </div>
    )
  }

  return (
    <div>
      {children}
    </div>
  )
}
