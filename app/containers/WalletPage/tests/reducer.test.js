import { fromJS } from 'immutable'
import walletPageReducer from '../reducer'

import {
  setWalletTransactionsAction
} from '../actions'

describe('walletPageReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      wallet: {},
      transactions: [],
      transactionsCount: 0,
      transactionsLoading: false,
      lazyload: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(walletPageReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update transactions', () => {
    const payload = ['transactions1', 'transactions2']
    const currentState = state.get('transactions')
    const mergeState = currentState.concat(fromJS(payload))
    const expectedResult = state
                          .set('transactions', mergeState)
                          .set('lazyload', false)

    expect(walletPageReducer(state, setWalletTransactionsAction(payload))).toEqual(expectedResult)
  })
})
