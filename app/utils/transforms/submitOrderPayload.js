import {
  T,
  __,
  assoc,
  compose,
  cond,
  dissoc,
  equals,
  prop,
  partialRight
} from 'ramda'

const COD = 'COD'
const POINTS = 'POINTS'
const PAYMENT_METHODS = {
  COD: 'COD',
  POINTS: 'POINT_CASH'
}

const removeProp = (key) => dissoc(key)
const addPaymentType = (payload) => assoc('paymentType', __, payload)

const addPayments = (payload) => {
  return assoc('payment', [
    { tender: 'POINTS', amount: payload.usePoints },
    { tender: 'CASH', amount: payload.amount }
  ], payload)
}

const transformOrderPayload = (payload) => cond([
  [equals(COD), compose(
    removeProp('amount'),
    removeProp('loyaltyToken'),
    removeProp('multiplier'),
    removeProp('usePoints'),
    compose(
      addPaymentType(payload),
      partialRight(prop, [PAYMENT_METHODS])
    )
  )],
  [equals(POINTS), compose(
    removeProp('amount'),
    removeProp('usePoints'),
    addPayments,
    compose(
      addPaymentType(payload),
      partialRight(prop, [PAYMENT_METHODS])
    )
  )],
  [T, () => compose(
    removeProp('amount'),
    removeProp('loyaltyToken'),
    removeProp('multiplier'),
    removeProp('usePoints'),
    removeProp('deliveryLocationId')
  )(payload)]
])

const submitPayload = transformOrderPayload

export default submitPayload
