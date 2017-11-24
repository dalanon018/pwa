/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl'

const idSuffix = 'boilerplate.components.Footer'

export default defineMessages({
  stayConnected: {
    id: `${idSuffix}.stayConnected.message`,
    defaultMessage: 'Stay Connected'
  },
  faq: {
    id: `${idSuffix}.faq.message`,
    defaultMessage: `FAQS`
  },
  termsConditions: {
    id: `${idSuffix}.termsConditions.message`,
    defaultMessage: `Terms & Conditions`
  },
  privacyPolicy: {
    id: `${idSuffix}.privacyPolicy.message`,
    defaultMessage: `Privacy Policy`
  },
  copyRight: {
    id: `${idSuffix}.copyRight.message`,
    defaultMessage: `Cliqq All Rights Reserved`
  },
  storeDelivery: {
    id: `${idSuffix}.storeDelivery`,
    defaultMessage: `In-Store Delivery`
  },
  freeShippingDelivery: {
    id: `${idSuffix}.freeShippingDelivery`,
    defaultMessage: `Free Shipping to Store`
  },
  returnPolicy: {
    id: `${idSuffix}.returnPolicy`,
    defaultMessage: `Cliqq Return Policy`
  },
  changeMind: {
    id: `${idSuffix}.returnPolicy`,
    defaultMessage: `Change of Mind is Applicable`
  }
})
