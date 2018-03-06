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
  border-radius: 6px;
  box-shadow: 0px 0px 5px 0px rgba(247,247,247,1);
  display: flex;
  height: ${props => props.size}px;
  padding: 2px;
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
