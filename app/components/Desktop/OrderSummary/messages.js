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
  cantFindStore: {
    id: `${idSuffix}.cantFindStore`,
    defaultMessage: `Can't find the store? Check our {storeLocator}`
  },
  storeLocator: {
    id: `${idSuffix}.storeLocator`,
    defaultMessage: 'Store Locator'
  },
  defaultStore: {
    id: `${idSuffix}.defaultStore`,
    defaultMessage: 'Recently visited stores will become your default stores.'
  },
  orderSummary: {
    id: `${idSuffix}.methodPayment`,
    defaultMessage: 'Review Order'
  },
  methodPayment: {
    id: `${idSuffix}.methodPayment`,
    defaultMessage: 'Select Payment Method'
  },
  chooseStore: {
    id: `${idSuffix}.chooseStore`,
    defaultMessage: 'Select a 7-Eleven store for pick up'
  },
  viewDetails: {
    id: `${idSuffix}.viewDetails`,
    defaultMessage: 'View Details'
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
    defaultMessage: 'PLACE ORDER'
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
  },
  discountText: {
    id: `${idSuffix}.discountText`,
    defaultMessage: '*Discounts are automatically discounted at Method of Payment'
  },
  earnPoints: {
    id: `${idSuffix}.earnPoints`,
    defaultMessage: 'Points will be earned once claimed. How do I earn points?'
  },
  registeredMobile: {
    id: `${idSuffix}.registeredMobile`,
    defaultMessage: 'Registered Mobile Number'
  },
  signedAs: {
    id: `${idSuffix}.signedAs`,
    defaultMessage: 'Signed in as: '
  },
  size: {
    id: `${idSuffix}.size`,
    defaultMessage: 'Size: '
  }
})
