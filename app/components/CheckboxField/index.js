/**
*
* CheckboxField
*
*/

import React from 'react'
import styled from 'styled-components'

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Checkbox } from 'semantic-ui-react'

const CheckboxWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;

  input:checked~label:after {
    color: #8DC640 !important;
  }
  label {
    color: #5B5B5B !important;
    font-size: 14px;
  }
  #checkbox {
    margin-right: 5px;
  }
  a {
    color: #F58322;
  }

  @media (min-width: 768px) {
    &.prompt-number {
      justify-content: center;
    }
  }
`

function CheckboxField ({label, name, ...props}) {
  return (
    <CheckboxWrapper className='prompt-number'>
      <Checkbox id={name} {...props} />
      <label htmlFor={name}>{label}</label>
    </CheckboxWrapper>
  )
}

CheckboxField.propTypes = {

}

export default CheckboxField
