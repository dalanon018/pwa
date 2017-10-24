/*
 * ProductPage Messages
 *
 * This contains all the text for the ProductPage component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  header: {
    id: 'app.containers.ProductPage.header',
    defaultMessage: 'This is ProductPage container !'
  },
  headerTerms: {
    id: 'app.containers.ProductPage.headerTerms',
    defaultMessage: 'TERMS AND CONDITIONS'
  },
  buttonLabelAgree: {
    id: 'app.containers.ProductPage.buttonLabelAgree',
    defaultMessage: 'Yes, I Agree'
  },
  successResendCode: {
    id: 'app.containers.ProductPage.successResendCode',
    defaultMessage: 'Succesfully Resend Code!'
  },
  successSendCodeTitle: {
    id: 'app.containers.ProductPage.successSendCodeTitle',
    defaultMessage: 'Code Sent!'
  },
  successSendCode: {
    id: 'app.containers.ProductPage.successSendCode',
    defaultMessage: 'A verification code has been sent to your mobile number. Please enter the code to proceed.'
  }
})
