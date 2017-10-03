import React from 'react'
// import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

function H2 ({
  text,
  ...props
}) {
  return (
    <Header {...props} as='h2'>{text}</Header>
  )
}

H2.propTypes = {

}

// const H2 = styled.h2`
//   font-size: 18px;
//   color: ${({ color }) => color || '#5b5b5b'};
//   text-align: ${({ center }) => center ? 'center' : 'left'}
//   font-weight: 400;
// `

export default H2
