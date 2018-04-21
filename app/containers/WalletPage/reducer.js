/*
 *
 * WalletPage reducer
 *
 */

import { fromJS } from 'immutable'
import { isEmpty } from 'lodash'
import {
  GET_WALLET,
  SET_WALLET,

  SET_WALLET_TRANSACTIONS,
  SET_WALLET_TRANSACTIONS_COUNT,

  RESET_WALLET_TRANSACTIONS,

  LIMIT_ITEMS,

  SET_MOBILE_NUMBER
} from './constants'

const initialState = fromJS({
  wallet: {},
  transactions: [],
  transactionsCount: 0,
  transactionsLoading: false,
  lazyload: false,
  mobileNumber: null
})

function walletPageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_WALLET:
      return state.set('transactionsLoading', true)

    case SET_WALLET:
      return state.set('wallet', fromJS(action.payload))

    case SET_WALLET_TRANSACTIONS: {
      const concatState = state.get('transactions').concat(fromJS(action.payload))
      return state
        .set('transactions', concatState)
        .set('transactionsLoading', false)
        // we will toggle to true lazyload if only items are not empty and payload is greater that the limit
        .set('lazyload', (!isEmpty(action.payload) && LIMIT_ITEMS <= action.payload.length))
    }

    case SET_WALLET_TRANSACTIONS_COUNT:
      return state.set('transactionsCount', action.payload)

    case RESET_WALLET_TRANSACTIONS:
      return state
        .set('wallet', fromJS({}))
        .set('transactions', fromJS([]))
        .set('transactionsLoading', false)
        .set('transactionsCount', 0)
        .set('mobileNumber', null)

    case SET_MOBILE_NUMBER:
      return state.set('mobileNumber', action.payload)

    default:
      return state
  }
}

export default walletPageReducer
