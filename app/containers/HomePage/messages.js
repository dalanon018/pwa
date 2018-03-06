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
    defaultMessage: 'Featured Items'
  },
  browseCategory: {
    id: `${idSuffix}.browseCategory`,
    defaultMessage: 'Featured Categories'
  },
  browseBrands: {
    id: `${idSuffix}.browseBrands`,
    defaultMessage: 'Featured Brands'
  },
  productViewAll: {
    id: `${idSuffix}.productViewAll`,
    defaultMessage: 'View All'
  },
  searchPlaceholder: {
    id: `${idSuffix}.searchPlaceholder`,
    defaultMessage: 'Search for Products, Brands and More'
  },
  moreBrands: {
    id: `${idSuffix}.moreBrands`,
    defaultMessage: 'More Brands'
  }
})
