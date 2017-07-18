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
    defaultMessage: 'STAY CONNECTED'
  },
  faq: {
    id: `${idSuffix}.faq.message`,
    defaultMessage: `FAQS`
  },
  termsConditions: {
    id: `${idSuffix}.termsConditions.message`,
    defaultMessage: `TERMS AND CONDITIONS`
  },
  privacyPolicy: {
    id: `${idSuffix}.privacyPolicy.message`,
    defaultMessage: `PRIVACY POLICY`
  },
  copyRight: {
    id: `${idSuffix}.copyRight.message`,
    defaultMessage: `© 2017 CLIQQ. ALL RIGHTS RESERVED.`
  }
})
