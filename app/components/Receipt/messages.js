/*
 * Receipt Messages
 *
 * This contains all the text for the Receipt component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  RESERVED: {
    id: 'app.components.Receipt.RESERVED',
    defaultMessage: 'You have this time to show this receipt to the store'
  },
  UNPAID: {
    id: 'app.components.Receipt.UNPAID',
    defaultMessage: 'This item has expired. Would you like to repurchase it?'
  },
  CONFIRMED: {
    id: 'app.components.Receipt.CONFIRMED',
    defaultMessage: 'We\'ve received your payment for this item'
  },
  INTRANSIT: {
    id: 'app.components.Receipt.INTRANSIT',
    defaultMessage: 'This item is on its way is on its way to the store'
  },
  DELIVERED: {
    id: 'app.components.Receipt.DELIVERED',
    defaultMessage: 'This item is now ready for pick up'
  },
  CLAIMED: {
    id: 'app.components.Receipt.CLAIMED',
    defaultMessage: 'This item has already been claimed!'
  },
  UNCLAIMED: {
    id: 'app.components.Receipt.UNCLAIMED',
    defaultMessage: 'This item hasn\'t been claimed'
  },
  unknownStatus: {
    id: 'app.components.Receipt.unknownStatus',
    defaultMessage: ' ' // this one needs atleast a character that is why we have space, else it will return warning
  },
  receiptPriceTitle: {
    id: 'app.components.Receipt.receiptPriceTitle',
    defaultMessage: 'PRICE:'
  },
  receiptDatePurchasedTitle: {
    id: 'app.components.Receipt.receiptDatePurchasedTitle',
    defaultMessage: 'DATE PURCHASED:'
  },
  receiptDateClaimedTitle: {
    id: 'app.components.Receipt.receiptDateClaimedTitle',
    defaultMessage: 'DATE CLAIMED:'
  },
  receiptTrackingTitle: {
    id: 'app.components.Receipt.receiptTrackingTitle',
    defaultMessage: 'TRACKING NO.:'
  },
  receiptStoreLocationTitle: {
    id: 'app.components.Receipt.receiptStoreLocationTitle',
    defaultMessage: 'STORE LOCATION:'
  },
  receiptInfoMessageReserve: {
    id: 'app.components.Receipt.receiptInfoMessageReserve',
    defaultMessage: 'Pay Item Before it Expires'
  },
  receiptInfoMessageUnpaid: {
    id: 'app.components.Receipt.receiptInfoMessageUnpaid',
    defaultMessage: 'Follow us on Social Media for all the latest updates'
  },
  receiptInfoMessageClaimEarly: {
    id: 'app.components.Receipt.receiptInfoMessageClaimEarly',
    defaultMessage: 'Follow us on Social Media for all the latest updates'
  },
  receiptInfoMessageUnclaimed: {
    id: 'app.components.Receipt.receiptInfoMessageUnclaimed',
    defaultMessage: 'You can call our customer service line for help on claiming'
  },
  returnToHome: {
    id: 'app.components.Receipt.returnToHome',
    defaultMessage: 'RETURN TO HOME'
  },
  goToTrackOrder: {
    id: 'app.components.Receipt.goToTrackOrder',
    defaultMessage: 'Track Your Order'
  },
  goToHistory: {
    id: 'app.components.Receipt.goToHistory',
    defaultMessage: 'Receipt History'
  },
  rePurchase: {
    id: 'app.components.Receipt.rePurchase',
    defaultMessage: 'Repurchase Item'
  }
})
