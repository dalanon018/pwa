import {
  cond,
  equals
} from 'ramda'

const transformModePayment = cond([
  [equals('PREPAID'), () => 'CASH'],
  [equals('COD'), () => 'COD'],
  [equals('POINTS_CASH'), () => 'POINTS_CASH']
])

const modePayment = transformModePayment

export default modePayment
