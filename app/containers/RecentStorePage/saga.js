
import { call, cancel, fork, put, take } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest } from 'redux-saga'
import {
  compose,
  filter,
  isEmpty,
  map,
  prop,
  replace,
  split
 } from 'ramda'

import stores from 'fixtures/stores.json'
import { getRequestData } from 'utils/offline-request'
import { getItem } from 'utils/localStorage'
import { fnSearchParams } from 'utils/http'

import {
  APP_BASE_URL,
  LOYALTY_URL,
  MOBILE_NUMBERS_KEY,
  RECENT_STORE_TOKEN,
  STORE_LOCATOR_URL
} from 'containers/App/constants'

import {
  getAccessToken
} from 'containers/Buckets/saga'

import {
  GET_VISITED_STORES,
  STORE_LOCATOR
} from './constants'

import {
  setVisitedStoresAction
} from './actions'

function * getMobileNumber () {
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  // we will only get the last mobileNumber used
  return Array.isArray(mobileNumbers) ? mobileNumbers.pop() : null
}

export function * storeLocator () {
  const mobileNumber = yield getMobileNumber()
  // ${fnSearchParams({ type: 'cod' })}`)
  const params = {
    callbackUrl: encodeURI(`${APP_BASE_URL}/review`),
    callbackMethod: 'GET',
    mobileNumber: `0${mobileNumber}`
  }

  yield window.location.replace(`${STORE_LOCATOR_URL}${fnSearchParams(params)}`)
}

export function * getVisitedStore () {
  const mobileNumber = yield getMobileNumber()

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${LOYALTY_URL}/recentStores`, {
    method: 'POST',
    body: JSON.stringify({
      mobileNumber, // temporary
      token: RECENT_STORE_TOKEN
    }),
    token: token.access_token
  })
  // @TODO: we need to know the structure wether we need to create a transformation layer for this.
  if (!isEmpty(req)) {
    const storeIds = compose(
      filter(prop('id')),
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

export function * storeLocatorSaga () {
  yield * takeLatest(STORE_LOCATOR, storeLocator)
}

export function * recentStorePageSagas () {
  const watcher = yield [
    fork(getVisitedStoreSaga),
    fork(storeLocatorSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default recentStorePageSagas
