import {
  __,
  assoc,
  dissoc,
  ifElse,
  equals
} from 'ramda'

const COD = 'COD'

const transformOrderPayload = (payload) => ifElse(
  equals(COD),
  assoc('paymentType', __, payload),
  () => dissoc('deliveryLocationId', payload)
)

const submitPayload = transformOrderPayload

export default submitPayload
