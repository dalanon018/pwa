/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Children } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Button
} from 'semantic-ui-react'

import ButtonNext from 'images/icons/button-next.svg'

const ButtonWrapper = styled.div`
  padding: 0 !important;
  text-align: center;
  width: 100%;

  @media (min-width: 768px) {
    ${
      props => props.desktopLayout
      ? `
        text-align: left;

        .custom-button {
          max-width: 530px;
          padding: 20px 40px !important;
          width: 100%;
        }
      `
      : ''
    }
  }
`

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
  line-height: 15px;
  margin-right: 10px;
`

const ImageWrapper = styled.img`
  margin-top: 1px;
  width: ${({ fontSize }) => (fontSize - 1)}px;
`

function ElemButton ({ children, size, desktopLayout, ...rest }) {
  let fontSize = size || 16
  // Render an anchor tag
  // If the Button has a handleRoute prop, we want to render a button
  return (
    <ButtonWrapper desktopLayout={desktopLayout}>
      <Button className='custom-button' {...rest} >
        <Wrapper>
          <TextWrapper fontSize={fontSize}>
            { Children.toArray(children) }
          </TextWrapper>
          <ImageWrapper src={ButtonNext} fontSize={fontSize} />
        </Wrapper>
      </Button>
    </ButtonWrapper>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default ElemButton
