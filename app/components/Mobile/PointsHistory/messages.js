/*
 * PointsHistory Messages
 *
 * This contains all the text for the PointsHistory component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  walletTransactionsTitle: {
    id: 'app.containers.WalletPage.walletTransactionsTitle',
    defaultMessage: 'Points History'
  },
  currentPoints: {
    id: 'app.containers.WalletPage.currentPoints',
    defaultMessage: 'Current CLiQQ Points'
  },
  asOf: {
    id: 'app.containers.WalletPage.asOf',
    defaultMessage: 'as of {date}'
  },
  youClaimed: {
    id: 'app.containers.WalletPage.youClaimed',
    defaultMessage: 'You claimed {item}'
  },
  youBought: {
    id: 'app.containers.WalletPage.youBought',
    defaultMessage: 'You bought {item}'
  },
  pointsInfo: {
    id: 'app.containers.WalletSection.pointsInfo',
    defaultMessage: 'Check all the points you have used and earned here. {termsConditions} shall apply.'
    // How do I earn points?
  },
  applyTermsConditions: {
    id: 'app.containers.ProductPage.applyTermsConditions',
    defaultMessage: 'Terms and Conditions'
  }
})
