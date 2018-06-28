/*
 * OrderSummary Messages
 *
 * This contains all the text for the OrderSummary component.
 */
import { defineMessages } from 'react-intl'

const idSuffix = 'app.containers.OrderSummary'

export default defineMessages({
  recentlyViewedStore: {
    id: `${idSuffix}.recentlyViewedStore`,
    defaultMessage: 'Recently Visited Store'
  },
  storeLocator: {
    id: `${idSuffix}.storeLocator`,
    defaultMessage: 'Store Locator'
  },
  findStore: {
    id: `${idSuffix}.findStore`,
    defaultMessage: `Can't find the store? Check our {storeLocator}`
  },
  defaultStore: {
    id: `${idSuffix}.defaultStore`,
    defaultMessage: 'Your Default Store will be the last store you visited'
  },
  methodPayment: {
    id: `${idSuffix}.methodPayment`,
    defaultMessage: 'Select Payment Method'
  },
  chooseStore: {
    id: `${idSuffix}.chooseStore`,
    defaultMessage: 'Select a 7-Eleven store!'
  },
  choosePointsTitle: {
    id: `${idSuffix}.choosePointsTitle`,
    defaultMessage: 'Choose how many points to use:'
  },
  currentPoints: {
    id: `${idSuffix}.currentPoints`,
    defaultMessage: 'Current Points: '
  },
  viewDetails: {
    id: `${idSuffix}.viewDetails`,
    defaultMessage: 'View Product Details'
  },
  productDetailsTitle: {
    id: `${idSuffix}.productDetailsTitle`,
    defaultMessage: 'PRODUCT DETAILS'
  },
  productDeliveryTitle: {
    id: `${idSuffix}.productDeliveryTitle`,
    defaultMessage: 'DELIVERY SCHEDULE'
  },
  cashPrepaid: {
    id: `${idSuffix}.cashPrepaid`,
    defaultMessage: 'Cash Prepaid'
  },
  cashDelivery: {
    id: `${idSuffix}.cashDelivery`,
    defaultMessage: 'Cash on Delivery'
  },
  cashPoints: {
    id: `${idSuffix}.cashPoints`,
    defaultMessage: 'Points & Cash'
  },
  fullPoints: {
    id: `${idSuffix}.fullPoints`,
    defaultMessage: 'Full Points'
  },
  proceedNext: {
    id: `${idSuffix}.proceedNext`,
    defaultMessage: 'PLACE ORDER'
  },
  errorHeader: {
    id: `${idSuffix}.errorHeader`,
    defaultMessage: 'Uh Oh! This Page is no longer available, we\'ll redirect you to the home page.'
  },
  errorNoMobileProduct: {
    id: `${idSuffix}.errorNoMobileProduct`,
    defaultMessage: ''
  },
  errorSubmission: {
    id: `${idSuffix}.errorNoMobileProduct`,
    defaultMessage: 'There is a problem with submission. Please make sure you are online and that you are logged in using your mobile number.'
  },
  emptyQuantity: {
    id: `${idSuffix}.errorSubmission`,
    defaultMessage: 'Sorry the item is currently OUT OF STOCK.'
  },
  storeEmpty: {
    id: `${idSuffix}.storeEmpty`,
    defaultMessage: 'Please select a store location.'
  },
  peso: {
    id: `${idSuffix}.peso`,
    defaultMessage: '₱ '
  },
  earnedPoints: {
    id: `${idSuffix}.earnedPoints`,
    defaultMessage: `Earn: {icon} {points}`
  },
  pointsTip: {
    id: `${idSuffix}.pointsTip`,
    defaultMessage: `Points will be earned once claimed.`
  },
  pointsOnlyTip: {
    id: `${idSuffix}.pointsOnlyTip`,
    defaultMessage: `This item can only be purchased using CLiQQ points.`
  },
  addCouponCodeLabel: {
    id: `${idSuffix}.addCouponCodeLabel`,
    defaultMessage: `Apply a Discount Coupon Code`
  },
  couponAppliedLabel: {
    id: `${idSuffix}.couponAppliedLabel`,
    defaultMessage: 'Discount Coupon Code Applied'
  },
  couponButtonLabelApply: {
    id: `${idSuffix}.couponButtonLabelApply`,
    defaultMessage: 'APPLY'
  },
  couponButtonLabelRemove: {
    id: `${idSuffix}.couponButtonLabelRemove`,
    defaultMessage: 'REMOVE'
  }
})
