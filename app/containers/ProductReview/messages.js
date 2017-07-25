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
    defaultMessage: 'PROCEED TO NEXT STEP'
  }
})
