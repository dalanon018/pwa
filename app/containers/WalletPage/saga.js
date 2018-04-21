import {
  call,
  fork,
  put
} from 'redux-saga/effects'
import {
  takeLatest
} from 'redux-saga'
import { isEmpty } from 'lodash'
import {
  omit,
  propOr
} from 'ramda'

// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'
import { transformWallet } from 'utils/transforms'
import { getItem } from 'utils/localStorage'

import {
  GET_WALLET,
  GET_MOBILE_NUMBER
} from './constants'

import {
  setWalletAction,
  setWalletTransactionsAction,
  setWalletTransactionsCountsAction,
  setMobileNumberAction
} from './actions'

import {
  API_BASE_URL,
  MOBILE_NUMBERS_KEY
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
  const req = yield call(getRequestData, `${API_BASE_URL}/wallet-transactions/${mobileNumber}?offset=${offset}&limit=${limit}`, {
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

export function * getMobileNumber () {
  // first we have to update our bucket list of what number we already have
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)

  const mobile = Array.isArray(mobileNumbers) ? `0${mobileNumbers.pop()}` : null
  yield put(setMobileNumberAction(mobile))
}

export function * getWalletSaga () {
  yield * takeLatest(GET_WALLET, getWallet)
}

export function * getMobileNumberSaga () {
  yield * takeLatest(GET_MOBILE_NUMBER, getMobileNumber)
}

// Individual exports for testing
export function * WalletPageSagas () {
  yield [
    fork(getWalletSaga),
    fork(getMobileNumberSaga)
  ]
}

// All sagas to be loaded
export default WalletPageSagas
