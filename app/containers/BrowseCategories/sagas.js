// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga'
import { isEmpty } from 'lodash'
import { identity, ifElse } from 'ramda'
import { take, put, fork, cancel, call } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import request from 'utils/request'

import { transformCategory } from 'utils/transforms'
import { getItem, setItem } from 'utils/localStorage'

import FakeCategories from 'fixtures/categories.json'

import {
  GET_CATEGORIES
} from './constants'

import {
  setCategoriesAction
} from './actions'

import {
  CATEGORIES_KEY
} from 'containers/App/constants'

function * transformEachEntity (transform, entity) {
  const response = yield call(transform, entity)
  return response
}

function * requestCategories () {
  // const token = yield getAccessToken()
  const req = yield Promise.resolve(FakeCategories)

  if (!req.err) {
    yield call(setItem, CATEGORIES_KEY, req)
    return req
  } else {
    throw new Error(req.err)
  }
}

function * getCategoriesResource () {
  const categories = yield call(getItem, CATEGORIES_KEY)
  const response = ifElse(isEmpty, requestCategories, identity)(categories)
  return response
}

export function * getCategories () {
  try {
    // we need to see if we need to request this since we save this anyway to the browser
    const req = yield getCategoriesResource()

    const transform = yield req.map((data) => transformEachEntity(transformCategory, data))

    yield put(setCategoriesAction(transform))
  } catch (e) {
    console.log(e)
  }
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
