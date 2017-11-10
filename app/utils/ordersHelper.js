import {
  T,
  both,
  cond,
  contains,
  identity,
  keys,
  prop,
  partialRight
} from 'ramda'

import {
  DEFAULT_METHOD_PAYMENT,
  COD_STATUS_NAME_AFFECTED
} from 'containers/Buckets/constants'

export const handlingStatus = (modePayment) => {
  return (currentStatus) => {
    const isCod = () => modePayment !== DEFAULT_METHOD_PAYMENT
    const normalStatus = cond([
      [both(isCod, partialRight(contains, [keys(COD_STATUS_NAME_AFFECTED)])), partialRight(prop, [COD_STATUS_NAME_AFFECTED])],
      [T, identity]
    ])

    return normalStatus(currentStatus)
  }
}
