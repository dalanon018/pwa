/**
*
* InputField
*
*/

import React from 'react'
import styled from 'styled-components'

import { Input } from 'semantic-ui-react'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

const InputWrapper = styled.div`
  input {
    background: transparent !important;
    border-bottom: 3px solid #9BCB49 !important;
    border-left: 0 !important;
    border-radius: 0 !important;
    border-right: 0 !important;
    border-top: 0 !important;
    font-family: helveticamedium !important;
    padding: 5px 15px !important;
    text-align: center;
    width: 100%;
  }
`

function InputField () {
  return (
    <InputWrapper>
      <Input />
    </InputWrapper>
  )
}

InputField.propTypes = {

}

export default InputField
