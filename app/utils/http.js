import { compose, concat, join, map, toPairs } from 'ramda'
/**
 * Query serialization
 * @param {*} params
 */
export const fnSearchParams = (params) => compose(
  concat('?'),
  join('&'),
  map(join('=')),
  toPairs
)(params)
