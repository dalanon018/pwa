/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl'

const idSuffix = 'app.containers.HomePage'

export default defineMessages({
  header: {
    id: `${idSuffix}.header`,
    defaultMessage: 'This is HomePage container !'
  },
  featureProduct: {
    id: `${idSuffix}.featureProduct`,
    defaultMessage: 'FEATURED ITEMS'
  },
  browseCategory: {
    id: `${idSuffix}.browseCategory`,
    defaultMessage: 'BROWSE CATEGORIES'
  },
  productViewAll: {
    id: `${idSuffix}.productViewAll`,
    defaultMessage: 'VIEW ALL'
  }
})
