/*
 * ProductPage Messages
 *
 * This contains all the text for the ProductPage component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  errorProductOrder: {
    id: 'app.containers.ProductPage.errorProductOrder',
    defaultMessage: 'There\'s an error on submission. Please try again.'
  },
  emailWarningInfo: {
    id: 'app.containers.ProductPage.emailWarningInfo',
    defaultMessage: 'E-mail Share.'
  },
  emailWarningDescription: {
    id: 'app.containers.ProductPage.emailWarningInfo',
    defaultMessage: 'An e-mail client must be installed to share this product.'
  },
  errorProductQuantity: {
    id: 'app.containers.ProductPage.errorProductQuantity',
    defaultMessage: 'Product is NOT Available at the moment. Please check back again later.'
  }
})
