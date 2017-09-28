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
    defaultMessage: `© {year} Cliqq. All Rights Reserved.`
  }
})
