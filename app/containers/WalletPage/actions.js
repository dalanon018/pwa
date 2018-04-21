/*
 *
 * WalletPage actions
 *
 */

import {
  GET_WALLET,
  SET_WALLET,
  SET_WALLET_TRANSACTIONS,
  SET_WALLET_TRANSACTIONS_COUNT,
  RESET_WALLET_TRANSACTIONS,

  GET_MOBILE_NUMBER,
  SET_MOBILE_NUMBER
} from './constants'

export function getMobileNumberAction () {
  return {
    type: GET_MOBILE_NUMBER
  }
}

export function setMobileNumberAction (payload) {
  return {
    type: SET_MOBILE_NUMBER,
    payload
  }
}

export function getWalletAction (payload) {
  return {
    type: GET_WALLET,
    payload
  }
}

export function setWalletAction (payload) {
  return {
    type: SET_WALLET,
    payload
  }
}

export function setWalletTransactionsAction (payload) {
  return {
    type: SET_WALLET_TRANSACTIONS,
    payload
  }
}

export function resetWalletTransactionsAction (payload) {
  return {
    type: RESET_WALLET_TRANSACTIONS,
    payload
  }
}

export function setWalletTransactionsCountsAction (payload) {
  return {
    type: SET_WALLET_TRANSACTIONS_COUNT,
    payload
  }
}
