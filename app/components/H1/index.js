import React from 'react'
// import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

function H1 ({
  text,
  ...props
}) {
  return (
    <Header {...props} as='h1'>{text}</Header>
  )
}

H1.propTypes = {

}

export default H1
