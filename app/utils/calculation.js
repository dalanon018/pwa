import {
  multiply
} from 'ramda'

export const calculateEarnPoints = ({ method, multiplier, percentage, amount }) => {
  return Math.floor(
    multiply(amount, percentage)
  )
}
