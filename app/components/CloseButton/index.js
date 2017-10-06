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
  margin-top: 15px;
  text-align: center;

  .button {
    background: transparent;
    letter-spacing: 2px;
    padding: 0;

    &:hover, &:focus {
      background: transparent;
      color: inherit;
    }
  }
`

function CloseButton ({close, text}) {
  return (
    <ButtonWrapper>
      <Button onClick={close} size='large'>{text}</Button>
    </ButtonWrapper>
  )
}

CloseButton.propTypes = {

}

export default CloseButton
