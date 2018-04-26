import {
  __,
  compose,
  contains,
  head,
  map,
  partial
} from 'ramda'

import {
  FULL_POINTS_IDENTIFIER
} from 'containers/Buckets/constants'

export const isFullPointsOnly = ({ identifier = '' }) => compose(
  head,
  partial(
    map(
      contains(__, identifier)
    ),
    [FULL_POINTS_IDENTIFIER]
  )
)()
