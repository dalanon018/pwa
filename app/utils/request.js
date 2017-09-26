import { __, assoc, compose, ifElse, prop, is, partialRight, omit } from 'ramda'
import 'whatwg-fetch'

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON (response) {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request (url, options = {}) {
  const headers = new Headers()
  const omitProps = ['contentType', 'token']
  const getToken = prop('token', options)
  const getContent = prop('contentType', options)

  const appendContentType = (data, contentType = 'application/json') => {
    data.append('Content-Type', contentType)
    return data
  }

  const appendAuthorization = (data, token = null) => {
    return ifElse(is(String), () => {
      data.append('Authorization', `Bearer ${token}`)
      return data
    }, () => data)(token)
  }

  const appendHeader = (options, headers) => compose(
    omit(omitProps),
    assoc('headers', __, options),
    partialRight(appendAuthorization, [getToken]),
    partialRight(appendContentType, [getContent])
  )(headers)

  return fetch(url, appendHeader(options, headers))
    .then(checkStatus)
    .then(parseJSON)
}
