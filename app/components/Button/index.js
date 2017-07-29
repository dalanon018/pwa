/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { PropTypes, Children } from 'react'
import styled from 'styled-components'
import {
  Button
} from 'semantic-ui-react'

import ButtonNext from 'images/icons/button-next.svg'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  padding: 2px 0;
  text-transform: uppercase;
`
const TextWrapper = styled.div`
  font-size: ${({ fontSize }) => fontSize}px;
  margin-right: 10px;
`

const ImageWrapper = styled.img`
  margin-top: 1px;
  width: ${({ fontSize }) => (fontSize - 1)}px;
`

function ElemButton ({ children, size, ...rest }) {
  let fontSize = size || 16
  // Render an anchor tag
  // If the Button has a handleRoute prop, we want to render a button
  return (
    <Button {...rest} >
      <Wrapper>
        <TextWrapper fontSize={fontSize}>
          { Children.toArray(children) }
        </TextWrapper>
        <ImageWrapper src={ButtonNext} fontSize={fontSize} />
      </Wrapper>
    </Button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default ElemButton
