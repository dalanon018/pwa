/**
 * This file serves as requestor
 * if data is already fetched then we will return that first
 */

import request from './request'
import {
  compose,
  prop,
  partial,
  identity,
  ifElse,
  isNil
} from 'ramda'
// if theres error we want to send here.
import ErrorTracking from 'utils/errorTracking'

const returnDataFromCache = async (url, cache) => {
  const response = await cache.match(url)
  // TODO: we need to handle differnt type of content here..
  const toType = (response) => {
    return response.json()
  }

  const convertType = ifElse(
    isNil,
    identity,
    toType
  )

  return convertType(response)
}

const getFromCache = (url) => compose(
  partial(returnDataFromCache, [url]),
  prop('caches')
)(window)

const getRequestData = async (url, options) => {
  let response
  try {
    response = await request(url, options)
  } catch (error) {
    // we need to throw to our sentry
    ErrorTracking.exception(error)
    response = await getFromCache(url)
  }

  return response
}

export {
  getFromCache,
  getRequestData
}
