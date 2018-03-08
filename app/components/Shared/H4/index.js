import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

const Wrapper = styled(Header)`
font-family: 'Roboto', sans-serif;
font-weight: 400;
`

function H4 ({
  children,
  ...props
}) {
  return (
    <Wrapper {...props} as='h4'>{children}</Wrapper>
  )
}

H4.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired
}

export default H4
