/*
 * Receipt Messages
 *
 * This contains all the text for the Receipt component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  CASHRESERVED: {
    id: 'app.components.Receipt.CASHRESERVED',
    defaultMessage: 'Show this barcode at any 7 Eleven store and pay for your item within:'
  },
  CASHRESERVEDEXPIRED: {
    id: 'app.components.Receipt.CASHRESERVEDEXPIRED',
    defaultMessage: 'Oops! You seem to be offline at the moment!'
  },
  CASHUNPAID: {
    id: 'app.components.Receipt.CASHUNPAID',
    defaultMessage: 'This item has expired. Would you like to repurchase it?'
  },
  CASHPROCESSING: {
    id: 'app.components.Receipt.CASHPROCESSING',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  CASHCONFIRMED: {
    id: 'app.components.Receipt.CASHCONFIRMED',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  CASHINTRANSIT: {
    id: 'app.components.Receipt.CASHINTRANSIT',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  CASHDELIVERED: {
    id: 'app.components.Receipt.CASHDELIVERED',
    defaultMessage: 'Your item is now ready for pick up at {storeName}'
  },
  CASHCLAIMED: {
    id: 'app.components.Receipt.CASHCLAIMED',
    defaultMessage: ' '
  },
  CASHUNCLAIMED: {
    id: 'app.components.Receipt.CASHUNCLAIMED',
    defaultMessage: 'Follow us on Social Media for all the latest updates!'
  },
  CODRESERVED: {
    id: 'app.components.Receipt.CODRESERVED',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  CODRESERVEDEXPIRED: {
    id: 'app.components.Receipt.CODRESERVEDEXPIRED',
    defaultMessage: 'Oops! You seem to be offline at the moment!'
  },
  CODUNPAID: {
    id: 'app.components.Receipt.CODUNPAID',
    defaultMessage: 'This item has expired. Would you like to repurchase it?'
  },
  CODPROCESSING: {
    id: 'app.components.Receipt.CODPROCESSING',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  CODCONFIRMED: {
    id: 'app.components.Receipt.CODCONFIRMED',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  CODINTRANSIT: {
    id: 'app.components.Receipt.CODINTRANSIT',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  CODDELIVERED: {
    id: 'app.components.Receipt.CODDELIVERED',
    defaultMessage: 'Please go to {storeName} and pay for your item at the cashier.'
  },
  CODCLAIMED: {
    id: 'app.components.Receipt.CODCLAIMED',
    defaultMessage: ' '
  },
  CODUNCLAIMED: {
    id: 'app.components.Receipt.CODUNCLAIMED',
    defaultMessage: 'Follow us on Social Media for all the latest updates!'
  },
  unknownStatus: {
    id: 'app.components.Receipt.unknownStatus',
    defaultMessage: ' ' // this one needs atleast a character that is why we have space, else it will return warning
  },
  receiptInfoMessageReserve: {
    id: 'app.components.Receipt.receiptInfoMessageReserve',
    // defaultMessage: 'Pay Item Before the time Expires'
    defaultMessage: `Show this barcode at any 7 Eleven
    store and pay for your item.`
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
    defaultMessage: 'CLiQQ Return Policy'
  },
  returnPolicyDescriptionValid: {
    id: 'app.components.Receipt.returnPolicyDescription',
    defaultMessage: 'Change of Mind is Applicable'
  },
  returnPolicyDescriptionWarningValid: {
    id: 'app.components.Receipt.returnPolicyDescriptionWarning',
    defaultMessage: 'Not satisfied with your purchase? Depending on your CLiQQ Care Policy, you can return your item anytime of the day within 7 days from claim date. Just go to you nearest 711 Store where the item was purchased and get your Return Slip from the CLiQQ Kiosk and bring it to the cashier'
  },
  returnPolicyDescriptionInvalid: {
    id: 'app.components.Receipt.returnPolicyDescription',
    defaultMessage: 'Change of Mind is NOT Applicable'
  },
  returnPolicyDescriptionWarningInvalid: {
    id: 'app.components.Receipt.returnPolicyDescriptionWarning',
    defaultMessage: 'Due to final clearance and hygienic purposes, returns, exchanges and refunds may not be provided for Health & Beauty Products, Jewelries, Home Care Products and Lingerie. For any concerns, kindly send an email to our Customer Service Team at {actionButton}.'
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
  trackingNumber: {
    id: 'app.components.Receipt.orderNumber',
    defaultMessage: 'Your Tracking Number:'
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
    defaultMessage: 'Date In-transit'
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
    defaultMessage: 'Date Expired'
  },
  dateCODRESERVED: {
    id: 'app.components.Receipt.dateCODRESERVED',
    defaultMessage: 'Date Ordered'
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
    defaultMessage: 'Date In-transit'
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
    defaultMessage: 'Date Expired'
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
    defaultMessage: 'Would you like to receive notifications on your phone for the latest updates on CLiQQ?'
  },
  instructionsLabel: {
    id: 'app.components.Receipt.instructionsLabel',
    defaultMessage: 'Don\'t forget to take a screenshot of your receipt for validation purposes!'
  }
})
