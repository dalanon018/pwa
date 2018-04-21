import { fromJS } from 'immutable'
import {
  selectWallet,
  selectTransactions,
  selectTransactionsCount,
  selectTransactionsLoading,
  selectLazyload,
  selectMobileNumber
} from '../selectors'

describe('selectWalletPageDomain', () => {
  describe('selectWallet', () => {
    const selector = selectWallet()

    it('should select Wallet', () => {
      const wallet = fromJS({ id: 1, name: 'Wallet' })
      const mockedState = fromJS({
        walletPage: {
          wallet
        }
      })
      expect(selector(mockedState)).toEqual(wallet)
    })
  })

  describe('selectTransactions', () => {
    const selector = selectTransactions()

    it('should get Transactions', () => {
      const transactions = fromJS([{ transaction: 1 }, { transaction: 2 }])
      const mockedState = fromJS({
        walletPage: {
          transactions
        }
      })
      expect(selector(mockedState)).toEqual(transactions)
    })
  })

  describe('selectLazyload', () => {
    const selector = selectLazyload()

    it('should get lazyload', () => {
      const lazyload = false
      const mockedState = fromJS({
        walletPage: {
          lazyload
        }
      })
      expect(selector(mockedState)).toEqual(lazyload)
    })
  })

  describe('selectTransactionsCount', () => {
    const selector = selectTransactionsCount()

    it('should get transactionCount', () => {
      const transactionsCount = 0
      const mockedState = fromJS({
        walletPage: {
          transactionsCount
        }
      })
      expect(selector(mockedState)).toEqual(transactionsCount)
    })
  })

  describe('selectTransactionsLoading', () => {
    const selector = selectTransactionsLoading()

    it('should get Transactions Loading', () => {
      const transactionsLoading = false
      const mockedState = fromJS({
        walletPage: {
          transactionsLoading
        }
      })
      expect(selector(mockedState)).toEqual(transactionsLoading)
    })
  })

  describe('selectMobileNumber', () => {
    const selector = selectMobileNumber()

    it('should get mobile numbers', () => {
      const mobileNumber = '9999999'
      const mockedState = fromJS({
        walletPage: {
          mobileNumber
        }
      })
      expect(selector(mockedState)).toEqual(mobileNumber)
    })
  })
})
