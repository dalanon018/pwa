import React from 'react'
// import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

function H3 ({
  text,
  ...props
}) {
  return (
    <Header {...props} as='h3'>{text}</Header>
  )
}

H3.propTypes = {

}

export default H3
