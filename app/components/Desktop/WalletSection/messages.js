/*
 * WalletSection Messages
 *
 * This contains all the text for the WalletSection component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  items: {
    id: 'app.containers.WalletSection.items',
    defaultMessage: ' Items'
  },
  feature: {
    id: 'app.containers.WalletSection.feature',
    defaultMessage: 'Featured Items'
  },
  title: {
    id: 'app.containers.WalletSection.title',
    defaultMessage: 'Points Balance'
  },
  walletTransactionsTitle: {
    id: 'app.containers.WalletSection.walletTransactionsTitle',
    defaultMessage: 'Points History'
  },
  noSeparator: {
    id: 'app.containers.WalletSection.noSeparator',
    defaultMessage: ' OF '
  },
  loadMore: {
    id: 'app.containers.WalletSection.loadMore',
    defaultMessage: 'LOAD MORE'
  },
  emptyMessage: {
    id: 'app.containers.WalletSection.emptyMessage',
    defaultMessage: 'You haven\'t used your points yet.'
  },
  currentPoints: {
    id: 'app.containers.WalletSection.currentPoints',
    defaultMessage: 'Current CLiQQ Points'
  },
  worthPointsCash: {
    id: 'app.containers.WalletSection.worthPointsCash',
    defaultMessage: 'Use this to buy Php {amount} worth of items!'
  },
  worthPointsCashSub: {
    id: 'app.containers.WalletSection.worthPointsCash',
    defaultMessage: 'Don\'t have enough points? Try Points + Cash!'
  },
  asOf: {
    id: 'app.containers.WalletSection.asOf',
    defaultMessage: 'as of {date}'
  },
  youBought: {
    id: 'app.containers.WalletSection.youBought',
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
