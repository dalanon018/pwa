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
    defaultMessage: 'This order has not been processed please try again.'
  },
  pushErrorMessageTitle: {
    id: 'app.containers.PurchaseEntity.pushErrorMessageTitle',
    defaultMessage: 'Register Push Notification Error'
  },
  pushErrorMessage: {
    id: 'app.containers.PurchaseEntity.pushErrorMessage',
    defaultMessage: 'Please make sure you have allowed Push Notifications on your browser or alternatively your browser doesn\'t support Push Notifications'
  },
  pushErrorUnsupportedMessage: {
    id: 'app.containers.PurchaseEntity.pushErrorUnsupportedMessage',
    defaultMessage: 'IOS devices currently do NOT support browser push notifications'
  }
})
