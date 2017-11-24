/*
 * Purchases Messages
 *
 * This contains all the text for the Purchases component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  receiptsTitle: {
    id: 'app.containers.Purchases.receiptsTitle',
    defaultMessage: 'RECEIPTS'
  },
  emptyActivePurchases: {
    id: 'app.containers.Purchases.emptyPurchases',
    defaultMessage: 'Woops! It seems like you haven\'t bought anything yet. Let\'s fix that!'
  },
  emptyCompletedPurchases: {
    id: 'app.containers.Purchases.emptyPurchases',
    defaultMessage: 'Woops! It seems like you haven\'t bought anything yet. Let\'s fix that!'
  },
  emptyExpiredPurchases: {
    id: 'app.containers.Purchases.emptyPurchases',
    defaultMessage: 'There are no expired receipts.'
  },
  // Here we will define the status titles
  titleStatusRESERVED: {
    id: 'app.components.Purchases.titleStatusRESERVED',
    defaultMessage: 'Reserved'
  },
  titleStatusRESERVEDEXPIRED: {
    id: 'app.components.Purchases.titleStatusRESERVEDEXPIRED',
    defaultMessage: 'Reserved'
  },
  titleStatusUNPAID: {
    id: 'app.components.Purchases.titleStatusUNPAID',
    defaultMessage: 'Unpaid'
  },
  titleStatusPROCESSING: {
    id: 'app.components.Purchases.titleStatusPROCESSING',
    defaultMessage: 'Processing'
  },
  titleStatusPROCESSINGINTRANSIT: {
    id: 'app.components.Purchases.titleStatusPROCESSINGINTRANSIT',
    defaultMessage: 'In-Transit'
  },
  titleStatusCONFIRMED: {
    id: 'app.components.Purchases.titleStatusCONFIRMED',
    defaultMessage: 'Paid'
  },
  titleStatusINTRANSIT: {
    id: 'app.components.Purchases.titleStatusINTRANSIT',
    defaultMessage: 'In-Transit'
  },
  titleStatusDELIVERED: {
    id: 'app.components.Purchases.titleStatusDELIVERED',
    defaultMessage: 'For Pick-Up'
  },
  titleStatusCLAIMED: {
    id: 'app.components.Purchases.titleStatusCLAIMED',
    defaultMessage: 'Claimed'
  },
  titleStatusUNCLAIMED: {
    id: 'app.components.Purchases.titleStatusUNCLAIMED',
    defaultMessage: 'Unclaimed'
  },
  titleStatusUNKNOWN: {
    id: 'app.components.Purchases.unkntitleStatusUnknownownStatus',
    defaultMessage: ' ' // this one needs atleast a character that is why we have space, else it will return warning
  }
})
