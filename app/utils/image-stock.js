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

export const paramsImgix = (url, options) => compose(
  partialRight(concat, [fnSearchParams(options)])
)(url)

export const imageStock = (imageFileName, options = {}) =>
  `https://cliqqshop.imgix.net/${imageFileName}${fnSearchParams(options)}`
