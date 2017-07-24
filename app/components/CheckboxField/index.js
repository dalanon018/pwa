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
    color: #9BCB49 !important;
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

function CheckboxField ({label}) {
  return (
    <CheckboxWrapper>
      <Checkbox id='checkbox' />
      <label htmlFor='checkbox'>{label}<a>Terms and Conditions</a></label>
    </CheckboxWrapper>
  )
}

CheckboxField.propTypes = {

}

export default CheckboxField
