import React, { PropTypes } from 'react'
import { Label } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const PurchaseUsecase = ({ status }) => {
  const currentStatus = status || 'unknownStatus'

  return (
    <Label className='text__roboto--light' as='p' basic size='large'>
      <FormattedMessage {...messages[currentStatus]} />
    </Label>
  )
}

PurchaseUsecase.propTypes = {
  status: PropTypes.string.isRequired
}

export default PurchaseUsecase
