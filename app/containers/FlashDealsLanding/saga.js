import { isEmpty } from 'lodash'
import {
  call,
  cancel,
  fork,
  put,
  take
} from 'redux-saga/effects'
import { compose, map, partial, propOr } from 'ramda'
import { LOCATION_CHANGE } from 'react-router-redux'
import { takeLatest } from 'redux-saga'

// import request from 'utils/request'

import { getRequestData } from 'utils/offline-request'
import { transformPromo } from 'utils/transforms'

import {
  GET_PROMOS
} from './constants'

import {
  setPromosAction
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

function * transformEachEntity (transform, entity) {
  const response = yield call(transform, entity)
  return response
}

export function * getPromos () {
  let promos = []

  const token = yield getAccessToken()
  const req = yield call(getRequestData, `${API_BASE_URL}/promos/?offset=0&limit=0&productOffset=0&productLimit=0`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const transform = compose(
      map(partial(transformEachEntity, [transformPromo])),
      propOr([], 'promoList')
    )

    promos = yield transform(req)

    yield put(setPromosAction(promos))
  } else {
    yield put(setNetworkErrorAction(500))
  }
}

export function * getPromosSaga () {
  yield * takeLatest(GET_PROMOS, getPromos)
}

// Individual exports for testing
export function * flashDealsLandingSagas () {
  const watcher = yield [
    fork(getPromosSaga)
  ]
  yield take(LOCATION_CHANGE)
  yield watcher.map(task => cancel(task))
}

// All sagas to be loaded
export default flashDealsLandingSagas
