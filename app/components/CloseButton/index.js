/**
*
* CloseButton
*
*/

import React from 'react'
import styled from 'styled-components'

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import { Button } from 'semantic-ui-react'

const ButtonWrapper = styled.div`
  margin: 10px 0;
  text-align: center;

  .button {
    background: transparent;
    font-family: 'helveticamedium';
    letter-spacing: 2px;
    text-transform: uppercase;

    &:hover, &:focus {
      background: transparent;
      color: inherit;
    }
  }
`

function CloseButton ({close, text}) {
  return (
    <ButtonWrapper>
      <Button onClick={close}>{text}</Button>
    </ButtonWrapper>
  )
}

CloseButton.propTypes = {

}

export default CloseButton
