/**
*
* CheckboxField
*
*/

import React from 'react'
import styled from 'styled-components'

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Checkbox, Label } from 'semantic-ui-react'

const CheckboxWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;

  input:checked~label:after {
    color: #8DC640 !important;
  }
  span {
    line-height: 17px !important;
  }
  a {
    color: #F58322;
    text-decoration: underline;
  }

  &.prompt-number {
    justify-content: center;
  }
`

function CheckboxField ({label, name, ...props}) {
  return (
    <CheckboxWrapper className='prompt-number'>
      <Checkbox id={name} {...props} />
      <Label as='span' basic size='large' color='grey' htmlFor={name}>{label}</Label>
    </CheckboxWrapper>
  )
}

CheckboxField.propTypes = {

}

export default CheckboxField
