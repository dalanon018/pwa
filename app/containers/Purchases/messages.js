/*
 * Purchases Messages
 *
 * This contains all the text for the Purchases component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  header: {
    id: 'app.containers.Purchases.header',
    defaultMessage: 'My Activities'
  },
  receiptsTitle: {
    id: 'app.containers.Purchases.receiptsTitle',
    defaultMessage: 'RECEIPTS'
  },
  emptyActivePurchases: {
    id: 'app.containers.Purchases.emptyActivePurchases',
    defaultMessage: 'Woops! It seems like you haven\'t bought anything yet. Let\'s fix that!'
  },
  emptyCompletedPurchases: {
    id: 'app.containers.Purchases.emptyCompletedPurchases',
    defaultMessage: 'Woops! It seems like you haven\'t bought anything yet. Let\'s fix that!'
  },
  emptyExpiredPurchases: {
    id: 'app.containers.Purchases.emptyExpiredPurchases',
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
    defaultMessage: 'Expired'
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
  titleStatusLOSTINTRANSIT: {
    id: 'app.components.Purchases.titleStatusLOSTINTRANSIT',
    defaultMessage: 'Unserved'
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
    defaultMessage: 'Expired'
  },
  titleStatusUNKNOWN: {
    id: 'app.components.Purchases.unkntitleStatusUnknownownStatus',
    defaultMessage: ' ' // this one needs atleast a character that is why we have space, else it will return warning
  }
})
