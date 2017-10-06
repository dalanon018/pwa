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
    defaultMessage: 'Enter Verification Code'
  },
  label: {
    id: `${idSuffix}.label`,
    defaultMessage: 'Please enter the verification code sent via SMS'
  },
  resend: {
    id: `${idSuffix}.resend`,
    defaultMessage: 'Resend Code'
  }
})
