import {
  __,
  assoc,
  ifElse,
  equals
} from 'ramda'

const COD = 'COD'

const transformOrderPayload = (payload) => ifElse(
  equals(COD),
  assoc('modePayment', __, payload),
  () => ({ ...payload })
)

const submitPayload = transformOrderPayload

export default submitPayload
