/*
 * Receipt Messages
 *
 * This contains all the text for the Receipt component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  RESERVED: {
    id: 'app.components.Receipt.RESERVED',
    defaultMessage: 'You have this time to show this slip at the store:'
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
  receiptInfoMessageCASHDelivered: {
    id: 'app.components.Receipt.receiptInfoMessagePaid',
    defaultMessage: 'Your item is now ready for pick up at {storeName}'
  },
  receiptInfoMessageCODDelivered: {
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
    defaultMessage: 'Change of Mind is Applicable'
  },
  returnPolicyDescriptionWarning: {
    id: 'app.components.Receipt.returnPolicyDescriptionWarning',
    defaultMessage: 'Return Policy is valid for 7 Days upon claiming'
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
  CASHmethodType: {
    id: 'app.components.Receipt.CASHmethodType',
    defaultMessage: 'Cash Prepaid'
  },
  CODmethodType: {
    id: 'app.components.Receipt.CODmethodType',
    defaultMessage: 'Cash on Delivery'
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
  mobileNumberCode: {
    id: `app.components.Receipt.mobileNumberCode`,
    defaultMessage: '+(63) '
  },
  dateCASHRESERVED: {
    id: 'app.components.Receipt.dateCASHRESERVED',
    defaultMessage: 'Valid Until'
  },
  dateCASHRESERVEDEXPIRED: {
    id: 'app.components.Receipt.dateCASHRESERVEDEXPIRED',
    defaultMessage: 'Valid Until'
  },
  dateCASHUNPAID: {
    id: 'app.components.Receipt.dateCASHUNPAID',
    defaultMessage: 'Date Expired'
  },
  dateCASHCONFIRMED: {
    id: 'app.components.Receipt.dateCASHCONFIRMED',
    defaultMessage: 'Date Paid'
  },
  dateCASHINTRANSIT: {
    id: 'app.components.Receipt.dateCASHINTRANSIT',
    defaultMessage: 'Date Paid'
  },
  dateCASHDELIVERED: {
    id: 'app.components.Receipt.dateDELIVERED',
    defaultMessage: 'Date Delivered'
  },
  dateCASHCLAIMED: {
    id: 'app.components.Receipt.dateCASHCLAIMED',
    defaultMessage: 'Date Claimed'
  },
  dateCASHUNCLAIMED: {
    id: 'app.components.Receipt.dateCASHUNCLAIMED',
    defaultMessage: 'Date Delivered'
  },
  dateCODRESERVED: {
    id: 'app.components.Receipt.dateCODRESERVED',
    defaultMessage: 'Valid Until'
  },
  dateCODRESERVEDEXPIRED: {
    id: 'app.components.Receipt.dateCODRESERVEDEXPIRED',
    defaultMessage: 'Valid Until'
  },
  dateCODUNPAID: {
    id: 'app.components.Receipt.dateCODUNPAID',
    defaultMessage: 'Date Expired'
  },
  dateCODPROCESSING: {
    id: 'app.components.Receipt.dateCODPROCESSING',
    defaultMessage: 'Date Ordered'
  },
  dateCODCONFIRMED: {
    id: 'app.components.Receipt.dateCODCONFIRMED',
    defaultMessage: 'Date Ordered'
  },
  dateCODINTRANSIT: {
    id: 'app.components.Receipt.dateCODINTRANSIT',
    defaultMessage: 'Date Ordered'
  },
  dateCODDELIVERED: {
    id: 'app.components.Receipt.dateDELIVERED',
    defaultMessage: 'Date Delivered'
  },
  dateCODCLAIMED: {
    id: 'app.components.Receipt.dateCODCLAIMED',
    defaultMessage: 'Date Claimed'
  },
  dateCODUNCLAIMED: {
    id: 'app.components.Receipt.dateCODUNCLAIMED',
    defaultMessage: 'Date Delivered'
  },
  dateCASHFieldDefault: {
    id: 'app.components.Receipt.dateCASHFieldDefault',
    defaultMessage: 'Date'
  },
  dateCODFieldDefault: {
    id: 'app.components.Receipt.dateCODFieldDefault',
    defaultMessage: 'Date'
  },
  pushNotifLabel: {
    id: 'app.components.Receipt.pushNotifLabel',
    defaultMessage: 'Push Notifications'
  },
  pushNotifDescription: {
    id: 'app.components.Receipt.pushNotifDescription',
    defaultMessage: 'Would you like to receive notifications on your phone for the latest updates on Cliqq?'
  },
  instructionsLabel: {
    id: 'app.components.Receipt.instructionsLabel',
    defaultMessage: 'Don\'t forget to take a screenshot of your receipt for validation purposes!'
  }
})
