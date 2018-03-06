import {
  call,
  cancel,
  fork,
  put,
  take
} from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import {
  // takeLatest,
  takeEvery
} from 'redux-saga'
import { isEmpty } from 'lodash'
import {
  omit,
  propOr
} from 'ramda'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'
import { transformWallet } from 'utils/transforms'

import {
  GET_WALLET
} from './constants'
import {
  setWalletAction,
  setWalletTransactionsAction,
  setWalletTransactionsCountsAction
} from './actions'

import {
  API_BASE_URL
} from 'containers/App/constants'

import {
  setNetworkErrorAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
} from 'containers/Buckets/saga'

// function * sleep (ms) {
//   yield new Promise(resolve => setTimeout(resolve, ms))
// }

function * transformEachEntity (entity) {
  const response = yield call(transformWallet, entity)
  return response
}

export function * getWallet (args) {
  const { payload: { offset, limit, mobileNumber } } = args
  let wallet = {}
  let transactions = []
  let count = 0

  // TODO: we need to change this to the correct url
  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/wallet/0${mobileNumber}?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const walletClean = yield transformEachEntity(req)
    const walletEntity = omit(['transactions', 'totalCount'])
    const transactionsEntity = propOr([], 'transactions')
    const countEntity = propOr(0, 'totalCount')

    wallet = walletEntity(walletClean)
    transactions = transactionsEntity(walletClean)
    count = countEntity(walletClean)
  } else {
    yield put(setNetworkErrorAction(500))
  }

  yield put(setWalletAction(wallet))
  yield put(setWalletTransactionsAction(transactions))
  yield put(setWalletTransactionsCountsAction(count))
}

export function * getWalletSaga () {
  yield * takeEvery(GET_WALLET, getWallet)
}

// Individual exports for testing
export function * WalletPageSagas () {
  const watcher = yield [
    fork(getWalletSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default WalletPageSagas
