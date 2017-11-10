import {
  always,
  T,
  both,
  cond,
  contains,
  identity,
  partialRight
} from 'ramda'

import {
  DEFAULT_METHOD_PAYMENT,
  COD_STATUS_NAME_AFFECTED
} from 'containers/Buckets/constants'

const PROCESSING = 'PROCESSING'

export const handlingStatus = (modePayment) => {
  return (currentStatus) => {
    const isCod = () => modePayment !== DEFAULT_METHOD_PAYMENT
    const normalStatus = cond([
      [both(isCod, partialRight(contains, [COD_STATUS_NAME_AFFECTED])), always(PROCESSING)],
      [T, identity]
    ])

    return normalStatus(currentStatus)
  }
}
