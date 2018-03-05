/**
*
* PlainCard
*
*/

import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: #FFFFFF;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 0px rgba(247,247,247,1);
  padding: 2px;
`

function PlainCard ({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default PlainCard
