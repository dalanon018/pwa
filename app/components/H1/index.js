import React, { PropTypes } from 'react'
// import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

function H1 ({
  children,
  ...props
}) {
  return (
    <Header {...props} as='h1'>{children}</Header>
  )
}

H1.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired
}

export default H1
