/*
 * Receipt Messages
 *
 * This contains all the text for the Receipt component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  RESERVED: {
    id: 'app.components.Receipt.RESERVED',
    defaultMessage: 'You have this time to show this receipt to the store:'
  },
  RESERVEDEXPIRED: {
    id: 'app.components.Receipt.RESERVEDEXPIRED',
    defaultMessage: 'Oops! You seem to be offline at the moment!'
  },
  UNPAID: {
    id: 'app.components.Receipt.UNPAID',
    defaultMessage: 'This item has expired. Would you like to repurchase it?'
  },
  PROCESSING: {
    id: 'app.components.Receipt.PROCESSING',
    defaultMessage: 'This now serves as your official receipt for your item. Thank you for shopping with Cliqq!'
  },
  CONFIRMED: {
    id: 'app.components.Receipt.CONFIRMED',
    defaultMessage: 'This now serves as your official receipt for your item. Thank you for shopping with Cliqq!'
  },
  INTRANSIT: {
    id: 'app.components.Receipt.INTRANSIT',
    defaultMessage: 'This now serves as your official receipt for your item. Thank you for shopping with Cliqq!'
  },
  DELIVERED: {
    id: 'app.components.Receipt.DELIVERED',
    defaultMessage: 'This now serves as your official receipt for your item. Thank you for shopping with Cliqq!'
  },
  CLAIMED: {
    id: 'app.components.Receipt.CLAIMED',
    defaultMessage: 'This now serves as your official receipt for your item. Thank you for shopping with Cliqq!'
  },
  UNCLAIMED: {
    id: 'app.components.Receipt.UNCLAIMED',
    defaultMessage: 'This now serves as your official receipt for your item. Thank you for shopping with Cliqq!'
  },
  unknownStatus: {
    id: 'app.components.Receipt.unknownStatus',
    defaultMessage: ' ' // this one needs atleast a character that is why we have space, else it will return warning
  },
  receiptInfoMessageReserve: {
    id: 'app.components.Receipt.receiptInfoMessageReserve',
    // defaultMessage: 'Pay Item Before the time Expires'
    defaultMessage: `Show this barcode at any 7 Eleven
    store within 1 Hour and pay for your item.`
  },
  receiptInfoMessageReserveExpired: {
    id: 'app.components.Receipt.receiptInfoMessageReserveExpired',
    defaultMessage: 'Go online to see if this receipt is still valid'
  },
  receiptInfoMessageUnpaid: {
    id: 'app.components.Receipt.receiptInfoMessageUnpaid',
    defaultMessage: 'Follow us on Social Media for all the latest updates!'
  },
  receiptInfoMessagePaid: {
    id: 'app.components.Receipt.receiptInfoMessagePaid',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  receiptInfoMessageCashDelivered: {
    id: 'app.components.Receipt.receiptInfoMessagePaid',
    defaultMessage: 'Your item is now ready for pick up at {storeName}'
  },
  receiptInfoMessageCodDelivered: {
    id: 'app.components.Receipt.receiptInfoMessagePaid',
    defaultMessage: 'Please go to {storeName} and pay for your item at the cashier.'
  },
  receiptInfoMessageUnclaimed: {
    id: 'app.components.Receipt.receiptInfoMessageUnclaimed',
    defaultMessage: 'You can call our customer service line for help on claiming'
  },
  returnToHome: {
    id: 'app.components.Receipt.returnToHome',
    defaultMessage: 'RETURN TO HOME'
  },
  returnPolicyTitle: {
    id: 'app.components.Receipt.returnToHome',
    defaultMessage: 'Cliqq Return Policy'
  },
  returnPolicyDescription: {
    id: 'app.components.Receipt.returnPolicyDescription',
    defaultMessage: 'Change of Mind is Applicable. Return Policy is Valid for 7 Days upon claiming'
  },
  viewActivity: {
    id: 'app.components.Receipt.viewActivity',
    defaultMessage: 'View Your Activity'
  },
  goToHistory: {
    id: 'app.components.Receipt.goToHistory',
    defaultMessage: 'Receipt History'
  },
  rePurchase: {
    id: 'app.components.Receipt.rePurchase',
    defaultMessage: 'Repurchase Item'
  },
  orderNumber: {
    id: 'app.components.Receipt.orderNumber',
    defaultMessage: 'Your Order Number:'
  },
  paymentMethod: {
    id: 'app.components.Receipt.paymentMethod',
    defaultMessage: 'Method of Payment:'
  },
  statusLabel: {
    id: 'app.components.Receipt.statusLabel',
    defaultMessage: 'Status:'
  },
  peso: {
    id: `app.components.Receipt.peso`,
    defaultMessage: '₱ '
  },
  mobileNumberLabel: {
    id: `app.components.Receipt.mobileNumberLabel`,
    defaultMessage: 'Mobile Number: '
  },
  dateCashRESERVED: {
    id: 'app.components.Receipt.dateCashRESERVED',
    defaultMessage: 'Valid Until'
  },
  dateCashRESERVEDEXPIRED: {
    id: 'app.components.Receipt.dateCashRESERVEDEXPIRED',
    defaultMessage: 'Valid Until'
  },
  dateCashUNPAID: {
    id: 'app.components.Receipt.dateCashUNPAID',
    defaultMessage: 'Valid Until'
  },
  dateCashCONFIRMED: {
    id: 'app.components.Receipt.dateCashCONFIRMED',
    defaultMessage: 'Date Paid'
  },
  dateCashINTRANSIT: {
    id: 'app.components.Receipt.dateCashINTRANSIT',
    defaultMessage: 'Date Paid'
  },
  dateCashDELIVERED: {
    id: 'app.components.Receipt.dateDELIVERED',
    defaultMessage: 'Date Delivered'
  },
  dateCashCLAIMED: {
    id: 'app.components.Receipt.dateCashCLAIMED',
    defaultMessage: 'Date Claimed'
  },
  dateCashUNCLAIMED: {
    id: 'app.components.Receipt.dateCashUNCLAIMED',
    defaultMessage: 'Date Delivered'
  },
  dateCodRESERVED: {
    id: 'app.components.Receipt.dateCodRESERVED',
    defaultMessage: 'Valid Until'
  },
  dateCodRESERVEDEXPIRED: {
    id: 'app.components.Receipt.dateCodRESERVEDEXPIRED',
    defaultMessage: 'Valid Until'
  },
  dateCodUNPAID: {
    id: 'app.components.Receipt.dateCodUNPAID',
    defaultMessage: 'Valid Until'
  },
  dateCodPROCESSING: {
    id: 'app.components.Receipt.dateCodPROCESSING',
    defaultMessage: 'Date Ordered'
  },
  dateCodCONFIRMED: {
    id: 'app.components.Receipt.dateCodCONFIRMED',
    defaultMessage: 'Date Ordered'
  },
  dateCodINTRANSIT: {
    id: 'app.components.Receipt.dateCodINTRANSIT',
    defaultMessage: 'Date Ordered'
  },
  dateCodDELIVERED: {
    id: 'app.components.Receipt.dateDELIVERED',
    defaultMessage: 'Date Delivered'
  },
  dateCodCLAIMED: {
    id: 'app.components.Receipt.dateCodCLAIMED',
    defaultMessage: 'Date Claimed'
  },
  dateCodUNCLAIMED: {
    id: 'app.components.Receipt.dateCodUNCLAIMED',
    defaultMessage: 'Date Delivered'
  },
  dateCashFieldDefault: {
    id: 'app.components.Receipt.dateCashFieldDefault',
    defaultMessage: 'Date'
  },
  dateCodFieldDefault: {
    id: 'app.components.Receipt.dateCodFieldDefault',
    defaultMessage: 'Date'
  }
})
