/*
 * Registration Messages
 *
 * This contains all the text for the Registration component.
 */
import { defineMessages } from 'react-intl'

const idSuffix = 'app.components.Registration'

export default defineMessages({
  header: {
    id: `${idSuffix}.header`,
    defaultMessage: 'This is the PopupSlide component !'
  },
  register: {
    id: `${idSuffix}.register`,
    defaultMessage: 'Register Your Number'
  },
  label: {
    id: `${idSuffix}.label`,
    defaultMessage: 'We need your mobile number to continue.'
  },
  phonePrefix: {
    id: `${idSuffix}.phonePrefix`,
    defaultMessage: '+63'
  },
  headerTerms: {
    id: `${idSuffix}.headerTerms`,
    defaultMessage: 'TERMS & CONDITIONS'
  },
  submitButton: {
    id: `${idSuffix}.submitButton`,
    defaultMessage: 'SUBMIT'
  },
  checkTermsLabel: {
    id: `${idSuffix}.checkTermsLabel`,
    defaultMessage: 'By clicking `Submit` I agree to have read and accepted the '
  },
  checkTermsLink: {
    id: `${idSuffix}.checkTermsLink`,
    defaultMessage: 'Terms and Conditions'
  },
  buttonLabelAgree: {
    id: `${idSuffix}.buttonLabelAgree`,
    defaultMessage: 'Yes, I Agree'
  },
  successResendCode: {
    id: `${idSuffix}.successResendCode`,
    defaultMessage: 'Succesfully Resent Code!'
  },
  successSendCodeTitle: {
    id: `${idSuffix}.successSendCodeTitle`,
    defaultMessage: 'Code Sent!'
  },
  successSendCode: {
    id: `${idSuffix}.successSendCode`,
    defaultMessage: 'A verification code has been sent to your mobile number. Please enter the code to proceed.'
  }
})
