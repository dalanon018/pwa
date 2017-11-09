import React, { PropTypes } from 'react'
import { Label } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const PurchaseUsecase = ({ status, storeName, modePayment }) => {
  const currentStatus = status ? `${modePayment}${status}` : 'unknownStatus'

  return (
    <Label className='text__roboto--light' as='p' basic size='large'>
      <FormattedMessage
        {...messages[currentStatus]}
        values={{ storeName }}
      />
    </Label>
  )
}

PurchaseUsecase.propTypes = {
  status: PropTypes.string.isRequired,
  storeName: PropTypes.string,
  modePayment: PropTypes.string.isRequired
}

export default PurchaseUsecase
