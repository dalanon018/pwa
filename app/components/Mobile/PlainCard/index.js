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
  height: ${props => props.size}px;
  // padding: 2px;
  width: ${props => props.size}px;
`

function PlainCard ({ children, size }) {
  return (
    <Wrapper size={size}>
      {children}
    </Wrapper>
  )
}

export default PlainCard
