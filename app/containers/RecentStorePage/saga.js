
import { isEmpty } from 'ramda'
import { call, cancel, fork, put, take } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest } from 'redux-saga'
import {
  compose,
  map,
  replace,
  split,
} from 'ramda'
import stores from 'fixtures/stores.json'
import xhr from 'utils/xhr'
import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'
import { getItem } from 'utils/localStorage'

import {
  RECENT_STORE_TOKEN,
  LOYALTY_URL,
  MOBILE_NUMBERS_KEY
} from 'containers/App/constants'

import {
  getAccessToken
} from 'containers/Buckets/saga'

import {
  GET_VISITED_STORES
} from './constants'

import {
  setVisitedStoresAction
} from './actions'

export function * getVisitedStore () {
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  // we will only get the last mobileNumber used
  const mobileNumber = Array.isArray(mobileNumbers) ? mobileNumbers.pop() : null

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${LOYALTY_URL}/recentStores`, {
    method: 'POST',
    body: JSON.stringify({
      mobileNumber: "09063891352", //temporary
      token: RECENT_STORE_TOKEN
    }),
    token: token.access_token
  })
  // @TODO: we need to know the structure wether we need to create a transformation layer for this.
  if (!isEmpty(req)) {
    const storeIds = compose(
      map((id) => ({ id, name: stores[id.replace(/0/g, '')] })),
      split(','),
      replace(/{|}/g, '')
    )
    yield put(setVisitedStoresAction(storeIds(req)))
  } else {
    yield put(setVisitedStoresAction([]))
  }
}

export function * getVisitedStoreSaga () {
  yield * takeLatest(GET_VISITED_STORES, getVisitedStore)
}

export function * recentStorePageSagas () {
  const watcher = yield [
    fork(getVisitedStoreSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default recentStorePageSagas
