/**
*
* SearchButton
*
*/

import React from 'react'
import { injectIntl, intlShape } from 'react-intl'

import {
  Input,
  Icon
} from 'semantic-ui-react'

import messages from './messages'

function SearchBox ({ intl }) {
  return (
    <Input icon placeholder={intl.formatMessage(messages.placeHolder)} fluid>
      <input />
      <Icon name='search' size='large' />
    </Input>
  )
}

SearchBox.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(SearchBox)
