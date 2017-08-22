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

const returnDataFromCache = async (url, cache) => {
  const response = await cache.match(url)
  const toJson = (response) => response.json()

  const convertToJson = ifElse(
    isNil,
    identity,
    toJson
  )

  return convertToJson(response)
}

const getFromCache = (url) => compose(
  partial(returnDataFromCache, [url]),
  prop('caches')
)(window)

const getRequestData = async (url, options) => {
  let response
  try {
    response = await request(url, options)
  } catch (e) {
    response = await getFromCache(url)
  }

  return response
}

export {
  getFromCache,
  getRequestData
}
