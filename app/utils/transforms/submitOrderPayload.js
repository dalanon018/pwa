import {
  T,
  __,
  assoc,
  compose,
  cond,
  dissoc,
  equals,
  ifElse,
  prop,
  partialRight
} from 'ramda'

const COD = 'COD'
const POINTS = 'POINTS'
const PAYMENT_METHODS = {
  COD: 'COD',
  POINTS: 'POINTS_CASH'
}

// const transformOrderPayload = (payload) => ifElse(
//   equals(COD),
//   assoc('paymentType', __, payload),
//   () => dissoc('deliveryLocationId', payload)
// )

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
    ),
  )],
  [equals(POINTS), compose(
    removeProp('deliveryLocationId'),
    removeProp('usePoints'),
    addPayments,
    compose(
      addPaymentType(payload),
      partialRight(prop, [PAYMENT_METHODS])
    ),
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
