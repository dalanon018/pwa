/*
 * WalletPage Messages
 *
 * This contains all the text for the WalletPage component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  items: {
    id: 'app.containers.WalletPage.items',
    defaultMessage: ' Items'
  },
  feature: {
    id: 'app.containers.WalletPage.feature',
    defaultMessage: 'Featured Items'
  },
  title: {
    id: 'app.containers.WalletPage.title',
    defaultMessage: 'Points Balance'
  },
  walletTransactionsTitle: {
    id: 'app.containers.WalletPage.walletTransactionsTitle',
    defaultMessage: 'Points History'
  },
  noSeparator: {
    id: 'app.containers.WalletPage.noSeparator',
    defaultMessage: ' OF '
  },
  loadMore: {
    id: 'app.containers.WalletPage.loadMore',
    defaultMessage: 'LOAD MORE'
  },
  emptyMessage: {
    id: 'app.containers.WalletPage.emptyMessage',
    defaultMessage: 'You haven\'t used your points yet.'
  },
  currentPoints: {
    id: 'app.containers.WalletPage.currentPoints',
    defaultMessage: 'Current CLiQQ Points'
  },
  worthPointsCash: {
    id: 'app.containers.WalletPage.worthPointsCash',
    defaultMessage: 'Use this to buy Php {amount} worth of items!'
  },
  worthPointsCashSub: {
    id: 'app.containers.WalletPage.worthPointsCash',
    defaultMessage: 'Don\'t have enough points? Try Points + Cash!'
  },
  asOf: {
    id: 'app.containers.WalletPage.asOf',
    defaultMessage: 'as of {date}'
  },
  youBought: {
    id: 'app.containers.WalletPage.youBought',
    defaultMessage: 'You bought {item}'
  }
})
