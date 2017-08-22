// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga'
import { isEqual, isEmpty, noop } from 'lodash'
import { compose, propOr, ifElse, is } from 'ramda'
import { take, put, fork, cancel, call } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'
import { getRequestData } from 'utils/offline-request'

import { transformCategory } from 'utils/transforms'
import { getItem, setItem } from 'utils/localStorage'

import {
  GET_CATEGORIES
} from './constants'

import {
  setCategoriesAction
} from './actions'

import {
  API_BASE_URL,

  CATEGORIES_KEY
} from 'containers/App/constants'

import {
  setNetworkErrorAction
} from 'containers/Buckets/actions'

import {
  getAccessToken
} from 'containers/Buckets/sagas'

function * transformEachEntity (transform, entity) {
  const response = yield call(transform, entity)
  return response
}

function * requestCategories () {
  const token = yield getAccessToken()
  const dbResource = yield call(getItem, CATEGORIES_KEY)
  const req = yield call(getRequestData, `${API_BASE_URL}/categories`, {
    method: 'GET',
    token: token.access_token
  })

  if (!isEmpty(req)) {
    const getResults = propOr([], 'categoryList')
    const isObjectNotEqual = (data) => !isEqual(dbResource, data)

    const shouldUpdate = ifElse(
      isObjectNotEqual,
      updateUICategories,
      noop
    )

    yield call(setItem, CATEGORIES_KEY, getResults(req))
    yield * compose(
      shouldUpdate,
      getResults
    )(req)
  } else {
    yield put(setNetworkErrorAction('No cache data'))
  }
}

function * getCategoriesResource () {
  const categories = yield call(getItem, CATEGORIES_KEY)

  yield call(requestCategories)

  return categories
}

export function * getCategories () {
  try {
    // we need to see if we need to request this since we save this anyway to the browser
    const req = yield getCategoriesResource()
    const getResults = ifElse(
      is(Array),
      updateUICategories,
      noop
    )

    yield getResults(req)
  } catch (e) {
    console.log(e)
  }
}

export function * updateUICategories (req = Array) {
  const transform = yield req.map((data) => transformEachEntity(transformCategory, data))

  yield put(setCategoriesAction(transform))
}

export function * getCategoriesSaga () {
  yield * takeLatest(GET_CATEGORIES, getCategories)
}

// All sagas to be loaded
export function * categoriesSagas () {
  const watcher = yield [
    fork(getCategoriesSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  categoriesSagas
]
