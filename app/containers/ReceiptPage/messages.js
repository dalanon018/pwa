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
  },
  pushErrorMessageTitle: {
    id: 'app.containers.PurchaseEntity.pushErrorMessageTitle',
    defaultMessage: 'Register Push Notification Error'
  },
  pushErrorMessage: {
    id: 'app.containers.PurchaseEntity.pushErrorMessage',
    defaultMessage: 'Please make sure you allow Push Notification on your browser. Or your browser don\'t support Push Notifications'
  },
  pushErrorUnsupportedMessage: {
    id: 'app.containers.PurchaseEntity.pushErrorUnsupportedMessage',
    defaultMessage: 'IOS is NOT supported for Push Notification'
  }
})
