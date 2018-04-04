/*
 * Receipt Messages
 *
 * This contains all the text for the Receipt component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  // CASH
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
  CASHLOSTINTRANSIT: {
    id: 'app.components.Receipt.CASHLOSTINTRANSIT',
    defaultMessage: 'Follow us on Social Media for all the latest updates!'
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
  // COD
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
  CODLOSTINTRANSIT: {
    id: 'app.components.Receipt.CODLOSTINTRANSIT',
    defaultMessage: 'Follow us on Social Media for all the latest updates!'
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
  // POINTS
  POINTS_CASHRESERVED: {
    id: 'app.components.Receipt.POINTS_CASHRESERVED',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  POINTS_CASHRESERVEDEXPIRED: {
    id: 'app.components.Receipt.POINTS_CASHRESERVEDEXPIRED',
    defaultMessage: 'Oops! You seem to be offline at the moment!'
  },
  POINTS_CASHUNPAID: {
    id: 'app.components.Receipt.POINTS_CASHUNPAID',
    defaultMessage: 'This item has expired. Would you like to repurchase it?'
  },
  POINTS_CASHPROCESSING: {
    id: 'app.components.Receipt.POINTS_CASHPROCESSING',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  POINTS_CASHCONFIRMED: {
    id: 'app.components.Receipt.POINTS_CASHCONFIRMED',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  POINTS_CASHINTRANSIT: {
    id: 'app.components.Receipt.POINTS_CASHINTRANSIT',
    defaultMessage: 'Please wait for an SMS telling you that your order is in the store'
  },
  POINTS_CASHLOSTINTRANSIT: {
    id: 'app.components.Receipt.POINTS_CASHLOSTINTRANSIT',
    defaultMessage: 'Follow us on Social Media for all the latest updates!'
  },
  POINTS_CASHDELIVERED: {
    id: 'app.components.Receipt.POINTS_CASHDELIVERED',
    defaultMessage: 'Please go to {storeName} and pay for your item at the cashier.'
  },
  POINTS_CASHCLAIMED: {
    id: 'app.components.Receipt.POINTS_CASHCLAIMED',
    defaultMessage: ' '
  },
  POINTS_CASHUNCLAIMED: {
    id: 'app.components.Receipt.POINTS_CASHUNCLAIMED',
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
  // CASH
  receiptInfoMessageCASHDelivered: {
    id: 'app.components.Receipt.receiptInfoMessagePaid',
    defaultMessage: 'Your item is now ready for pick up at {storeName}'
  },
  // COD
  receiptInfoMessageCODDelivered: {
    id: 'app.components.Receipt.receiptInfoMessagePaid',
    defaultMessage: 'Please go to {storeName} and pay for your item at the cashier.'
  },
  // POINTS
  receiptInfoMessagePOINTS_CASHDelivered: {
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
    defaultMessage: 'VIEW YOUR ACTIVITY'
  },
  goToHistory: {
    id: 'app.components.Receipt.goToHistory',
    defaultMessage: 'Receipt History'
  },
  rePurchase: {
    id: 'app.components.Receipt.rePurchase',
    defaultMessage: 'REPURCHASE ITEM'
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
  // CASH
  CASHmethodType: {
    id: 'app.components.Receipt.CASHmethodType',
    defaultMessage: 'Cash Prepaid'
  },
  // COD
  CODmethodType: {
    id: 'app.components.Receipt.CODmethodType',
    defaultMessage: 'Cash on Delivery'
  },
  // POINTS
  POINTS_CASHmethodType: {
    id: 'app.components.Receipt.POINTS_CASHmethodType',
    defaultMessage: 'Points and Cash'
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
  // CASH
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
  dateCASHLOSTINTRANSIT: {
    id: 'app.components.Receipt.dateCASHLOSTINTRANSIT',
    defaultMessage: 'Date Unserved'
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
  // COD
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
  dateCODLOSTINTRANSIT: {
    id: 'app.components.Receipt.dateCODLOSTINTRANSIT',
    defaultMessage: 'Date Unserved'
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
  // POINTS
  datePOINTS_CASHRESERVED: {
    id: 'app.components.Receipt.datePOINTS_CASHRESERVED',
    defaultMessage: 'Date Ordered'
  },
  datePOINTS_CASHRESERVEDEXPIRED: {
    id: 'app.components.Receipt.datePOINTS_CASHRESERVEDEXPIRED',
    defaultMessage: 'Valid Until'
  },
  datePOINTS_CASHUNPAID: {
    id: 'app.components.Receipt.datePOINTS_CASHUNPAID',
    defaultMessage: 'Date Expired'
  },
  datePOINTS_CASHPROCESSING: {
    id: 'app.components.Receipt.datePOINTS_CASHPROCESSING',
    defaultMessage: 'Date Ordered'
  },
  datePOINTS_CASHCONFIRMED: {
    id: 'app.components.Receipt.datePOINTS_CASHCONFIRMED',
    defaultMessage: 'Date Ordered'
  },
  datePOINTS_CASHINTRANSIT: {
    id: 'app.components.Receipt.datePOINTS_CASHINTRANSIT',
    defaultMessage: 'Date In-transit'
  },
  datePOINTS_CASHLOSTINTRANSIT: {
    id: 'app.components.Receipt.datePOINTS_CASHLOSTINTRANSIT',
    defaultMessage: 'Date Unserved'
  },
  datePOINTS_CASHDELIVERED: {
    id: 'app.components.Receipt.dateDELIVERED',
    defaultMessage: 'Date Delivered'
  },
  datePOINTS_CASHCLAIMED: {
    id: 'app.components.Receipt.datePOINTS_CASHCLAIMED',
    defaultMessage: 'Date Claimed'
  },
  datePOINTS_CASHUNCLAIMED: {
    id: 'app.components.Receipt.datePOINTS_CASHUNCLAIMED',
    defaultMessage: 'Date Expired'
  },
  // CASH
  dateCASHFieldDefault: {
    id: 'app.components.Receipt.dateCASHFieldDefault',
    defaultMessage: 'Date'
  },
  // COD
  dateCODFieldDefault: {
    id: 'app.components.Receipt.dateCODFieldDefault',
    defaultMessage: 'Date'
  },
  // POINTS_CASH
  datePOINTS_CASHFieldDefault: {
    id: 'app.components.Receipt.datePOINTS_CASHFieldDefault',
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
