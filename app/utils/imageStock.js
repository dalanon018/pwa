/**
 * this will simply set the params for imgix
 */
import { fnSearchParams } from 'http'

import {
  compose,
  concat,
  partialRight
  } from 'ramda'

export const paramsImgix = (url, options) => compose(
  partialRight(concat, [fnSearchParams(options)])
)(url)

export const imageStock = (imageFileName) =>
  `https://cliqq.imgix.net/${imageFileName}`
