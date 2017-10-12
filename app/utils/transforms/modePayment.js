import {
  cond,
  equals
} from 'ramda'

const transformModePayment = cond([
  [equals('PREPAID'), () => 'CASH'],
  [equals('COD'), () => 'COD']
])

const modePayment = transformModePayment

export default modePayment
