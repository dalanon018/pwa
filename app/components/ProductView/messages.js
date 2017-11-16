/*
 * ProductView Messages
 *
 * This contains all the text for the ProductView component.
 */
import { defineMessages } from 'react-intl'

const idSuffix = 'app.containers.ProductView'

export default defineMessages({
  header: {
    id: `${idSuffix}.header`,
    defaultMessage: 'This is the ProductView component !'
  },
  sale: {
    id: `${idSuffix}.sale`,
    defaultMessage: 'SALE!'
  },
  peso: {
    id: `${idSuffix}.peso`,
    defaultMessage: '₱ '
  }
})
