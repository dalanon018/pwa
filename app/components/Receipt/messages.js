/*
 * Receipt Messages
 *
 * This contains all the text for the Receipt component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  RESERVED: {
    id: 'app.components.Receipt.RESERVED',
    defaultMessage: 'YOU HAVE THIS TIME TO SHOW THIS RECEIPT TO THE STORE'
  },
  UNPAID: {
    id: 'app.components.Receipt.UNPAID',
    defaultMessage: 'ITEM EXPIRED PLEASE REORDER IT.'
  },
  CONFIRMED: {
    id: 'app.components.Receipt.CONFIRMED',
    defaultMessage: 'WE\'VE RECEIVED YOUR PAYMENT FOR THIS ITEM'
  },
  INTRANSIT: {
    id: 'app.components.Receipt.INTRANSIT',
    defaultMessage: 'YOUR ITEM IS ON IT\'S WAY TO STORE'
  },
  DELIVERED: {
    id: 'app.components.Receipt.DELIVERED',
    defaultMessage: 'ITEM IS READY FOR PICK UP'
  },
  CLAIMED: {
    id: 'app.components.Receipt.CLAIMED',
    defaultMessage: 'ITEM HAS ALREADY BEEN CLAIMED'
  },
  UNCLAIMED: {
    id: 'app.components.Receipt.UNCLAIMED',
    defaultMessage: 'ITEM HASN\'T BEEN CLAIMED'
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
    defaultMessage: 'PAY ITEM BEFORE TIME EXPIRES'
  },
  receiptInfoMessageUnpaid: {
    id: 'app.components.Receipt.receiptInfoMessageUnpaid',
    defaultMessage: 'ITEM IS ALREADY EXPIRED'
  },
  receiptInfoMessageClaimEarly: {
    id: 'app.components.Receipt.receiptInfoMessageClaimEarly',
    defaultMessage: 'EARN POINTS AND REWARDS BY CLAIMING YOUR ITEM EARLY'
  },
  receiptInfoMessageUnclaimed: {
    id: 'app.components.Receipt.receiptInfoMessageUnclaimed',
    defaultMessage: 'ITEM IS NOT CLAIMED PLEASE CALL OUR CUSTOMER SERVICE'
  },
  returnToHome: {
    id: 'app.components.Receipt.returnToHome',
    defaultMessage: 'RETURN TO HOME'
  },
  rePurchase: {
    id: 'app.components.Receipt.rePurchase',
    defaultMessage: 'REPURCHASE'
  }
})
