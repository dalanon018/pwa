/**
*
* CloseButton
*
*/

import React from 'react'
import styled from 'styled-components'

import { Button, Label } from 'semantic-ui-react'

const ButtonWrapper = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  text-align: center;

  .button {
    background: transparent;
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
      <Button onClick={close}><Label as='p' basic size='large' className='color__secondary'>{text}</Label></Button>
    </ButtonWrapper>
  )
}

CloseButton.propTypes = {

}

export default CloseButton
