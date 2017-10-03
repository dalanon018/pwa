import React from 'react'
// import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

function H4 ({
  text,
  ...props
}) {
  return (
    <Header {...props} as='h4'>{text}</Header>
  )
}

H4.propTypes = {

}

// const H4 = styled.h4`
//   color: ${({ color }) => color || '#5b5b5b'};
//   text-align: ${({ center }) => center ? 'center' : 'left'}
//   font-family: 'helveticabold';
//   margin: 5px 0;
// `

export default H4
