/**
*
* Registration
*
*/

import React from 'react'
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl'
import messages from './messages'

function Registration () {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  )
}

Registration.propTypes = {

}

export default Registration
