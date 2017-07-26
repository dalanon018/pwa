/*
 * PopupSlide Messages
 *
 * This contains all the text for the PopupSlide component.
 */
import { defineMessages } from 'react-intl'

const idSuffix = 'app.components.PopupSlide'

export default defineMessages({
  header: {
    id: `${idSuffix}.header`,
    defaultMessage: 'This is the PopupSlide component !'
  },
  register: {
    id: `${idSuffix}.register`,
    defaultMessage: 'Register your number'
  },
  label: {
    id: `${idSuffix}.label`,
    defaultMessage: 'We need your mobile number to continue.'
  },
  phonePrefix: {
    id: `${idSuffix}.phonePrefix`,
    defaultMessage: '+63'
  }
})
