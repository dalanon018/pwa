/**
 * this will simply set the params for imgix
 */

import {
  compose,
  concat,
  map,
  join,
  toPairs,
  partialRight
} from 'ramda'

export const fnSearchParams = (params) => compose(
  concat('?'),
  join('&'),
  map(join('=')),
  toPairs
)(params)

export const paramsImgix = (url, options) => {
  const defaultOptions = {
    ...options,
    q: 50
  }
  return compose(
    partialRight(concat, [fnSearchParams(defaultOptions)])
  )(url)
}

export const imageStock = (imageFileName, options = {}) => {
  const defaultOptions = {
    ...options,
    q: 50
  }

  return `https://cliqqshop.imgix.net/${imageFileName}${fnSearchParams(defaultOptions)}`
}
