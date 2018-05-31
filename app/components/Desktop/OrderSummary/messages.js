/*
 * OrderSummary Messages
 *
 * This contains all the text for the OrderSummary component.
 */
import { defineMessages } from 'react-intl'

const idSuffix = 'app.containers.OrderSummary'

export default defineMessages({
  findStore: {
    id: `${idSuffix}.findStore`,
    defaultMessage: 'Find Store Nearby'
  },
  cantFindStore: {
    id: `${idSuffix}.cantFindStore`,
    defaultMessage: `Can't find the store? Check our {storeLocator}`
  },
  storeLocator: {
    id: `${idSuffix}.storeLocator`,
    defaultMessage: 'Store Locator'
  },
  defaultStore: {
    id: `${idSuffix}.defaultStore`,
    defaultMessage: 'Recently visited stores will become your default stores.'
  },
  orderSummary: {
    id: `${idSuffix}.methodPayment`,
    defaultMessage: 'Review Order'
  },
  methodPayment: {
    id: `${idSuffix}.methodPayment`,
    defaultMessage: 'Select Payment Method'
  },
  chooseStore: {
    id: `${idSuffix}.chooseStore`,
    defaultMessage: 'Select a 7-Eleven store for pick up'
  },
  viewDetails: {
    id: `${idSuffix}.viewDetails`,
    defaultMessage: 'View Details'
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
  discountText: {
    id: `${idSuffix}.discountText`,
    defaultMessage: '*Discounts are automatically discounted at Method of Payment'
  },
  earnPoints: {
    id: `${idSuffix}.earnPoints`,
    defaultMessage: 'Points will be earned once claimed.'
    // How do I earn points?
  },
  registeredMobile: {
    id: `${idSuffix}.registeredMobile`,
    defaultMessage: 'Registered Mobile Number'
  },
  signedAs: {
    id: `${idSuffix}.signedAs`,
    defaultMessage: 'Signed in as: '
  },
  size: {
    id: `${idSuffix}.size`,
    defaultMessage: 'Size: '
  },

  recentlyViewedStore: {
    id: `${idSuffix}.recentlyViewedStore`,
    defaultMessage: 'Recently Visited Store'
  },
  choosePointsTitle: {
    id: `${idSuffix}.choosePointsTitle`,
    defaultMessage: 'Choose how many points to use:'
  },
  currentPoints: {
    id: `${idSuffix}.currentPoints`,
    defaultMessage: 'Current Points: '
  },
  cashPoints: {
    id: `${idSuffix}.cashPoints`,
    defaultMessage: 'Points & Cash'
  },
  fullPoints: {
    id: `${idSuffix}.fullPoints`,
    defaultMessage: 'Full Points'
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
    id: `${idSuffix}.pointsTip`,
    defaultMessage: `This item can only be purchased using CLiQQ points.`
  },
  payAtAny: {
    id: `${idSuffix}.payAtAny`,
    defaultMessage: 'Pay at any 7-Eleven store near you! Once paid, you can claim the item after 24 hours at the same store.'
  },
  whatIs: {
    id: `${idSuffix}.whatIs`,
    defaultMessage: 'What is {title}?'
  },
  codDescription: {
    id: `${idSuffix}.codDescription`,
    defaultMessage: 'Cash on delivery means you will pay for your purchase when it is ready for pick-up from the store. You will present the item bar code (see "My Activity") and the 7-Eleven staff will scan it and generate a receipt. You need to pay the amount on the receipt before they release the item to you. This gives you time to prepare your budget.'
  },
  prepaidDescription: {
    id: `${idSuffix}.prepaidDescription`,
    defaultMessage: 'Prepaid payment option means you will pay immediately after you make a purchase. This applies to all kiosk purchases. If you don\'t pay for your kiosk purchase immediately after the bar code is printed, your order will expire. If you order via the CLiQQShop.com, prepaid payment option means you will head to the 7-Eleven store nearest you to pay for your order as soon as your bar code is generated on your mobile That means you will only have to pick the item up when it arrives. No more need to pay.'
  },
  pointsCashDescription: {
    id: `${idSuffix}.pointsCashDescription`,
    defaultMessage: 'You can pay for an item you want to purchase using your CLiQQ points and cash. This means you save money even as you shop on CLiQQShop.com.  When you place your order, you can decide how many points you want to use, and you will be told how much cash you would still need to add. You will give the cash payment when you go to the 7-Eleven store to collect/pick-up your purchased item.'
  }
})
