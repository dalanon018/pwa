
import { takeLatest } from 'redux-saga'
import { find, uniq, isEmpty } from 'lodash'
import { compose, filter, contains, toPairs, map, head } from 'ramda'
import { call, take, put, fork, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { getItem, setItem } from 'utils/localStorage'
// import request from 'utils/request'

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
  MOBILE_NUMBERS_KEY,
  ORDERED_LIST_KEY
} from 'containers/App/constants'

export function * getCategories () {
  // const headers = new Headers()
  // const currentUser = yield select(selectCurrentUser())
  // headers.append('Content-Type', 'application/json')
  // headers.append('Accept', 'application/json')
  // headers.append('Authorization', `JWT ${currentUser.token}`)

  // const requestURL = `${API_BASE_URL}/data/sectors`
  // const req = yield call(request, requestURL, {
  //   method: 'GET',
  //   headers
  // })

  // We will emulate data
  const req = yield Promise.resolve(FakeCategories)
  if (!req.err) {
    yield put(setProductCategoriesAction(req))
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
