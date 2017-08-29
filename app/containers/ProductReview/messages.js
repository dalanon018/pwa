/*
 * ProductReview Messages
 *
 * This contains all the text for the ProductReview component.
 */
import { defineMessages } from 'react-intl'

const idSuffix = 'app.containers.ProductReview'

export default defineMessages({
  header: {
    id: 'app.containers.ProductReview.header',
    defaultMessage: 'This is ProductReview container !'
  },
  stepOne: {
    id: `${idSuffix}.stepOne`,
    defaultMessage: 'REVIEW ITEM TO PURCHASE'
  },
  stepTwo: {
    id: `${idSuffix}.stepTwo`,
    defaultMessage: 'SELECT PAYMENT METHOD'
  },
  stepThree: {
    id: `${idSuffix}.stepThree`,
    defaultMessage: 'SELECT DELIVERY STORE'
  },
  viewDetails: {
    id: `${idSuffix}.viewDetails`,
    defaultMessage: 'VIEW DETAILS'
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
    defaultMessage: 'CASH PREPAID'
  },
  cashDelivery: {
    id: `${idSuffix}.cashDelivery`,
    defaultMessage: 'CASH ON DELIVERY'
  },
  proceedNext: {
    id: `${idSuffix}.proceedNext`,
    defaultMessage: 'RESERVE FOR PAYMENT IN STORE'
  },
  errorHeader: {
    id: `${idSuffix}.errorHeader`,
    defaultMessage: 'Something went Wrong'
  },
  errorNoMobileProduct: {
    id: `${idSuffix}.errorNoMobileProduct`,
    defaultMessage: 'No registered mobile / No product selected'
  },
  errorSubmission: {
    id: `${idSuffix}.errorNoMobileProduct`,
    defaultMessage: 'There\'s problem with submission please try again.'
  }
})
