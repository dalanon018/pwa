/**
*
* InputField
*
*/

import React from 'react'
// import styled from 'styled-components'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

function InputField ({
  ...props
}) {
  return (
    <input className='input-field color__secondary' {...props} />
  )
}

InputField.propTypes = {

}

export default InputField
