/*
 * OrderSummary Messages
 *
 * This contains all the text for the OrderSummary component.
 */
import { defineMessages } from 'react-intl'

const idSuffix = 'app.containers.OrderSummary'

export default defineMessages({
  findStore: {
    id: `${idSuffix}.findStore`,
    defaultMessage: 'Find Store Nearby'
  },
  defaultStore: {
    id: `${idSuffix}.defaultStore`,
    defaultMessage: 'Your Default Store will be the last store you visited'
  },
  methodPayment: {
    id: `${idSuffix}.methodPayment`,
    defaultMessage: 'Method of Payment:'
  },
  chooseStore: {
    id: `${idSuffix}.chooseStore`,
    defaultMessage: 'Choose a 7-Eleven store!'
  },
  viewDetails: {
    id: `${idSuffix}.viewDetails`,
    defaultMessage: 'View Product Details'
  },
  productDetailsTitle: {
    id: `${idSuffix}.productDetailsTitle`,
    defaultMessage: 'PRODUCT DETAILS'
  },
  productDeliveryTitle: {
    id: `${idSuffix}.productDeliveryTitle`,
    defaultMessage: 'DELIVERY SCHEDULE'
  },
  cashPrepaid: {
    id: `${idSuffix}.cashPrepaid`,
    defaultMessage: 'Cash Prepaid'
  },
  cashDelivery: {
    id: `${idSuffix}.cashDelivery`,
    defaultMessage: 'Cash on Delivery'
  },
  proceedNext: {
    id: `${idSuffix}.proceedNext`,
    defaultMessage: 'Purchase your Product Now!'
  },
  errorHeader: {
    id: `${idSuffix}.errorHeader`,
    defaultMessage: 'Uh Oh! This Page is no longer available, we\'ll redirect you to the home page.'
  },
  errorNoMobileProduct: {
    id: `${idSuffix}.errorNoMobileProduct`,
    defaultMessage: ''
  },
  errorSubmission: {
    id: `${idSuffix}.errorNoMobileProduct`,
    defaultMessage: 'There is a problem with submission. Please make sure you are online and that you are logged in using your mobile number.'
  },
  emptyQuantity: {
    id: `${idSuffix}.errorSubmission`,
    defaultMessage: 'Sorry the item is currently OUT OF STOCK.'
  },
  storeEmpty: {
    id: `${idSuffix}.storeEmpty`,
    defaultMessage: 'Please select a store location.'
  },
  peso: {
    id: `${idSuffix}.peso`,
    defaultMessage: '₱ '
  }
})
