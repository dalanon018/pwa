import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const PurchaseUsecase = ({ status, storeName, modePayment }) => {
  const currentStatus = status ? `${modePayment}${status}` : 'unknownStatus'

  return (
    <Label className='text__weight--400 color__grey' as='p' basic size='big'>
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
