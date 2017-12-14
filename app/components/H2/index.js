import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

function H2 ({
  children,
  ...props
}) {
  return (
    <Header {...props} as='h2'>{children}</Header>
  )
}

H2.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired
}

export default H2
