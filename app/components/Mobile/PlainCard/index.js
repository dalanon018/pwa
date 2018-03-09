/**
*
* PlainCard
*
*/

import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(120,120,120, 0.1);
  display: flex;
  flex-wrap: wrap;
  height: ${props => props.height}px;
  justify-content: center;
  width: ${props => props.width ? props.width + 'px' : '100%'};

  img {
    ${
      props => props.borderRadius &&
      'border-radius: 3px;'
    }
  }
`

function PlainCard ({ children, borderRadius, width, height }) {
  return (
    <Wrapper borderRadius width={width} height={height}>
      {children}
    </Wrapper>
  )
}

export default PlainCard
