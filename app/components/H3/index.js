import React, { PropTypes } from 'react'
// import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

function H3 ({
  children,
  ...props
}) {
  return (
    <Header {...props} as='h3' className='color__secondary'>{children}</Header>
  )
}

H3.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired
}

export default H3
