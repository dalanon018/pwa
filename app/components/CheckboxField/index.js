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
import A from 'components/A'

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
`

function CheckboxField ({label, ...props}) {
  return (
    <CheckboxWrapper>
      <Checkbox id='checkbox' {...props} />
      <label htmlFor='checkbox'>{label}<A href='https://google.com'>Terms and Conditions</A></label>
    </CheckboxWrapper>
  )
}

CheckboxField.propTypes = {

}

export default CheckboxField
