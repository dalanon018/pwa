/*
 * PurchaseEntity Messages
 *
 * This contains all the text for the PurchaseEntity component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  errorMessageTitle: {
    id: 'app.containers.PurchaseEntity.errorMessageTitle',
    defaultMessage: 'Invalid Tracking Number.'
  },
  invalidTrackingNumber: {
    id: 'app.containers.PurchaseEntity.invalidTrackingNumber',
    defaultMessage: 'This Receipt is invalid. Please make sure that you got the correcty tracking number.'
  }
})
