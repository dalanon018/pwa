import { createSelector } from 'reselect'

/**
 * Direct selector to the WalletPage state domain
 */
const selectWalletPageDomain = () => (state) => state.get('walletPage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by WalletPage
 */

const selectWallet = () => createSelector(
  selectWalletPageDomain(),
  (substate) => substate.get('wallet')
)

const selectTransactions = () => createSelector(
  selectWalletPageDomain(),
  (substate) => substate.get('transactions')
)

const selectTransactionsCount = () => createSelector(
  selectWalletPageDomain(),
  subState => subState.get('transactionsCount')
)

const selectTransactionsLoading = () => createSelector(
  selectWalletPageDomain(),
  subState => subState.get('transactionsLoading')
)

const selectLazyload = () => createSelector(
  selectWalletPageDomain(),
  subState => subState.get('lazyload')
)

export {
  selectWallet,
  selectTransactions,
  selectTransactionsCount,
  selectTransactionsLoading,
  selectLazyload
}
