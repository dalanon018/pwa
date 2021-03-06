
import {
  getWalletAction,
  setWalletAction,
  setWalletTransactionsAction,
  resetWalletTransactionsAction,
  setWalletTransactionsCountsAction,
  getMobileNumberAction,
  setMobileNumberAction
} from '../actions'

import {
  GET_WALLET,
  SET_WALLET,
  SET_WALLET_TRANSACTIONS,
  SET_WALLET_TRANSACTIONS_COUNT,
  RESET_WALLET_TRANSACTIONS,
  GET_MOBILE_NUMBER,
  SET_MOBILE_NUMBER
} from '../constants'

describe('WalletPage actions', () => {
  it('has a type of GET_WALLET', () => {
    const payload = { mobileNumber: 1 }
    const expected = {
      type: GET_WALLET,
      payload
    }
    expect(getWalletAction(payload)).toEqual(expected)
  })

  it('has a type of SET_WALLET', () => {
    const payload = [ 1, 2, 3 ]
    const expected = {
      type: SET_WALLET,
      payload
    }
    expect(setWalletAction(payload)).toEqual(expected)
  })

  describe('getMobileNumberAction', () => {
    it('should get mobile number', () => {
      const expectedResult = {
        type: GET_MOBILE_NUMBER
      }
      expect(getMobileNumberAction()).toEqual(expectedResult)
    })

    it('should set mobile number', () => {
      const payload = '99999999'
      const expectedResult = {
        type: SET_MOBILE_NUMBER,
        payload
      }

      expect(setMobileNumberAction(payload)).toEqual(expectedResult)
    })
  })

  it('has a type of SET_WALLET_TRANSACTIONS', () => {
    const payload = [ 1, 2, 3 ]
    const expected = {
      type: SET_WALLET_TRANSACTIONS,
      payload
    }
    expect(setWalletTransactionsAction(payload)).toEqual(expected)
  })

  it('has a type of RESET_WALLET_TRANSACTIONS', () => {
    const expected = {
      type: RESET_WALLET_TRANSACTIONS
    }
    expect(resetWalletTransactionsAction()).toEqual(expected)
  })

  it('has a type of SET_WALLET_TRANSACTIONS_COUNT', () => {
    const payload = 0
    const expected = {
      type: SET_WALLET_TRANSACTIONS_COUNT,
      payload
    }
    expect(setWalletTransactionsCountsAction(payload)).toEqual(expected)
  })
})
