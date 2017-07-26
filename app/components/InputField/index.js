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
    <input className='input-field' {...props} />
  )
}

InputField.propTypes = {

}

export default InputField
