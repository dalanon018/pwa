import moment from 'moment'
import { takeLatest } from 'redux-saga'
import { find, uniq, isEmpty } from 'lodash'
import { compose, filter, contains, toPairs, map, head, identity, ifElse, isNil } from 'ramda'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

import request from 'utils/request'

import { transformCategory } from 'utils/transforms'
import { getItem, setItem } from 'utils/localStorage'
import { DateDifferece } from 'utils/date'

import FakeCategories from 'fixtures/categories.json'

import {
  GET_PRODUCT_CATEGORIES,
  GET_MOBILE_NUMBERS,
  GET_RECEIPT_UPDATED,
  STATUSES
} from './constants'

import {
  setProductCategoriesAction,
  setMobileNumbersAction,
  setUpdatedReceiptsAction
} from './actions'

import {
  API_BASE_URL,
  ACCESS_TOKEN_KEY,
  MOBILE_NUMBERS_KEY,
  ORDERED_LIST_KEY,
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
  const response = yield ifElse(isNil, requestCategories, identity)(categories)
  return response
}

export function * requestAccessToken () {
  const requestURL = `${API_BASE_URL}/authorize`
  const req = yield call(request, requestURL, {
    method: 'POST'
  })

  if (!req.err) {
    // the normal expiration is 1 hour but we will only set it to 30 mins so we can be sure that we will not encounter token expiry
    const expiry = moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss')
    const token = Object.assign({}, req, { expiry })

    yield call(setItem, ACCESS_TOKEN_KEY, token)

    return token
  } else {
    throw new Error(req.err)
  }
}

/**
 * main function for getting us the valid token
 */
export function * getAccessToken () {
  // first we will check if we have token set up
  const token = yield call(getItem, ACCESS_TOKEN_KEY)
  // if we have token then we simply need to check if token is still valid
  if (!isEmpty(token) && token) {
    const { expiry } = token
    if (DateDifferece(moment(), expiry) <= 0) {
      return yield requestAccessToken()
    }

    return token
  }

  return yield requestAccessToken()
}

export function * getCategories () {
  try {
    // we need to see if we need to request this since we save this anyway to the browser
    const req = yield getCategoriesResource()

    const transform = yield req.map((data) => transformEachEntity(transformCategory, data))

    yield put(setProductCategoriesAction(transform))
  } catch (e) {
    console.log(e)
  }
}

export function * getMobileNumbers () {
  const mobileNumbers = yield call(getItem, MOBILE_NUMBERS_KEY)
  const mobiles = uniq(mobileNumbers) || []

  yield put(setMobileNumbersAction(mobiles))
}

export function * getUpdatedReceipts (payload) {
  const orders = yield call(getItem, ORDERED_LIST_KEY)
  const { payload: { snapshot } } = payload
  let updatedReceipts = []

  // make sure that it is not null
  if (snapshot) {
    // first we have to make our snapshot to keys and find the order by the key
    Object.keys(snapshot).map((trackingNumber) => {
      const snapStatus = snapshot[trackingNumber]
      const order = find(orders, { trackingNumber }) || {}
      // we need to make sure that we will not include 'RESERVED'
      const isReservedStatus = (status) => compose(
        contains(status),
        map(head),
        filter(contains('RESERVED')),
        toPairs
      )(STATUSES)

      if ((!isEmpty(order) && order.status !== snapStatus) && !isReservedStatus(snapStatus)) {
        order.status = snapStatus
        updatedReceipts = updatedReceipts.concat(order)

        setItem(ORDERED_LIST_KEY, orders)
        put(setUpdatedReceiptsAction(updatedReceipts))
      }
    })
  }

  if (!isEmpty(updatedReceipts)) {
    yield put(setUpdatedReceiptsAction(updatedReceipts))
  }
}

export function * getCategoriesSaga () {
  yield * takeLatest(GET_PRODUCT_CATEGORIES, getCategories)
}

export function * getMobileNumbersSaga () {
  yield * takeLatest(GET_MOBILE_NUMBERS, getMobileNumbers)
}

export function * getUpdatedReceiptsSaga () {
  yield * takeLatest(GET_RECEIPT_UPDATED, getUpdatedReceipts)
}

// All sagas to be loaded
export function * bucketsSagas () {
  const watcher = yield [
    fork(getCategoriesSaga),
    fork(getMobileNumbersSaga),

    fork(getUpdatedReceiptsSaga)
  ]

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield watcher.map((task) => cancel(task))
}

// All sagas to be loaded
export default [
  bucketsSagas
]
